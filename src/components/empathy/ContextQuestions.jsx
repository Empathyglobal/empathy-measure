import React from "react";
import { contextQuestionsFor } from "@/components/cookie/cookie";

export default function ContextQuestions({ theme, context, setContext }) {
  const qs = theme ? contextQuestionsFor(theme) : [];
  if (qs.length === 0) return null;

  function setVal(key, val) {
    setContext((p) => ({ ...p, [key]: val }));
  }

  return (
    <div className="mt-6 space-y-4 rounded-xl border border-dashed border-border bg-secondary/40 p-4">
      {qs.map((q) => (
        <div key={q.key}>
          {q.type === "buttons" ? (
            <>
              <label className="text-sm font-medium text-foreground">
                {q.label}
                {q.required ? <span className="text-primary"> *</span> : null}
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                {q.options.map((opt) => {
                  const active = context[q.key] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setVal(q.key, opt)}
                      className={
                        "rounded-xl border px-4 py-2 text-sm font-medium transition " +
                        (active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-secondary text-foreground hover:border-accent")
                      }
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <label className="block">
              <span className="text-sm font-medium text-foreground">
                {q.label}
                {q.required ? <span className="text-primary"> *</span> : null}
              </span>
              <input
                type="text"
                value={context[q.key] || ""}
                onChange={(e) => setVal(q.key, e.target.value)}
                className="mt-3 w-full rounded-xl border border-input bg-secondary px-4 py-3 text-[15px] text-foreground outline-none focus:border-primary"
              />
            </label>
          )}
        </div>
      ))}
    </div>
  );
}