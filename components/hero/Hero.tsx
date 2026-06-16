"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useNotion, type NotionItem } from "@/lib/notion-context";
import { cn } from "@/lib/utils";
import type { Category } from "@/data/types";

const GENERAL_PAGES_INFO: Record<string, { title: string; icon: string; description: string; tags: string[] }> = {
  home: {
    title: "Trend Stack Intelligence Hub",
    icon: "🏠",
    description: "Welcome to the premium technology intelligence workspace. Below is the active database containing real-time market telemetry, AI benchmarks, venture funding rounds, and technical briefs.",
    tags: ["News Hub", "Active Desk"],
  },
  news: {
    title: "Latest News Archive",
    icon: "📰",
    description: "A chronological feed of all tech intelligence reports, deep-dive articles, and market briefings. Sort or filter below.",
    tags: ["Articles Feed", "Chronological"],
  },
  trending: {
    title: "Trending Pulse",
    icon: "📈",
    description: "High-impact tech insights, most-read reporting, and topics generating search volume across technology hubs.",
    tags: ["High Impact", "Most Popular"],
  },
  live: {
    title: "Live Desk Telemetry",
    icon: "⚡",
    description: "Real-time telemetry from the tech sector: AI reasoning leaderboards, venture funding rounds, and GitHub package releases.",
    tags: ["Real-time", "Automated Feed"],
  },
  newsletter: {
    title: "The Weekly Briefing",
    icon: "💌",
    description: "A curated briefing delivered to your inbox every Friday. Decodes the signals that matter in AI, venture capital, and deep science.",
    tags: ["Newsletter", "Weekly Dispatch"],
  },
};

export function Hero() {
  const { activeItem } = useNotion();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch category beats
  useEffect(() => {
    let active = true;
    const fetchCats = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          if (active) {
            setCategories(data);
          }
        }
      } catch (err) {
        console.error("Error fetching beat info:", err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    fetchCats();
    return () => {
      active = false;
    };
  }, []);

  // Compute active beat page info dynamically
  const pageInfo = useMemo(() => {
    if (GENERAL_PAGES_INFO[activeItem]) {
      return {
        ...GENERAL_PAGES_INFO[activeItem],
        coverImage: "",
      };
    }

    const activeCat = categories.find((c) => c.slug === activeItem);
    if (activeCat) {
      return {
        title: activeCat.label,
        icon: activeCat.icon || "📄",
        description: activeCat.description || `Browse technology intelligence articles under the ${activeCat.label} desk.`,
        tags: activeCat.tags || [activeCat.label, "Editorial Beat"],
        coverImage: activeCat.coverImage || "",
      };
    }

    return {
      title: loading ? "Loading..." : "Workspace Document",
      icon: loading ? "⏳" : "📄",
      description: "Dynamic news beats database feed.",
      tags: ["General"],
      coverImage: "",
    };
  }, [activeItem, categories, loading]);

  return (
    <div className="w-full select-text">
      {/* ── Cover Image ── */}
      <div className="relative h-48 w-full overflow-hidden sm:h-64 select-none">
        {pageInfo.coverImage ? (
          <img
            src={pageInfo.coverImage}
            alt="Cover Banner"
            className="object-cover w-full h-full"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[#efebe4] to-[#e2dacb] dark:from-[#222120] dark:to-[#171716]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
          </>
        )}
      </div>

      {/* ── Content Wrapper ── */}
      <div className="mx-auto max-w-editorial px-6 lg:px-10 pb-6">
        {/* ── Overlapping Page Icon ── */}
        <div className="relative -mt-14 mb-6 inline-block select-none sm:-mt-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-charcoal border border-fog shadow-md text-4xl sm:h-28 sm:w-28 sm:text-6xl">
            {pageInfo.icon}
          </div>
        </div>

        {/* ── Page Title ── */}
        <h1 className="text-display-md font-bold text-soft leading-none tracking-tight sm:text-4xl">
          {pageInfo.title}
        </h1>

        {/* Description */}
        {pageInfo.description && (
          <p className="mt-3 text-muted text-[13px] leading-relaxed max-w-2xl font-sans">
            {pageInfo.description}
          </p>
        )}

        {/* Tags */}
        {pageInfo.tags && pageInfo.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {pageInfo.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded bg-steel/30 px-2 py-0.5 text-xs text-muted border border-fog/20 font-mono"
              >
                #{tag.toLowerCase().replace(/\s+/g, "-")}
              </span>
            ))}
          </div>
        )}

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
