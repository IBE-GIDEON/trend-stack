"use client";

import { NotionDatabase } from "./NotionDatabase";
import { useNotion } from "@/lib/notion-context";

export function NewsSection() {
  const { activeItem } = useNotion();

  // If the user selects a specific beat, we just display the database.
  // If the user is on general pages like live or newsletter, we also show it or let those sections take focus.
  return (
    <section id="news" className="relative bg-ink py-10">
      <div className="mx-auto max-w-editorial px-6 lg:px-10">
        <NotionDatabase />
      </div>
    </section>
  );
}
