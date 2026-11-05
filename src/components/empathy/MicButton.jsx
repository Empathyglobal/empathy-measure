import React, { useEffect, useRef, useState } from "react";
import { Mic } from "lucide-react";

const SR =
  typeof window !== "undefined"
    ? Reflect.get(window, "SpeechRecognition") || Reflect.get(window, "webkitSpeechRecognition")
    : null;

export default function MicButton({ draft, setDraft, langTag }) {
  const [listening, setListening] = useState(false);
  const recRef = useRef(null);
  const baseRef = useRef("");
  const wantRef = useRef(false);

  useEffect(() => {
    return () => {
      wantRef.current = false;
      if (recRef.current) {
        try {
          recRef.current.stop();
        } catch (e) {}
        recRef.current = null;
      }
    };
  }, []);

  if (!SR) return null;

  function stop() {
    wantRef.current = false;
    if (recRef.current) {
      try {
        recRef.current.stop();
      } catch (e) {}
      recRef.current = null;
    }
    setListening(false);
  }

  function start() {
    baseRef.current = draft || "";
    const rec = new SR();
    rec.lang = langTag || "en-US";
    rec.interimResults = true;
    rec.continuous = true;
    rec.onresult = (e) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) {
        text += e.results[i][0].transcript;
      }
      const sep = baseRef.current && !baseRef.current.endsWith(" ") ? " " : "";
      setDraft(baseRef.current + sep + text);
    };
    rec.onend = () => {
      if (wantRef.current) {
        // The recogniser ended on its own while the person still wants to
        // listen. Restart it so a longer spoken answer with pauses keeps going.
        try {
          rec.start();
        } catch (e) {}
      } else {
        recRef.current = null;
        setListening(false);
      }
    };
    rec.onerror = () => {
      wantRef.current = false;
      recRef.current = null;
      setListening(false);
    };
    recRef.current = rec;
    wantRef.current = true;
    try {
      rec.start();
      setListening(true);
    } catch (e) {
      wantRef.current = false;
      setListening(false);
    }
  }

  function toggle() {
    if (listening) stop();
    else start();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Speak your answer"
      className={
        "inline-flex shrink-0 items-center justify-center rounded-xl border px-4 py-3 transition " +
        (listening
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-secondary text-foreground hover:border-accent")
      }
    >
      <Mic className="h-5 w-5" />
    </button>
  );
}