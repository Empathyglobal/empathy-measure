import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  SAMPLE_REPORTS,
  SAMPLE_CATEGORIES,
  WHY_IT_MATTERS,
  radarData,
  clampScore,
  SCORE_OUT_OF,
} from "@/components/cookie/cookie";
import SkillRadar from "@/components/empathy/SkillRadar";
import Footer from "@/components/empathy/Footer";

export default function Samples() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...SAMPLE_CATEGORIES];
  const shown =
    filter === "All"
      ? SAMPLE_REPORTS
      : SAMPLE_REPORTS.filter((s) => s.category === filter);

  return (
    <div className="mx-auto max-w-xl px-5 pb-24 pt-10">
      <h1 className="text-3xl font-semibold text-foreground">Sample results</h1>
      <p className="body-text mt-4">
        These are written examples, not real people. Each one starts with the sentence that mattered, taken from the answers, and the one small thing that person was given to practise.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {cats.map((c) => {
          const active = filter === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={
                "rounded-xl border px-4 py-2 text-sm font-medium transition " +
                (active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-foreground hover:border-accent")
              }
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-8">
        {shown.map((sample) => {
          const lowest = sample.skills
            .slice()
            .sort((a, b) => clampScore(a.score) - clampScore(b.score))[0];
          return (
          <article
            key={sample.id}
            className="lift-card rounded-2xl border border-border bg-card p-6"
          >
            {lowest && (
              <div>
                <p className="text-lg leading-snug text-foreground">{lowest.evidence}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">and one thing to practise</span> {lowest.growth}
                </p>
              </div>
            )}
            <p className="mt-4 text-xs font-medium uppercase tracking-widest text-primary">
              {sample.who}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">
              {sample.shape}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Composite score: {clampScore(sample.composite)} out of {SCORE_OUT_OF}
            </p>

            <div className="mt-4">
              <SkillRadar data={radarData(sample)} />
            </div>

            <div className="mt-4 space-y-4">
              {sample.skills.map((s) => (
                <div key={s.key} className="border-t border-border pt-3">
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold text-foreground">{s.label}</p>
                    <p className="text-lg font-semibold text-primary">
                      {clampScore(s.score)}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-foreground">{s.evidence}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.meaning}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.growth}</p>
                </div>
              ))}
            </div>

            {Array.isArray(sample.needs_detected) && sample.needs_detected.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {sample.needs_detected.map((n, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-accent bg-accent px-3 py-1 text-sm font-medium text-accent-foreground"
                  >
                    {n}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-4 text-sm text-foreground">
              <span className="font-semibold text-foreground">Next skill to build: </span>
              {sample.growth_edge}
            </p>
          </article>
          );
        })}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground">Why this matters</h2>
        <div className="mt-4 space-y-5">
          {WHY_IT_MATTERS.map((item, i) => (
            <div key={i}>
              <p className="text-[15px] font-semibold text-foreground">{item.title}</p>
              <p className="body-text mt-1">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Link
        to="/"
        className="no-print mt-10 inline-block rounded-xl border border-border bg-card px-6 py-4 text-base font-semibold text-foreground transition hover:bg-secondary"
      >
        Back to the start
      </Link>

      <Footer />
    </div>
  );
}