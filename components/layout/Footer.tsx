import Image from "next/image";
import { Logo } from "./Logo";
import {
  XIcon,
  GithubIcon,
  LinkedinIcon,
  YoutubeIcon,
  RssIcon,
} from "@/components/ui/icons";

const COLUMNS: { title: string; links: string[] }[] = [
  { title: "Sections", links: ["🤖 AI", "🚀 Startups", "💻 Big Tech", "📊 Markets", "🧠 Research", "🌐 Open Source"] },
  { title: "Company", links: ["About", "Newsroom", "Careers", "Advertise", "Contact"] },
  { title: "Resources", links: ["Newsletter", "Archives", "Events", "RSS Feed", "Developer API"] },
  { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Accessibility"] },
];

const SOCIALS = [
  { label: "X", Icon: XIcon },
  { label: "GitHub", Icon: GithubIcon },
  { label: "LinkedIn", Icon: LinkedinIcon },
  { label: "YouTube", Icon: YoutubeIcon },
  { label: "RSS", Icon: RssIcon },
];

export function Footer() {
  return (
    <footer className="relative border-t border-zinc-800/80 bg-[#121316] py-16 text-zinc-400">
      <div className="mx-auto max-w-editorial px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Masthead */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                width={32}
                height={32}
                alt="Trend Stack Logo"
                className="object-contain"
              />
              <span className="text-[15px] font-extrabold text-white tracking-tight">Trend Stack</span>
            </div>
            <p className="max-w-xs text-pretty text-[13px] leading-relaxed text-zinc-400">
              Data-driven journalism on AI, startups, markets and research — compiled inside your workspace.
            </p>
            <div className="flex items-center gap-1.5 pt-2">
              {SOCIALS.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#top"
                  aria-label={label}
                  className="grid h-8 w-8 place-items-center rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3 font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-bold">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-[13px] text-zinc-400 hover:text-white hover:underline transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-zinc-800/60 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] text-zinc-500">
            © 2026 Trend Stack Intelligence. Compiled inside Notion News Reader shell.
          </p>
          <div className="flex items-center gap-4 font-mono text-[10px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Operational
            </span>
            <span className="hidden sm:inline">Built for performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
