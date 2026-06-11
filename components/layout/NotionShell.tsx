"use client";

import { useNotion } from "@/lib/notion-context";
import { NotionSidebar } from "./NotionSidebar";
import { Navbar } from "./Navbar";
import { cn } from "@/lib/utils";

export function NotionShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen } = useNotion();

  return (
    <div className="flex h-screen w-full bg-ink text-soft overflow-hidden transition-colors duration-300">
      {/* Notion left-hand sidebar */}
      <NotionSidebar onSearchOpen={() => {
        // Trigger the search overlay inside Navbar by pressing Ctrl+K or dispatching event
        if (typeof window !== "undefined") {
          const e = new KeyboardEvent("keydown", {
            key: "k",
            ctrlKey: true,
            bubbles: true,
          });
          window.dispatchEvent(e);
        }
      }} />

      {/* Main workspace container */}
      <div className={cn(
        "flex flex-1 flex-col h-screen overflow-hidden min-w-0 transition-all duration-300",
        sidebarOpen ? "lg:pl-[240px]" : "lg:pl-0"
      )}>
        <Navbar />
        <main id="main" className="flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
