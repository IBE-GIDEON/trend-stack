"use client";

import { useNotion } from "@/lib/notion-context";
import { Hero } from "@/components/hero/Hero";
import { MarketTicker } from "@/components/live/MarketTicker";
import { NewsSection } from "@/components/news/NewsSection";
import { TrendingSection } from "@/components/live/TrendingSection";
import { LiveSection } from "@/components/live/LiveSection";
import { Newsletter } from "@/components/newsletter/Newsletter";
import { Footer } from "@/components/layout/Footer";

export default function DashboardPage() {
  const { activeItem } = useNotion();

  // Helper to determine what views to display
  const isDocBeat =
    activeItem === "home" ||
    activeItem === "news" ||
    activeItem === "ai" ||
    activeItem === "startups" ||
    activeItem === "big-tech" ||
    activeItem === "markets" ||
    activeItem === "cybersecurity" ||
    activeItem === "science" ||
    activeItem === "programming" ||
    activeItem === "data" ||
    activeItem === "cloud" ||
    activeItem === "open-source" ||
    activeItem === "robotics" ||
    activeItem === "opinion" ||
    activeItem === "research" ||
    activeItem === "products";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Notion Cover and Page header properties */}
      <Hero />

      <div className="flex-1">
        {/* Dynamic section injection depending on active Notion Sidebar document selection */}
        {isDocBeat && (
          <>
            <MarketTicker />
            <NewsSection />
          </>
        )}

        {activeItem === "trending" && <TrendingSection />}

        {activeItem === "live" && <LiveSection />}

        {activeItem === "newsletter" && <Newsletter />}
      </div>

      <Footer />
    </div>
  );
}
