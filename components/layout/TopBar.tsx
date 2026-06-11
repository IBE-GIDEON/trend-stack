"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LiveDot } from "@/components/ui/Badge";
import { EASE_APPLE } from "@/lib/motion";
import { TRENDING_ARTICLES } from "@/data/articles";

/**
 * Thin terminal strip above the nav: a LIVE marker with a slowly rotating
 * breaking headline on the left, edition metadata on the right. Mono
 * throughout — this is the "Bloomberg tape" register of the page.
 */
export function TopBar() {
  const reduce = useReducedMotion();
  const headlines = TRENDING_ARTICLES.slice(0, 3);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || headlines.length <= 1) return;
    const id = setInterval(() => setI((p) => (p + 1) % headlines.length), 5000);
    return () => clearInterval(id);
  }, [reduce, headlines.length]);

  return (
    <div className="surface-dark relative z-50 hidden border-b border-fog/70 bg-ink/80 backdrop-blur md:block">
      <div className="mx-auto flex h-9 max-w-editorial items-center justify-between gap-6 px-6 lg:px-10">
        <div className="flex min-w-0 items-center gap-4">
          <LiveDot label="Breaking" />
          <span className="h-3 w-px bg-fog" />
          <div className="relative h-4 min-w-0 flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.a
                key={i}
                href="#lead"
                className="block truncate font-mono text-[11px] text-mist transition-colors hover:text-soft"
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: 0.5, ease: EASE_APPLE }}
              >
                {headlines[i]?.title}
              </motion.a>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4 font-mono text-[10px] uppercase tracking-label text-ash">
          <span className="hidden lg:inline">Global Edition</span>
          <span className="hidden h-3 w-px bg-fog lg:inline-block" />
          <span>Mon 09 Jun 2026</span>
          <span className="h-3 w-px bg-fog" />
          <span className="text-muted">15:00 UTC</span>
        </div>
      </div>
    </div>
  );
}
