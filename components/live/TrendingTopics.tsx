import { Panel } from "./Panel";
import { TRENDING_TOPICS } from "@/data/live";
import { compactNumber } from "@/lib/utils";
import { TrendUpIcon } from "@/components/ui/icons";

export function TrendingTopics({ className }: { className?: string }) {
  const max = Math.max(...TRENDING_TOPICS.map((t) => t.posts));
  return (
    <Panel
      title="Trending Topics"
      live
      aside={<span className="font-mono text-[10px] text-ash">1h</span>}
      className={className}
    >
      <table className="notion-table">
        <thead>
          <tr>
            <th className="w-12 text-center">Rank</th>
            <th>Topic</th>
            <th>Volume</th>
            <th className="text-right">Momentum</th>
          </tr>
        </thead>
        <tbody>
          {TRENDING_TOPICS.map((t) => (
            <tr key={t.rank}>
              <td className="text-center font-mono text-[12px] text-ash">{t.rank}</td>
              <td className="font-medium text-soft">{t.label}</td>
              <td>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-ash">{compactNumber(t.posts)} posts</span>
                  <span className="hidden xs:block h-1 w-16 overflow-hidden bg-fog rounded-xs">
                    <span
                      className="block h-full bg-accent"
                      style={{ width: `${(t.posts / max) * 100}%` }}
                    />
                  </span>
                </div>
              </td>
              <td className="font-mono text-[11px] text-up text-right">
                <span className="inline-flex items-center gap-0.5">
                  <TrendUpIcon className="h-3 w-3 inline" />
                  +{t.changePct}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}
