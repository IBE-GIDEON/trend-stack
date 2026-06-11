import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ModelLeaderboard } from "./ModelLeaderboard";
import { FundingTracker } from "./FundingTracker";
import { EventCountdown } from "./EventCountdown";
import { AcquisitionsPanel } from "./AcquisitionsPanel";
import { ReleasesPanel } from "./ReleasesPanel";

/**
 * The live desk: model leaderboard, funding tracker, event countdown,
 * acquisitions and open-source releases — one instrument cluster of real-time
 * signals. Anchors the #live nav target.
 */
export function LiveSection() {
  return (
    <section id="live" className="relative border-t border-fog/60 bg-void py-20 lg:py-28">
      {/* faint key glow keeps the section from going flat */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto max-w-editorial px-6 lg:px-10">
        <SectionHeader
          index="03"
          kicker="Live Desk"
          title="Real-time technology intelligence"
          action={{ label: "Open terminal", href: "#newsletter" }}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <ModelLeaderboard className="h-full" />
          </Reveal>
          <Reveal delay={0.06}>
            <FundingTracker className="h-full" />
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex h-full flex-col gap-6">
              <EventCountdown />
              <AcquisitionsPanel className="flex-1" />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <ReleasesPanel />
        </Reveal>
      </div>
    </section>
  );
}
