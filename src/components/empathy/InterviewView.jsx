import React from "react";
import { INTERVIEWER_NAME, languageFor, MAX_ANSWER_CHARS } from "@/components/cookie/cookie";
import Footer from "@/components/empathy/Footer";
import MicButton from "@/components/empathy/MicButton";
import SpeakerButton from "@/components/empathy/SpeakerButton";

const FALLBACK = {
  opening_word: "Before we begin",
  question_word: "Question",
  of_word: "of",
  deeper: "A little deeper",
  placeholder: "Write your answer in your own words...",
  answer_btn: "Answer",
  thinking: "Cookie is reading your answer. Real reading takes a moment.",
  correction_line:
    "If a question assumes something untrue about your life, just say so and it will change, and it will never count against you.",
};

export default function InterviewView({
  firstName,
  status,
  current,
  currentMainN,
  totalQuestions,
  answered,
  loading,
  error,
  draft,
  setDraft,
  onAnswer,
  onRetry,
  languageLabel,
  iui,
}) {
  const i = { ...FALLBACK, ...((iui) || {}) };
  const action = current ? current.action : null;
  const isOpening = action === "opening";
  const isFollowup = action === "followup";
  const showBox = status === "asking" && !loading && !error;
  const langTag = languageFor(languageLabel).tag;
  const progress = isOpening
    ? 0
    : Math.min(100, Math.round(((answered || 0) / totalQuestions) * 100));

  return (
    <div className="mx-auto max-w-xl px-5 pb-20 pt-8">
      {firstName ? (
        <p className="mb-4 text-lg font-semibold text-foreground">Hi, {firstName}.</p>
      ) : null}

      {!isOpening && (
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          {i.question_word} {currentMainN} {i.of_word} {totalQuestions}
        </p>
      )}

      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-muted-foreground/20">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: progress + "%" }}
        />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              C
            </span>
            <span className="text-sm font-semibold text-foreground">{INTERVIEWER_NAME}</span>
          </div>
          {current && current.text && <SpeakerButton text={current.text} langTag={langTag} />}
        </div>

        <p className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          {isOpening ? i.opening_word : `${i.question_word} ${currentMainN}`}
        </p>

        {isFollowup && status === "asking" && (
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-primary">
            {i.deeper}
          </p>
        )}

        <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed text-foreground">
          {current ? current.text : null}
        </p>
      </div>

      {status === "closing" && (
        <LoadingLine text="Cookie is reading everything as a whole." />
      )}

      {status === "reporting" && (
        <LoadingLine text="Cookie is reading everything as a whole." />
      )}

      {loading && status === "asking" && <LoadingLine text={i.thinking} />}

      {showBox && (
        <div className="mt-6">
          <div className="flex gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={5}
              maxLength={MAX_ANSWER_CHARS}
              placeholder={i.placeholder}
              className="flex-1 resize-y rounded-xl border border-input bg-secondary px-4 py-3 text-[15px] leading-relaxed text-foreground outline-none focus:border-primary"
            />
            <MicButton draft={draft} setDraft={setDraft} langTag={langTag} />
          </div>
          {draft.length > MAX_ANSWER_CHARS * 0.9 && (
            <p className="mt-1 text-right text-xs text-muted-foreground">
              {MAX_ANSWER_CHARS - draft.length} characters left
            </p>
          )}
          <p className="mt-2 text-xs text-muted-foreground">{i.correction_line}</p>
          <button
            type="button"
            disabled={!draft.trim()}
            onClick={onAnswer}
            className="mt-3 w-full rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground transition enabled:hover:bg-primary/90 disabled:opacity-40"
          >
            {i.answer_btn}
          </button>
        </div>
      )}

      {error && (
        <div className="mt-6">
          <p className="text-sm font-medium text-foreground">
            That did not go through. Try again.
          </p>
          <textarea
            value={draft}
            readOnly
            rows={5}
            className="mt-3 w-full resize-none rounded-xl border border-input bg-secondary px-4 py-3 text-[15px] leading-relaxed text-muted-foreground outline-none"
          />
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 rounded-xl border border-primary bg-card px-6 py-3 text-sm font-semibold text-primary transition hover:bg-accent"
          >
            Try again
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

function LoadingLine({ text }) {
  return (
    <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-primary" />
      <span>{text}</span>
    </div>
  );
}