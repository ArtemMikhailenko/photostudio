"use client";
import { useEffect, useRef } from "react";

type Props = {
  density?: number; // particles per 10k px^2
  color?: string;
  speed?: number; // base speed multiplier
  opacity?: number;
};

// Particles rendered only inside repeated "camera" silhouettes across the canvas
export default function PolygonMaskParticles({ density = 0.1, color = "#B37A45", speed = 0.35, opacity = 0.18 }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;

    type P = { x: number; y: number; vx: number; vy: number; r: number; o: number };
    let particles: P[] = [];
    let raf = 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    function roundedRectPath(p: Path2D, x: number, y: number, w: number, h: number, r: number) {
      p.moveTo(x + r, y);
      p.lineTo(x + w - r, y);
      p.quadraticCurveTo(x + w, y, x + w, y + r);
      p.lineTo(x + w, y + h - r);
      p.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      p.lineTo(x + r, y + h);
      p.quadraticCurveTo(x, y + h, x, y + h - r);
      p.lineTo(x, y + r);
      p.quadraticCurveTo(x, y, x + r, y);
    }

    function cameraShape(x: number, y: number, scale: number) {
      const w = 160 * scale;
      const h = 100 * scale;
      const r = 16 * scale;
      const p = new Path2D();
      // Body
      roundedRectPath(p, x, y, w, h, r);
      // Top prism (viewfinder hump)
      const humpW = 64 * scale;
      const humpH = 22 * scale;
      const humpR = 8 * scale;
      const px = x + 14 * scale;
      const py = y - humpH + 8 * scale;
      roundedRectPath(p, px, py, humpW, humpH, humpR);
      // Lens circle (merge into body for solid silhouette)
      const cx = x + w * 0.62;
      const cy = y + h * 0.52;
      const cr = 22 * scale;
      p.moveTo(cx + cr, cy);
      p.arc(cx, cy, cr, 0, Math.PI * 2);
      return p;
    }

    let maskGrid: { path: Path2D; x: number; y: number }[] = [];
    let combinedMask: Path2D | null = null;

    function rebuild() {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = Math.floor((rect?.width || window.innerWidth) * dpr);
      height = Math.floor((rect?.height || window.innerHeight) * dpr);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${Math.floor(width / dpr)}px`;
      canvas.style.height = `${Math.floor(height / dpr)}px`;

      // Build repeated camera shapes across viewport
      const stepX = 240 * dpr;
      const stepY = 160 * dpr;
      const s = 1 * dpr;
      maskGrid = [];
      for (let y = -40 * dpr; y < height + 80 * dpr; y += stepY) {
        for (let x = -60 * dpr; x < width + 120 * dpr; x += stepX) {
          const p = cameraShape(x, y, s);
          maskGrid.push({ path: p, x, y });
        }
      }
      // Build combined mask path once
      const combo = new Path2D();
      for (const g of maskGrid) {
        // @ts-ignore addPath is available in modern browsers' Path2D
        (combo as any).addPath ? (combo as any).addPath(g.path) : null;
      }
      combinedMask = combo;

      // particle count by area (per 10k px^2 in CSS pixels)
      const area10k = (width / dpr) * (height / dpr) / 10000;
      const targetCount = Math.floor(area10k * density * 120);

      particles = new Array(targetCount).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        // Slow upward drift with gentle left/right wobble
        vx: rand(-0.12, 0.12) * speed * dpr,
        vy: rand(-0.45, -0.18) * speed * dpr,
        r: rand(0.6, 1.6) * dpr,
        o: rand(opacity * 0.5, opacity),
      }));
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      // Apply combined clip of all camera shapes (fallback to iterative if needed)
      if (combinedMask && (ctx as any).clip) {
        try {
          ctx.clip(combinedMask, "evenodd");
        } catch {
          for (const g of maskGrid) ctx.clip(g.path, "evenodd");
        }
      } else {
        for (const g of maskGrid) ctx.clip(g.path, "evenodd");
      }

      // Draw particles inside clip
      ctx.fillStyle = color;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5;
        if (p.y > height + 5) p.y = -5;

        ctx.globalAlpha = p.o;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    }

    rebuild();
    if (!prefersReduced) tick();

    const ro = new ResizeObserver(rebuild);
    ro.observe(canvas.parentElement || canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [color, density, opacity, speed]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ opacity }}
    />
  );
}
