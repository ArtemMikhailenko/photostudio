"use client";
import { useEffect, useRef } from "react";

type Props = {
  density?: number; // particles per 10k px^2
  color?: string;
  maxSize?: number; // px radius
  speed?: number; // base speed multiplier
  opacity?: number;
};

export default function Particles({ density = 0.12, color = "#ffffff", maxSize = 1.4, speed = 0.6, opacity = 0.35 }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
  const ctx = canvas.getContext("2d")!;
  if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;

    type P = { x: number; y: number; vx: number; vy: number; r: number; o: number };
    let particles: P[] = [];
    let raf = 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    function resize() {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = Math.floor((rect?.width || window.innerWidth) * dpr);
      height = Math.floor((rect?.height || window.innerHeight) * dpr);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${Math.floor(width / dpr)}px`;
      canvas.style.height = `${Math.floor(height / dpr)}px`;

      // compute count by area
      const area10k = (width / dpr) * (height / dpr) / 10000;
      const targetCount = Math.floor(area10k * density * 100);

      particles = new Array(targetCount).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (rand(-0.5, 0.5)) * speed * dpr,
        vy: (rand(-0.5, 0.5)) * speed * dpr,
        r: rand(0.4, maxSize) * dpr,
        o: rand(opacity * 0.6, opacity),
      }));
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // wrap around
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5;
        if (p.y > height + 5) p.y = -5;

        ctx.globalAlpha = p.o;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }

    resize();
    if (!prefersReduced) tick();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [color, density, maxSize, speed, opacity]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 z-0" aria-hidden />;
}
