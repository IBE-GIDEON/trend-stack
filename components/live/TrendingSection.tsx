import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TrendingTopics } from "./TrendingTopics";
import { SecondaryStory } from "@/components/news/SecondaryStory";
import { TRENDING_ARTICLES } from "@/data/articles";

/**
 * "The Pulse" — ranked trending topics paired with the stories driving them.
 * Anchors the #trending nav target.
 */
export function TrendingSection() {
  return (
    <section id="trending" className="relative border-t border-fog/60 bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-editorial px-6 lg:px-10">
        <SectionHeader
          index="02"
          kicker="The Pulse"
          title="Trending across the network"
          action={{ label: "All trending", href: "#news" }}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <TrendingTopics className="h-full" />
          </Reveal>

          <div className="grid content-start gap-6 sm:grid-cols-2 lg:col-span-7">
            {TRENDING_ARTICLES.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.06}>
                <SecondaryStory article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
