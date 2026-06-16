/** Shared domain types for the Trend Stack editorial surface. */

export type CategorySlug = string;

export interface Category {
  slug: CategorySlug;
  label: string;
  /** Two/three letter terminal code shown in mono chips. */
  code: string;
  icon?: string;
  section?: string;
  description?: string;
  tags?: string[];
  coverImage?: string;
}

export interface Author {
  name: string;
  role: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  author: Author;
  /** ISO 8601. Relative time is derived against a fixed reference. */
  publishedAt: string;
  readingMinutes: number;
  views: number;
  /** Drives the deterministic generated cover art. */
  coverSeed: string;
  trending?: boolean;
  /** Shows the "AI Insights" badge. */
  aiInsights?: boolean;
  /** Optional picture URL for the article peek view. */
  image?: string;
}

export interface TickerItem {
  symbol: string;
  price: number;
  changePct: number;
}

export interface TrendingTopic {
  rank: number;
  label: string;
  posts: number;
  changePct: number;
}

export interface FundingRound {
  company: string;
  amount: number;
  stage: string;
  sector: string;
}

export interface ModelScore {
  rank: number;
  model: string;
  org: string;
  score: number;
  delta: number;
}

export interface TechEvent {
  name: string;
  date: string; // ISO
  location: string;
}
