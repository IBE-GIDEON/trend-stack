"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The hero object: a faceted dark core wrapped in a geodesic wire-mesh and a
 * field of glowing nodes, orbited by a faint particle cloud.
 *
 * Why this and not bloom post-processing: every glow here comes from additive
 * blending on emissive geometry, which is effectively free on the GPU and never
 * stalls the frame. The result reads as a living "neural network sphere" while
 * holding 60fps on integrated graphics.
 */

/** Soft radial sprite for the glowing nodes — generated once at runtime. */
function useDotTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.28, "rgba(214,230,255,0.9)");
    g.addColorStop(0.6, "rgba(46,124,255,0.35)");
    g.addColorStop(1, "rgba(46,124,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

export function NeuralSphere({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const parallax = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const dust = useRef<THREE.Points>(null);
  const dotTex = useDotTexture();

  // Track the cursor at the window level so parallax responds across the whole
  // hero — the canvas itself is pointer-events-none and never intercepts clicks.
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  // Geometry is built once and reused; radii are shared so nodes sit on the mesh.
  const { coreGeo, nodeGeo, wireGeo, dustGeo } = useMemo(() => {
    const core = new THREE.IcosahedronGeometry(1.5, 0); // faceted crystal core
    const node = new THREE.IcosahedronGeometry(1.92, 2); // node lattice
    const wire = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.92, 1));

    // Particle shell around the object.
    const COUNT = 700;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 2.6 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const dustG = new THREE.BufferGeometry();
    dustG.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return { coreGeo: core, nodeGeo: node, wireGeo: wire, dustGeo: dustG };
  }, []);

  // Dispose GPU resources on unmount (these were created imperatively).
  useEffect(() => {
    return () => {
      coreGeo.dispose();
      nodeGeo.dispose();
      wireGeo.dispose();
      dustGeo.dispose();
      dotTex.dispose();
    };
  }, [coreGeo, nodeGeo, wireGeo, dustGeo, dotTex]);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;

    // Inner: continuous slow spin + a gentle vertical bob = "alive".
    if (spin.current) {
      spin.current.rotation.y += delta * 0.085;
      spin.current.rotation.x = Math.sin(t * 0.15) * 0.08;
      spin.current.position.y = Math.sin(t * 0.4) * 0.05;
    }
    // Outer: ease toward the cursor for subtle, premium parallax.
    if (parallax.current) {
      const px = pointer.current.x * 0.35;
      const py = pointer.current.y * 0.25;
      parallax.current.rotation.y += (px - parallax.current.rotation.y) * 0.04;
      parallax.current.rotation.x += (-py - parallax.current.rotation.x) * 0.04;
    }
    // Dust drifts the other way for depth.
    if (dust.current) dust.current.rotation.y -= delta * 0.02;
  });

  return (
    <group ref={parallax}>
      {/* Ambient + two coloured key lights catch the core's facets. */}
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 5]} intensity={45} color="#2E7CFF" />
      <pointLight position={[-5, -2, -3]} intensity={28} color="#34D6E8" />
      <directionalLight position={[0, 4, 3]} intensity={0.7} color="#dce8ff" />

      {/* Faint orbiting particle field. */}
      <points ref={dust} geometry={dustGeo}>
        <pointsMaterial
          map={dotTex}
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color="#7fb0ff"
        />
      </points>

      <group ref={spin}>
        {/* Faceted dark crystal core — flat shading makes the facets read. */}
        <mesh geometry={coreGeo}>
          <meshStandardMaterial
            color="#08080b"
            emissive="#15347f"
            emissiveIntensity={0.35}
            metalness={0.55}
            roughness={0.42}
            flatShading
          />
        </mesh>

        {/* Geodesic wire-mesh. */}
        <lineSegments geometry={wireGeo}>
          <lineBasicMaterial
            color="#2E7CFF"
            transparent
            opacity={0.28}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* Glowing nodes on the lattice. */}
        <points geometry={nodeGeo}>
          <pointsMaterial
            map={dotTex}
            size={0.085}
            sizeAttenuation
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color="#cfe0ff"
          />
        </points>
      </group>
    </group>
  );
}
