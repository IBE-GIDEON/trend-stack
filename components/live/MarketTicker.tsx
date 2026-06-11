"use client";

import { useReducedMotion } from "framer-motion";
import { TICKER, INDICES } from "@/data/live";
import { formatPrice, cn } from "@/lib/utils";
import { LiveDot } from "@/components/ui/Badge";
import type { TickerItem } from "@/data/types";

function Tape({ item, index }: { item: TickerItem; index?: boolean }) {
  const up = item.changePct >= 0;
  return (
    <div className="flex items-center gap-2.5 whitespace-nowrap border-r border-fog/40 px-5">
      <span className={cn("font-mono text-[12px] font-semibold", index ? "text-accent" : "text-soft")}>
        {item.symbol}
      </span>
      <span className="font-mono text-[12px] text-muted">{formatPrice(item.price)}</span>
      <span className={cn("flex items-center gap-0.5 font-mono text-[11px]", up ? "text-up" : "text-down")}>
        <span className="text-[8px]">{up ? "▲" : "▼"}</span>
        {Math.abs(item.changePct).toFixed(2)}%
      </span>
    </div>
  );
}

/**
 * Bloomberg-style market tape. A pinned "Live Markets" flag, then an infinite
 * marquee (duplicated track for a seamless loop) that pauses on hover. Under
 * reduced motion it becomes a quietly scrollable strip instead of an auto-loop.
 */
export function MarketTicker() {
  const reduce = useReducedMotion();
  const sequence = [...INDICES.map((i) => ({ i, index: true })), ...TICKER.map((i) => ({ i, index: false }))];

  return (
    <div className="group relative flex items-stretch border-y border-fog bg-void/70 backdrop-blur">
      {/* pinned flag */}
      <div className="z-20 flex shrink-0 items-center gap-2 border-r border-fog bg-graphite px-4">
        <LiveDot />
        <span className="hidden font-mono text-[10px] uppercase tracking-label text-mist sm:inline">
          Live Markets
        </span>
      </div>

      {/* tape */}
      <div className={cn("relative flex-1 overflow-hidden", reduce && "overflow-x-auto")}>
        <div
          className={cn(
            "flex w-max items-center py-2.5",
            !reduce && "animate-ticker group-hover:[animation-play-state:paused]",
          )}
          style={{ ["--ticker-duration" as string]: "55s" }}
        >
          {sequence.map((s, idx) => (
            <Tape key={`a-${idx}`} item={s.i} index={s.index} />
          ))}
          {/* duplicate for seamless wrap (hidden from AT) */}
          {!reduce &&
            sequence.map((s, idx) => (
              <Tape key={`b-${idx}`} item={s.i} index={s.index} />
            ))}
        </div>

        {/* edge fades mask the loop seam */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-void to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-void to-transparent" />
      </div>
    </div>
  );
}
