import React from "react";

const LINKS = [
  { label: "Empathy Global", href: "https://empathy.global" },
  { label: "Distinction", href: "https://distinguishes.me" },
  { label: "Empathy Curriculum", href: "https://empathy.kids" },
  { label: "About this app", href: "/overview.html" },
];

export default function SiteFooter() {
  return (
    <footer className="no-print mt-12 border-t border-border px-5 py-6">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium text-muted-foreground">Part of Empathy Global</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}