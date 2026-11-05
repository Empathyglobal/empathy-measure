import React from "react";

function longDate(d) {
  try {
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (e) {
    return d.toDateString();
  }
}

export default function CertificateView({ childName, topTwo, onBack }) {
  const strengths = (topTwo || []).join(" and ");
  return (
    <div className="mx-auto max-w-3xl px-5 pb-16 pt-10">
      <div className="mx-auto max-w-2xl px-8 py-16 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
          The Empathy Measure
        </p>
        <div className="mx-auto my-12 w-24 border-t border-primary"></div>
        <h1 className="font-heading text-5xl font-semibold text-foreground sm:text-6xl">
          {childName || "Your child"}
        </h1>
        <p className="mt-8 text-lg text-foreground sm:text-xl">showed real strength in</p>
        <p className="mt-3 text-2xl font-semibold text-primary sm:text-3xl">{strengths}</p>
        <div className="mx-auto my-14 w-24 border-t border-primary"></div>
        <p className="text-base text-foreground">{longDate(new Date())}</p>
        <p className="mt-16 text-sm font-medium text-muted-foreground">
          Cookie, The Empathy Measure
        </p>
      </div>

      <div className="no-print mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="btn-lift btn-primary-lift rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Print
        </button>
        <button
          type="button"
          onClick={onBack}
          className="btn-lift rounded-xl border border-border bg-card px-6 py-3 text-base font-semibold text-foreground transition hover:bg-secondary"
        >
          Back to my result
        </button>
      </div>
    </div>
  );
}