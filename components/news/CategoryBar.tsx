"use client";

import { CATEGORIES } from "@/data/categories";
import type { CategorySlug } from "@/data/types";
import { cn } from "@/lib/utils";

export type CategoryFilter = CategorySlug | "all";

/**
 * Horizontal category rail. The full 14-beat taxonomy plus an "All" reset.
 * Scrolls horizontally on narrow viewports, wraps on wide ones. Controlled —
 * the active beat is owned by the grid so selection can filter in place.
 */
export function CategoryBar({
  active,
  onSelect,
}: {
  active: CategoryFilter;
  onSelect: (c: CategoryFilter) => void;
}) {
  const chip = (key: CategoryFilter, code: string, label: string) => {
    const isActive = active === key;
    return (
      <button
        key={key}
        type="button"
        onClick={() => onSelect(key)}
        aria-pressed={isActive}
        className={cn(
          "group flex shrink-0 items-center gap-1.5 border px-3 py-2 font-mono text-[11px] uppercase tracking-label transition-all duration-300 ease-apple",
          isActive
            ? "border-accent/60 bg-accent/10 text-soft"
            : "border-fog bg-charcoal/40 text-muted hover:border-line hover:text-mist",
        )}
      >
        <span className={cn(isActive ? "text-accent" : "text-ash group-hover:text-accent")}>
          {code}
        </span>
        {label}
      </button>
    );
  };

  return (
    <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:flex-wrap lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {chip("all", "★", "All")}
      {CATEGORIES.map((c) => chip(c.slug, c.code, c.label))}
    </div>
  );
}
