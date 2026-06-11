"use client";

import { useEffect, useState } from "react";
import { SearchOverlay } from "./SearchOverlay";
import { useNotion, type NotionItem } from "@/lib/notion-context";
import { cn } from "@/lib/utils";
import { SearchIcon } from "@/components/ui/icons";

const getBreadcrumbInfo = (item: NotionItem): { label: string; icon: string } => {
  switch (item) {
    case "home": return { label: "News Home", icon: "🏠" };
    case "news": return { label: "Latest Stories", icon: "📰" };
    case "trending": return { label: "Trending Pulse", icon: "📈" };
    case "live": return { label: "Live Desk", icon: "⚡" };
    case "newsletter": return { label: "Weekly Briefing", icon: "💌" };
    case "ai": return { label: "Artificial Intelligence", icon: "🤖" };
    case "startups": return { label: "Startups & Venture", icon: "🚀" };
    case "big-tech": return { label: "Big Tech", icon: "💻" };
    case "markets": return { label: "Markets & Finance", icon: "📊" };
    case "cybersecurity": return { label: "Cybersecurity", icon: "🔐" };
    case "science": return { label: "Science & Biotech", icon: "🔬" };
    case "programming": return { label: "Programming", icon: "⚙️" };
    case "data": return { label: "Data Engineering", icon: "💾" };
    case "cloud": return { label: "Cloud & Infrastructure", icon: "☁️" };
    case "open-source": return { label: "Open Source", icon: "🌐" };
    case "robotics": return { label: "Robotics", icon: "🦾" };
    case "opinion": return { label: "Opinion", icon: "✍️" };
    case "research": return { label: "Deep Research", icon: "🧠" };
    case "products": return { label: "Product Releases", icon: "📦" };
    default: return { label: "News Home", icon: "🏠" };
  }
};

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [starred, setStarred] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu for Beats & Resources
  const { activeItem, setActiveItem, sidebarOpen, setSidebarOpen } = useNotion();

  // ⌘K / Ctrl+K opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const info = getBreadcrumbInfo(activeItem);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-11 w-full items-center justify-between border-b border-fog/80 bg-ink/85 px-4 backdrop-blur-xs select-none">
        {/* Left Side: Sidebar Toggle & Breadcrumbs */}
        <div className="flex items-center gap-2 overflow-hidden">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-7 w-7 items-center justify-center rounded-sm hover:bg-steel text-muted hover:text-soft"
              title="Open Sidebar"
            >
              <span className="text-base font-bold">☰</span>
            </button>
          )}

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-[13px] text-muted overflow-hidden">
            <button
              onClick={() => setActiveItem("home")}
              className="hover:bg-steel hover:text-soft rounded-sm px-1.5 py-0.5 shrink-0 transition-colors"
            >
              📁 Trend Stack
            </button>
            <span className="text-ash/60 shrink-0">/</span>
            <div className="flex items-center gap-1 hover:bg-steel rounded-sm px-1.5 py-0.5 shrink-0 font-medium text-soft">
              <span className="text-sm shrink-0 select-none">{info.icon}</span>
              <span className="truncate">{info.label}</span>
            </div>
          </nav>
        </div>

        {/* Right Side: Page Actions */}
        <div className="flex items-center gap-1.5">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="hidden sm:inline-flex text-[13px] px-2 py-0.5 rounded-sm hover:bg-steel text-muted hover:text-soft border border-fog/40 bg-charcoal/30 transition-all active:scale-[0.98]"
          >
            {copied ? "Link Copied!" : "Share"}
          </button>
          {/* Mobile Beats & Resources Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden flex h-7 w-7 items-center justify-center rounded-sm hover:bg-steel text-muted hover:text-soft"
            aria-label="Menu"
          >
            <span className="text-base font-bold">☰</span>
          </button>
          {/* Menu dropdown */}
          {menuOpen && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={() => setMenuOpen(false)}
              style={{ inset: 0 }}
            >
              <div className="absolute top-12 right-4 w-48 bg-charcoal rounded-md shadow-lg border border-fog/30" onClick={e => e.stopPropagation()}>
                <ul className="flex flex-col p-2 space-y-1">
                  <li>
                    <a href="/beats" className="block px-3 py-2 rounded hover:bg-steel text-muted hover:text-soft" onClick={() => setMenuOpen(false)}>Beats Blog</a>
                  </li>
                  <li>
                    <a href="/resources" className="block px-3 py-2 rounded hover:bg-steel text-muted hover:text-soft" onClick={() => setMenuOpen(false)}>Resources</a>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {/* Star Page Button */}
          <button
            onClick={() => setStarred((v) => !v)}
            className="flex h-7 w-7 items-center justify-center rounded-sm hover:bg-steel text-muted hover:text-soft transition-colors"
            title={starred ? "Unstar Page" : "Star Page"}
          >
            <span className={cn("text-base", starred ? "text-yellow-500" : "text-ash")}>
              ★
            </span>
          </button>

          {/* Search trigger icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-7 w-7 items-center justify-center rounded-sm hover:bg-steel text-muted hover:text-soft"
            title="Search (Ctrl+K)"
          >
            <SearchIcon className="h-[15px] w-[15px]" />
          </button>

          {/* Settings Ellipsis dropdown trigger (decorative) */}
          <button
            className="flex h-7 w-7 items-center justify-center rounded-sm hover:bg-steel text-muted hover:text-soft"
            title="More Options"
          >
            <span className="text-[11px] font-bold tracking-tight">●●●</span>
          </button>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
