"use client";

import { useNotion, type NotionItem } from "@/lib/notion-context";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
import { SearchIcon, UserIcon, BookmarkIcon } from "@/components/ui/icons";
import Link from "next/link";

interface SidebarSectionItem {
  id: NotionItem;
  label: string;
  icon: string;
}

const GENERAL_PAGES: SidebarSectionItem[] = [
  { id: "home", label: "News Home", icon: "🏠" },
  { id: "news", label: "Latest Stories", icon: "📰" },
  { id: "trending", label: "Trending Pulse", icon: "📈" },
  { id: "live", label: "Live Desk", icon: "⚡" },
  { id: "newsletter", label: "Weekly Briefing", icon: "💌" },
];

const BEATS_PAGES: SidebarSectionItem[] = [
  { id: "ai", label: "Artificial Intelligence", icon: "🤖" },
  { id: "startups", label: "Startups & Venture", icon: "🚀" },
  { id: "big-tech", label: "Big Tech", icon: "💻" },
  { id: "markets", label: "Markets & Finance", icon: "📊" },
  { id: "cybersecurity", label: "Cybersecurity", icon: "🔐" },
  { id: "science", label: "Science & Biotech", icon: "🔬" },
  { id: "programming", label: "Programming", icon: "⚙️" },
  { id: "data", label: "Data Engineering", icon: "💾" },
  { id: "cloud", label: "Cloud & Infrastructure", icon: "☁️" },
  { id: "open-source", label: "Open Source", icon: "🌐" },
  { id: "robotics", label: "Robotics", icon: "🦾" },
  { id: "opinion", label: "Opinion", icon: "✍️" },
  { id: "research", label: "Deep Research", icon: "🧠" },
  { id: "products", label: "Product Releases", icon: "📦" },
];

export function NotionSidebar({ onSearchOpen }: { onSearchOpen: () => void }) {
  const { activeItem, setActiveItem, sidebarOpen, setSidebarOpen } = useNotion();

  const handleItemClick = (id: NotionItem) => {
    setActiveItem(id);
    // On small screens, close sidebar upon clicking a link
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Sidebar background overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed bottom-0 top-0 left-0 z-40 flex w-[240px] h-screen flex-col border-r border-fog bg-charcoal transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Workspace Header */}
        <div className="flex h-14 items-center justify-between px-3 border-b border-fog/50">
          <Link href="/" className="flex items-center gap-2 overflow-hidden hover:opacity-85 transition-opacity">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-sm bg-accent font-mono text-[11px] font-bold text-accent-ink">
              TS
            </span>
            <span className="truncate text-[13px] font-semibold text-soft">
              Trend Stack News
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-6 w-6 items-center justify-center rounded-sm text-ash hover:bg-steel hover:text-soft font-mono text-base font-bold"
            aria-label="Collapse Sidebar"
            title="Collapse Sidebar"
          >
            «
          </button>
        </div>

        {/* Action List */}
        <div className="mt-2 px-2 space-y-[2px]">
          <button
            onClick={onSearchOpen}
            className="flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-[13px] text-muted hover:bg-steel transition-colors"
          >
            <SearchIcon className="h-4 w-4 shrink-0 text-ash" />
            <span className="flex-1">Search</span>
            <kbd className="hidden rounded bg-graphite px-1.5 py-0.5 font-mono text-[9px] text-ash sm:inline-block border border-fog/40">
              Ctrl+K
            </kbd>
          </button>

          <div className="flex items-center justify-between rounded-sm px-2.5 py-1 text-[13px] text-muted hover:bg-steel transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-base">🌓</span>
              <span>Theme Mode</span>
            </div>
            <ThemeToggle className="grid h-6 w-6 place-items-center text-muted hover:text-soft" />
          </div>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4 scrollbar-thin">
          {/* General Pages */}
          <div className="space-y-[2px]">
            <p className="px-2.5 pb-1 font-mono text-[9px] uppercase tracking-wider text-ash/80">
              Trend Stack
            </p>
            {GENERAL_PAGES.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-left text-[13px] transition-colors",
                  activeItem === item.id
                    ? "bg-steel text-soft font-medium shadow-[1px_0_0_0_rgb(var(--c-accent))_inset]"
                    : "text-muted hover:bg-steel/60 hover:text-soft"
                )}
              >
                <span className="text-base select-none">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Database Beats */}
          <div className="space-y-[2px]">
            <p className="px-2.5 pb-1 font-mono text-[9px] uppercase tracking-wider text-ash/80">
              Beats & Documents
            </p>
            {BEATS_PAGES.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-left text-[13px] transition-colors",
                  activeItem === item.id
                    ? "bg-steel text-soft font-medium shadow-[1px_0_0_0_rgb(var(--c-accent))_inset]"
                    : "text-muted hover:bg-steel/60 hover:text-soft"
                )}
              >
                <span className="text-base select-none">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="border-t border-fog/50 bg-charcoal p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center bg-graphite rounded-full border border-fog/50 font-mono text-[11px] font-bold text-soft select-none">
              U
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[12px] font-medium text-soft">Guest User</p>
              <p className="truncate text-[10px] text-ash">Free Reader Access</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
