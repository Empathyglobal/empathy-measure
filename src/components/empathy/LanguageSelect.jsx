import React from "react";
import { LANGUAGES } from "@/components/cookie/cookie";

export default function LanguageSelect({ value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">
        Questions and your result in
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-input bg-secondary px-4 py-3 text-[15px] text-foreground outline-none focus:border-primary"
      >
        {LANGUAGES.map((l) => (
          <option key={l.tag} value={l.label}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}