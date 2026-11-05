import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { invokeAssessmentLLM } from "@/lib/assessment-client";
import {
  radarData,
  clampScore,
  buildCoachPrompt,
  COACH_SCHEMA,
  COACH_MODEL,
  isMinorBand,
  bandFor,
  SCORE_OUT_OF,
} from "@/components/cookie/cookie";
import SkillRadar from "@/components/empathy/SkillRadar";
import CoachCard from "@/components/empathy/CoachCard";
import CountUp from "@/components/empathy/CountUp";
import ShareImage from "@/components/empathy/ShareImage";
import Footer from "@/components/empathy/Footer";

const NOT_A_DIAGNOSIS =
  "This is a picture of skills at one moment. It is not a diagnosis, not a personality type, and not a prediction about anyone.";

const UI_FALLBACK = {
  score_label: "Your empathy assessment score",
  not_happiness:
    "This does not measure how happy or how kind you are. It measures how precisely you read and name what happens in you and in other people.",
  simple_btn: "Simple version",
  full_btn: "Full version",
  divider: "The full version is below",
  coach_btn: "How do I build this?",
  print_btn: "Print or save as PDF",
  certificate_btn: "Print the certificate",
  start_again_btn: "Start again",
  share_btn: "Download a share image",
  another_child_btn: "Measure another child",
};

function longDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (e) {
    return iso || "";
  }
}

export default function ResultsView({
  report,
  coachState,
  isParent,
  childName,
  band,
  history,
  onCertificate,
  onRestart,
  onMeasureAnother,
  printName,
  printDate,
}) {
  const [coaches, setCoaches] = useState({});
  const [coachLoading, setCoachLoading] = useState({});
  const [coachError, setCoachError] = useState({});
  const simpleRef = useRef(null);
  const fullRef = useRef(null);

  async function loadCoach(skillKey) {
    if (coaches[skillKey] || coachLoading[skillKey]) return;
    setCoachLoading((p) => ({ ...p, [skillKey]: true }));
    setCoachError((p) => ({ ...p, [skillKey]: false }));
    try {
      const res = await invokeAssessmentLLM({
        prompt: buildCoachPrompt(coachState, report, skillKey),
        response_json_schema: COACH_SCHEMA,
        model: COACH_MODEL,
      });
      setCoaches((p) => ({ ...p, [skillKey]: res }));
    } catch (e) {
      setCoachError((p) => ({ ...p, [skillKey]: true }));
    } finally {
      setCoachLoading((p) => ({ ...p, [skillKey]: false }));
    }
  }

  if (!report) return null;
  const composite = clampScore(report.composite);
  const data = radarData(report);
  const kidView = report.kid_view;
  const childBand = !!band && isMinorBand(band);

  const rawUi = (report && report.ui) || {};
  const ui = { ...UI_FALLBACK, ...rawUi };

  const isChildSelf = !isParent && childBand;
  const simpleLabel =
    ui.simple_btn ||
    (isParent || isChildSelf ? "For you" : "Simple version");
  const fullLabel =
    ui.full_btn ||
    (isParent
      ? "To read to " + childName
      : isChildSelf
      ? "For a grown up"
      : "Full version");
  const answersHeading = isParent
    ? rawUi.your_answers || "What you told Cookie"
    : rawUi.your_answers || "Your answers";

  const themeLabel = ui.theme_label || (band ? bandFor(band).label : "");
  const contextName = (printName || "").split(/\s+/)[0] || "";
  const contextLine = `${contextName}, ${themeLabel}, ${longDate(printDate)}`;

  function scrollTo(ref) {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="mx-auto max-w-xl px-5 pb-24 pt-10 print-area">
      <div className="print-only print-header">
        <p className="text-base font-semibold">The Empathy Measure</p>
        <p className="text-sm">{printName}</p>
        <p className="text-sm">{longDate(printDate)}</p>
      </div>

      {kidView && (
        <div className="no-print mb-8 flex gap-2">
          <button
            type="button"
            onClick={() => scrollTo(simpleRef)}
            className="btn-lift btn-primary-lift flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            {simpleLabel}
          </button>
          <button
            type="button"
            onClick={() => scrollTo(fullRef)}
            className="btn-lift flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
          >
            {fullLabel}
          </button>
        </div>
      )}

      {kidView && (
        <section ref={simpleRef} className="scroll-mt-24 break-after-page print-card">
          <p className="text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
            {kidView.headline}
          </p>
          <div className="mt-10 space-y-8">
            {(kidView.lines || []).map((line, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-lg font-semibold text-foreground">{line.label}</p>
                  <p className="text-2xl font-semibold text-primary">
                    <CountUp value={clampScore(line.score)} />
                  </p>
                </div>
                <p className="mt-1 text-base leading-relaxed text-foreground">{line.plain}</p>
              </div>
            ))}
          </div>
          {kidView.best_thing && (
            <p className="mt-10 text-lg leading-relaxed text-foreground">{kidView.best_thing}</p>
          )}
          {kidView.one_thing && (
            <p className="mt-3 text-xl font-semibold leading-snug text-primary">
              {kidView.one_thing}
            </p>
          )}

          {childBand && (
            <button
              type="button"
              onClick={onCertificate}
              className="btn-lift no-print mt-12 w-full rounded-xl border border-primary bg-card px-6 py-4 text-base font-semibold text-primary transition hover:bg-accent"
            >
              {ui.certificate_btn}
            </button>
          )}

          <button
            type="button"
            onClick={() => scrollTo(fullRef)}
            className="btn-lift btn-primary-lift no-print mt-4 w-full rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            {fullLabel}
          </button>
        </section>
      )}

      {kidView && (
        <div className="my-10 w-full rounded-xl border-y-2 border-primary bg-primary/10 py-4 text-center print-card">
          <p className="text-sm font-semibold text-primary">{ui.divider}</p>
        </div>
      )}

      <section ref={fullRef} className="mt-12 scroll-mt-24">
        <p className="body-text text-center font-medium">{NOT_A_DIAGNOSIS}</p>

        <header className="mt-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {ui.score_label}
          </p>
          <div className="mt-3 flex items-baseline justify-center gap-2">
            <span className="text-6xl font-semibold text-foreground">
              <CountUp value={composite} />
            </span>
            <span className="text-lg text-muted-foreground">out of {SCORE_OUT_OF}</span>
          </div>
          <p className="mx-auto mt-3 max-w-md text-xs text-muted-foreground">{ui.not_happiness}</p>
        </header>

        <div className="lift-card mt-8 rounded-2xl border border-border bg-card p-4 print-card">
          <SkillRadar data={data} animate />
          <p className="mt-2 text-center text-xs text-muted-foreground">{contextLine}</p>
        </div>

        <div className="mt-8 space-y-4">
          {report.skills && report.skills.map((s) => (
            <div
              key={s.key}
              className="lift-card lift-hover rounded-2xl border border-border bg-card p-5 print-card"
            >
              <div className="flex items-baseline justify-between">
                <p className="text-base font-semibold text-foreground">{s.label}</p>
                <p className="text-2xl font-semibold text-primary">{clampScore(s.score)}</p>
              </div>
              <p className="mt-3 text-sm text-foreground">{s.evidence}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.meaning}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.growth}</p>
              <CoachCard
                skill={s}
                coaches={coaches}
                coachLoading={coachLoading}
                coachError={coachError}
                onCoach={loadCoach}
                isParent={isParent}
                childName={childName}
                coachBtn={ui.coach_btn}
              />
            </div>
          ))}
        </div>

        {Array.isArray(report.needs_detected) && report.needs_detected.length > 0 && (
          <div className="lift-card mt-10 rounded-2xl border border-border bg-card p-5 print-card">
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              What the measure saw underneath
            </h2>
            <p className="body-text mb-4">The needs most visible under your answers:</p>
            <div className="flex flex-wrap gap-2">
              {report.needs_detected.map((n, i) => (
                <span
                  key={i}
                  className="rounded-full border border-accent bg-accent px-3 py-1 text-sm font-medium text-accent-foreground"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        )}

        {Array.isArray(report.strengths) && report.strengths.length > 0 && (
          <div className="lift-card mt-10 rounded-2xl border border-border bg-card p-5 print-card">
            <h2 className="mb-3 text-lg font-semibold text-foreground">Strengths</h2>
            <ul className="space-y-2">
              {report.strengths.map((s, i) => (
                <li key={i} className="body-text">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="lift-card mt-10 rounded-2xl border border-border bg-card p-5 print-card">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            The next skill to build
          </h2>
          <p className="body-text">{report.growth_edge}</p>
        </div>

        <p className="mt-10 text-sm italic text-muted-foreground print-card">
          {report.closing_note}
        </p>

        {Array.isArray(history) && history.length > 0 && (
          <div className="lift-card mt-12 rounded-2xl border border-border bg-card p-5 print-card">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              {answersHeading}
            </h2>
            <div className="space-y-4">
              {history.map((h, i) => (
                <div key={i} className="border-l-2 border-accent pl-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {h.n === 0
                      ? "Opening"
                      : h.was_followup
                      ? "Follow up to question " + h.n
                      : "Question " + h.n}
                    {h.unscored && h.n !== 0 ? " (corrected)" : ""}
                  </p>
                  <p className="mt-1 text-sm text-foreground">{h.question}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{h.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="no-print mt-8 text-xs text-muted-foreground">
          This result is saved in this browser on this device. Use the print button to keep a copy.
        </p>

        <div className="no-print mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-lift btn-primary-lift rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            {ui.print_btn}
          </button>
          <ShareImage report={report} contextLine={contextLine} shareLabel={ui.share_btn} />
          <Link
            to="/research"
            className="btn-lift rounded-xl border border-border bg-card px-6 py-3 text-base font-semibold text-foreground transition hover:bg-secondary"
          >
            The research
          </Link>
          {isParent && (
            <button
              type="button"
              onClick={onMeasureAnother}
              className="btn-lift rounded-xl border border-border bg-card px-6 py-3 text-base font-semibold text-foreground transition hover:bg-secondary"
            >
              {ui.another_child_btn}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="no-print btn-lift mt-4 w-full rounded-xl border border-border bg-card px-6 py-4 text-base font-semibold text-foreground transition hover:bg-secondary"
        >
          {ui.start_again_btn}
        </button>
      </section>

      <div className="print-only print-footer">
        <p className="text-sm">{window.location.origin}</p>
      </div>

      <Footer />
    </div>
  );
}