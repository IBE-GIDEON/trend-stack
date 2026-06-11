import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  /** Mono index like "02" shown before the kicker. */
  index?: string;
  kicker: string;
  title: string;
  action?: { label: string; href: string };
  className?: string;
}

/**
 * Editorial section header: a mono kicker with a hairline rule, a large
 * display title, and an optional inline action. Used to open every section so
 * the page reads like a designed publication, not a stack of widgets.
 */
export function SectionHeader({ index, kicker, title, action, className }: SectionHeaderProps) {
  return (
    <Reveal className={cn("flex items-end justify-between gap-6", className)}>
      <div>
        <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-muted">
          {index ? <span className="text-accent">{index}</span> : null}
          <span className="h-px w-8 bg-line" />
          <span>{kicker}</span>
        </div>
        <h2 className="max-w-2xl text-display-md font-semibold text-soft">{title}</h2>
      </div>

      {action ? (
        <a
          href={action.href}
          className="group hidden shrink-0 items-center gap-2 border-b border-transparent pb-1 font-mono text-[11px] uppercase tracking-label text-muted transition-colors duration-300 ease-apple hover:border-accent hover:text-soft sm:inline-flex"
        >
          {action.label}
          <span className="transition-transform duration-300 ease-apple group-hover:translate-x-1">
            →
          </span>
        </a>
      ) : null}
    </Reveal>
  );
}
