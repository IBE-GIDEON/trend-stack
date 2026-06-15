"use client";

import { useNotion, type NotionItem } from "@/lib/notion-context";
import { cn } from "@/lib/utils";

const getPageInfo = (item: NotionItem) => {
  switch (item) {
    case "home":
      return {
        title: "Trend Stack Intelligence Hub",
        icon: "🏠",
        description: "Welcome to the premium technology intelligence workspace. Below is the active database containing real-time market telemetry, AI benchmarks, venture funding rounds, and technical briefs.",
        tags: ["News Hub", "Active Desk"],
      };
    case "news":
      return {
        title: "Latest News Archive",
        icon: "📰",
        description: "A chronological feed of all tech intelligence reports, deep-dive articles, and market briefings. Sort or filter below.",
        tags: ["Articles Feed", "Chronological"],
      };
    case "trending":
      return {
        title: "Trending Pulse",
        icon: "📈",
        description: "High-impact tech insights, most-read reporting, and topics generating search volume across technology hubs.",
        tags: ["High Impact", "Most Popular"],
      };
    case "live":
      return {
        title: "Live Desk Telemetry",
        icon: "⚡",
        description: "Real-time telemetry from the tech sector: AI reasoning leaderboards, venture funding rounds, and GitHub package releases.",
        tags: ["Real-time", "Automated Feed"],
      };
    case "newsletter":
      return {
        title: "The Weekly Briefing",
        icon: "💌",
        description: "A curated briefing delivered to your inbox every Friday. Decodes the signals that matter in AI, venture capital, and deep science.",
        tags: ["Newsletter", "Weekly Dispatch"],
      };
    case "ai":
      return {
        title: "Artificial Intelligence",
        icon: "🤖",
        description: "Frontier research, LLM benchmarks, chip silicon scaling, and agentic framework architectures.",
        tags: ["AI Beat", "Machine Learning"],
      };
    case "startups":
      return {
        title: "Startups & Venture Capital",
        icon: "🚀",
        description: "Funding deal tracker, investor movements, accelerators, and startup valuations.",
        tags: ["VC Beat", "Venture Capital"],
      };
    case "big-tech":
      return {
        title: "Big Tech Infrastructure",
        icon: "💻",
        description: "Earnings reports, data center water/energy scaling, silicon fabrication fabs, and regulatory actions.",
        tags: ["Big Tech Beat", "Regulatory Desk"],
      };
    case "markets":
      return {
        title: "Markets & Finance",
        icon: "📊",
        description: "Tech equities, semiconductor supply chains, inflation rates, interest rates, and commodity scaling.",
        tags: ["Markets Beat", "Equities"],
      };
    case "cybersecurity":
      return {
        title: "Cybersecurity Desk",
        icon: "🔐",
        description: "Post-quantum migration scrambles, state-sponsored vectors, Zero Trust tooling, and infrastructure breaches.",
        tags: ["Security Beat", "Infosec"],
      };
    case "science":
      return {
        title: "Science & Biotech",
        icon: "🔬",
        description: "Nuclear fusion grid milestones, quantum computing hardware, room-temperature superconductors, and synthetic bio.",
        tags: ["Science Beat", "Hard Tech"],
      };
    case "programming":
      return {
        title: "Developer Toolchains",
        icon: "⚙️",
        description: "Native compilers, runtime benchmarks, language migrations (TypeScript, Rust, Zig), and developer ergonomics.",
        tags: ["Dev Beat", "Programming"],
      };
    case "data":
      return {
        title: "Data Engineering",
        icon: "💾",
        description: "Synthetic data pipelines, vector index algorithms, real-time analytics streaming, and warehousing economics.",
        tags: ["Data Beat", "Analytics"],
      };
    case "cloud":
      return {
        title: "Cloud & Infrastructure",
        icon: "☁️",
        description: "Hyper-scale cloud nodes, edge computing frameworks, CDN latency optimizations, and database scaling.",
        tags: ["Cloud Beat", "Infrastructure"],
      };
    case "open-source":
      return {
        title: "Open Source Ecosystem",
        icon: "🌐",
        description: "Permissively licensed reasoning models, community tools, licensing battles, and GitHub updates.",
        tags: ["OSS Beat", "Community Tools"],
      };
    case "robotics":
      return {
        title: "Robotics & Automation",
        icon: "🦾",
        description: "Humanoid policies, pick-and-place foundation models, drone navigation, and factory Floor optimization.",
        tags: ["Robotics Beat", "Hardware Autonomy"],
      };
    case "opinion":
      return {
        title: "Editorial Opinion",
        icon: "✍️",
        description: "Contrarian opinions, editor briefings, technology ethical concerns, and regulatory critiques.",
        tags: ["Editorial", "Perspectives"],
      };
    case "research":
      return {
        title: "Deep Scientific Research",
        icon: "🧠",
        description: "Academic papers, peer-reviewed journals, lab experiments, and mathematical breakthroughs.",
        tags: ["Research Beat", "Academia"],
      };
    case "products":
      return {
        title: "Product Releases",
        icon: "📦",
        description: "New AI gadgets, software updates, developer API releases, and hardware announcements.",
        tags: ["Products Beat", "Hardware & Software"],
      };
    default:
      return {
        title: "Trend Stack Hub",
        icon: "🏠",
        description: "Welcome to Trend Stack.",
        tags: ["General"],
      };
  }
};

export function Hero() {
  const { activeItem } = useNotion();
  const info = getPageInfo(activeItem);

  return (
    <div className="w-full select-text">
      {/* ── Cover Image ── */}
      <div className="relative h-40 w-full overflow-hidden sm:h-52">
        <div className="absolute inset-0 bg-gradient-to-r from-[#efebe4] to-[#e2dacb] dark:from-[#222120] dark:to-[#171716]" />
        {/* Subtle cover grid lines for structure */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* ── Content Wrapper ── */}
      <div className="mx-auto max-w-editorial px-6 lg:px-10 pb-6">
        {/* ── Overlapping Page Icon ── */}
        <div className="relative -mt-14 mb-4 inline-block select-none sm:-mt-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-charcoal border border-fog shadow-md text-4xl sm:h-28 sm:w-28 sm:text-6xl">
            {info.icon}
          </div>
        </div>

        {/* ── Page Title ── */}
        <h1 className="text-display-md font-bold text-soft leading-none tracking-tight sm:text-4xl">
          {info.title}
        </h1>

        {/* ── Page Properties / Metadata ── */}
        <div className="mt-4 border-t border-fog/40 pt-3 text-[13px] font-sans">
          <div className="flex items-center gap-2">
            <span className="text-muted flex items-center gap-1 w-[90px] shrink-0">
              <span>✍️</span> Created by
            </span>
            <span className="inline-flex items-center gap-1.5 rounded bg-steel/40 px-2 py-0.5 font-medium text-soft hover:bg-steel/60 transition-all cursor-pointer border border-fog/30 text-[12px]">
              <span className="h-4 w-4 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-[9px] font-mono text-accent font-bold">TS</span>
              Trend Stack Newsroom
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
