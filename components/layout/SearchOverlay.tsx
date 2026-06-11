"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "@/components/ui/icons";
import { CategoryBadge } from "@/components/ui/Badge";
import { ARTICLES } from "@/data/articles";
import { getCategory } from "@/data/categories";
import { EASE_APPLE } from "@/lib/motion";

/**
 * Command-palette search. Opens from the nav button or ⌘K, filters the live
 * article set by headline / excerpt / category, traps focus on the input, and
 * closes on Escape or backdrop click.
 */
export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      // Focus on the next frame so the element is mounted and animatable.
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return ARTICLES.slice(0, 6);
    return ARTICLES.filter((a) => {
      const cat = getCategory(a.category).label.toLowerCase();
      return (
        a.title.toLowerCase().includes(term) ||
        a.excerpt.toLowerCase().includes(term) ||
        cat.includes(term)
      );
    }).slice(0, 8);
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="surface-dark fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_APPLE }}
        >
          <button
            aria-label="Close search"
            onClick={onClose}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search Trend Stack"
            initial={{ opacity: 0, y: -12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.32, ease: EASE_APPLE }}
            className="relative w-full max-w-xl border border-line bg-charcoal shadow-elevate rounded-xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4">
              <SearchIcon className="h-[18px] w-[18px] text-muted" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search intelligence, markets, research…"
                className="h-14 flex-1 bg-transparent text-[15px] text-soft placeholder:text-ash focus:outline-none"
              />
            </div>

            <div className="max-h-[46vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center font-mono text-xs text-ash">
                  No stories match “{q}”.
                </p>
              ) : (
                results.map((a) => (
                  <a
                    key={a.id}
                    href={`#${a.slug}`}
                    onClick={onClose}
                    className="group flex items-center gap-4 px-3 py-3 transition-colors duration-200 hover:bg-steel"
                  >
                    <span className="font-mono text-[10px] text-accent">
                      {getCategory(a.category).code}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-mist transition-colors group-hover:text-soft">
                        {a.title}
                      </span>
                      <CategoryBadge category={a.category} className="mt-1" />
                    </span>
                    <span className="font-mono text-[10px] text-ash">{a.readingMinutes}m</span>
                  </a>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
