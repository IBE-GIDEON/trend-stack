"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  // 3D coordinates relative to sphere center
  x3d: number;
  y3d: number;
  z3d: number;
  
  // Base 3D coordinates (for restoring original shape after distortion)
  baseX3d: number;
  baseY3d: number;
  baseZ3d: number;

  // Velocity on the sphere surface (for organic floating)
  theta: number; // horizontal angle
  phi: number;   // vertical angle
  orbitSpeed: number;
  
  // Render properties
  size: number;
  color: string;
  opacity: number;
}

interface LogoParticle {
  name: string;
  img: HTMLImageElement;
  x3d: number;
  y3d: number;
  z3d: number;
  theta: number;
  phi: number;
  orbitSpeed: number;
  scale: number;
  opacity: number;
}

function getLogoSvg(name: string, isLight: boolean): string {
  const color = isLight ? "rgba(15, 15, 15, 0.85)" : "rgba(247, 244, 235, 0.85)";
  const accent = isLight ? "#2563eb" : "#60a5fa"; // Tech-blue brand accent

  switch (name) {
    case "OpenAI":
      // High-accuracy OpenAI spiral flower vector
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M19.61 11.2a4.4 4.4 0 0 0-2.31-3.64l-1.07-.62a4.4 4.4 0 0 0-5.88 1.57l-.31.53-2.94-1.7a4.4 4.4 0 0 0-6.17.65 4.4 4.4 0 0 0 .65 6.17l1.07.62a4.4 4.4 0 0 0 1.57.4l-.27 3.12a4.4 4.4 0 0 0 3.79 4.75h.36a4.4 4.4 0 0 0 4.39-3.72l.27-3.12 2.94 1.7a4.4 4.4 0 0 0 6.17-.65 4.4 4.4 0 0 0-.65-6.17zm-8.8-6.11a2.4 2.4 0 0 1 3.2-.86l1.07.62a2.4 2.4 0 0 1 .86 3.2l-3.23 5.6-1.7-1a2.4 2.4 0 0 1-.2-3.08zm-6.2 5.09a2.4 2.4 0 0 1 .86-3.2l1.07-.62a2.4 2.4 0 0 1 3.2.86l1.7 1-5.6 3.23a2.4 2.4 0 0 1-1.23-1.27zm2.46 6.84a2.4 2.4 0 0 1-1.32-3.06l1.07-.62a2.4 2.4 0 0 1 3.06 1.32l.31 3.55a2.4 2.4 0 0 1-3.12-1.19zm8.8 6.11a2.4 2.4 0 0 1-3.2.86l-1.07-.62a2.4 2.4 0 0 1-.86-3.2l3.23-5.6 1.7 1a2.4 2.4 0 0 1 .2 3.08zm6.2-5.09a2.4 2.4 0 0 1-.86 3.2l-1.07.62a2.4 2.4 0 0 1-3.2-.86l-1.7-1 5.6-3.23c.43.34.8.77 1.03 1.27zm-2.46-6.84a2.4 2.4 0 0 1 1.32 3.06l-1.07.62a2.4 2.4 0 0 1-3.06-1.32l-.31-3.55a2.4 2.4 0 0 1 3.12 1.19z" fill="${color}" /></svg>`;
    case "Gemini":
      // Google Gemini dual sparkle vector (blue large sparkle + pink secondary sparkle)
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M11.5 2c0 4.97-4.03 9-9 9 4.97 0 9 4.03 9 9 0-4.97 4.03-9 9-9-4.97 0-9-4.03-9-9z" fill="${accent}"/><path d="M19 8c0 1.66-1.34 3-3 3 1.66 0 3 1.34 3 3 0-1.66 1.34-3 3-3-1.66 0-3-1.34-3-3z" fill="#f43f5e"/></svg>`;
    case "Anthropic":
      // Organic hand-drawn monogram "A" of Anthropic
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M18.1 19.1c-.8-2-3.1-8-5.3-13.6-.3-.7-.9-1.2-1.7-1.2h-.2c-.8 0-1.4.5-1.7 1.2L3.9 19.1c-.2.6 0 1.2.4 1.5.3.2.7.3 1 .3.5 0 1-.3 1.2-.8l1.4-3.6h8.2l1.4 3.6c.2.5.7.8 1.2.8.3 0 .7-.1 1-.3.4-.3.6-.9.4-1.5zM9.1 14.5l2.9-7.4 2.9 7.4H9.1z" fill="${color}" /></svg>`;
    case "Meta":
      // Meta infinity loop
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M16.45 6a4.43 4.43 0 0 0-3.32 1.5 4.43 4.43 0 0 0-3.32-1.5C7.26 6 5 8.26 5 11s2.26 5 4.81 5a4.43 4.43 0 0 0 3.32-1.5 4.43 4.43 0 0 0 3.32 1.5c2.55 0 4.81-2.26 4.81-5s-2.26-5-4.81-5zm-6.64 8C8.25 14 7 12.75 7 11s1.25-3 2.81-3c1.37 0 2.45.98 2.81 2.2a4 4 0 0 0-.25 1.59 4 4 0 0 0 .25 1.59C12.26 13.02 11.18 14 9.81 14zm6.64 0c-1.37 0-2.45-.98-2.81-2.2a4 4 0 0 0 .25-1.59 4 4 0 0 0-.25-1.59c.36-1.22 1.44-2.2 2.81-2.2C18.25 8 19.5 9.25 19.5 11s-1.25 3-2.81 3z" fill="${color}" /></svg>`;
    case "Mistral":
      // Double nested geometric wind chevrons of Mistral AI
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M4 5.5l8 4.8 8-4.8v3.2l-8 4.8-8-4.8V5.5zm0 5l8 4.8 8-4.8v3.2l-8 4.8-8-4.8v-3.2z" fill="#f97316"/></svg>`;
    case "Microsoft":
      // Microsoft four-colored squares
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="3" y="3" width="8" height="8" fill="#f25022" /><rect x="13" y="3" width="8" height="8" fill="#7fba00" /><rect x="3" y="13" width="8" height="8" fill="#00a4ef" /><rect x="13" y="13" width="8" height="8" fill="#ffb900" /></svg>`;
    case "xAI":
      // mathematical italic x with serif horizontal slash representing xAI
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M6 18.5l3.5-5.5L6 7.5h2.8l2.1 3.5 2.1-3.5h2.8l-3.5 5.5 3.5 5.5h-2.8L11 15l-2.1 3.5H6z M14.5 13.5h5.5v1.5h-5.5v-1.5z" fill="${color}" /></svg>`;
    case "Cohere":
      // Cohere cellular concentric organic shapes
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm-3-7c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z" fill="${accent}" fill-rule="evenodd" /></svg>`;
    case "Google":
      // Clean, four-colored Google "G" logo
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>`;
    case "Apple":
      // Apple icon silhouette matching theme color
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" fill="${color}"/></svg>`;
    case "NVIDIA":
      // NVIDIA green eye-spiral logo
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 2a10 10 0 0 0-4.3 19.1c.4.2.8-.2.8-.6v-2.2c0-.5-.3-.9-.7-1.1a7 7 0 1 1 8.4-1.2l-2-2a4 4 0 1 0-4.3.4c.5.1.8.6.8 1.1v.5c0 .4-.4.8-.8.8a6 6 0 1 1 7.2-1.7l1.7 1.7A9.95 9.95 0 0 0 12 2z" fill="#76b900" /></svg>`;
    case "GitHub":
      // GitHub Octocat matching theme color
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.646.64.699 1.026 1.592 1.026 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="${color}" /></svg>`;
    case "Amazon":
      // Amazon signature curved arrow smile
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M18.8 16c-1.3 1.5-3.3 2.3-5.3 2.3-2.6 0-4.9-1.3-6.1-3.2-.2-.3 0-.6.3-.6l1.2.3c.3.1.5 0 .6-.2.8 1.1 2.3 1.8 4 1.8 1.5 0 2.9-.6 3.8-1.7.2-.2.5-.2.7 0l1.1.9c.2.2.1.6-.3.8zm.2-2.5l.8 2.3c.1.3-.2.5-.5.4l-2.4-.6c-.3-.1-.3-.5 0-.6l1-.3-1-1.3c-.2-.3 0-.7.3-.6l1.8.7z" fill="#ff9900" /></svg>`;
    case "Tesla":
      // Tesla emblem: curved top arc and stylized T shape
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M21 3.5c-4.4.7-9 .7-13.4 0-.4 0-.8.3-.8.7v.5c0 .4.3.7.7.7h1.4c.5 0 .9.3.9.8v7.8c0 1.2-.7 2.2-1.7 2.7l-1 .5c-.3.2-.4.6-.2.9l.3.5c.2.3.6.4.9.2l1.5-.7c2-.9 4.3-.9 6.3 0l1.5.7c.3.2.7.1.9-.2l.3-.5c.2-.3.1-.7-.2-.9l-1-.5c-1-.5-1.7-1.5-1.7-2.7V8.9c0-.5.4-.8.9-.8H20.3c.4 0 .7-.3.7-.7v-.5c0-.4-.3-.7-.7-.7z" fill="#e82127"/><path d="M12 2c2.2 0 4.3.3 6.3.8.3.1.5-.1.5-.4v-.3c0-.3-.2-.5-.5-.6C16.3 1.1 14.2.8 12 .8S7.7 1.1 5.7 1.5c-.3.1-.5.3-.5.6v.3c0 .3.2.5.5.4C7.7 2.3 9.8 2 12 2z" fill="#e82127"/></svg>`;
    case "Netflix":
      // Netflix signature bold red 3D N monogram
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M5.5 3.5h3.2v17H5.5z" fill="#b9090b"/><path d="M15.3 3.5h3.2v17h-3.2z" fill="#b9090b"/><path d="M5.5 3.5h3.2l6.6 17h-3.2z" fill="#e50914"/></svg>`;
    case "Figma":
      // Figma colorful 5-shape logo grid
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M8 3a3.5 3.5 0 0 0-3.5 3.5 3.5 3.5 0 0 0 3.5 3.5h3.5V3H8z" fill="#f24e1e"/><path d="M12 6.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" fill="#ff7262"/><path d="M8 10a3.5 3.5 0 0 0-3.5 3.5 3.5 3.5 0 0 0 3.5 3.5h3.5v-7H8z" fill="#a259ff"/><path d="M12 13.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" fill="#1abcfe"/><path d="M8 17a3.5 3.5 0 0 0-3.5 3.5 3.5 3.5 0 0 0 3.5 3.5c1.9 0 3.5-1.6 3.5-3.5v-3.5H8z" fill="#0acf83"/></svg>`;
    default:
      return "";
  }
}

export function InteractiveDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isLight = true; // Landing page background is always white, so we always run in light mode
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    active: false,
    vx: 0,
    vy: 0,
    prevX: 0,
    prevY: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let logos: LogoParticle[] = [];
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Dynamic color palette mirroring Trend Stack's sleek design:
    // Tech-blues, neon violet, electric pink, clean grays
    const colors = [
      "rgba(59, 130, 246, ",  // Tech Blue
      "rgba(139, 92, 246, ",  // Violet
      "rgba(236, 72, 153, ",  // Electric Pink
      "rgba(107, 114, 128, ", // Neutral Gray
      "rgba(71, 85, 105, ",   // Slate
    ];

    // Helper for responsive layout variables (preventing clutter on mobile)
    const getResponsiveConfig = (w: number, h: number) => {
      const isMobile = w < 768;
      
      let radius = Math.min(w, h) * 0.26;
      if (isMobile) {
        if (radius < 85) radius = 85;
        if (radius > 120) radius = 120;
      } else {
        if (radius < 150) radius = 150;
        if (radius > 280) radius = 280;
      }
      
      return {
        isMobile,
        sphereRadius: radius,
        logoSize: isMobile ? 22 : 38,
        connectionMaxDist: isMobile ? 45 : 65,
        magneticRadius: isMobile ? 70 : 140,
        hoverTriggerDist: isMobile ? 45 : 80
      };
    };

    let currentConfig = getResponsiveConfig(width, height);
    let sphereRadius = currentConfig.sphereRadius;

    const createSphere = () => {
      particles = [];
      const count = 350; // Optimal for look and connection line performance

      for (let i = 0; i < count; i++) {
        // Generate uniform distribution on a sphere surface (Fibonacci spiral or random)
        const phi = Math.acos(Math.random() * 2 - 1);
        const theta = Math.random() * Math.PI * 2;

        const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
        const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
        const z = sphereRadius * Math.cos(phi);

        const colorBase = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.6 + 0.25;

        particles.push({
          x3d: x,
          y3d: y,
          z3d: z,
          baseX3d: x,
          baseY3d: y,
          baseZ3d: z,
          theta: theta,
          phi: phi,
          orbitSpeed: (Math.random() - 0.5) * 0.003, // slow surface drift
          size: Math.random() * 2 + 0.8,
          color: colorBase,
          opacity: opacity,
        });
      }
    };

    const createLogos = () => {
      const names = [
        "OpenAI", "Gemini", "Anthropic", "Meta", "Mistral", "Microsoft", "xAI", "Cohere",
        "Google", "Apple", "NVIDIA", "GitHub", "Amazon", "Tesla", "Netflix", "Figma"
      ];
      logos = names.map((name, i) => {
        // Distribute logos evenly using spherical coordinates
        const phi = Math.acos(-1 + (2 * i + 1) / names.length);
        const theta = i * Math.PI * (3 - Math.sqrt(5)); // Golden angle

        const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
        const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
        const z = sphereRadius * Math.cos(phi);

        const img = new Image();
        const currentIsLight = true;
        const svgString = getLogoSvg(name, currentIsLight);
        img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svgString);

        return {
          name,
          img,
          x3d: x,
          y3d: y,
          z3d: z,
          theta,
          phi,
          orbitSpeed: (Math.random() - 0.5) * 0.0012, // slow surface drift
          scale: 1.0,
          opacity: 0.15,
        };
      });
    };

    createSphere();
    createLogos();

    // Track the last theme to re-render logo SVG content only when theme changes
    let lastIsLight = true;

    // Rotation angles for the rolling ball
    let rotX = 0;
    let rotY = 0;
    
    // Rotation velocities
    let velX = 0.0015; // default slow spin
    let velY = 0.0025;

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      
      const currentDpr = window.devicePixelRatio || 1;
      canvas.width = width * currentDpr;
      canvas.height = height * currentDpr;
      
      currentConfig = getResponsiveConfig(width, height);
      sphereRadius = currentConfig.sphereRadius;
      
      createSphere();
      
      // Update logo coordinates based on new radius
      logos.forEach((logo) => {
        logo.x3d = sphereRadius * Math.sin(logo.phi) * Math.cos(logo.theta);
        logo.y3d = sphereRadius * Math.sin(logo.phi) * Math.sin(logo.theta);
        logo.z3d = sphereRadius * Math.cos(logo.phi);
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      
      // Calculate mouse velocity for rolling friction
      if (mouse.active) {
        mouse.vx = e.clientX - mouse.prevX;
        mouse.vy = e.clientY - mouse.prevY;
        
        // Spin the sphere based on mouse velocity
        velY += mouse.vx * 0.0004;
        velX -= mouse.vy * 0.0004;
      }
      
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.prevX = e.clientX;
      mouse.prevY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const perspective = 400; // Camera distance
    const connectionMaxDist = 65; // Max 3D distance to connect dots

    const animate = () => {
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      
      // Calculate scrollOpacity:
      // - 1.0 at scrollY = 0
      // - fades to 0.15 at scrollY = 500
      // - fades to 0.0 at scrollY = 750
      let scrollOpacity = 1.0;
      if (scrollY <= 500) {
        scrollOpacity = 1.0 - (scrollY / 500) * 0.85;
      } else if (scrollY < 750) {
        scrollOpacity = 0.15 - ((scrollY - 500) / 250) * 0.15;
      } else {
        scrollOpacity = 0.0;
      }

      // Reset transform and clear using physical size, then apply DPR scale transform
      const currentDpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, width * currentDpr, height * currentDpr);

      // Early return to preserve CPU/GPU cycles when fully scrolled past the hero
      if (scrollOpacity <= 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // Apply device pixel ratio scale transform
      ctx.setTransform(currentDpr, 0, 0, currentDpr, 0, 0);

      // Center sphere in the middle of the viewport
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const mouse = mouseRef.current;
      
      const config = getResponsiveConfig(width, height);

      // Check if light/dark theme toggled during animation loop (Landing page is always light/white background)
      const currentIsLight = true;

      // Apply drag friction to the sphere's rolling speed
      velX *= 0.95;
      velY *= 0.95;

      // Add default idle rolling rotation so it never goes static
      velX += (0.001 - velX) * 0.04;
      velY += (0.0018 - velY) * 0.04;

      rotX += velX;
      rotY += velY;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Array to store projected screen coordinates for connection lines
      const projected: { cx: number; cy: number; cz: number; opacity: number; color: string; size: number }[] = [];

      // 1. Update and Project Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Slowly drift particles on the sphere's surface for an organic fluid look
        p.theta += p.orbitSpeed;
        p.x3d = sphereRadius * Math.sin(p.phi) * Math.cos(p.theta);
        p.y3d = sphereRadius * Math.sin(p.phi) * Math.sin(p.theta);
        p.z3d = sphereRadius * Math.cos(p.phi);

        // Apply 3D Rotation to the particle coordinates
        // Rotate Y axis
        let x1 = p.x3d * cosY - p.z3d * sinY;
        let z1 = p.x3d * sinY + p.z3d * cosY;

        // Rotate X axis
        let y1 = p.y3d * cosX - z1 * sinX;
        let z2 = p.y3d * sinX + z1 * cosX;

        // 3D perspective projection
        const scale = perspective / (perspective + z2);
        let cx = centerX + x1 * scale;
        let cy = centerY + y1 * scale;

        // Mouse magnetic distortion (morph the sphere when cursor is near)
        if (mouse.active) {
          const dx = cx - mouse.x;
          const dy = cy - mouse.y;
          const dist = Math.hypot(dx, dy);
          const activeRadius = config.magneticRadius;

          if (dist < activeRadius) {
            // Push particle coordinates slightly outward in 3D
            const pushFactor = (activeRadius - dist) / activeRadius * 25;
            
            // Push direction in 2D
            const angle = Math.atan2(dy, dx);
            cx += Math.cos(angle) * pushFactor;
            cy += Math.sin(angle) * pushFactor;
          }
        }

        projected.push({
          cx,
          cy,
          cz: z2, // Depth value
          opacity: p.opacity,
          color: p.color,
          size: p.size
        });
      }

      // 2. Update and Project Logos
      const projectedLogos: { cx: number; cy: number; cz: number; opacity: number; scale: number; name: string; img: HTMLImageElement }[] = [];
      
      for (let i = 0; i < logos.length; i++) {
        const logo = logos[i];

        // Slowly drift logos on the sphere's surface for an organic fluid look
        logo.theta += logo.orbitSpeed;
        logo.x3d = sphereRadius * Math.sin(logo.phi) * Math.cos(logo.theta);
        logo.y3d = sphereRadius * Math.sin(logo.phi) * Math.sin(logo.theta);
        logo.z3d = sphereRadius * Math.cos(logo.phi);

        // Apply 3D Rotation to logo coordinates
        // Rotate Y axis
        let lx1 = logo.x3d * cosY - logo.z3d * sinY;
        let lz1 = logo.x3d * sinY + logo.z3d * cosY;

        // Rotate X axis
        let ly1 = logo.y3d * cosX - lz1 * sinX;
        let lz2 = logo.y3d * sinX + lz1 * cosX;

        // 3D perspective projection
        const lScale = perspective / (perspective + lz2);
        let lcx = centerX + lx1 * lScale;
        let lcy = centerY + ly1 * lScale;

        // Hover calculations
        let targetOpacity = 0.30; // Base state: visible but not too loud
        let targetScale = 1.0;
        const isForeground = lz2 < 30; // Only hover/focus logos on the front of the sphere

        if (isForeground) {
          if (mouse.active) {
            // General hover: make all foreground logos more visible as the sphere spins
            targetOpacity = 0.55;
            
            const dx = lcx - mouse.x;
            const dy = lcy - mouse.y;
            const dist = Math.hypot(dx, dy);

            // Close hover: highlight and scale the specific logo under the cursor
            if (dist < config.hoverTriggerDist) {
              targetOpacity = 0.90;
              targetScale = 1.35;
            }
          } else {
            // Foreground idle
            targetOpacity = 0.30;
          }
        } else {
          // Background state: always visible but faded to show depth
          targetOpacity = 0.15;
          targetScale = 0.85;
        }

        // Smoothly lerp opacity and scale changes
        logo.opacity += (targetOpacity - logo.opacity) * 0.08;
        logo.scale += (targetScale - logo.scale) * 0.08;

        // Apply magnetic push to logo coordinates
        if (mouse.active && isForeground) {
          const dx = lcx - mouse.x;
          const dy = lcy - mouse.y;
          const dist = Math.hypot(dx, dy);
          const activeRadius = config.magneticRadius;

          if (dist < activeRadius) {
            const pushFactor = ((activeRadius - dist) / activeRadius) * 20;
            const angle = Math.atan2(dy, dx);
            lcx += Math.cos(angle) * pushFactor;
            lcy += Math.sin(angle) * pushFactor;
          }
        }

        projectedLogos.push({
          cx: lcx,
          cy: lcy,
          cz: lz2,
          opacity: logo.opacity,
          scale: logo.scale,
          name: logo.name,
          img: logo.img
        });
      }

      // 3. Draw Connection Lines (Information Network for dots)
      // Only connect dots in the front-half of the sphere (cz < 40) for visual clarity
      ctx.lineWidth = 0.55;
      for (let i = 0; i < particles.length; i++) {
        const pi = projected[i];
        if (pi.cz > 40) continue; // Skip particles in the background

        for (let j = i + 1; j < particles.length; j++) {
          const pj = projected[j];
          if (pj.cz > 40) continue;

          // Distance in 2D screen space
          const dx = pi.cx - pj.cx;
          const dy = pi.cy - pj.cy;
          const screenDist = Math.hypot(dx, dy);

          if (screenDist < config.connectionMaxDist) {
            // Check 3D distance to ensure actual connection on the sphere shell
            const dist3d = Math.hypot(
              particles[i].x3d - particles[j].x3d,
              particles[i].y3d - particles[j].y3d,
              particles[i].z3d - particles[j].z3d
            );

            if (dist3d < config.connectionMaxDist * 1.5) {
              const alpha = (1 - screenDist / config.connectionMaxDist) * 0.18 * scrollOpacity;
              
              ctx.beginPath();
              ctx.strokeStyle = currentIsLight 
                ? `rgba(59, 130, 246, ${alpha * 0.8})`
                : `rgba(147, 197, 253, ${alpha})`; // Subtle blue line
              ctx.moveTo(pi.cx, pi.cy);
              ctx.lineTo(pj.cx, pj.cy);
              ctx.stroke();
            }
          }
        }
      }

      // 4. Draw Logo Network Connections (connecting logos to surrounding dots)
      for (let i = 0; i < logos.length; i++) {
        const logoProj = projectedLogos[i];
        if (logoProj.cz > 40) continue; // Skip background logo connections

        for (let j = 0; j < particles.length; j++) {
          const pj = projected[j];
          if (pj.cz > 40) continue;

          const dx = logoProj.cx - pj.cx;
          const dy = logoProj.cy - pj.cy;
          const screenDist = Math.hypot(dx, dy);

          if (screenDist < config.connectionMaxDist * 1.25) {
            const dist3d = Math.hypot(
              logos[i].x3d - particles[j].x3d,
              logos[i].y3d - particles[j].y3d,
              logos[i].z3d - particles[j].z3d
            );

            if (dist3d < config.connectionMaxDist * 1.8) {
              // Lines get brighter when the logo is highlighted/hovered
              const alpha = (1 - screenDist / (config.connectionMaxDist * 1.25)) * 0.45 * logoProj.opacity * scrollOpacity;
              ctx.beginPath();
              ctx.lineWidth = 0.7;
              ctx.strokeStyle = currentIsLight 
                ? `rgba(59, 130, 246, ${alpha * 0.75})`
                : `rgba(139, 92, 246, ${alpha * 0.95})`; // Violet accent lines on dark mode
              ctx.moveTo(logoProj.cx, logoProj.cy);
              ctx.lineTo(pj.cx, pj.cy);
              ctx.stroke();
            }
          }
        }
      }

      // 5. Draw Particles
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        
        // Depth scale factor: particles in front (cz < 0) are larger and brighter
        const depthScale = (perspective - p.cz) / perspective;
        const opacity = Math.max(0.08, p.opacity * depthScale * 0.8) * scrollOpacity;
        const radius = Math.max(0.4, p.size * depthScale);

        ctx.beginPath();
        ctx.fillStyle = `${p.color}${opacity})`;
        ctx.arc(p.cx, p.cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 6. Draw Logos and tooltips
      for (let i = 0; i < projectedLogos.length; i++) {
        const logo = projectedLogos[i];
        
        if (logo.img && logo.img.complete) {
          const depthScale = (perspective - logo.cz) / perspective;
          const opacity = Math.max(0.01, logo.opacity * depthScale) * scrollOpacity;
          const size = config.logoSize * logo.scale * depthScale;

          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.drawImage(logo.img, logo.cx - size / 2, logo.cy - size / 2, size, size);
          ctx.restore();

          // Draw floating tooltip/pill when hovering close to a logo
          if (logo.opacity > 0.6 && logo.cz < 30 && scrollOpacity > 0.5) {
            ctx.save();
            ctx.font = "500 10px var(--font-mono), JetBrains Mono, monospace";
            
            const text = logo.name;
            const textWidth = ctx.measureText(text).width;
            const paddingX = 6;
            const paddingY = 3;
            const textX = logo.cx + size / 2 + 6;
            const textY = logo.cy + 3.5;

            // Draw pill capsule background
            ctx.beginPath();
            if (ctx.roundRect) {
              ctx.roundRect(
                textX - paddingX,
                textY - 9 - paddingY,
                textWidth + paddingX * 2,
                11 + paddingY * 2,
                4
              );
            } else {
              ctx.rect(
                textX - paddingX,
                textY - 9 - paddingY,
                textWidth + paddingX * 2,
                11 + paddingY * 2
              );
            }
            
            ctx.fillStyle = currentIsLight ? "rgba(243, 237, 224, 0.95)" : "rgba(20, 20, 20, 0.95)";
            ctx.fill();
            ctx.strokeStyle = currentIsLight ? "rgba(220, 212, 195, 0.6)" : "rgba(45, 45, 45, 0.6)";
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw company name
            ctx.fillStyle = currentIsLight ? "rgba(28, 28, 26, 0.95)" : "rgba(247, 244, 235, 0.95)";
            ctx.fillText(text, textX, textY);
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent block"
    />
  );
}
