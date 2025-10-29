'use client'
import Link from "next/link";
import { useRef, useState } from "react";
import {useTranslations} from 'next-intl';

type ServiceCard = {
  title: string;
  subtitle: string;
  badge?: { text: string; tone?: "default" | "bronze"; align?: "left" | "right" };
  bullets: string[];
  href?: string;
  image?: string; // background image path in public/
};

function Card({ item, index }: { item: ServiceCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMouse({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
  };

  const onLeave = () => {
    setHovered(false);
    setMouse({ x: 0.5, y: 0.5 });
  };
  const bgStyle: React.CSSProperties = item.image
    ? { backgroundImage: `url(${item.image})`, filter: "brightness(0.86)" }
    : {
        background:
          index === 1
            ? "radial-gradient(1200px 800px at 70% 30%, rgba(179,122,69,0.15), transparent 60%), linear-gradient(135deg, #F6F3EF 0%, #EDE8E1 100%)"
            : "radial-gradient(1200px 800px at 30% 40%, rgba(179,122,69,0.12), transparent 60%), linear-gradient(135deg, #EEE8E1 0%, #F6F3EF 100%)",
      };

  const badgeAlign = item.badge?.align === "right" ? "right-6" : "left-6";
  const sideRight = true; // place glass panel on the right side for all cards per request

  const rX = (0.5 - mouse.y) * 10; // tilt degrees X
  const rY = (mouse.x - 0.5) * 14; // tilt degrees Y

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative overflow-hidden rounded-[28px] border border-white/30 bg-white/20 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.2)] backdrop-blur-xl will-change-transform"
      style={{
        transform: `perspective(1200px) rotateX(${rX}deg) rotateY(${rY}deg)`,
        transition: hovered
          ? "transform 60ms linear, box-shadow 200ms ease, border-color 200ms ease"
          : "transform 400ms cubic-bezier(.2,.7,.2,1), box-shadow 400ms ease, border-color 400ms ease",
        boxShadow: hovered
          ? "0 16px 60px -20px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.3)"
          : "0 8px 40px -12px rgba(0,0,0,0.2)",
        borderColor: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)",
      }}
    >
      {/* background media */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-[1.06]"
        style={bgStyle}
      />

      {/* vignettes for readability */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/40" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#B37A45]/10 via-transparent to-white/10" />

      {/* soft halo near cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1 transition-opacity duration-200"
        style={{
          background: `radial-gradient(600px 320px at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(179,122,69,0.18), transparent 60%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* animated sweep glare */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1 rotate-[22deg] opacity-0"
        style={{
        //   background:
            // "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
          animation: hovered ? "sweep 1.1s ease-out" : "none",
          opacity: hovered ? 0.55 : 0,
        }}
      />
      {/* content: full-height side glass panel from bottom to top on one side */}
      <div className="relative h-[28rem]">
        {/* peek indicator so the sliding panel is hinted even without hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-[6px] sm:w-[8px] lg:w-[10px] opacity-90 transition-opacity duration-700 group-hover:opacity-0"
          style={{
            background: "linear-gradient(to left, rgba(255,255,255,0.45), rgba(255,255,255,0))",
          }}
        >
          <div
            className="absolute inset-y-6 right-0 w-[2px]"
            style={{ background: "linear-gradient(to bottom, #B37A45, rgba(179,122,69,0))" }}
          />
        </div>
        <div
          className={`absolute inset-y-0 ${sideRight ? 'right-0' : 'left-0'} w-[82%] sm:w-[68%] lg:w-[64%] rounded-none border backdrop-blur-lg shadow-[0_10px_40px_-12px_rgba(0,0,0,0.35)] will-change-transform transform transition-transform duration-700`}
          style={{
            borderColor: 'rgba(255,255,255,0.25)',
            background: 'linear-gradient(to top, rgba(255,255,255,0.18), rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.03))',
            transform: hovered ? 'translateX(0)' : 'translateX(calc(100% - 24px))',
          }}
        >
          {/* subtle lift on hover */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {/* bronze edge line */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-2 ${sideRight ? 'left-2' : 'right-2'} w-1 rounded-full opacity-80 transition-opacity duration-500 group-hover:opacity-100`}
            style={{
              background: 'linear-gradient(to bottom, #B37A45, rgba(179,122,69,0))',
            }}
          />

          {/* panel content */}
          <div
            className={`h-full p-2 sm:p-4 sm:pt-6 ${sideRight ? 'pr-4 pl-8' : 'pl-6 pr-4'} flex flex-col justify-between items-end text-right transform transition-transform duration-700`}
            style={{ transform: hovered ? 'translateX(0)' : 'translateX(32px)' }}
          >
            <div className="mb-4 flex flex-col flex-wrap items-end justify-end gap-3">
              <h3 className="text-[26px] sm:text-[26px] leading-none font-extrabold tracking-tight text-white/85 drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">{item.title}</h3>
              <span className="text-base font-medium text-white/65">{item.subtitle}</span>
            </div>

            <ul className="mb-5 flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-[15px] text-white/75">
              {item.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/65 ring-2 ring-white/30" />
                  <span className="drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-end">
              <Link
                href={item.href || '#'}
                className="rounded-full border-2 border-white/50 bg-white/15 px-5 py-2 text-sm font-semibold text-white/95 shadow-lg backdrop-blur-md transition-colors hover:border-white hover:bg-white/25"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* glossy top edge */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/25 to-transparent" />
    </div>
  );
}

export default function ServicesSection() {
  const t = useTranslations('services');
  
  const services: ServiceCard[] = [
    {
      title: t('studio.title'),
      subtitle: t('studio.subtitle'),
      badge: { text: t('studio.badge'), tone: "bronze" as const, align: "left" as const },
      bullets: [
        t('studio.bullet1'),
        t('studio.bullet2'),
        t('studio.bullet3')
      ],
      href: "#studio",
      image: "/images/gallery-4x3.webp",
    },
    {
      title: t('content.title'),
      subtitle: t('content.subtitle'),
      badge: { text: t('content.badge'), tone: "default" as const, align: "right" as const },
      bullets: [
        t('content.bullet1'),
        t('content.bullet2'),
        t('content.bullet3')
      ],
      href: "#content",
      image: "/images/works-4x3.webp",
    },
    {
      title: t('production.title'),
      subtitle: t('production.subtitle'),
      badge: { text: t('production.badge'), tone: "default" as const, align: "right" as const },
      bullets: [
        t('production.bullet1'),
        t('production.bullet2'),
        t('production.bullet3')
      ],
      href: "#production",
      image: "/images/equipment-4x3.webp", // will fall back to gradient
    },
  ];

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:py-24">
  

      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{t('title')}</h2>
          <p className="mt-2 text-white/80">{t('subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Card key={s.title} item={s} index={i} />
        ))}
      </div>
      <style jsx>{`
        @keyframes sweep {
          0% { transform: translateX(-120%) rotate(22deg); }
          100% { transform: translateX(120%) rotate(22deg); }
        }
      `}</style>
    </section>
  );
}
