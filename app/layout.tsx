import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Editorial voice (Inter) + technical/data voice (JetBrains Mono), exposed as
// CSS variables the design system reads. `display: swap` avoids invisible text.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trend-stack.example"),
  title: {
    default: "Trend Stack — The Future of Technology Intelligence",
    template: "%s · Trend Stack",
  },
  description:
    "Experience liftoff with the next-generation technology intelligence platform. Trend Stack coordinates intelligent data agents to track AI, startups, markets, and deep research.",
  keywords: ["Trend Stack", "technology intelligence", "AI", "startups", "markets", "venture capital", "research"],
  authors: [{ name: "Trend Stack Team" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    title: "Trend Stack — The Future of Technology Intelligence",
    description:
      "Experience liftoff with the next-generation technology intelligence platform. Trend Stack coordinates intelligent data agents to track AI, startups, markets, and deep research.",
    siteName: "Trend Stack",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trend Stack — The Future of Technology Intelligence",
    description: "Experience liftoff with the next-generation technology intelligence platform.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  colorScheme: "dark light",
};

// Apply the saved theme before first paint to prevent a flash of the wrong one.
const themeInit = `(function(){try{var t=localStorage.getItem('viz-theme')||'light';document.documentElement.classList.toggle('light',t==='light');document.documentElement.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="antialiased min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-555 selection:bg-blue-500/10 selection:text-blue-500">
        {children}
      </body>
    </html>
  );
}
