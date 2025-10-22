import Link from "next/link";

// Tip: put your actual MP4 into public/video/hero.mp4 or replace VIDEO_SRC with a direct .mp4 URL
const VIDEO_SRC = "/video/hero.mp4"; // replace with your Pixab ay direct mp4 url

export default function HeroVideo() {
  return (
    <section className="relative isolate min-h-[92vh] w-full overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover brightness-[0.25]"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster=""
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Bottom fade overlay to smooth transition into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-56 sm:h-64 bg-gradient-to-b from-transparent to-black"
      />

      {/* Neutral (grayscale) gradients and subtle noise overlay for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 600px at 75% 50%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(1200px 700px at 20% 15%, rgba(255,255,255,0.12), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center px-4 pb-24 pt-40 text-center sm:pt-44">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm text-white/85 backdrop-blur">
          Рейтинг 4.9/5 — 1,000+ клиентов
        </div>

        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
          Снимаем эмоции.
          <br />
          Создаём истории.
        </h1>

        <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-white/80">
          Портреты, love story, семейные и коммерческие съёмки. Свет, цвет и атмосфера —
          ради идеального кадра.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#booking"
            className="rounded-full bg-violet-500 px-7 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-400"
          >
            Заказать съёмку
          </Link>
          <Link
            href="#portfolio"
            className="rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
          >
            Портфолио →
          </Link>
        </div>
      </div>
    </section>
  );
}
