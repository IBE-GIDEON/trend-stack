"use client";

import { Hero } from "@/components/hero/Hero";
import { Footer } from "@/components/layout/Footer";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Notion Cover, Page icon, and header properties */}
      <Hero />

      <div className="flex-1 px-6 lg:px-10 py-6 max-w-editorial mx-auto w-full">
        {/* We will build active dashboard beats/sections here */}
      </div>

      <Footer />
    </div>
  );
}

