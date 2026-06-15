"use client";

import React, { useMemo, useState } from "react";
import { useNotion, type NotionItem } from "@/lib/notion-context";
import { ARTICLES } from "@/data/articles";
import { getCategory } from "@/data/categories";
import { CoverArt } from "./CoverArt";
import { relativeTime, compactNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Article } from "@/data/types";

type ViewType = "editorial" | "gallery" | "table" | "list" | "board";

const getCategoryColorClass = (category: string) => {
  switch (category) {
    case "ai":
    case "opinion":
      return "text-[#9a6dfe] dark:text-[#c09fff]";
    case "startups":
    case "science":
      return "text-[#24b395] dark:text-[#5eead4]";
    case "big-tech":
    case "cloud":
      return "text-[#389cff] dark:text-[#8ec5fc]";
    case "markets":
    case "finance":
      return "text-[#ffd55a] dark:text-[#ffe480]";
    case "cybersecurity":
      return "text-[#ff7878] dark:text-[#ff9e9e]";
    case "programming":
    case "products":
      return "text-[#ffa340] dark:text-[#ffcc99]";
    default:
      return "text-emerald-500 dark:text-emerald-400";
  }
};

const CATEGORY_EMOJIS: Record<string, string> = {
  ai: "🤖",
  startups: "🚀",
  "big-tech": "💻",
  markets: "📊",
  cybersecurity: "🔐",
  science: "🔬",
  programming: "⚙️",
  data: "💾",
  cloud: "☁️",
  "open-source": "🌐",
  robotics: "🦾",
  opinion: "✍️",
  research: "🧠",
  products: "📦",
};

export function NotionDatabase() {
  const { activeItem, setActiveItem } = useNotion();
  const [view, setView] = useState<ViewType>("editorial");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "views" | "readingTime" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Expandable toggle rows state for Table View
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({});

  // 1. Filter articles based on sidebar active selection
  const filteredBySelection = useMemo(() => {
    if (activeItem === "home" || activeItem === "news") {
      return ARTICLES;
    }
    if (activeItem === "trending") {
      return ARTICLES.filter((a) => a.trending);
    }
    if (activeItem === "live" || activeItem === "newsletter") {
      return ARTICLES; // Fallback, normally they view stats/newsletter section
    }
    // Otherwise filter by category beat
    return ARTICLES.filter((a) => a.category === activeItem);
  }, [activeItem]);

  // 2. Filter articles based on inline search query
  const searchedArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return filteredBySelection;
    return filteredBySelection.filter((a) => {
      const categoryLabel = getCategory(a.category).label.toLowerCase();
      return (
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query) ||
        a.author.name.toLowerCase().includes(query) ||
        categoryLabel.includes(query)
      );
    });
  }, [filteredBySelection, searchQuery]);

  // 3. Sort articles
  const sortedArticles = useMemo(() => {
    if (!sortBy) return searchedArticles;
    const sorted = [...searchedArticles];
    sorted.sort((a, b) => {
      let valA: any = 0;
      let valB: any = 0;

      if (sortBy === "date") {
        valA = new Date(a.publishedAt).getTime();
        valB = new Date(b.publishedAt).getTime();
      } else if (sortBy === "views") {
        valA = a.views;
        valB = b.views;
      } else if (sortBy === "readingTime") {
        valA = a.readingMinutes;
        valB = b.readingMinutes;
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [searchedArticles, sortBy, sortOrder]);

  const toggleSort = (field: "date" | "views" | "readingTime") => {
    if (sortBy === field) {
      if (sortOrder === "desc") {
        setSortOrder("asc");
      } else {
        setSortBy(null); // Reset sorting
      }
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedArticles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Group items by category for Board View
  const boardData = useMemo(() => {
    const groups: Record<string, Article[]> = {};
    // Only group unique categories present in sortedArticles
    sortedArticles.forEach((a) => {
      if (!groups[a.category]) {
        groups[a.category] = [];
      }
      groups[a.category].push(a);
    });
    return groups;
  }, [sortedArticles]);

  return (
    <div className="w-full space-y-6">
      {/* ── Database Title and Tab Bar ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-fog/80 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">📁</span>
          <span className="font-semibold text-soft text-base">Stories Database</span>
          <span className="rounded-md bg-steel px-1.5 py-0.5 text-xs text-muted font-mono">
            {sortedArticles.length}
          </span>
        </div>

        {/* Notion-style database view tabs */}
        <div className="flex flex-wrap gap-1 text-[13px] text-muted">
          {[
            { id: "editorial", label: "Editorial View", icon: "📰" },
            { id: "gallery", label: "Gallery View", icon: "📁" },
            { id: "table", label: "Table View", icon: "📋" },
            { id: "list", label: "List View", icon: "📰" },
            { id: "board", label: "Board View", icon: "📋" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setView(t.id as ViewType)}
              className={cn(
                "flex items-center gap-1.5 rounded-sm px-2.5 py-1 transition-colors hover:bg-steel hover:text-soft",
                view === t.id && "bg-steel text-soft font-medium shadow-[0_-2px_0_0_rgb(var(--c-accent))_inset]"
              )}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Filters and Search Bar ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Inline Search Bar */}
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-ash pointer-events-none text-xs">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories, authors, tags…"
            className="w-full h-8 pl-8 pr-3 bg-charcoal/40 border border-fog rounded-sm text-[13px] text-soft placeholder:text-ash focus:outline-none focus:border-accent/40 focus:bg-charcoal/80 transition-colors"
          />
        </div>

        {/* Active Filters Summary & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted">
          <span>Sort:</span>
          <button
            onClick={() => toggleSort("date")}
            className={cn(
              "rounded bg-steel/50 border border-fog/40 px-2 py-0.5 hover:text-soft hover:bg-steel",
              sortBy === "date" && "text-accent border-accent/20 bg-accent/5 font-semibold"
            )}
          >
            📅 Date {sortBy === "date" && (sortOrder === "asc" ? "▲" : "▼")}
          </button>
          <button
            onClick={() => toggleSort("views")}
            className={cn(
              "rounded bg-steel/50 border border-fog/40 px-2 py-0.5 hover:text-soft hover:bg-steel",
              sortBy === "views" && "text-accent border-accent/20 bg-accent/5 font-semibold"
            )}
          >
            👁️ Views {sortBy === "views" && (sortOrder === "asc" ? "▲" : "▼")}
          </button>
          <button
            onClick={() => toggleSort("readingTime")}
            className={cn(
              "rounded bg-steel/50 border border-fog/40 px-2 py-0.5 hover:text-soft hover:bg-steel",
              sortBy === "readingTime" && "text-accent border-accent/20 bg-accent/5 font-semibold"
            )}
          >
            ⏱️ Read Time {sortBy === "readingTime" && (sortOrder === "asc" ? "▲" : "▼")}
          </button>

          {activeItem !== "home" && (
            <button
              onClick={() => setActiveItem("home")}
              className="rounded bg-breaking/10 border border-breaking/20 px-2 py-0.5 text-breaking hover:bg-breaking/20 font-medium ml-2"
            >
              ✕ Clear page filter
            </button>
          )}
        </div>
      </div>

      {/* ── Subviews rendering ── */}
      <div className="w-full">
        {sortedArticles.length === 0 ? (
          <div className="rounded border border-dashed border-fog p-12 text-center text-muted text-[13px]">
            <p className="font-semibold text-soft">No database entries match your filters</p>
            <p className="mt-1 text-xs text-ash">Try adjusting your search query or clear the filter.</p>
          </div>
        ) : (
          <>
            {/* ── EDITORIAL VIEW ── */}
            {view === "editorial" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start select-text">
                {/* Left Column: List of News Articles */}
                <div className="lg:col-span-8 divide-y divide-fog/50">
                  {sortedArticles.map((a) => (
                    <article
                      key={a.id}
                      className="flex gap-4 py-5 first:pt-0 last:pb-0"
                    >
                      {/* Left Side: Thumbnail (16:9 Aspect Ratio) */}
                      <div className="relative h-20 w-32 sm:h-24 sm:w-40 shrink-0 overflow-hidden rounded-md border border-fog/60 bg-graphite select-none">
                        <CoverArt seed={a.coverSeed} />
                      </div>

                      {/* Right Side: Article Details */}
                      <div className="flex-1 flex flex-col justify-center min-w-0">
                        {/* Category */}
                        <span className={cn("text-[10px] font-sans font-bold tracking-wider uppercase mb-1", getCategoryColorClass(a.category))}>
                          {getCategory(a.category).label}
                        </span>

                        {/* Title */}
                        <h3 className="font-sans font-bold text-soft text-base md:text-lg leading-snug hover:text-accent transition-colors">
                          <a href={`#${a.slug}`}>
                            {a.title}
                          </a>
                        </h3>

                        {/* Author and Published Date */}
                        <p className="mt-1.5 text-[12px] text-muted font-sans flex items-center gap-1.5">
                          <span className="font-medium">{a.author.name}</span>
                          <span className="text-ash/60">·</span>
                          <span>{relativeTime(a.publishedAt)}</span>
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Right Column: Widgets */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Card 1: Register Promo */}
                  <div className="rounded-lg border border-emerald-500/20 bg-charcoal/20 p-5 flex flex-col items-center text-center space-y-4 shadow-xs select-none">
                    <p className="text-[13px] text-muted leading-relaxed font-sans">
                      Get an inside look at what it takes to scale and succeed from leaders at Mach Industries, Founders Fund, and Shinkei Systems. Through candid fireside chats and high-impact networking, you&apos;ll walk away with valuable insights and new connections.
                    </p>
                    <button className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-[13px] rounded transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]">
                      <span>REGISTER NOW</span>
                      <span className="text-sm font-bold">›</span>
                    </button>
                  </div>

                  {/* Card 2: Most Popular */}
                  <div className="rounded-lg bg-[#5c3ce6] p-5 text-white space-y-4 shadow-md select-none">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h4 className="font-sans font-extrabold text-[17px] tracking-tight text-white uppercase">
                        Most Popular
                      </h4>
                      <div className="h-7 w-7 rounded bg-yellow-300 flex items-center justify-center text-[15px] shadow-xs text-black font-bold">
                        📈
                      </div>
                    </div>

                    {/* Bullet List */}
                    <ul className="space-y-3.5 pt-1">
                      {ARTICLES.slice(0, 6).map((pa) => (
                        <li key={pa.id} className="flex items-start gap-2.5 text-[12px] leading-snug">
                          <span className="h-1.5 w-1.5 shrink-0 bg-white rounded-xs mt-1.5 select-none" />
                          <a href={`#${pa.slug}`} className="hover:underline font-medium text-white/95 transition-opacity hover:opacity-90">
                            {pa.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ── GALLERY VIEW ── */}
            {view === "gallery" && (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {sortedArticles.map((a) => (
                  <article
                    key={a.id}
                    className="group flex flex-col rounded border border-fog bg-charcoal/40 overflow-hidden hover:border-accent/30 transition-colors"
                  >
                    {/* Cover Art Banner */}
                    <div className="relative h-28 w-full overflow-hidden border-b border-fog/60 bg-graphite">
                      <CoverArt seed={a.coverSeed} />
                    </div>
                    {/* Card Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title Header with Icon */}
                        <h3 className="font-semibold text-soft text-[14px] leading-snug group-hover:text-accent transition-colors">
                          <a href={`#${a.slug}`} className="flex items-start gap-1.5">
                            <span className="shrink-0">{CATEGORY_EMOJIS[a.category] || "📄"}</span>
                            <span>{a.title}</span>
                          </a>
                        </h3>
                        <p className="mt-2 text-[12px] text-muted line-clamp-2 leading-relaxed">
                          {a.excerpt}
                        </p>
                      </div>

                      {/* Notion Properties in Card */}
                      <div className="mt-4 pt-3 border-t border-fog/40 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-[11px] text-ash font-sans">
                        <button
                          onClick={() => setActiveItem(a.category as NotionItem)}
                          className={cn("notion-tag shrink-0", `notion-tag-${a.category}`)}
                        >
                          {getCategory(a.category).label}
                        </button>

                        <div className="flex items-center gap-1.5">
                          <span>⏱️ {a.readingMinutes}m</span>
                          <span>·</span>
                          <span>👁️ {compactNumber(a.views)}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* ── TABLE VIEW ── */}
            {view === "table" && (
              <div className="overflow-x-auto rounded border border-fog bg-charcoal/20">
                <table className="notion-table">
                  <thead>
                    <tr>
                      <th className="w-[40%]">📄 Name</th>
                      <th>📂 Beat</th>
                      <th>✍️ Author</th>
                      <th>⏱️ Read Time</th>
                      <th>👁️ Views</th>
                      <th>📅 Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedArticles.map((a) => {
                      const expanded = !!expandedArticles[a.id];
                      return (
                        <React.Fragment key={a.id}>
                          <tr
                            onClick={() => toggleExpand(a.id)}
                            className="cursor-pointer transition-colors"
                          >
                            <td className="font-medium max-w-[320px] truncate">
                              <span className="mr-2 text-base select-none">
                                {expanded ? "▼" : "▶"}
                              </span>
                              <span className="mr-1.5">{CATEGORY_EMOJIS[a.category]}</span>
                              <span className="hover:underline hover:text-accent">{a.title}</span>
                            </td>
                            <td>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveItem(a.category as NotionItem);
                                }}
                                className={cn("notion-tag", `notion-tag-${a.category}`)}
                              >
                                {getCategory(a.category).label}
                              </button>
                            </td>
                            <td className="text-muted">{a.author.name}</td>
                            <td className="font-mono text-ash">{a.readingMinutes} min</td>
                            <td className="font-mono text-ash">{compactNumber(a.views)}</td>
                            <td className="text-ash">{relativeTime(a.publishedAt)}</td>
                          </tr>
                          {expanded && (
                            <tr>
                              <td colSpan={6} className="bg-steel/30 px-6 py-4 whitespace-normal">
                                <div className="space-y-2">
                                  <div className="notion-quote">
                                    <p className="text-[13px] font-medium text-soft">{a.excerpt}</p>
                                  </div>
                                  <div className="flex items-center gap-4 text-xs text-muted">
                                    <span>
                                      <strong>Correspondent:</strong> {a.author.name} ({a.author.role})
                                    </span>
                                    <span>·</span>
                                    <a
                                      href={`#${a.slug}`}
                                      className="text-accent hover:underline font-semibold"
                                    >
                                      Open Document Page ↗
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── LIST VIEW ── */}
            {view === "list" && (
              <div className="rounded border border-fog bg-charcoal/20 divide-y divide-fog/60">
                {sortedArticles.map((a) => (
                  <div
                    key={a.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 hover:bg-steel/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base select-none shrink-0">{CATEGORY_EMOJIS[a.category]}</span>
                      <a
                        href={`#${a.slug}`}
                        className="truncate text-[13px] font-medium text-soft hover:underline hover:text-accent"
                      >
                        {a.title}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-7 sm:ml-0 text-[11px] text-ash">
                      <button
                        onClick={() => setActiveItem(a.category as NotionItem)}
                        className={cn("notion-tag", `notion-tag-${a.category}`)}
                      >
                        {getCategory(a.category).label}
                      </button>
                      <span className="font-mono">{a.readingMinutes}m</span>
                      <span>·</span>
                      <span>{relativeTime(a.publishedAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── BOARD VIEW ── */}
            {view === "board" && (
              <div className="flex gap-4 overflow-x-auto pb-4 select-none scrollbar-thin">
                {Object.entries(boardData).map(([category, items]) => {
                  const catInfo = getCategory(category as any);
                  return (
                    <div
                      key={category}
                      className="flex flex-col w-[260px] shrink-0 bg-charcoal/10 rounded p-2 border border-fog/40"
                    >
                      {/* Column Header */}
                      <div className="flex items-center justify-between px-2 py-1.5 border-b border-fog/60 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{CATEGORY_EMOJIS[category]}</span>
                          <span className="text-[12px] font-semibold text-soft truncate">
                            {catInfo.label}
                          </span>
                          <span className="rounded-full bg-steel px-1.5 py-px text-[10px] text-muted font-mono">
                            {items.length}
                          </span>
                        </div>
                      </div>

                      {/* Board Cards */}
                      <div className="flex-1 space-y-2 overflow-y-auto max-h-[380px] pr-0.5">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="p-3 bg-charcoal border border-fog rounded hover:border-accent/40 transition-colors"
                          >
                            <a
                              href={`#${item.slug}`}
                              className="text-[12px] font-medium text-soft hover:underline block leading-snug"
                            >
                              {item.title}
                            </a>
                            <div className="mt-2 flex items-center justify-between text-[10px] text-ash font-mono">
                              <span>👁️ {compactNumber(item.views)}</span>
                              <span>⏱️ {item.readingMinutes}m</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
