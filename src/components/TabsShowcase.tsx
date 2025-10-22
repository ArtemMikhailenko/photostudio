"use client";

import { useMemo, useState } from "react";

type Tab = {
  key: string;
  title: string;
  blurb: string;
};

const TABS: Tab[] = [
  {
    key: "portrait",
    title: "Портрет",
    blurb: "Эмоциональные портреты с мягким светом и кинематографичной обработкой.",
  },
  {
    key: "lovestory",
    title: "Love Story",
    blurb: "Истории пары: естественные кадры, движение и искренние эмоции.",
  },
  {
    key: "commercial",
    title: "Коммерческая",
    blurb: "Контент для брендов: каталожная, lifestyle и контент для соцсетей.",
  },
];

export default function TabsShowcase() {
  const [active, setActive] = useState(0);

  const indicatorStyle = useMemo(() => ({
    transform: `translateX(${active * 100}%)`,
  }), [active]);

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="relative mx-auto grid w-full max-w-md grid-cols-3 overflow-hidden rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        {/* Sliding indicator */}
        <div
          className="absolute left-0 top-0 h-full w-1/3 rounded-full bg-white/60 shadow-sm transition-transform duration-300 ease-out dark:bg-white/15"
          style={indicatorStyle}
          aria-hidden
        />
        {TABS.map((t, i) => (
          <button
            key={t.key}
            onClick={() => setActive(i)}
            className={`relative z-10 px-3 py-2 text-sm font-medium transition-colors ${
              active === i
                ? "text-black dark:text-white"
                : "text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
            }`}
            aria-pressed={active === i}
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* Wavy underline animation under active tab */}
      <div className="relative mt-3 h-4">
        <svg
          className="absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out"
          width="220"
          height="16"
          viewBox="0 0 220 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: `translateX(calc(-50% + ${active - 1} * 110px))` }}
        >
          <path
            d="M1 8 C 21 2, 41 14, 61 8 S 101 2, 121 8 161 14, 181 8 201 2, 219 8"
            stroke="rgb(190 242 100)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Tab content */}
      <div className="mt-4 min-h-20 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-black/80 shadow-sm backdrop-blur-md transition-colors dark:border-white/10 dark:bg-white/5 dark:text-white/80">
        {TABS[active].blurb}
      </div>
    </div>
  );
}
