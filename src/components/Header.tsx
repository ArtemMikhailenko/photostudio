"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type NavItem = { key: string; href: string; label: string };

const NAV: NavItem[] = [
  { key: "portfolio", href: "#portfolio", label: "Портфолио" },
  { key: "services", href: "#services", label: "Услуги" },
  { key: "about", href: "#about", label: "О нас" },
  { key: "contacts", href: "#contacts", label: "Контакты" },
];

export default function Header() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const setFromHash = () => setActive(window.location.hash);
    setFromHash();
    window.addEventListener("hashchange", setFromHash);
    return () => window.removeEventListener("hashchange", setFromHash);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-3 z-50 px-4">
      {/* Soft outer glow behind the header */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[68px] w-[min(92%,1100px)] -translate-x-1/2 rounded-3xl bg-[radial-gradient(60%_120%_at_50%_0%,rgba(255,255,255,0.20),transparent_70%)] opacity-40 blur-2xl motion-safe:animate-[pulse_6s_ease-in-out_infinite] "
      />

      {/* Glassmorphism container that floats over hero */}
      <div className="mx-auto w-full max-w-7xl rounded-4xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-white/10 dark:border-white/15 dark:bg-black/20 supports-[backdrop-filter]:dark:bg-black/20">
        <nav className="flex items-center justify-between px-5 py-6">
          {/* Brand */}
          <Link href="/" className="select-none text-base font-semibold tracking-tight text-white">
            PhotoStudio
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
                      isActive ? "text-white" : "text-white/80 hover:text-white"
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
                      stroke="white"
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

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="#booking"
              className="rounded-full border border-white/20 bg-white/80 px-4 py-2 text-sm font-medium text-black shadow-sm backdrop-blur-md transition hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-zinc-900/70 dark:text-white dark:hover:bg-zinc-900"
            >
              Заказать
            </Link>
          </div>

          {/* Minimal mobile action (no JS) */}
          <div className="md:hidden">
            <Link
              href="#contacts"
              className="rounded-full border border-white/20 bg-white/70 px-3 py-1.5 text-xs font-medium text-black shadow-sm backdrop-blur-md transition hover:bg-white dark:border-white/10 dark:bg-zinc-900/70 dark:text-white dark:hover:bg-zinc-900"
            >
              Контакты
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
