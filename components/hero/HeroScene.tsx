"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { NeuralSphere } from "./NeuralSphere";

/**
 * Canvas host for the hero object. Default-exported so it can be lazy-loaded
 * with `next/dynamic` (ssr: false) — three.js never ships in the server bundle
 * and the heavy module is split out of the initial payload.
 */
export default function HeroScene() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <Canvas
      // Clamp DPR so 4K/Retina don't render 4–8× the pixels for no visible gain.
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      // Reduced motion → render a single static frame instead of an idle loop.
      frameloop={reduced ? "demand" : "always"}
      style={{ background: "transparent" }}
    >
      <NeuralSphere reducedMotion={reduced} />
    </Canvas>
  );
}
