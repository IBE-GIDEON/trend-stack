"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { EASE_APPLE } from "@/lib/motion";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setState("error");
      return;
    }
    setState("done");
  }

  return (
    <section id="newsletter" className="relative bg-ink py-12 border-t border-fog/60">
      <div className="mx-auto max-w-editorial px-6 lg:px-10">
        {/* Notion Callout Block for Subscription */}
        <div className="notion-callout bg-charcoal/30 flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 rounded border border-fog/80">
          <div className="flex items-start gap-4 max-w-xl">
            <span className="text-3xl select-none">💌</span>
            <div className="space-y-1">
              <h3 className="font-semibold text-soft text-base">The Trend Stack Briefing</h3>
              <p className="text-muted leading-relaxed text-[13px]">
                One precise intelligence dispatch each morning — key AI developments, VC funding rounds, and market metrics, decoded by our editors. Join 1.4M readers. Free. No noise.
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0 min-w-[280px] sm:min-w-[340px]">
            {state === "done" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_APPLE }}
                className="rounded border border-up/30 bg-up/5 p-4 text-center"
              >
                <p className="text-[14px] font-medium text-up">🎉 You&apos;re subscribed!</p>
                <p className="mt-1 text-[11px] text-muted">
                  Tomorrow&apos;s briefing is already being compiled.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-2" noValidate>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state === "error") setState("idle");
                    }}
                    placeholder="you@company.com"
                    aria-label="Email address"
                    aria-invalid={state === "error"}
                    className="h-9 flex-1 border border-fog bg-charcoal/90 px-3 text-[13px] rounded-sm text-soft placeholder:text-ash transition-colors focus:border-accent/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="group inline-flex h-9 items-center justify-center gap-1 bg-accent text-accent-ink px-4 text-[12px] font-semibold rounded-sm transition-all hover:bg-accent/90"
                  >
                    Subscribe
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </button>
                </div>
                <p
                  className={`min-h-4 text-left font-mono text-[10px] transition-colors ${
                    state === "error" ? "text-breaking" : "text-ash"
                  }`}
                >
                  {state === "error"
                    ? "Enter a valid email address."
                    : "No spam. Unsubscribe anytime."}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
