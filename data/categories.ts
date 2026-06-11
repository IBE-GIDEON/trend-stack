import type { Category, CategorySlug } from "./types";

/** The full editorial taxonomy, ordered by newsroom priority. */
export const CATEGORIES: Category[] = [
  { slug: "ai", label: "AI", code: "AI" },
  { slug: "startups", label: "Startups", code: "STP" },
  { slug: "big-tech", label: "Big Tech", code: "BTC" },
  { slug: "markets", label: "Markets", code: "MKT" },
  { slug: "cybersecurity", label: "Cybersecurity", code: "SEC" },
  { slug: "science", label: "Science", code: "SCI" },
  { slug: "programming", label: "Programming", code: "DEV" },
  { slug: "data", label: "Data", code: "DAT" },
  { slug: "cloud", label: "Cloud", code: "CLD" },
  { slug: "open-source", label: "Open Source", code: "OSS" },
  { slug: "robotics", label: "Robotics", code: "RBT" },
  { slug: "opinion", label: "Opinion", code: "OPN" },
  { slug: "research", label: "Research", code: "RES" },
  { slug: "products", label: "Products", code: "PRD" },
];

const BY_SLUG: Record<CategorySlug, Category> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<CategorySlug, Category>,
);

export function getCategory(slug: CategorySlug): Category {
  return BY_SLUG[slug];
}
