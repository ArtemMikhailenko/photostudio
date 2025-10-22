import Link from "next/link";
import TabsShowcase from "@/components/TabsShowcase";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[92vh] w-full overflow-hidden">
      {/* Full-bleed background photo with gradient + grain overlays */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.60), rgba(0,0,0,0.65)), url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1960&auto=format&fit=crop)',
        }}
      />
      {/* soft vignette + lime glow to the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 600px at 74% 50%, rgba(190,242,100,0.28), transparent 60%), radial-gradient(1000px 500px at 20% 12%, rgba(99,102,241,0.20), transparent 60%)",
        }}
      />
      {/* tiny stars/noise-like dots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative mx-auto flex h-full w-full max-w-7xl items-center px-4 pt-28 pb-16 sm:pt-36 sm:pb-24">
        {/* Glass content block */}
        <div className="max-w-2xl rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl ring-1 ring-black/0 [box-shadow:0_10px_40px_-10px_rgba(0,0,0,0.5)] dark:border-white/10 dark:bg-white/5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/20 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
            Креативная фотостудия
          </div>

          <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Снимаем эмоции. Создаём истории.
          </h1>

          {/* squiggle accent under title */}
          <div className="mt-4 h-5">
            <svg width="340" height="22" viewBox="0 0 340 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10 C 22 4, 42 16, 62 10 S 102 4, 122 10 162 16, 182 10 222 4, 242 10 282 16, 302 10" stroke="rgb(190 242 100)" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
            </svg>
          </div>

          <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-white/80 sm:text-lg">
            Портреты, love story, семейные и коммерческие съёмки. Свет, цвет и атмосфера — ради идеального кадра.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="#booking"
              className="rounded-full border border-white/20 bg-white px-6 py-3 text-sm font-medium text-black shadow-sm transition hover:shadow-md"
            >
              Забронировать съёмку
            </Link>
            <Link
              href="#portfolio"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white shadow-sm backdrop-blur-md transition hover:bg-white/20"
            >
              Портфолио
            </Link>
          </div>

          {/* Animated tabs */}
          <div className="mt-8">
            <TabsShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
