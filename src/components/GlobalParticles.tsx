"use client";
import Particles from "./Particles";

export default function GlobalParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <Particles density={0.10} maxSize={1.6} opacity={0.08} speed={0.25} direction="up" color="#B37A45" />
    </div>
  );
}