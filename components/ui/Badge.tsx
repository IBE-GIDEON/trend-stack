import { cn } from "@/lib/utils";
import { getCategory } from "@/data/categories";
import type { CategorySlug } from "@/data/types";

/** Mono category chip — terminal-style, sharp, uppercase tracking. */
export function CategoryBadge({
  category,
  className,
}: {
  category: CategorySlug;
  className?: string;
}) {
  const c = getCategory(category);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-label text-mist",
        className,
      )}
    >
      <span className="text-accent">{c.code}</span>
      <span className="text-muted">{c.label}</span>
    </span>
  );
}

/**
 * "AI Insights" marker. Deliberately restrained — a hairline outline and a
 * single cyan pixel, not a loud pill.
 */
export function AiInsightBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-fog/80 bg-cyan/5 px-2 py-[3px] font-mono text-[9px] uppercase tracking-[0.16em] text-cyan/90",
        className,
      )}
    >
      <span className="h-1 w-1 bg-cyan shadow-[0_0_6px_1px_rgba(52,214,232,0.8)]" />
      AI Insights
    </span>
  );
}

/** Breaking / live pulse used in the top bar and trending rail. */
export function LiveDot({ className, label }: { className?: string; label?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-breaking opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-breaking" />
      </span>
      {label ? (
        <span className="font-mono text-[10px] uppercase tracking-label text-breaking">{label}</span>
      ) : null}
    </span>
  );
}
