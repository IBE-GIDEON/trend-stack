import { CoverArt } from "./CoverArt";
import { CardActions } from "./CardActions";
import { CategoryBadge, AiInsightBadge } from "@/components/ui/Badge";
import { TrendUpIcon } from "@/components/ui/icons";
import { relativeTime, compactNumber } from "@/lib/utils";
import type { Article } from "@/data/types";

/**
 * Standard editorial card for the responsive grid. Sharp 1px border, a tiny
 * radius, and a restrained hover: the cover zooms, a sheen sweeps, the border
 * picks up the accent and the whole card lifts a hair. Everything the brief
 * asks a card to carry — category, headline, summary, author, publish + read
 * time, trending + AI markers, bookmark/share — lives here, sized by whitespace
 * rather than bulk.
 */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative flex h-full flex-col border border-fog bg-charcoal/40 transition-all duration-500 ease-apple hover:-translate-y-1 hover:border-accent/40 hover:bg-charcoal hover:shadow-elevate">
      {/* Cover */}
      <a
        href={`#${article.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
        aria-label={article.title}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-apple group-hover:scale-[1.05]">
          <CoverArt seed={article.coverSeed} />
        </div>
        {/* sheen sweep on hover */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 ease-apple group-hover:translate-x-full group-hover:opacity-100" />

        {/* markers */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {article.trending && (
            <span className="inline-flex items-center gap-1 border border-fog/70 bg-ink/70 px-2 py-1 font-mono text-[9px] uppercase tracking-label text-soft backdrop-blur">
              <TrendUpIcon className="h-3 w-3 text-accent" />
              Trending
            </span>
          )}
        </div>
        {article.aiInsights && <AiInsightBadge className="absolute right-3 top-3 backdrop-blur" />}
      </a>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between">
          <CategoryBadge category={article.category} />
          <span className="font-mono text-[10px] text-ash">{relativeTime(article.publishedAt)}</span>
        </div>

        <h3 className="text-pretty text-[17px] font-semibold leading-snug text-soft transition-colors duration-300 group-hover:text-white">
          <a href={`#${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {article.title}
          </a>
        </h3>

        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted">{article.excerpt}</p>

        {/* Footer meta */}
        <div className="mt-5 flex items-center justify-between border-t border-fog/60 pt-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center border border-fog bg-graphite font-mono text-[10px] text-mist">
              {article.author.name
                .split(" ")
                .map((p) => p[0])
                .join("")}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12px] font-medium text-mist">{article.author.name}</p>
              <p className="font-mono text-[10px] text-ash">
                {article.readingMinutes}m read · {compactNumber(article.views)} views
              </p>
            </div>
          </div>
          {/* z-10 so actions sit above the card-wide headline link overlay */}
          <div className="relative z-10">
            <CardActions slug={article.slug} title={article.title} />
          </div>
        </div>
      </div>
    </article>
  );
}
