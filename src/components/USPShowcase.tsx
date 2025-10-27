import PolygonMaskParticles from "./PolygonMaskParticles";

export default function USPShowcase() {
  const items = [
    { title: "Атмосфера и забота", desc: "Тёплое общение, подсказки по позам и свету — чувствовать себя уверенно легко.", badge: "1" },
    { title: "Кино‑свет и стиль", desc: "Киносвет и сет‑дизайн под задачу. Цвет — натуральный, кожа — живая.", badge: "2" },
    { title: "Быстрые сроки", desc: "Первое превью в день съёмки. Готовые фото — за 2–5 дней.", badge: "3" },
    { title: "Прозрачная цена", desc: "Фиксированные пакеты, договор и чек. Никаких сюрпризов.", badge: "4" },
    { title: "Команда", desc: "Фотограф, ассистент и визаж — когда нужно. Слаженная работа на площадке.", badge: "5" },
    { title: "Ретушь и цвет", desc: "Аккуратная ретушь, идеальный баланс деталей и натуральных оттенков.", badge: "6" },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#F3EFE9] py-24 text-[#1E1E1E] sm:py-28">
      {/* Background: camera polygon mask particles */}
      <PolygonMaskParticles density={0.12} speed={0.35} opacity={0.18} color="#B37A45" />
      {/* soft vignette to increase legibility */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-[#F3EFE9]/50 via-transparent to-[#F3EFE9]/50" />

      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/50 px-4 py-1.5 text-xs text-[#4B4B4B] backdrop-blur-md">
            Преимущества
          </div>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Всё для красивых кадров и спокойной головы
          </h2>
          <p className="mt-3 text-[#4B4B4B]">
            Внимание к деталям, комфорт на площадке и предсказуемый результат — это наша база.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <div
              key={c.title}
              className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/50 p-6 shadow-lg backdrop-blur-md transition-transform duration-200 will-change-transform hover:-translate-y-0.5 hover:bg-white/70"
            >
              {/* glow border */}
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[#B37A45]/15 to-transparent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#B37A45]/10 text-[#B37A45] font-semibold">
                {c.badge}
              </div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-[#4B4B4B]">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#booking"
            className="rounded-full bg-[#B37A45] px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-[#9A6739]"
          >
            Забронировать съёмку
          </a>
          <a
            href="#portfolio"
            className="rounded-full border border-white/30 bg-white/50 px-6 py-3 text-sm font-medium text-[#1E1E1E] backdrop-blur-md transition hover:bg-white/70"
          >
            Портфолио →
          </a>
        </div>
      </div>
    </section>
  );
}
