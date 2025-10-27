const JELLY_SRC = "/video/jelly-2.mp4"; // замените на прямой .mp4 или локальный файл

export default function USPSection() {
  return (
    <section className="relative isolate overflow-hidden py-20 text-[#1E1E1E] sm:py-28">
      {/* subtle grayscale video layer over light bg */}
      {/* <video
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-15 grayscale mix-blend-multiply"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={JELLY_SRC} type="video/mp4" />
      </video> */}

      {/* overlays: subtle bronze grid + soft beige blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 600px at 85% 60%, rgba(179,122,69,0.08), transparent 60%), radial-gradient(1200px 700px at 15% 30%, rgba(228,223,213,0.15), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-15"
        style={{
          backgroundImage: "radial-gradient(rgba(179,122,69,0.15) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/50 px-4 py-1.5 text-xs text-[#4B4B4B] backdrop-blur-md">
            Наши сильные стороны
          </div>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Снимаем красиво, быстро и без сюрпризов
          </h2>
          <p className="mt-3 text-[#4B4B4B]">
            Комфорт на площадке, продуманная подсветка и чёткие сроки. Мы делаем процесс понятным и результат — предсказуемым.
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Свет и стиль", desc: "Кино‑свет, настроение и сет‑дизайн под вашу задачу." },
            { title: "Быстрые сроки", desc: "Превью в день съёмки. Готовые фото — за 2–5 дней." },
            { title: "Прозрачная цена", desc: "Фиксированные пакеты. Договор и чек." },
            { title: "Ретушь и цвет", desc: "Аккуратная ретушь, натуральные оттенки кожи." },
            { title: "Профессиональная команда", desc: "Фотограф, ассистент и визаж при необходимости." },
            { title: "Комфорт и забота", desc: "Подскажем позы, настроим свет, поддержим атмосферу." },
          ].map((c) => (
            <div
              key={c.title}
              className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/50 p-6 shadow-lg backdrop-blur-md transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/70"
            >
              {/* glow border */}
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[#B37A45]/15 to-transparent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
              {/* icon placeholder */}
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#B37A45]/10 text-[#B37A45]">★</div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-[#4B4B4B]">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#booking"
            className="rounded-full bg-[#B37A45] px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-[#9A6739]"
          >
            Забронировать съёмку
          </a>
          <a
            href="#services"
            className="rounded-full border border-white/30 bg-white/50 px-6 py-3 text-sm font-medium text-[#1E1E1E] backdrop-blur-md transition hover:bg-white/70"
          >
            Посмотреть услуги →
          </a>
        </div>
      </div>
    </section>
  );
}
