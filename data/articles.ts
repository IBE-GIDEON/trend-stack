import type { Article } from "./types";

/**
 * Editorial dataset. Hand-written to read like a real newsroom front page on
 * 2026-06-09. Times are anchored near the reference "now" so relative
 * timestamps feel live. The first entry is the lead; [1] and [2] are the
 * secondary features; the remainder flow into the responsive grid.
 */
export const ARTICLES: Article[] = [
  {
    id: "a01",
    slug: "openai-anthropic-compute-pact",
    title: "Inside the $50B compute arms race redrawing the AI power map",
    excerpt:
      "Frontier labs are signing multi-year energy and silicon contracts that look less like procurement and more like nation-state strategy. We mapped where the gigawatts are going.",
    category: "ai",
    author: { name: "Mara Whitfield", role: "Senior AI Correspondent" },
    publishedAt: "2026-06-09T14:46:00Z",
    readingMinutes: 11,
    views: 184200,
    coverSeed: "compute-arms-race",
    trending: true,
    aiInsights: true,
  },
  {
    id: "a02",
    slug: "europe-chip-sovereignty",
    title: "Europe’s quiet bet on chip sovereignty is finally paying off",
    excerpt:
      "Three fabs, one shared roadmap, and a decade of patient capital. The continent’s semiconductor strategy is maturing right as demand spikes.",
    category: "big-tech",
    author: { name: "Idris Kemal", role: "Markets Editor" },
    publishedAt: "2026-06-09T13:10:00Z",
    readingMinutes: 8,
    views: 92400,
    coverSeed: "chip-sovereignty",
    trending: true,
    aiInsights: true,
  },
  {
    id: "a03",
    slug: "series-a-defense-tech",
    title: "Defense tech just had its largest Series A on record",
    excerpt:
      "Autonomy, sensing, and secure compute drove a $310M round — and a wave of follow-on term sheets across the sector.",
    category: "startups",
    author: { name: "Nadia Brooks", role: "Venture Reporter" },
    publishedAt: "2026-06-09T11:25:00Z",
    readingMinutes: 6,
    views: 61800,
    coverSeed: "defense-series-a",
    aiInsights: true,
  },
  {
    id: "a04",
    slug: "post-quantum-migration",
    title: "The post-quantum migration is here — and most teams aren’t ready",
    excerpt:
      "New federal guidance moves the deadline forward. Security leads describe a scramble to inventory cryptography they didn’t know they had.",
    category: "cybersecurity",
    author: { name: "Theo Vance", role: "Security Desk" },
    publishedAt: "2026-06-09T09:40:00Z",
    readingMinutes: 9,
    views: 48700,
    coverSeed: "post-quantum",
    trending: true,
  },
  {
    id: "a05",
    slug: "open-weights-leaderboard-shift",
    title: "An open-weights model just topped the reasoning leaderboard",
    excerpt:
      "For the first time, a permissively licensed model leads on long-horizon reasoning — and the gap to closed frontier systems is shrinking.",
    category: "open-source",
    author: { name: "Lena Ortiz", role: "Open Source Lead" },
    publishedAt: "2026-06-09T08:05:00Z",
    readingMinutes: 7,
    views: 73100,
    coverSeed: "open-weights",
    aiInsights: true,
  },
  {
    id: "a06",
    slug: "datacenter-water-economics",
    title: "The new economics of cooling a 500-megawatt data center",
    excerpt:
      "Water rights, heat reuse, and grid contracts are becoming the real constraints on AI scale. The spreadsheet has changed.",
    category: "cloud",
    author: { name: "Sam Okonkwo", role: "Infrastructure Reporter" },
    publishedAt: "2026-06-08T22:30:00Z",
    readingMinutes: 10,
    views: 39500,
    coverSeed: "datacenter-cooling",
  },
  {
    id: "a07",
    slug: "robotics-foundation-models",
    title: "Foundation models for robots leave the lab and hit the warehouse",
    excerpt:
      "A single policy now drives pick-and-place across a dozen hardware platforms. Operators report double-digit throughput gains.",
    category: "robotics",
    author: { name: "Yuki Tanaka", role: "Robotics Correspondent" },
    publishedAt: "2026-06-08T19:15:00Z",
    readingMinutes: 6,
    views: 54300,
    coverSeed: "robot-foundation",
    aiInsights: true,
  },
  {
    id: "a08",
    slug: "fusion-grid-milestone",
    title: "A fusion startup hit the grid — for ninety seconds",
    excerpt:
      "It isn’t baseload yet, but the milestone resets the timeline that investors and utilities have been pricing in.",
    category: "science",
    author: { name: "Priya Raman", role: "Science Editor" },
    publishedAt: "2026-06-08T16:50:00Z",
    readingMinutes: 8,
    views: 67900,
    coverSeed: "fusion-grid",
    trending: true,
  },
  {
    id: "a09",
    slug: "typescript-7-native-compiler",
    title: "The native TypeScript compiler is rewriting build-time expectations",
    excerpt:
      "Cold builds that took minutes now finish in seconds. We benchmarked the toolchain across ten real monorepos.",
    category: "programming",
    author: { name: "Marcus Hale", role: "Developer Tools" },
    publishedAt: "2026-06-08T14:20:00Z",
    readingMinutes: 7,
    views: 88200,
    coverSeed: "ts-native",
  },
  {
    id: "a10",
    slug: "ai-chip-margins",
    title: "The margin story behind this quarter’s AI chip earnings",
    excerpt:
      "Beneath record revenue sits a quieter shift in gross margin — and a hint about where pricing power moves next.",
    category: "markets",
    author: { name: "Idris Kemal", role: "Markets Editor" },
    publishedAt: "2026-06-08T12:00:00Z",
    readingMinutes: 5,
    views: 41200,
    coverSeed: "chip-margins",
  },
  {
    id: "a11",
    slug: "synthetic-data-quality",
    title: "Synthetic data quality is the new model moat",
    excerpt:
      "As public text runs dry, the labs winning on data curation are pulling ahead. The pipeline, not the scrape, is the advantage.",
    category: "data",
    author: { name: "Lena Ortiz", role: "Open Source Lead" },
    publishedAt: "2026-06-08T10:10:00Z",
    readingMinutes: 9,
    views: 35600,
    coverSeed: "synthetic-data",
    aiInsights: true,
  },
  {
    id: "a12",
    slug: "the-case-against-agentic-hype",
    title: "Opinion: The case against the agentic gold rush",
    excerpt:
      "Autonomous agents are extraordinary demos and brittle products. Until reliability catches the ambition, restraint is the senior move.",
    category: "opinion",
    author: { name: "Mara Whitfield", role: "Senior AI Correspondent" },
    publishedAt: "2026-06-08T08:00:00Z",
    readingMinutes: 6,
    views: 51900,
    coverSeed: "agentic-opinion",
  },
  {
    id: "a13",
    slug: "interpretability-breakthrough",
    title: "A new interpretability method maps what models actually learn",
    excerpt:
      "Researchers traced features across layers at scale, surfacing circuits that were previously invisible. The implications run from safety to debugging.",
    category: "research",
    author: { name: "Priya Raman", role: "Science Editor" },
    publishedAt: "2026-06-07T21:40:00Z",
    readingMinutes: 12,
    views: 44800,
    coverSeed: "interpretability",
    aiInsights: true,
  },
  {
    id: "a14",
    slug: "consumer-ai-hardware-reset",
    title: "The consumer AI hardware reset nobody wanted to admit was coming",
    excerpt:
      "After a year of ambitious gadgets, the category is consolidating around the device already in your pocket.",
    category: "products",
    author: { name: "Nadia Brooks", role: "Venture Reporter" },
    publishedAt: "2026-06-07T18:25:00Z",
    readingMinutes: 5,
    views: 60400,
    coverSeed: "ai-hardware",
  },
  {
    id: "a15",
    slug: "edge-inference-latency",
    title: "Edge inference is quietly winning the latency war",
    excerpt:
      "Moving small models to the device is reshaping product design — and the cloud bill. The trade-offs are subtler than they look.",
    category: "cloud",
    author: { name: "Sam Okonkwo", role: "Infrastructure Reporter" },
    publishedAt: "2026-06-07T15:05:00Z",
    readingMinutes: 7,
    views: 29800,
    coverSeed: "edge-inference",
  },
  {
    id: "a16",
    slug: "startup-acquihire-wave",
    title: "Inside the acqui-hire wave reshaping early-stage AI",
    excerpt:
      "Talent, not technology, is driving a quiet consolidation. Founders weigh nine-figure offers against the company they set out to build.",
    category: "startups",
    author: { name: "Nadia Brooks", role: "Venture Reporter" },
    publishedAt: "2026-06-07T11:30:00Z",
    readingMinutes: 8,
    views: 47300,
    coverSeed: "acquihire-wave",
    trending: true,
  },
];

/** The lead story that anchors the front page. */
export const FEATURED_ARTICLE = ARTICLES[0];

/** Two supporting features beside the lead. */
export const SECONDARY_ARTICLES = ARTICLES.slice(1, 3);

/** Everything else flows into the responsive editorial grid. */
export const GRID_ARTICLES = ARTICLES.slice(3);

/** Trending rail uses the flagged stories, most-viewed first. */
export const TRENDING_ARTICLES = ARTICLES.filter((a) => a.trending).sort(
  (a, b) => b.views - a.views,
);
