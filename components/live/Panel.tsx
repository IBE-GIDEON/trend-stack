import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  title,
  live = false,
  aside,
  children,
  className,
}: {
  title: string;
  live?: boolean;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col border border-fog bg-charcoal/30 rounded", className)}>
      <header className="flex items-center justify-between border-b border-fog/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-sm select-none">📋</span>
          <h3 className="font-semibold text-[13px] text-soft">{title}</h3>
          {live && (
            <span className="inline-flex items-center gap-1 rounded bg-up/10 px-1.5 py-px text-[9px] text-up font-semibold">
              <span className="h-1 w-1 rounded-full bg-up animate-pulse-dot" />
              Live
            </span>
          )}
        </div>
        {aside}
      </header>
      <div className="flex-1 overflow-x-auto">{children}</div>
    </div>
  );
}
