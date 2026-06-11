"use client";

import { useEffect, useState } from "react";
import { Panel } from "./Panel";
import { NEXT_EVENT } from "@/data/live";
import { ArrowUpRightIcon } from "@/components/ui/icons";

type Remaining = { d: number; h: number; m: number; s: number };

function remaining(target: number): Remaining {
  const t = Math.max(0, target - Date.now());
  return {
    d: Math.floor(t / 86_400_000),
    h: Math.floor(t / 3_600_000) % 24,
    m: Math.floor(t / 60_000) % 60,
    s: Math.floor(t / 1000) % 60,
  };
}

export function EventCountdown({ className }: { className?: string }) {
  const target = new Date(NEXT_EVENT.date).getTime();
  const [t, setT] = useState<Remaining | null>(null);

  useEffect(() => {
    setT(remaining(target));
    const id = setInterval(() => setT(remaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const Cell = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center border border-fog/60 bg-charcoal px-2 py-2 rounded-xs">
      <span className="font-mono text-lg font-semibold tabular-nums text-soft">
        {t ? String(value).padStart(2, "0") : "--"}
      </span>
      <span className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-ash">{label}</span>
    </div>
  );

  return (
    <Panel
      title="Event Countdown"
      live
      aside={<span className="font-mono text-[10px] text-ash">24 Jun</span>}
      className={className}
    >
      <div className="p-4">
        <p className="text-[13px] font-semibold leading-snug text-soft">{NEXT_EVENT.name}</p>
        <p className="mt-0.5 font-mono text-[10px] text-ash">
          📍 {NEXT_EVENT.location}
        </p>

        <div className="mt-4 grid grid-cols-4 gap-1.5">
          <Cell value={t?.d ?? 0} label="Days" />
          <Cell value={t?.h ?? 0} label="Hrs" />
          <Cell value={t?.m ?? 0} label="Min" />
          <Cell value={t?.s ?? 0} label="Sec" />
        </div>

        <a
          href="#newsletter"
          className="group mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-accent transition-colors hover:text-accent-bright"
        >
          Reserve a seat
          <ArrowUpRightIcon className="h-3 w-3 transition-transform duration-300 ease-apple group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </Panel>
  );
}
