"use client";

import React, { useState, useEffect, useRef } from "react";
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

// Hamburger / X icon toggle
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-all duration-300"
    >
      <AnimatePresence mode="wait">
        {open ? (
          <>
            <motion.line
              key="x1"
              x1="6" y1="6" x2="18" y2="18"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.line
              key="x2"
              x1="18" y1="6" x2="6" y2="18"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </>
        ) : (
          <>
            <motion.line key="h1" x1="4" y1="7" x2="20" y2="7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.line key="h2" x1="4" y1="12" x2="20" y2="12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.line key="h3" x1="4" y1="17" x2="20" y2="17" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          </>
        )}
      </AnimatePresence>
    </svg>
  );
}

// Custom Trend Stack Logo Icon
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
  href?: string;
}

const DROPDOWN_DETAILS: Record<string, DropdownItem[]> = {
  "Beats": [
    { name: "Artificial Intelligence", desc: "LLM benchmarks & scaling telemetry", icon: "🤖", color: "text-blue-500", href: "/dashboard" },
    { name: "Startups & Venture", desc: "Funding deals & early radars", icon: "🚀", color: "text-emerald-500", href: "/dashboard" },
    { name: "Markets & Finance", desc: "Silicon supply chains & tech equities", icon: "📊", color: "text-amber-500", href: "/dashboard" },
    { name: "Deep Research", desc: "Academic breakthroughs & labs", icon: "🧠", color: "text-purple-500", href: "/dashboard" },
  ],
  "Resources": [
    { name: "Documentation", desc: "Learn to navigate the news desk", icon: "📖", color: "text-indigo-500", href: "/dashboard" },
    { name: "API Docs", desc: "Integrate automated agent feeds", icon: "⚡", color: "text-cyan-500", href: "/dashboard" },
    { name: "Developer Community", desc: "Contribute to GitHub repositories", icon: "💬", color: "text-violet-500", href: "/dashboard" },
    { name: "Research Archive", desc: "Historical intelligence reports", icon: "🗄️", color: "text-rose-500", href: "/dashboard" },
  ]
};

// Mobile accordion section for Beats / Resources
function MobileSection({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: DropdownItem[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-[15px] font-semibold text-zinc-800"
      >
        <span>{label}</span>
        <ChevronDown active={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="pb-2 px-3 space-y-1">
              {items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href || "/dashboard"}
                    onClick={onNavigate}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 active:bg-emerald-100 transition-colors"
                  >
                    <span className={cn(
                      "text-base w-9 h-9 rounded-lg bg-zinc-50 flex items-center justify-center border border-zinc-200/60 shrink-0",
                      item.color
                    )}>
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-[13.5px] font-semibold text-zinc-800">{item.name}</p>
                      <p className="text-[11.5px] text-zinc-400 mt-0.5">{item.desc}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LandingHeader() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const menuItems = [
    { label: "Beats", hasDropdown: true },
    { label: "Blog", hasDropdown: false, href: "#blog" },
    { label: "Resources", hasDropdown: true },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-zinc-100/50"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <TrendStackLogo size={32} />
            <span className="font-sans font-extrabold text-[17px] text-black tracking-tight flex items-center">
              Trend Stack
            </span>
          </Link>

          {/* Center: Desktop Navigation Links */}
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

                {/* Desktop Dropdown */}
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

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop Enter Hub */}
            <Link
              href="/dashboard"
              className="hidden md:flex bg-zinc-950 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-full text-[13.5px] font-medium transition-all hover:shadow-lg shadow-zinc-950/10 items-center"
            >
              Enter Hub
              <DownloadIcon />
            </Link>

            {/* Mobile: Enter Hub (compact) */}
            <Link
              href="/dashboard"
              className="md:hidden bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2 rounded-full text-[12.5px] font-medium transition-all"
            >
              Enter Hub
            </Link>

            {/* Hamburger Button — mobile only */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {/* Simple inline hamburger / X so no SVG animation issues */}
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer — full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              key="drawer"
              ref={drawerRef}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-16 left-0 right-0 z-50 bg-white shadow-2xl rounded-b-2xl overflow-hidden md:hidden max-h-[85vh] overflow-y-auto"
            >
              {/* Beats Section */}
              <MobileSection
                label="🎵 Beats Blog"
                items={DROPDOWN_DETAILS["Beats"]}
                onNavigate={() => setMobileOpen(false)}
              />

              {/* Resources Section */}
              <MobileSection
                label="📚 Resources"
                items={DROPDOWN_DETAILS["Resources"]}
                onNavigate={() => setMobileOpen(false)}
              />

              {/* Blog direct link */}
              <div className="border-b border-zinc-100">
                <Link
                  href="#blog"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-5 py-4 text-[15px] font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors"
                >
                  ✍️ Blog
                </Link>
              </div>

              {/* Footer CTA */}
              <div className="px-5 py-4 bg-zinc-50">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full bg-zinc-950 hover:bg-zinc-800 text-white py-3 rounded-xl text-[14px] font-semibold transition-all gap-2"
                >
                  Enter the Hub
                  <DownloadIcon />
                </Link>
                <p className="text-center text-[11px] text-zinc-400 mt-2">
                  Your AI-powered news intelligence desk
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
