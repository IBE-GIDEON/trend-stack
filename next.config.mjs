/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The hero relies on three.js; transpiling keeps tree-shaking predictable.
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
    // Pre-approved remote source so editors can swap generated cover art for
    // real photography without touching component code.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  // Cover art is generated at build time, so the demo build never blocks on a
  // lint pass. Type-checking stays ON — correctness is not negotiable.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
