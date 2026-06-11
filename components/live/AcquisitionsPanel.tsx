import { Panel } from "./Panel";
import { ACQUISITIONS } from "@/data/live";
import { formatUSD } from "@/lib/utils";

export function AcquisitionsPanel({ className }: { className?: string }) {
  return (
    <Panel title="Acquisitions Desk" live className={className}>
      <table className="notion-table">
        <thead>
          <tr>
            <th>Target</th>
            <th>Acquirer</th>
            <th className="text-right">Value</th>
          </tr>
        </thead>
        <tbody>
          {ACQUISITIONS.map((a) => (
            <tr key={a.target}>
              <td className="font-medium text-soft">{a.target}</td>
              <td className="text-muted text-[12px]">by {a.acquirer}</td>
              <td className="font-mono text-[12px] text-right text-soft">
                {formatUSD(a.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}
