import { cn, seededUnit } from "@/lib/utils";

/**
 * Generated abstract cover art.
 *
 * For a data-journalism brand, deterministic data-viz covers read more
 * credibly than generic stock photography — and they're self-contained (zero
 * network, zero layout shift) and stay strictly on-palette (blue/cyan on
 * black, never rainbow). The motif is chosen from the article's seed, so a
 * given story always renders the same cover. Swapping in a real <Image> later
 * is a one-line change at the call site.
 */

/** Deterministic RNG (mulberry32) seeded from a string — identical on SSR/CSR. */
function rng(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 400;
const H = 280;

/**
 * Quantise to 2 decimals. Trig and float math can differ in the last ULP
 * between the Node (server) and browser (client) engines; rounding the emitted
 * SVG coordinates guarantees byte-identical markup and zero hydration warnings.
 */
const q = (n: number) => Math.round(n * 100) / 100;

function Topology({ seed }: { seed: string }) {
  const r = rng(seed);
  const nodes = Array.from({ length: 9 }, () => ({
    x: q(40 + r() * (W - 80)),
    y: q(30 + r() * (H - 60)),
    s: q(1.5 + r() * 2.5),
  }));
  const edges: [number, number][] = [];
  nodes.forEach((_, i) => {
    const a = nodes[i];
    const dists = nodes
      .map((n, j) => ({ j, d: (n.x - a.x) ** 2 + (n.y - a.y) ** 2 }))
      .filter((x) => x.j !== i)
      .sort((p, q) => p.d - q.d);
    edges.push([i, dists[0].j]);
    if (r() > 0.45) edges.push([i, dists[1].j]);
  });
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="rgba(46,124,255,0.45)"
          strokeWidth={0.8}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={q(n.s * 2.6)} fill="rgba(46,124,255,0.18)" />
          <circle cx={n.x} cy={n.y} r={n.s} fill={i % 3 === 0 ? "#34D6E8" : "#cfe0ff"} />
        </g>
      ))}
    </g>
  );
}

function AreaChart({ seed }: { seed: string }) {
  const r = rng(seed);
  const n = 12;
  const pts = Array.from({ length: n }, (_, i) => ({
    x: q((i / (n - 1)) * W),
    y: q(H - 30 - r() * (H - 90)),
  }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area = `${line} L${W},${H} L0,${H} Z`;
  return (
    <g>
      <path d={area} fill="url(#viz-area)" />
      <path d={line} fill="none" stroke="#2E7CFF" strokeWidth={1.4} />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={1.6} fill="#cfe0ff" />
      ))}
    </g>
  );
}

function Rings({ seed }: { seed: string }) {
  const r = rng(seed);
  const cx = W / 2;
  const cy = H / 2;
  return (
    <g>
      {Array.from({ length: 6 }, (_, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={18 + i * 20}
          fill="none"
          stroke={`rgba(46,124,255,${0.32 - i * 0.04})`}
          strokeWidth={0.8}
        />
      ))}
      {Array.from({ length: 5 }, (_, i) => {
        const ang = r() * Math.PI * 2;
        const rad = 25 + r() * 95;
        return (
          <circle
            key={i}
            cx={q(cx + Math.cos(ang) * rad)}
            cy={q(cy + Math.sin(ang) * rad)}
            r={i === 0 ? 2.6 : 1.6}
            fill={i % 2 ? "#34D6E8" : "#cfe0ff"}
          />
        );
      })}
    </g>
  );
}

function Bars({ seed }: { seed: string }) {
  const r = rng(seed);
  const n = 16;
  const bw = W / n;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const h = q(24 + r() * (H - 70));
        return (
          <rect
            key={i}
            x={q(i * bw + bw * 0.22)}
            y={q(H - h)}
            width={q(bw * 0.56)}
            height={h}
            fill={`rgba(46,124,255,${0.25 + (i / n) * 0.4})`}
          />
        );
      })}
    </g>
  );
}

const MOTIFS = [Topology, AreaChart, Rings, Bars];

export function CoverArt({
  seed,
  className,
}: {
  seed: string;
  className?: string;
}) {
  const pick = Math.min(MOTIFS.length - 1, Math.floor(seededUnit(seed) * MOTIFS.length));
  const Motif = MOTIFS[pick];

  return (
    <div className={cn("surface-dark relative h-full w-full overflow-hidden bg-void", className)}>
      {/* themed depth wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_0%,rgba(46,124,255,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85),transparent_60%)]" />

      {/* the generated motif — this is what zooms on hover */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="viz-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(46,124,255,0.4)" />
            <stop offset="100%" stopColor="rgba(46,124,255,0)" />
          </linearGradient>
        </defs>
        <Motif seed={seed} />
      </svg>

      {/* technical grid + grain */}
      <div className="absolute inset-0 bg-tech-grid opacity-40" />
      <div className="absolute inset-0 bg-noise opacity-[0.15]" />
    </div>
  );
}
