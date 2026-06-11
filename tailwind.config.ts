import type { Config } from "tailwindcss";

/**
 * Trend Stack design system.
 *
 * Philosophy: pure-black editorial canvas, a single electric-blue accent, and
 * cyan reserved ONLY for live/real-time signals. Sharp geometry — radii top out
 * at 4px on purpose. Monospace carries data; Inter carries editorial voice.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral spine — routed through CSS variables so the theme toggle can
        // invert backgrounds/text without touching a single component. Values
        // are defined per-theme in globals.css (dark is the `:root` default).
        // Roles are stable: ink/void/charcoal/graphite/steel = surfaces,
        // fog/line = hairlines, ash<muted<mist<soft = ascending text emphasis.
        ink: "rgb(var(--c-ink) / <alpha-value>)", // base canvas
        void: "rgb(var(--c-void) / <alpha-value>)", // near-black sections
        charcoal: "rgb(var(--c-charcoal) / <alpha-value>)", // primary surface
        graphite: "rgb(var(--c-graphite) / <alpha-value>)", // raised surface
        steel: "rgb(var(--c-steel) / <alpha-value>)", // hover surface
        fog: "rgb(var(--c-fog) / <alpha-value>)", // hairlines / borders
        line: "rgb(var(--c-line) / <alpha-value>)", // stronger dividers
        ash: "rgb(var(--c-ash) / <alpha-value>)", // disabled / faint
        muted: "rgb(var(--c-muted) / <alpha-value>)", // secondary text
        mist: "rgb(var(--c-mist) / <alpha-value>)", // tertiary headings
        soft: "rgb(var(--c-soft) / <alpha-value>)", // primary text / soft white

        // Accent colors — now using CSS variables to support black/cream white accent switches
        accent: {
          DEFAULT: "rgb(var(--c-accent) / <alpha-value>)",
          bright: "rgb(var(--c-accent-bright) / <alpha-value>)",
          deep: "rgb(var(--c-accent-deep) / <alpha-value>)",
          ink: "rgb(var(--c-accent-ink) / <alpha-value>)",
        },

        // Cyan — used sparingly for "live" telemetry only.
        cyan: "#34D6E8",

        // Functional signals.
        breaking: "#FF4D4D",
        up: "#35D08A",
        down: "#FF5C72",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Editorial display scale — tight tracking handled per-component.
        "display-xl": ["clamp(3.25rem, 7vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
      },
      borderRadius: {
        none: "0",
        xs: "2px",
        sm: "3px",
        DEFAULT: "4px",
        md: "4px",
      },
      letterSpacing: {
        label: "0.18em", // mono category labels
      },
      maxWidth: {
        editorial: "1320px",
      },
      boxShadow: {
        elevate: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -24px rgba(0,0,0,0.8)",
        glow: "0 0 0 1px rgba(46,124,255,0.4), 0 0 40px -8px rgba(46,124,255,0.5)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6)), radial-gradient(circle at 50% 0%, rgba(46,124,255,0.10), transparent 60%)",
      },
      transitionTimingFunction: {
        // Apple-style expressive easing.
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
        "apple-in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        "ticker-scroll": {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.7)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translate3d(0,16px,0)" },
          "100%": { opacity: "1", transform: "translate3d(0,0,0)" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
      },
      animation: {
        ticker: "ticker-scroll var(--ticker-duration, 40s) linear infinite",
        "pulse-dot": "pulse-dot 1.6s cubic-bezier(0.16,1,0.3,1) infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
