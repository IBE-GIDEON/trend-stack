"use client";

import React from "react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { InteractiveDots } from "@/components/landing/InteractiveDots";
import { LandingHero } from "@/components/landing/LandingHero";

import { Footer } from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-white text-zinc-950 overflow-x-hidden selection:bg-blue-100 selection:text-blue-600">
      {/* Interactive design canvas dots background */}
      <InteractiveDots />

      {/* Sticky header navigation */}
      <LandingHeader />

      {/* Hero content and features */}
      <LandingHero />

      {/* Standard dark premium footer */}
      <Footer />
    </main>
  );
}
