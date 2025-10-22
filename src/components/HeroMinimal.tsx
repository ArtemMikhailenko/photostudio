import Link from "next/link";

export default function HeroMinimal() {
  return (
    <section className="relative isolate min-h-[86vh] w-full overflow-hidden">
      {/* deep navy background tint + subtle radial highlights */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1000px 500px at 70% 10%, rgba(124,58,237,0.15), transparent 60%), radial-gradient(800px 400px at 20% 60%, rgba(14,165,233,0.12), transparent 60%), #0b1020",
        }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pb-24 pt-36 text-center sm:pt-40">
        {/* rating pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
          Рейтинг 4.9/5 — 1,000+ клиентов
        </div>

        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
          Снимаем эмоции.
          <br />
          Создаём истории.
        </h1>

        <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-white/75">
          Портреты, love story, семейные и коммерческие съёмки. Наш подход — свет, цвет и атмосфера
          ради идеального кадра в один клик.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#booking"
            className="rounded-full bg-violet-500 px-7 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-400"
          >
            Заказать съёмку
          </Link>
          <Link
            href="#about"
            className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            Узнать больше →
          </Link>
        </div>
      </div>
    </section>
  );
}
