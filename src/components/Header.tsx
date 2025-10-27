"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import {useLocale, useTranslations} from 'next-intl';
import {useRouter, usePathname, Link} from '@/i18n/routing';

export default function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  
  const NAV = useMemo(() => [
    { key: "portfolio", href: "/portfolio", label: t('portfolio'), isPage: true },
    { key: "equipment", href: "/equipment", label: t('equipment'), isPage: true },
    { key: "services", href: "#services", label: t('services') },
    { key: "about", href: "#about", label: t('about') },
    { key: "contacts", href: "#contacts", label: t('contacts') },
  ], [t]);
  
  const [active, setActive] = useState<string>("");
  const LANGS = useMemo(
    () => [
      { code: "ru", label: "RU" },
      { code: "en", label: "EN" },
    ],
    []
  );
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const setFromHash = () => {
      // Check if we're on a specific page
      if (pathname === '/portfolio') {
        setActive('/portfolio');
      } else if (pathname === '/equipment') {
        setActive('/equipment');
      } else {
        setActive(window.location.hash);
      }
    };
    setFromHash();
    window.addEventListener("hashchange", setFromHash);
    return () => window.removeEventListener("hashchange", setFromHash);
  }, [pathname]);

  // Close dropdown on outside click or ESC
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!langOpen) return;
      const t = e.target as Node;
      if (langRef.current && !langRef.current.contains(t)) setLangOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLangOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);
  
  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
    setLangOpen(false);
  }

  return (
    <header className="fixed left-0 right-0 top-3 z-50 px-4">
      {/* Soft outer glow behind the header */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[68px] w-[min(92%,1100px)] -translate-x-1/2 rounded-3xl bg-[radial-gradient(60%_120%_at_50%_0%,rgba(179,122,69,0.15),transparent_70%)] opacity-40 blur-2xl motion-safe:animate-[pulse_6s_ease-in-out_infinite] "
      />

      {/* Glassmorphism container that floats over hero */}
      <div className="mx-auto w-full max-w-7xl rounded-4xl border border-white/30 bg-white/15 shadow-lg backdrop-blur-sm">
  <nav className="flex items-center justify-between px-5 py-1 md:py-0">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 select-none text-base font-semibold tracking-tight text-[#1E1E1E]"
            aria-label="На главную"
          >
            <Image
              src="/images/logo-dark.svg"
              alt="Логотип"
              width={300}
              height={72}
              priority
              sizes="(max-width: 768px) 220px, 300px"
              className="h-16 md:h-[4.5rem] w-auto"
            />
          </Link>

          {/* Nav links */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.key} className="group relative">
                  <Link
                    href={item.href}
                    onClick={() => setActive(item.href)}
                    className={`relative text-[0.95rem] font-medium transition-colors ${
                      isActive ? "text-[var(--primary)]" : "text-[#4B4B4B] hover:text-[#1E1E1E]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                  {/* Wavy underline with stroke-dash animation (bigger) */}
                  <svg
                    className={`pointer-events-none absolute left-1/2 -translate-x-1/2 top-[calc(100%+2px)] h-6 w-[90px] opacity-0 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "group-hover:opacity-100"
                    }`}
                    viewBox="0 0 90 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12 C 14 6, 26 18, 38 12 S 62 6, 74 12 86 18, 88 12"
                      stroke="var(--primary)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      style={{ strokeDasharray: 140, strokeDashoffset: 140 }}
                      className={`${
                        isActive
                          ? "[stroke-dashoffset:0]"
                          : "group-hover:motion-safe:animate-[dash_1.1s_ease_forwards]"
                      }`}
                    />
                  </svg>
                </li>
              );
            })}
          </ul>

          {/* Right side: Language switcher + CTA */}
          <div className="hidden items-center gap-4 md:flex">
            {/* Language dropdown */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                className={`group flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3.5 py-1 text-sm font-semibold text-[#1E1E1E] shadow-sm backdrop-blur-md transition hover:bg-white ${
                  langOpen ? "bg-white" : ""
                }`}
              >
                <Image src="/globe.svg" alt="Language" width={18} height={18} className="opacity-80 group-hover:opacity-100" />
                <span className="tracking-wide">{LANGS.find((l) => l.code === locale)?.label ?? "RU"}</span>
                <svg
                  className={`h-4 w-4 text-[#1E1E1E]/70 transition-transform ${langOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 7l5 6 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {langOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-1 shadow-xl backdrop-blur-md"
                >
                  {LANGS.map((l) => {
                    const isActive = l.code === locale;
                    return (
                      <button
                        key={l.code}
                        role="option"
                        aria-selected={isActive}
                        type="button"
                        disabled={isPending}
                        onClick={() => onSelectChange(l.code)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                          isActive
                            ? "bg-[#1E1E1E] text-white"
                            : "text-[#1E1E1E] hover:bg-white"
                        }`}
                      >
                        <span>{l.label}</span>
                        {isActive ? (
                          <span className="h-2 w-2 rounded-full bg-current" aria-hidden />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-transparent" aria-hidden />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CTA */}
            <div>
              <Link
                href="#booking"
                className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md transition hover:bg-[var(--primary-hover)]"
              >
                {t('bookCTA')}
              </Link>
            </div>
          </div>

          {/* Minimal mobile action (no JS) */}
          <div className="md:hidden">
            <Link
              href="#contacts"
              className="rounded-full border border-white/30 bg-white/70 px-3 py-1.5 text-xs font-medium text-[#1E1E1E] shadow-sm backdrop-blur-md transition hover:bg-white"
            >
              {t('contactsCTA')}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
