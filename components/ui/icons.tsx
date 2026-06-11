import type { SVGProps } from "react";

/**
 * Hand-picked inline icon set (no icon dependency). All icons inherit
 * `currentColor`, share a 1.6 stroke and a 24px grid, and round their joins so
 * they sit consistently against the editorial type.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const SearchIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const SunIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
  </svg>
);

export const MoonIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </svg>
);

export const UserIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </svg>
);

export const BookmarkIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 4h12v16l-6-4-6 4V4Z" />
  </svg>
);

export const ShareIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="12" r="2.4" />
    <circle cx="18" cy="6" r="2.4" />
    <circle cx="18" cy="18" r="2.4" />
    <path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" />
  </svg>
);

export const ArrowIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const TrendUpIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </svg>
);

export const BellIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
);

export const RssIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 11a8 8 0 0 1 8 8M5 5a14 14 0 0 1 14 14" />
    <circle cx="5.5" cy="18.5" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

/* Social glyphs — simplified, filled marks for the footer. */
export const XIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 4l16 16M20 4 4 20" />
  </svg>
);

export const GithubIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 19c-4 1.2-4-2-5.5-2.5M15 21v-3.2c0-1 .3-1.7-.4-2.4 2.5-.3 4.9-1.3 4.9-5.4a4.2 4.2 0 0 0-1.2-2.9 3.9 3.9 0 0 0-.1-2.9s-1-.3-3.2 1.2a11 11 0 0 0-5.8 0C6 3.4 5 3.7 5 3.7a3.9 3.9 0 0 0-.1 2.9A4.2 4.2 0 0 0 3.7 9.5c0 4 2.4 5 4.9 5.4-.4.4-.6.9-.6 1.6V21" />
  </svg>
);

export const LinkedinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="1" />
    <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" />
  </svg>
);

export const YoutubeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="3" />
    <path d="m10 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" />
  </svg>
);
