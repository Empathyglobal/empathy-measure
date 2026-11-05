import React, { useEffect, useState } from "react";
import { Volume2 } from "lucide-react";

const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

export default function SpeakerButton({ text, langTag }) {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (synth) {
      synth.cancel();
      setSpeaking(false);
    }
  }, [text]);

  if (!synth) return null;

  function toggle() {
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langTag || "en-US";
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    synth.speak(u);
    setSpeaking(true);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Read the question aloud"
      className={
        "inline-flex shrink-0 items-center justify-center rounded-xl border px-3 py-2 transition " +
        (speaking
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-secondary text-foreground hover:border-accent")
      }
    >
      <Volume2 className="h-5 w-5" />
    </button>
  );
}