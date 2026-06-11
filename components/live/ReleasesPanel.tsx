import { Panel } from "./Panel";
import { GITHUB_RELEASES } from "@/data/live";
import { compactNumber } from "@/lib/utils";
import { ArrowUpRightIcon } from "@/components/ui/icons";

export function ReleasesPanel({ className }: { className?: string }) {
  return (
    <Panel
      title="Latest GitHub Releases"
      live
      aside={<span className="font-mono text-[10px] text-ash">Open Source</span>}
      className={className}
    >
      <table className="notion-table">
        <thead>
          <tr>
            <th>Repository</th>
            <th>Version</th>
            <th className="text-right">Stars</th>
          </tr>
        </thead>
        <tbody>
          {GITHUB_RELEASES.map((r) => (
            <tr key={r.repo}>
              <td className="font-mono text-[12px] text-accent font-medium">
                <a href="#news" className="hover:underline flex items-center gap-1">
                  {r.repo}
                  <ArrowUpRightIcon className="h-3 w-3 inline text-ash" />
                </a>
              </td>
              <td>
                <span className="rounded bg-steel px-1.5 py-0.5 font-mono text-[10px] text-mist border border-fog/50">
                  {r.version}
                </span>
              </td>
              <td className="font-mono text-[12px] text-right text-ash">
                ★ {compactNumber(r.stars)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}
