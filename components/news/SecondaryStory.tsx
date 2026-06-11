import { CoverArt } from "./CoverArt";
import { CategoryBadge } from "@/components/ui/Badge";
import { TrendUpIcon } from "@/components/ui/icons";
import { relativeTime } from "@/lib/utils";
import type { Article } from "@/data/types";

/**
 * Compact horizontal feature — a thumbnail beside the headline. Sits in the
 * side column next to the lead so the eye gets a clear primary → secondary
 * hierarchy without a second oversized block.
 */
export function SecondaryStory({ article }: { article: Article }) {
  return (
    <article className="group relative flex h-full gap-4 border border-fog bg-charcoal/40 p-3 transition-all duration-500 ease-apple hover:border-accent/40 hover:bg-charcoal">
      <a
        href={`#${article.slug}`}
        className="relative aspect-[4/3] w-32 shrink-0 self-start overflow-hidden sm:w-36"
        aria-label={article.title}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-apple group-hover:scale-105">
          <CoverArt seed={article.coverSeed} />
        </div>
        {article.trending && (
          <span className="absolute left-1.5 top-1.5 grid h-5 w-5 place-items-center border border-fog/70 bg-ink/70 backdrop-blur">
            <TrendUpIcon className="h-3 w-3 text-accent" />
          </span>
        )}
      </a>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-2 flex items-center justify-between">
          <CategoryBadge category={article.category} />
          <span className="font-mono text-[10px] text-ash">{relativeTime(article.publishedAt)}</span>
        </div>
        <h3 className="text-pretty text-[15px] font-semibold leading-snug text-soft transition-colors group-hover:text-accent">
          <a href={`#${article.slug}`}>
            {article.title}
          </a>
        </h3>
        <p className="mt-auto pt-3 font-mono text-[10px] text-ash">
          {article.author.name} · {article.readingMinutes}m read
        </p>
      </div>
    </article>
  );
}
