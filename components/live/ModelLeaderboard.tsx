import { Panel } from "./Panel";
import { MODEL_LEADERBOARD } from "@/data/live";
import { cn } from "@/lib/utils";

export function ModelLeaderboard({ className }: { className?: string }) {
  const max = Math.max(...MODEL_LEADERBOARD.map((m) => m.score));
  return (
    <Panel
      title="AI Model Leaderboard"
      live
      aside={<span className="font-mono text-[10px] text-ash">Reasoning · 7d</span>}
      className={className}
    >
      <table className="notion-table">
        <thead>
          <tr>
            <th className="w-12 text-center">Rank</th>
            <th>Model</th>
            <th>Score</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {MODEL_LEADERBOARD.map((m) => {
            const up = m.delta >= 0;
            return (
              <tr key={m.rank}>
                <td className="text-center font-mono text-[12px] text-ash">{m.rank}</td>
                <td>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-soft">{m.model}</p>
                    <span className="font-mono text-[10px] text-ash">{m.org}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[12px] text-soft font-semibold">{m.score.toFixed(1)}</span>
                    <span className="hidden xs:block h-1.5 w-16 overflow-hidden bg-fog rounded-xs">
                      <span
                        className="block h-full bg-accent"
                        style={{ width: `${(m.score / max) * 100}%` }}
                      />
                    </span>
                  </div>
                </td>
                <td className={cn("font-mono text-[11px]", up ? "text-up" : "text-down")}>
                  {up ? "▲" : "▼"}{Math.abs(m.delta).toFixed(1)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Panel>
  );
}
