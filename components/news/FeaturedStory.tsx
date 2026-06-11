import { CoverArt } from "./CoverArt";
import { SecondaryStory } from "./SecondaryStory";
import { CardActions } from "./CardActions";
import { CategoryBadge, AiInsightBadge, LiveDot } from "@/components/ui/Badge";
import { relativeTime, compactNumber } from "@/lib/utils";
import type { Article } from "@/data/types";

/**
 * The front-page lead: a large cover with the headline composed over a scrim,
 * flanked by two secondary features. This is the single biggest moment on the
 * page — everything else stays calmer so this reads as "the story".
 */
export function FeaturedStory({
  lead,
  secondary,
}: {
  lead: Article;
  secondary: Article[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* ── Lead ─────────────────────────────────────────────────── */}
      <article
        id={lead.slug}
        className="surface-dark group relative col-span-12 overflow-hidden border border-fog bg-charcoal lg:col-span-8"
      >
        {/* cover */}
        <div className="absolute inset-0 transition-transform duration-700 ease-apple group-hover:scale-[1.03]">
          <CoverArt seed={lead.coverSeed} />
        </div>
        {/* scrim for legibility */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_8%,rgba(0,0,0,0.45)_45%,transparent_75%)]" />

        {/* top markers */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
          <LiveDot label="Lead Story" />
          {lead.aiInsights && <AiInsightBadge className="backdrop-blur" />}
        </div>

        {/* aspect spacer sets the height; content is absolutely placed over it */}
        <div className="aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/11]" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <CategoryBadge category={lead.category} className="mb-4" />
          <h2 className="max-w-2xl text-balance text-2xl font-semibold leading-[1.08] text-soft sm:text-3xl lg:text-[2.4rem]">
            <a href={`#${lead.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {lead.title}
            </a>
          </h2>
          <p className="mt-4 hidden max-w-xl text-[15px] leading-relaxed text-mist sm:block">
            {lead.excerpt}
          </p>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center border border-fog bg-graphite font-mono text-[11px] text-mist">
                {lead.author.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </span>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-[13px] font-medium text-soft">{lead.author.name}</p>
                <p className="font-mono text-[10px] text-ash">
                  {relativeTime(lead.publishedAt)} · {lead.readingMinutes}m read ·{" "}
                  {compactNumber(lead.views)} views
                </p>
              </div>
            </div>
            <div className="relative z-10">
              <CardActions slug={lead.slug} title={lead.title} />
            </div>
          </div>
        </div>
      </article>

      {/* ── Secondary column ─────────────────────────────────────── */}
      <div className="col-span-12 grid gap-6 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
        {secondary.map((a) => (
          <SecondaryStory key={a.id} article={a} />
        ))}
      </div>
    </div>
  );
}
