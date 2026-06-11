import { Panel } from "./Panel";
import { FUNDING_ROUNDS } from "@/data/live";
import { formatUSD } from "@/lib/utils";

export function FundingTracker({ className }: { className?: string }) {
  const total = FUNDING_ROUNDS.reduce((s, r) => s + r.amount, 0);

  const getStageStyle = (stage: string) => {
    switch (stage) {
      case "Series A":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/30";
      case "Series B":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/30";
      case "Seed+":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/30";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border border-gray-200/50 dark:border-gray-800/30";
    }
  };

  return (
    <Panel
      title="AI Funding Tracker"
      live
      aside={<span className="font-mono text-[11px] font-semibold text-up">{formatUSD(total)}</span>}
      className={className}
    >
      <table className="notion-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Stage</th>
            <th>Sector</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {FUNDING_ROUNDS.map((r) => (
            <tr key={r.company}>
              <td className="font-medium text-soft">{r.company}</td>
              <td>
                <span className={`rounded-sm px-2 py-0.5 text-[10px] font-semibold select-none ${getStageStyle(r.stage)}`}>
                  {r.stage}
                </span>
              </td>
              <td className="text-muted text-[12px]">{r.sector}</td>
              <td className="font-mono text-[12px] font-semibold text-right text-soft">
                {formatUSD(r.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}
