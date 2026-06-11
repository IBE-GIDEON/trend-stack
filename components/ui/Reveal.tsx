"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_APPLE, viewportOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  /** Stagger offset when several Reveals sit together. */
  delay?: number;
  /** Travel distance in px. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
}

/**
 * Scroll-triggered reveal. Opacity + transform only (GPU-friendly), fires once,
 * and collapses to a plain fade-in when the user prefers reduced motion.
 */
export function Reveal({ children, delay = 0, y = 18, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  // Cast keeps the union of element types from blowing up JSX prop inference.
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: EASE_APPLE, delay }}
    >
      {children}
    </MotionTag>
  );
}
