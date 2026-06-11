"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CategoryBar, type CategoryFilter } from "./CategoryBar";
import { ArticleCard } from "./ArticleCard";
import { ARTICLES, GRID_ARTICLES } from "@/data/articles";
import { EASE_APPLE } from "@/lib/motion";

/**
 * The responsive editorial grid with in-place category filtering.
 *
 * "All" shows the non-lead stream; selecting a beat filters across the full
 * archive so prominent categories never come up empty. Cards re-flow with a
 * quick layout animation that collapses to a plain swap under reduced motion.
 */
export function NewsGrid() {
  const [active, setActive] = useState<CategoryFilter>("all");
  const reduce = useReducedMotion();

  const items = useMemo(
    () => (active === "all" ? GRID_ARTICLES : ARTICLES.filter((a) => a.category === active)),
    [active],
  );

  return (
    <div>
      <CategoryBar active={active} onSelect={setActive} />

      <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((a) => (
            <motion.div
              key={a.id}
              layout
              className="h-full"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
              transition={{ duration: 0.45, ease: EASE_APPLE }}
            >
              <ArticleCard article={a} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {items.length === 0 && (
        <p className="mt-10 border border-dashed border-fog py-16 text-center font-mono text-xs uppercase tracking-label text-ash">
          No stories in this beat yet
        </p>
      )}
    </div>
  );
}
