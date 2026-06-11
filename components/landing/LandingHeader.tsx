"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Down chevron helper icon
function ChevronDown({ active }: { active?: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("ml-1 opacity-70 transition-transform duration-200", active && "rotate-180")}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// Download icon helper
function DownloadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-1.5"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

// Custom Trend Stack Logo Icon (Double Stacked rising chevrons)
export function TrendStackLogo({ size = 18 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      width={size}
      height={size}
      alt="Trend Stack Logo"
      className="inline-block align-middle object-contain"
    />
  );
}

interface DropdownItem {
  name: string;
  desc: string;
  icon: string;
  color: string;
}

const DROPDOWN_DETAILS: Record<string, DropdownItem[]> = {
  "Beats": [
    { name: "Artificial Intelligence", desc: "LLM benchmarks & scaling telemetry", icon: "🤖", color: "text-blue-500" },
    { name: "Startups & Venture", desc: "Funding deals & early radars", icon: "🚀", color: "text-emerald-500" },
    { name: "Markets & Finance", desc: "Silicon supply chains & tech equities", icon: "📊", color: "text-amber-500" },
    { name: "Deep Research", desc: "Academic breakthroughs & labs", icon: "🧠", color: "text-purple-500" },
  ],
  "Resources": [
    { name: "Documentation", desc: "Learn to navigate the news desk", icon: "📖", color: "text-indigo-500" },
    { name: "API Docs", desc: "Integrate automated agent feeds", icon: "⚡", color: "text-cyan-500" },
    { name: "Developer Community", desc: "Contribute to GitHub repositories", icon: "💬", color: "text-violet-500" },
    { name: "Research Archive", desc: "Historical intelligence reports", icon: "🗄️", color: "text-rose-500" },
  ]
};

export function LandingHeader() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = [
    { label: "Beats", hasDropdown: true },
    { label: "Blog", hasDropdown: false, href: "#blog" },
    { label: "Resources", hasDropdown: true },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-zinc-100/50"
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <TrendStackLogo size={32} />
          <span className="font-sans font-extrabold text-[17px] text-black tracking-tight flex items-center">
            Trend Stack
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {item.hasDropdown ? (
                <button
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[13.5px] font-medium text-zinc-650 hover:text-zinc-950 transition-colors flex items-center",
                    activeMenu === item.label && "bg-zinc-50 text-zinc-950"
                  )}
                >
                  {item.label}
                  <ChevronDown active={activeMenu === item.label} />
                </button>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="px-4 py-1.5 rounded-full text-[13.5px] font-medium text-zinc-650 hover:text-zinc-950 transition-colors block"
                >
                  {item.label}
                </Link>
              )}

              {/* Dropdown Menu */}
              <AnimatePresence>
                {item.hasDropdown && activeMenu === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.08)] py-3 px-2.5 z-50 grid grid-cols-1 gap-1"
                  >
                    {DROPDOWN_DETAILS[item.label]?.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href="/dashboard"
                        className="flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all group/subitem"
                      >
                        <span className={cn("text-base select-none shrink-0 w-8 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-150/40 dark:border-zinc-800/40 group-hover/subitem:scale-110 group-hover/subitem:border-emerald-200/50 dark:group-hover/subitem:border-emerald-800/30 transition-all", subItem.color)}>
                          {subItem.icon}
                        </span>
                        <div className="flex-1 leading-tight text-left">
                          <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200 group-hover/subitem:text-emerald-600 dark:group-hover/subitem:text-emerald-400 transition-colors">
                            {subItem.name}
                          </p>
                          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5 leading-normal font-normal">
                            {subItem.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right: CTA button */}
        <Link
          href="/dashboard"
          className="bg-zinc-950 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-full text-[13.5px] font-medium transition-all hover:shadow-lg shadow-zinc-950/10 flex items-center"
        >
          Enter Hub
          <DownloadIcon />
        </Link>
      </div>
    </motion.header>
  );
}
