import React from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import {
  getLocalResult,
  modeFor,
  DEFAULT_LANGUAGE,
} from "@/components/cookie/cookie";
import ResultsView from "@/components/empathy/ResultsView";
import Footer from "@/components/empathy/Footer";

export default function ResultPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const st = location.state || {};

  let entry = null;
  if (id === "local" && st.fallback) {
    entry = {
      id: "local",
      saved_at: st.savedAt,
      mode: st.mode,
      band: st.band,
      exact_age: null,
      theme: "",
      language: st.language || DEFAULT_LANGUAGE,
      context: null,
      name: st.name || "",
      child_name: st.childName || "",
      history: st.history || [],
      report: st.report,
    };
  } else {
    entry = getLocalResult(id);
  }

  if (!entry || !entry.report) {
    return (
      <div className="mx-auto max-w-xl px-5 pb-20 pt-16 text-center">
        <p className="body-text">That result is not on this device.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Back to the start
        </Link>
        <Footer />
      </div>
    );
  }

  const report = entry.report;
  const mode = entry.mode || (entry.band ? modeFor(entry.band) : "self");
  const isParent = mode === "parent_report";
  const childName = entry.child_name || "your child";
  const coachState = {
    band: entry.band,
    exact_age: entry.exact_age,
    theme: entry.theme,
    language: entry.language,
    context: entry.context,
    child_name: entry.child_name,
    name: entry.name,
    history: entry.history || [],
  };
  const printName = isParent
    ? entry.child_name || entry.name || "Your result"
    : entry.name || "Your result";

  const nameForAnother = entry.name || st.name || "";
  const languageForAnother = entry.language || DEFAULT_LANGUAGE;

  return (
    <ResultsView
      report={report}
      coachState={coachState}
      isParent={isParent}
      childName={childName}
      band={entry.band}
      history={entry.history || []}
      printName={printName}
      printDate={entry.saved_at}
      onCertificate={() => navigate(`/result/${id}/certificate`, { state: st })}
      onRestart={() => navigate("/")}
      onMeasureAnother={() =>
        navigate("/", {
          state: {
            preset: {
              band: "under7",
              name: nameForAnother,
              language: languageForAnother,
            },
          },
        })
      }
    />
  );
}