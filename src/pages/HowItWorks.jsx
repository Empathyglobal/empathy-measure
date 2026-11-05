import React from "react";
import { Link } from "react-router-dom";
import { SKILLS, CHILD_SKILLS, WHY_IT_MATTERS } from "@/components/cookie/cookie";
import Footer from "@/components/empathy/Footer";

const ADAPT_COPY =
  "Most measures ask everyone the same questions. This one does not. Every question is written after your last answer is read. Answer something well and the next question asks for more: something that costs you to admit, or a person who behaved badly whose side you still have to see. Answer thinly and it comes back simpler. Your score depends on how hard the questions got and how you handled them there, so a perfect answer to an easy question stays an easy answer.";
const NO_BOXES_COPY =
  "This design uses free-text answers rather than multiple choice. A model uses the previous answer to draft the next question. Neither format makes a response impossible to game, and free text does not by itself establish validity.";
const DO_WELL_COPY =
  "There are no right answers to guess. Honest beats impressive. An answer that admits a messy feeling scores better than a polished one. If an answer is too thin to read, Cookie will ask a little deeper. A weak answer still counts. An empty one does not.";
const SKILLS_LINE =
  "These skills draw on research into emotional granularity and on a four step practice of observation, feeling, need and request. Each is worth exploring on its own.";
const UNDER7_COPY =
  "A young child cannot read a scenario and write an answer, so under 7 the parent answers instead, describing real moments from the last few weeks. The questions ask what the child actually did, never for a rating or an opinion, and the prompt uses heuristic developmental assumptions for that age. These are not established age norms or validated comparisons. There are no topic choices in this version, because the questions follow the child's ordinary week.";

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-xl px-5 pb-24 pt-10">
      <h1 className="text-3xl font-semibold text-foreground">How it works</h1>

      <Section title="How the adaptive design works">
        <p className="body-text">{ADAPT_COPY}</p>
      </Section>

      <Section title="Why there are no boxes to tick">
        <p className="body-text">{NO_BOXES_COPY}</p>
      </Section>

      <Section title="How to do well">
        <p className="body-text">{DO_WELL_COPY}</p>
      </Section>

      <Section title="The seven skills">
        <ul className="space-y-4">
          {SKILLS.map((s) => (
            <li key={s.key}>
              <p className="text-[15px] font-semibold text-foreground">{s.label}</p>
              <p className="text-sm text-muted-foreground">{s.blurb}</p>
            </li>
          ))}
        </ul>
        <p className="body-text mt-6">{SKILLS_LINE}</p>
      </Section>

      <Section title="For children under 7">
        <p className="body-text">{UNDER7_COPY}</p>
        <ul className="mt-4 space-y-4">
          {CHILD_SKILLS.map((s) => (
            <li key={s.key}>
              <p className="text-[15px] font-semibold text-foreground">{s.label}</p>
              <p className="text-sm text-muted-foreground">{s.blurb}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Why this matters">
        <div className="space-y-5">
          {WHY_IT_MATTERS.map((item, i) => (
            <div key={i}>
              <p className="text-[15px] font-semibold text-foreground">{item.title}</p>
              <p className="body-text mt-1">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Link
        to="/"
        className="btn-lift btn-primary-lift mt-10 inline-block rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
      >
        Begin
      </Link>

      <Footer />
    </div>
  );
}

function Section({ title, children }) {
return (
  <section className="lift-card lift-hover mt-10 rounded-2xl border border-border bg-card p-6">
    <h2 className="mb-3 text-lg font-semibold text-foreground">{title}</h2>
    <div className="space-y-3 text-foreground">{children}</div>
  </section>
);
}