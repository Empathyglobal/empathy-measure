import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X } from "lucide-react";

const ITEMS = [
  { label: "Start", to: "/" },
  { label: "How it works", to: "/how-it-works" },
  { label: "About", to: "/about" },
  { label: "Sample results", to: "/samples" },
  { label: "My results", to: "/results" },
  { label: "The research", to: "/research" },
  { label: "For schools", to: "/schools" },
  { label: "Privacy", to: "/privacy" },
];

export default function Menu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  function isActive(to) {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  }

  return (
    <header className="no-print border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="text-sm font-semibold text-foreground sm:text-base"
        >
          The Empathy Measure
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {ITEMS.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={
                  "rounded-lg px-3 py-2 text-sm font-medium transition " +
                  (active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center justify-center rounded-lg border border-border p-2 text-foreground sm:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background sm:hidden">
          <div className="mx-auto max-w-5xl px-5 py-2">
            {ITEMS.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={
                    "block rounded-lg px-3 py-3 text-sm font-medium transition " +
                    (active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary")
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}