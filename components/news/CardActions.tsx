"use client";

import { useState } from "react";
import { BookmarkIcon, ShareIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Bookmark + share controls. A small client island so the surrounding card can
 * stay a server component. Bookmark holds local pressed state; share uses the
 * Web Share API when present and falls back to copying a deep link.
 */
export function CardActions({ slug, title }: { slug: string; title: string }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = typeof window !== "undefined" ? `${window.location.origin}/#${slug}` : `/#${slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }
    } catch {
      /* user dismissed the share sheet — nothing to do */
    }
  }

  return (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        onClick={() => setSaved((s) => !s)}
        aria-pressed={saved}
        aria-label={saved ? "Remove bookmark" : "Bookmark"}
        className={cn(
          "grid h-8 w-8 place-items-center text-ash transition-colors duration-200 hover:text-soft",
          saved && "text-accent",
        )}
      >
        <BookmarkIcon className={cn("h-4 w-4", saved && "[&>path]:fill-accent/25")} />
      </button>
      <button
        type="button"
        onClick={share}
        aria-label="Share"
        className="relative grid h-8 w-8 place-items-center text-ash transition-colors duration-200 hover:text-soft"
      >
        <ShareIcon className="h-4 w-4" />
        {copied && (
          <span className="absolute -top-7 right-0 whitespace-nowrap border border-fog bg-graphite px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-label text-mist">
            Copied
          </span>
        )}
      </button>
    </div>
  );
}
