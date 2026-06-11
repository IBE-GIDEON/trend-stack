import type {
  TickerItem,
  TrendingTopic,
  FundingRound,
  ModelScore,
  TechEvent,
} from "./types";

/** Market ticker — a tech-weighted tape. Mono numerals, green up / red down. */
export const TICKER: TickerItem[] = [
  { symbol: "NVDA", price: 1284.5, changePct: 2.41 },
  { symbol: "AAPL", price: 246.18, changePct: 0.62 },
  { symbol: "MSFT", price: 512.74, changePct: 1.18 },
  { symbol: "GOOGL", price: 214.9, changePct: -0.34 },
  { symbol: "AMZN", price: 238.05, changePct: 0.87 },
  { symbol: "META", price: 624.31, changePct: -1.12 },
  { symbol: "TSM", price: 198.62, changePct: 1.94 },
  { symbol: "AVGO", price: 1742.8, changePct: 3.05 },
  { symbol: "AMD", price: 184.27, changePct: -0.58 },
  { symbol: "ARM", price: 168.44, changePct: 2.27 },
  { symbol: "PLTR", price: 96.12, changePct: 4.41 },
  { symbol: "SMCI", price: 58.9, changePct: -2.03 },
];

/** "AI Index" style synthetic benchmarks shown above the tape. */
export const INDICES: TickerItem[] = [
  { symbol: "TS AI 50", price: 8421.6, changePct: 1.32 },
  { symbol: "COMPUTE", price: 3190.4, changePct: 2.08 },
  { symbol: "SEMI", price: 5642.1, changePct: -0.41 },
];

export const TRENDING_TOPICS: TrendingTopic[] = [
  { rank: 1, label: "Frontier compute deals", posts: 18420, changePct: 142 },
  { rank: 2, label: "Post-quantum crypto", posts: 12030, changePct: 88 },
  { rank: 3, label: "Open-weights reasoning", posts: 9650, changePct: 67 },
  { rank: 4, label: "Robot foundation models", posts: 7340, changePct: 54 },
  { rank: 5, label: "Fusion to grid", posts: 6110, changePct: 49 },
  { rank: 6, label: "Edge inference", posts: 4980, changePct: 31 },
];

export const FUNDING_ROUNDS: FundingRound[] = [
  { company: "Helix Defense", amount: 310_000_000, stage: "Series A", sector: "Autonomy" },
  { company: "Cumulus Labs", amount: 180_000_000, stage: "Series B", sector: "Infra" },
  { company: "Verdant AI", amount: 96_000_000, stage: "Series A", sector: "Climate" },
  { company: "Lattice Bio", amount: 74_000_000, stage: "Seed+", sector: "Bio" },
  { company: "Onyx Security", amount: 52_000_000, stage: "Series A", sector: "Security" },
];

export const MODEL_LEADERBOARD: ModelScore[] = [
  { rank: 1, model: "Atlas-Pro", org: "Meridian", score: 92.4, delta: 1.8 },
  { rank: 2, model: "Orion 3", org: "Northwind", score: 91.7, delta: 0.9 },
  { rank: 3, model: "OpenReason-X", org: "Commons", score: 90.3, delta: 3.4 },
  { rank: 4, model: "Helios 2", org: "Solaris", score: 89.1, delta: -0.4 },
  { rank: 5, model: "Cobalt", org: "Drift", score: 87.6, delta: 1.1 },
];

/** Acquisitions strip. */
export const ACQUISITIONS: { acquirer: string; target: string; amount: number }[] = [
  { acquirer: "Northwind", target: "Sift Analytics", amount: 1_400_000_000 },
  { acquirer: "Meridian", target: "Kernel Robotics", amount: 820_000_000 },
  { acquirer: "Solaris", target: "EdgeFlow", amount: 260_000_000 },
];

/** Latest open-source releases — terminal-style version tags. */
export const GITHUB_RELEASES: { repo: string; version: string; stars: number }[] = [
  { repo: "vizframe/core", version: "v4.2.0", stars: 48200 },
  { repo: "commons/openreason", version: "v1.0.0", stars: 31900 },
  { repo: "lattice/runtime", version: "v0.9.3", stars: 12400 },
];

export const TECH_EVENTS: TechEvent[] = [
  { name: "Trend Stack Intelligence Summit", date: "2026-06-24T16:00:00Z", location: "San Francisco" },
  { name: "Frontier Compute Forum", date: "2026-07-09T09:00:00Z", location: "Amsterdam" },
];

/** The single next event, used by the countdown widget. */
export const NEXT_EVENT = TECH_EVENTS[0];
