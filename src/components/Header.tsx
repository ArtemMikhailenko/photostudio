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
    { key: "gallery", href: "/gallery", label: t('gallery'), isPage: true },
    { key: "services", href: "#services", label: t('services') },
    { key: "about", href: "#about", label: t('about') },
    { key: "contacts", href: "/contact", label: t('contacts'), isPage: true },
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
      } else if (pathname === '/gallery') {
        setActive('/gallery');
      } else if (pathname === '/contact') {
        setActive('/contact');
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
          <ul className="hidden items-center gap-3 md:flex">
            {NAV.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.key} className="group relative">
                  <Link
                    href={item.href}
                    onClick={() => setActive(item.href)}
                    className={`relative inline-block px-4 py-2.5 text-[0.95rem] font-semibold transition-all duration-500 rounded-2xl overflow-hidden ${
                      isActive 
                        ? "text-[#1E1E1E] scale-105 shadow-lg" 
                        : "text-[#4B4B4B] hover:text-[#1E1E1E] hover:scale-105"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {/* Animated gradient background for active state */}
                    <span 
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E8DFD5] via-[#F6F3EF] to-[#D4C4B0] transition-all duration-500 ${
                        isActive 
                          ? "opacity-100 scale-100" 
                          : "opacity-0 scale-90"
                      }`}
                      aria-hidden="true"
                    />
                    
                    {/* Decorative border for active state */}
                    <span 
                      className={`absolute inset-0 rounded-2xl border-2 border-[var(--primary)]/40 transition-all duration-500 ${
                        isActive 
                          ? "opacity-100 scale-100" 
                          : "opacity-0 scale-90"
                      }`}
                      aria-hidden="true"
                    />
                    
                    {/* Subtle glow effect for active state */}
                    <span 
                      className={`absolute inset-0 rounded-2xl bg-[var(--primary)] blur-xl transition-all duration-500 ${
                        isActive 
                          ? "opacity-20" 
                          : "opacity-0"
                      }`}
                      aria-hidden="true"
                    />
                    
                    {/* Hover background effect - glass morphism */}
                    <span 
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 via-white/30 to-white/40 backdrop-blur-sm transition-all duration-300 ${
                        isActive 
                          ? "opacity-0" 
                          : "opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100"
                      }`}
                      aria-hidden="true"
                    />
                    
                    {/* Shimmer effect on hover */}
                    <span 
                      className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 ${
                        isActive ? "hidden" : ""
                      }`}
                      aria-hidden="true"
                    />
                    
                    {/* Accent dot indicator for active state */}
                    {isActive && (
                      <span 
                        className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] animate-pulse shadow-lg"
                        aria-hidden="true"
                      />
                    )}
                    
                    <span className="relative z-10">{item.label}</span>
                  </Link>
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
