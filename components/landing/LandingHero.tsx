"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendStackLogo } from "./LandingHeader";

// Chevron Right SVG
function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// Sparkline SVG for the markets/startups card
function Sparkline({ color = "#3b82f6" }) {
  return (
    <svg viewBox="0 0 100 30" className="w-24 h-8 opacity-80">
      <path
        d="M0 20 Q 20 5, 40 25 T 80 10 T 100 2"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LandingHero() {
  const { scrollY } = useScroll();
  const promptOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  // Stagger animation variants for elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Text writing animation variants
  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025, // Stagger speed per character
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 250,
      },
    },
  };

  const heroHeadline = "Experience liftoff with the next-gen intelligence platform";
  const headlineWords = heroHeadline.split(" ");

  const featureCards = [
    {
      title: "Real-time AI Intelligence",
      description: "Track the latest breakthroughs, model weights, and papers in machine learning directly on our live terminal feed.",
      badge: "AI & ML",
      accent: "#3b82f6", // blue
      graphic: (
        <div className="flex items-center space-x-1.5 bg-blue-50/50 border border-blue-100/30 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span className="text-[11px] font-mono text-blue-600 font-semibold tracking-wider uppercase">Llama-4 Analysis Active</span>
        </div>
      ),
    },
    {
      title: "Startup & Investment Radar",
      description: "Spot early indicators of product market fit, funding rounds, and emerging sectors before they hit mainstream feeds.",
      badge: "Venture",
      accent: "#10b981", // green
      graphic: <Sparkline color="#10b981" />,
    },
    {
      title: "Market Capital Flows",
      description: "Data-driven tech stock and commodities intelligence. Real-time tickers linked to critical market shifts and news correlation.",
      badge: "Markets",
      accent: "#f59e0b", // yellow
      graphic: (
        <div className="flex space-x-1 items-end h-8">
          <div className="w-2 bg-amber-500/20 h-4 rounded-t-sm" />
          <div className="w-2 bg-amber-500/40 h-6 rounded-t-sm" />
          <div className="w-2 bg-amber-500/60 h-5 rounded-t-sm" />
          <div className="w-2 bg-amber-500 h-8 rounded-t-sm" />
        </div>
      ),
    },
    {
      title: "Technical Research & Code",
      description: "Decoded papers, open-source repositories, and developer ecosystem trends, distilled into clean Notion-style summaries.",
      badge: "Tech Stack",
      accent: "#8b5cf6", // purple
      graphic: (
        <div className="font-mono text-[11px] text-purple-600/80 bg-purple-50 px-2.5 py-1 rounded border border-purple-100/50">
          git log --oneline -n 1
        </div>
      ),
    },
  ];

  return (
    <div className="relative z-10 flex flex-col items-center w-full">
      {/* Sphere Visual / Hero Scroll Prompter Section */}
      <section className="h-screen w-full flex flex-col justify-end items-center pb-16 relative pointer-events-none">
        {/* Subtle, animated mouse scroll-down icon that fades on scroll */}
        <motion.div
          style={{ opacity: promptOpacity }}
          className="flex flex-col items-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center pointer-events-auto z-20"
          >
            <span className="text-[10px] font-mono text-zinc-400 font-semibold tracking-widest uppercase mb-3">
              Scroll to explore
            </span>
            <div className="w-5 h-8 border border-zinc-300 rounded-full flex justify-center p-1 cursor-pointer">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-zinc-500 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 1. Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center select-none pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Top Badge logo */}
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-2.5 bg-zinc-50 px-4 py-1.5 rounded-full mb-8"
          >
            <TrendStackLogo size={24} />
            <span className="font-sans font-extrabold text-[13px] text-black tracking-tight flex items-center">
              Trend Stack Intelligence
            </span>
          </motion.div>

          {/* Heading - Writing typewriter effect */}
          <motion.h1
            variants={sentenceVariants}
            className="font-sans font-medium text-[38px] md:text-[62px] lg:text-[72px] text-zinc-900 tracking-tight leading-[1.08] max-w-3xl mb-8 flex flex-wrap justify-center"
          >
            {headlineWords.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {Array.from(word).map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
                {/* Space between words */}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </motion.h1>

          {/* Subtext explaining the platform + Trend Stack */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-[17px] md:text-[19px] text-zinc-500 max-w-xl mb-10 leading-relaxed font-light"
          >
            A technology intelligence desk running coordinated data agents. Monitor the signals that shape AI, startups, markets, and open source.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4.5 w-full sm:w-auto"
          >
            {/* Launch Workspace */}
            <Link
              href="/dashboard"
              className="bg-zinc-950 hover:bg-zinc-850 text-white font-medium text-[14px] px-8 py-3.5 rounded-full transition-all hover:shadow-xl hover:shadow-zinc-950/10 flex items-center justify-center w-full sm:w-auto"
            >
              Launch Workspace
              <ChevronRightIcon />
            </Link>

            {/* Explore Beats */}
            <Link
              href="/dashboard"
              className="bg-zinc-50 hover:bg-zinc-150 text-zinc-800 font-medium text-[14px] px-8 py-3.5 rounded-full transition-colors flex items-center justify-center w-full sm:w-auto border border-zinc-200"
            >
              Explore beats
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. What is Trend Stack section (Minimalist visual, Framer Motion) */}
      <section className="w-full max-w-[1200px] px-6 py-24 border-t border-zinc-100 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl mb-16"
        >
          <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase tracking-widest bg-zinc-50 border border-zinc-100 px-3 py-1 rounded-full">
            Under the Hood
          </span>
          <h2 className="text-[32px] md:text-[44px] font-sans font-medium text-zinc-900 tracking-tight mt-4 mb-5">
            Decoded Tech Intelligence
          </h2>
          <p className="text-[16px] text-zinc-500 leading-relaxed font-light">
            Trend Stack monitors the web, tracks developer code, and decodes real-time venture capital and market flows. No bloat, just pure data-driven summaries optimized for builders.
          </p>
        </motion.div>

        {/* Feature Grid with glass cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {featureCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group relative bg-white border border-zinc-150 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Interactive colored top indicator on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ backgroundColor: card.accent }}
              />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono tracking-widest font-semibold uppercase px-2.5 py-1 rounded bg-zinc-50 border border-zinc-100 text-zinc-500">
                    {card.badge}
                  </span>
                  {card.graphic}
                </div>

                <h3 className="text-[18px] font-sans font-semibold text-zinc-800 mb-2.5 tracking-tight group-hover:text-zinc-900 transition-colors">
                  {card.title}
                </h3>
                <p className="text-[14px] text-zinc-500 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>

              <div className="mt-8 flex items-center">
                <Link
                  href="/dashboard"
                  className="text-[13px] font-medium text-zinc-700 hover:text-zinc-950 transition-colors flex items-center group/link"
                >
                  Open in Workspace
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 transition-transform duration-200 group-hover/link:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Bottom call to action panel */}
      <section className="w-full max-w-[1200px] px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-zinc-950 text-white rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden"
        >
          {/* Backdrop dynamic glow element */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

          <div className="max-w-xl mb-8 md:mb-0 z-10">
            <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest bg-blue-950/50 border border-blue-900/50 px-3 py-1 rounded-full">
              Get Started
            </span>
            <h2 className="text-[28px] md:text-[38px] font-sans font-medium tracking-tight mt-4 mb-4">
              Enter the Trend Stack Workspace
            </h2>
            <p className="text-[15px] text-zinc-400 leading-relaxed font-light">
              Skip the reading list. Let our autonomous agents gather, prioritize, and write briefs directly in your customized workspace dashboard.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="bg-white hover:bg-zinc-100 text-zinc-950 font-medium text-[14px] px-8 py-3.5 rounded-full transition-colors flex items-center justify-center z-10 shrink-0 hover:shadow-lg shadow-white/10"
          >
            Launch Web App
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
