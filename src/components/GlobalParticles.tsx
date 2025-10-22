"use client";
import Particles from "./Particles";

export default function GlobalParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <Particles density={0.10} maxSize={1.2} opacity={0.18} speed={0.5} />
    </div>
  );
}
