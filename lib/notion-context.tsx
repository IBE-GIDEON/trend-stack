"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type NotionItem =
  | "home"
  | "news"
  | "trending"
  | "live"
  | "newsletter"
  | "ai"
  | "startups"
  | "big-tech"
  | "markets"
  | "cybersecurity"
  | "science"
  | "programming"
  | "data"
  | "cloud"
  | "open-source"
  | "robotics"
  | "opinion"
  | "research"
  | "products";

interface NotionContextType {
  activeItem: NotionItem;
  setActiveItem: (item: NotionItem) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const NotionContext = createContext<NotionContextType | undefined>(undefined);

export function NotionProvider({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState<NotionItem>("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Auto-collapse sidebar on smaller screens on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSidebarOpen(window.innerWidth >= 1024);
    }
  }, []);

  return (
    <NotionContext.Provider
      value={{
        activeItem,
        setActiveItem,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </NotionContext.Provider>
  );
}

export function useNotion() {
  const context = useContext(NotionContext);
  if (!context) {
    throw new Error("useNotion must be used within a NotionProvider");
  }
  return context;
}
