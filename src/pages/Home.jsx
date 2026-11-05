import { assessmentEnabled } from "@/lib/release-config";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { invokeAssessmentLLM } from "@/lib/assessment-client";
import LandingView from "@/components/empathy/LandingView";
import InterviewView from "@/components/empathy/InterviewView";
import {
  TOTAL_QUESTIONS,
  MAX_FOLLOWUPS_TOTAL,
  DEFAULT_LANGUAGE,
  PREFERRED_MODEL,
  buildInterviewPrompt,
  buildReportPrompt,
  INTERVIEW_SCHEMA,
  REPORT_SCHEMA,
  saveLocalResult,
  saveSession,
  loadSession,
  clearSession,
  localAvailable,
  themesForBand,
  bandFor,
  modeFor,
  isMinorBand,
  contextQuestionsFor,
  dailyLimitReached,
  noteSessionStart,
} from "@/components/cookie/cookie";


const IUI_KEY = "empathy_measure_community_iui";

function saveIui(obj) {
  try {
    window.localStorage.setItem(IUI_KEY, JSON.stringify(obj || {}));
  } catch (e) {}
}
function loadIui() {
  try {
    const raw = window.localStorage.getItem(IUI_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
function clearIui() {
  try {
    window.localStorage.removeItem(IUI_KEY);
  } catch (e) {}
}

function counts(history) {
  const h = history || [];
  return {
    mainAnswered: h.filter(
      (x) => !x.was_followup && !x.unscored && x.n >= 1 && x.answer != null
    ).length,
    followupsUsed: h.filter((x) => x.was_followup).length,
  };
}

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState("LANDING");
  const [band, setBand] = useState(null);
  const [exactAge, setExactAge] = useState(null);
  const [theme, setTheme] = useState(null);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [context, setContext] = useState({});
  const [name, setName] = useState("");
  const [childName, setChildName] = useState("");
  const [consent, setConsent] = useState(false);
  const [dailyLimited, setDailyLimited] = useState(false);
  const [history, setHistory] = useState([]);
  const [current, setCurrent] = useState(null);
  const [currentMainN, setCurrentMainN] = useState(0);
  const [denied, setDenied] = useState([]);
  const [iui, setIui] = useState(null);
  const [status, setStatus] = useState("asking");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [draft, setDraft] = useState("");
  const [pendingSession, setPendingSession] = useState(null);
  const retryRef = useRef(null);

  // On open: apply a "measure another child" preset, or look for an unfinished
  // session. Everything local is gated on localAvailable().
  useEffect(() => {
    if (location.state && location.state.preset) {
      const p = location.state.preset;
      setBand(p.band || "under7");
      setLanguage(p.language || DEFAULT_LANGUAGE);
      setName(p.name || "");
      setChildName("");
      setExactAge(null);
      setConsent(false);
      setContext({});
      setTheme(null);
      setDenied([]);
      setIui(null);
      clearIui();
      navigate(location.pathname, { replace: true, state: null });
      return;
    }
    if (localAvailable()) {
      const s = loadSession();
      if (s) setPendingSession(s);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handler(e) {
      e.preventDefault();
      e.returnValue = "";
    }
    if (view === "INTERVIEW") {
      window.addEventListener("beforeunload", handler);
      return () => window.removeEventListener("beforeunload", handler);
    }
  }, [view]);

  function buildState(hist, deniedOverride) {
    return {
      band,
      exact_age: exactAge,
      theme,
      language,
      context,
      child_name: childName,
      name,
      consent,
      denied: deniedOverride != null ? deniedOverride : denied,
      history: hist,
    };
  }

  function chooseBand(key) {
    setBand(key);
    setExactAge(null);
    setContext({});
    const stillValid = themesForBand(key).some((t) => t.key === theme);
    if (!stillValid) setTheme(null);
  }

  function chooseTheme(key) {
    setTheme(key);
    setContext({});
  }

  function contextReady() {
    const key = band && bandFor(band).exact ? "under7" : theme;
    if (!key) return true;
    const qs = contextQuestionsFor(key);
    return qs.every(
      (q) =>
        !q.required ||
        (context[q.key] != null && String(context[q.key]).trim() !== "")
    );
  }

  async function callInterview(hist, deniedOverride) {
    return await invokeAssessmentLLM({
      prompt: buildInterviewPrompt(buildState(hist, deniedOverride)),
      response_json_schema: INTERVIEW_SCHEMA,
      model: PREFERRED_MODEL,
    });
  }

  function applyResponse(res) {
    setCurrent(res);
    if (res.action === "opening") {
      setCurrentMainN(0);
      if (res.iui) {
        setIui(res.iui);
        saveIui(res.iui);
      }
    } else if (res.action === "question" || res.action === "reask") {
      setCurrentMainN(res.question_number || currentMainN || 1);
    }
    setStatus("asking");
    setDraft("");
    setLoading(false);
  }

  async function runReport(hist) {
    setStatus("reporting");
    setError(false);
    retryRef.current = () => runReport(hist);
    try {
      const rep = await invokeAssessmentLLM({
        prompt: buildReportPrompt(buildState(hist)),
        response_json_schema: REPORT_SCHEMA,
        model: PREFERRED_MODEL,
      });
      // Community edition: no assessment records or result email are sent.
      // Keep the full picture on the person's own device, then go to its route.
      clearSession();
      clearIui();
      const id = saveLocalResult(buildState(hist), rep);
      const finalId = id || "local";
      navigate(`/result/${finalId}`, {
        state: {
          name,
          language,
          mode: modeFor(band),
          band,
          fallback: !id,
          report: id ? undefined : rep,
          history: id ? undefined : hist,
          childName: id ? undefined : childName,
          savedAt: new Date().toISOString(),
        },
      });
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleDone(hist) {
    setStatus("closing");
    setLoading(false);
    setTimeout(() => runReport(hist), 2000);
  }

  async function fetchNext(hist) {
    setLoading(true);
    setError(false);
    retryRef.current = () => fetchNext(hist);
    try {
      const res = await callInterview(hist);
      const c = counts(hist);

      if (c.mainAnswered >= TOTAL_QUESTIONS || res.action === "done") {
        setCurrent(res);
        handleDone(hist);
        return;
      }

      if (res.action === "reask") {
        // The most recent answered entry for this question number corrected a
        // premise. Mark it unscored, record the denied premise, and show the
        // new question under the same number. The counter does not move.
        const updated = [...hist];
        for (let i = updated.length - 1; i >= 0; i--) {
          if (
            updated[i].n === res.question_number &&
            updated[i].answer != null &&
            !updated[i].unscored
          ) {
            updated[i] = { ...updated[i], unscored: true };
            break;
          }
        }
        setHistory(updated);
        let newDenied = denied;
        if (res.denied_premise) {
          newDenied = [...denied, res.denied_premise];
          setDenied(newDenied);
        }
        setCurrent(res);
        const questionNumber = res.question_number;
        setCurrentMainN(typeof questionNumber === "number" && Number.isInteger(questionNumber) && questionNumber >= 1 && questionNumber <= TOTAL_QUESTIONS ? questionNumber : currentMainN);
        setStatus("asking");
        setDraft("");
        setLoading(false);
        saveSession(
          { ...buildState(updated), denied: newDenied },
          res,
          res.question_number || currentMainN
        );
        return;
      }

      if (res.action === "followup" && c.followupsUsed >= MAX_FOLLOWUPS_TOTAL) {
        const res2 = await callInterview(hist);
        if (res2.action === "done" || c.mainAnswered >= TOTAL_QUESTIONS) {
          setCurrent(res2);
          handleDone(hist);
          return;
        }
        applyResponse(res2);
        saveSession(buildState(hist), res2, res2.question_number || currentMainN);
        return;
      }

      applyResponse(res);
      saveSession(buildState(hist), res, res.question_number || currentMainN);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  }

  async function startInterview() {
    if (!assessmentEnabled) return;
    if (dailyLimitReached()) {
      setDailyLimited(true);
      return;
    }
    if (!band || !contextReady()) return;
    const bandObj = bandFor(band);
    const isExact = !!bandObj.exact;
    const mode = bandObj.mode;
    const parentFronted = mode === "parent_report" || isMinorBand(band);
    const themeRequired = !isExact;
    const ready =
      (!isExact || exactAge != null) &&
      (!themeRequired || !!theme) &&
      name.trim().length > 0 &&
      (!parentFronted || (childName.trim().length > 0 && consent));
    if (!ready) return;

    // Starting fresh clears any unfinished session.
    clearSession();
    clearIui();
    setIui(null);
    setDenied([]);
    setPendingSession(null);
    noteSessionStart();
    setLoading(true);
    setError(false);
    retryRef.current = () => startInterview();
    try {
      const res = await callInterview([]);
      setHistory([]);
      applyResponse(res);
      setView("INTERVIEW");
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  }

  function submitAnswer() {
    const text = draft;
    if (!text.trim() || loading) return;
    const isOpening = current.action === "opening";
    const entry = {
      n: isOpening
        ? 0
        : current.action === "followup"
        ? currentMainN
        : current.question_number != null
        ? current.question_number
        : currentMainN,
      skill: current.skill,
      level: current.level,
      question: current.text,
      answer: text,
      was_followup: current.action === "followup",
      unscored: isOpening,
    };
    const newHistory = [...history, entry];
    setHistory(newHistory);
    fetchNext(newHistory);
  }

  function retry() {
    if (retryRef.current) retryRef.current();
  }

  function resumeSession() {
    if (!assessmentEnabled) return;
    const s = pendingSession;
    if (!s || !s.current || !s.current.text) {
      discardSession();
      return;
    }
    setBand(s.band || null);
    setExactAge(s.exact_age != null ? s.exact_age : null);
    setTheme(s.theme || null);
    setLanguage(s.language || DEFAULT_LANGUAGE);
    setContext(s.context || {});
    setName(s.name || "");
    setChildName(s.child_name || "");
    setConsent(!!s.consent);
    setDenied(Array.isArray(s.denied) ? s.denied : []);
    setHistory(s.history || []);
    setCurrent(s.current);
    setCurrentMainN(s.current_main_n || s.current.question_number || 0);
    const savedIui = loadIui();
    if (savedIui) setIui(savedIui);
    setStatus("asking");
    setLoading(false);
    setError(false);
    setDraft("");
    setPendingSession(null);
    setView("INTERVIEW");
  }

  function discardSession() {
    clearSession();
    clearIui();
    setPendingSession(null);
  }

  const mode = band ? modeFor(band) : null;
  const parentFronted = mode === "parent_report" || (band && isMinorBand(band));
  const answeringName =
    mode === "parent_report"
      ? name.trim()
      : parentFronted
      ? childName.trim()
      : name.trim();
  const firstName = answeringName.split(/\s+/)[0] || "";
  const answeredCount = history.filter(
    (x) => !x.was_followup && !x.unscored && x.n >= 1 && x.answer != null
  ).length;

  if (view === "INTERVIEW") {
    return (
      <InterviewView
        firstName={firstName}
        status={status}
        current={current}
        currentMainN={currentMainN}
        totalQuestions={TOTAL_QUESTIONS}
        answered={answeredCount}
        loading={loading}
        error={error}
        draft={draft}
        setDraft={setDraft}
        onAnswer={submitAnswer}
        onRetry={retry}
        languageLabel={language}
        iui={iui}
      />
    );
  }

  return (
    <>
      {dailyLimited && (
        <div className="mx-auto max-w-3xl px-5 pt-10">
          <p className="body-text text-center">
            You have already done this today. Come back tomorrow and it will be here.
          </p>
        </div>
      )}
      {pendingSession && localAvailable() && (
        <div className="mx-auto max-w-3xl px-5 pt-10">
          <SessionPanel
            session={pendingSession}
            onContinue={resumeSession}
            onDiscard={discardSession}
          />
        </div>
      )}
      <LandingView
        band={band}
        onBandChange={chooseBand}
        exactAge={exactAge}
        setExactAge={setExactAge}
        theme={theme}
        onThemeChange={chooseTheme}
        context={context}
        setContext={setContext}
        language={language}
        setLanguage={setLanguage}
        name={name}
        setName={setName}
        childName={childName}
        setChildName={setChildName}
        consent={consent}
        setConsent={setConsent}
        onBegin={startInterview}
        loading={loading}
      />
    </>
  );
}

function SessionPanel({ session, onContinue, onDiscard }) {
  const answered = (session.history || []).filter(
    (h) => !h.was_followup && !h.unscored && h.n >= 1 && h.answer != null
  ).length;
  return (
    <div className="lift-card rounded-2xl border border-border bg-card p-5">
      <p className="text-base font-semibold text-foreground">
        You have an unfinished set of questions
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {answered} answered so far.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onContinue}
          className="btn-lift btn-primary-lift rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={onDiscard}
          className="btn-lift rounded-xl border border-border bg-card px-6 py-3 text-base font-semibold text-foreground transition hover:bg-secondary"
        >
          Start again
        </button>
      </div>
    </div>
  );
}