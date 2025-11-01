"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type ServiceCard = {
  title: string;
  subtitle: string;
  badge?: string;
  bullets?: string[];
  href: string;
  image: string;
};

function SimpleCard({ item, featured = false, standalone = false }: { item: ServiceCard; featured?: boolean; standalone?: boolean }) {
  return (
    <Link
      href={item.href}
      className={`group relative overflow-hidden rounded-[28px] border border-white/35 bg-white/10 backdrop-blur-md shadow-[0_10px_40px_-12px_rgba(0,0,0,0.35)] transition-all duration-300 ${
        featured 
          ? "col-span-2 lg:col-span-3 row-span-2" 
          : standalone 
          ? "" // без col-span для standalone карточек
          : "col-span-2 lg:col-span-2"
      } hover:border-white/60 hover:shadow-[0_16px_60px_-16px_rgba(0,0,0,0.45)] hover:-translate-y-0.5`}
    >
      {/* media */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-[1.03]"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      {/* overlays for readability */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/40" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(600px_260px_at_15%_10%,rgba(179,122,69,0.18),transparent_60%)] opacity-70" />

      {/* badge */}
      {item.badge && (
        <span className="absolute left-5 top-5 inline-flex items-center rounded-full border border-[#B37A45]/40 bg-[#B37A45]/20 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          {item.badge}
        </span>
      )}

      {/* content */}
      <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
        <div className="max-w-[90%]">
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
              {item.title}
            </h3>
            <span className="text-sm font-semibold text-white/75">{item.subtitle}</span>
          </div>

          {item.bullets && item.bullets.length > 0 && (
            <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
              {item.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70 ring-2 ring-white/20" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA */}
        <div className="mt-6 flex items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white/95 backdrop-blur-md transition-colors group-hover:border-white/70 group-hover:bg-white/20">
            Learn more
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
              <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesSection() {
  const t = useTranslations("services");
  const tSP = useTranslations("servicePages");

  const services: ServiceCard[] = [
    {
      title: t("studio.title"),
      subtitle: t("studio.subtitle"),
      badge: t("studio.badge"),
      bullets: [t("studio.bullet1"), t("studio.bullet2"), t("studio.bullet3")],
      href: "/services/studio",
      image: "/images/gallery-4x3.webp",
    },
    {
      title: t("content.title"),
      subtitle: t("content.subtitle"),
      badge: t("content.badge"),
      bullets: [t("content.bullet1"), t("content.bullet2"), t("content.bullet3")],
      href: "/services/content-2-hours",
      image: "/images/works-4x3.webp",
    },
    {
      // Business photoshoot (rename from Production to match actual service)
      title: tSP("business.title"),
      subtitle: tSP("business.subtitle"),
      href: "/services/business",
      image: "/images/equipment-4x3.webp",
    },
    {
      // Fashion shoot
      title: tSP("fashion.title"),
      subtitle: tSP("fashion.subtitle"),
      href: "/services/fashion",
      image: "/images/studio/R3N07236-HDR.webp",
    },
    {
      // Artist shoot
      title: tSP("artist.title"),
      subtitle: tSP("artist.subtitle"),
      href: "/services/artist",
      image: "/images/studio/R3N07261.webp",
    },
  ];

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:py-24 mt-10">
      {/* Section header */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center gap-3">
          <div className="h-[2px] w-10 bg-[var(--primary)]/70" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white/70">{t("title")}</span>
        </div>
        <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">{t("title")}</h2>
        <p className="mt-2 max-w-2xl text-white/80">{t("subtitle")}</p>
      </div>

      {/* Top grid: one featured (left) + two stacked on the right (as before) */}
      <div className="grid grid-cols-2 auto-rows-[240px] sm:auto-rows-[260px] gap-5 sm:gap-6 lg:grid-cols-5">
        <SimpleCard item={services[0]} featured />
        <SimpleCard item={services[1]} />
        <SimpleCard item={services[2]} />
      </div>

      {/* Bottom row: two additional services */}
     <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
  <SimpleCard item={services[3]} standalone />
  <SimpleCard item={services[4]} standalone />
</div>

    </section>
  );
}
