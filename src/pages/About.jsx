import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/empathy/Footer";

const ERIC_INSTAGRAM_URL = "ERIC_INSTAGRAM_URL";
const hasInstagram =
  !!ERIC_INSTAGRAM_URL &&
  ERIC_INSTAGRAM_URL !== "ERIC_INSTAGRAM_URL" &&
  /^https?:\/\//.test(ERIC_INSTAGRAM_URL);

const P1 =
  "Eric Gonzalez-Payne has spent more than twenty years in education, building schools, curriculum and learning tools across Asia and beyond.";
const P2 =
  "He founded Empathy School in Bali in 2020, a school built on the idea that emotional skill can be taught, practised and measured, and wrote the Empathy Kids curriculum for early years, now licensed to preschools and centres. His teaching materials are free to anyone at humanity.education.";
const P3 =
  "As a university consultant he has helped 440 students win places at top universities worldwide. None of that happened through tricks. It happened through understanding people: their lives, their families, their fears, and the path that actually fits them. Empathy, used carefully, turns out to be the most practical skill there is.";
const P4 =
  "He holds a master's degree in education from Harvard. He works between Singapore and Bali.";
const P5 =
  "The Empathy Measure is where all of it meets. Twenty years of teaching turned into ten questions and a picture of the seven skills that decide how life with other people actually goes.";

const LINKS = [
  { label: "Empathy School", href: "https://empathy.school" },
  { label: "Empathy Kids", href: "https://empathy.kids" },
  { label: "Free curriculum", href: "https://humanity.education" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/eric-gp/" },
  ...(hasInstagram ? [{ label: "Instagram", href: ERIC_INSTAGRAM_URL }] : []),
];

export default function About() {
  useEffect(() => {
    document.title = "Eric Gonzalez-Payne, founder of The Empathy Measure";
    return () => {
      document.title = "The Empathy Measure";
    };
  }, []);

  const appUrl = typeof window !== "undefined" ? window.location.origin : "";
  const sameAs = [
    "https://www.linkedin.com/in/eric-gp/",
    "https://empathy.school",
    "https://empathy.kids",
    "https://humanity.education",
    ...(hasInstagram ? [ERIC_INSTAGRAM_URL] : []),
  ];
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Eric Gonzalez-Payne",
    jobTitle: "Educator and founder",
    alumniOf: "Harvard Graduate School of Education",
    url: appUrl,
    sameAs,
  };

  return (
    <div className="mx-auto max-w-xl px-5 pb-24 pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />

      <h1 className="text-3xl font-semibold text-foreground">Eric Gonzalez-Payne</h1>

      <div className="lift-card mt-8 flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border border-dashed border-border bg-secondary text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Photo</span>
        </div>
        <div className="mt-6 w-full space-y-4 text-left">
          <p className="body-text">{P1}</p>
          <p className="body-text">{P2}</p>
          <p className="body-text">{P3}</p>
          <p className="body-text">{P4}</p>
          <p className="body-text">{P5}</p>
        </div>
      </div>

      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        {LINKS.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

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