import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  listLocalResults,
  deleteLocalResult,
  clearLocalResults,
  localResultLabel,
} from "@/components/cookie/cookie";
import Footer from "@/components/empathy/Footer";

export default function MyResultsPage() {
  const [list, setList] = useState(() => listLocalResults());
  const [confirmAll, setConfirmAll] = useState(false);

  function refresh() {
    setList(listLocalResults());
  }
  function remove(id) {
    deleteLocalResult(id);
    refresh();
  }
  function removeAll() {
    clearLocalResults();
    setConfirmAll(false);
    refresh();
  }

  return (
    <div className="mx-auto max-w-xl px-5 pb-20 pt-10">
      <h1 className="text-3xl font-semibold text-foreground">My results</h1>

      {list.length === 0 ? (
        <p className="body-text mt-6">No results are saved on this device yet.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {list.map((entry) => {
            const label = localResultLabel(entry);
            return (
              <div
                key={entry.id}
                className="lift-card flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4"
              >
                <Link to={`/result/${entry.id}`} className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold text-foreground">
                    {label.who}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">{label.detail}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {entry.saved_at ? new Date(entry.saved_at).toLocaleString() : ""}
                  </p>
                </Link>
                <button
                  type="button"
                  onClick={() => remove(entry.id)}
                  className="btn-lift shrink-0 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}

      {list.length > 0 && (
        <div className="mt-8">
          {!confirmAll ? (
            <button
              type="button"
              onClick={() => setConfirmAll(true)}
              className="btn-lift rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              Remove all
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-foreground">
                Remove every saved result?
              </span>
              <button
                type="button"
                onClick={removeAll}
                className="btn-lift rounded-xl bg-destructive px-5 py-3 text-sm font-semibold text-destructive-foreground transition hover:bg-destructive/90"
              >
                Yes, remove all
              </button>
              <button
                type="button"
                onClick={() => setConfirmAll(false)}
                className="btn-lift rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      <p className="body-text mt-10">
        These stay in this browser on this device only. They are never sent to us. Clearing your browsing data clears them.
      </p>

      <Footer />
    </div>
  );
}