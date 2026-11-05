import React from "react";

export default function CoachCard({ skill, coaches, coachLoading, coachError, onCoach, isParent, childName, coachBtn }) {
  const key = skill.key;
  const data = coaches[key];
  const isLoading = !!coachLoading[key];
  const hasError = !!coachError[key];
  const label = coachBtn || (isParent
    ? `How do I build this in ${childName}?`
    : "How do I build this?");

  return (
    <div className="mt-4 border-t border-border pt-4 no-print">
      <button
        type="button"
        onClick={() => onCoach(key)}
        disabled={isLoading}
        className="rounded-xl border border-primary bg-card px-4 py-2 text-sm font-semibold text-primary transition hover:bg-accent disabled:opacity-50"
      >
        {isLoading ? "Cookie is thinking..." : label}
      </button>

      {hasError && (
        <p className="mt-3 text-sm text-foreground">
          That did not load. Try again.
        </p>
      )}

      {isLoading && !data && (
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-primary" />
          <span>Cookie is reading this skill in your answers.</span>
        </div>
      )}

      {data && (
        <div className="mt-4 space-y-4 print-block">
          <div className="print-card">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Why it matters
            </p>
            <p className="mt-1 text-sm text-foreground">{data.why_it_matters}</p>
          </div>

          <div className="print-card">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              What is happening
            </p>
            <p className="mt-1 text-sm text-foreground">{data.what_is_happening}</p>
          </div>

          {Array.isArray(data.practices) && data.practices.length > 0 && (
            <div className="print-card">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Practices
              </p>
              <ul className="mt-2 space-y-3">
                {data.practices.map((p, i) => (
                  <li key={i}>
                    <p className="text-sm font-semibold text-foreground">{p.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-xl bg-accent px-4 py-3 print-card">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              One thing to do first
            </p>
            <p className="mt-1 text-base font-semibold text-foreground">
              {data.one_thing}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}