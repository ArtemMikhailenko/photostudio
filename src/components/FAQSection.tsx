'use client'
import { useState } from 'react'
import {useTranslations} from 'next-intl'

export default function FAQSection() {
  const t = useTranslations('faq')
  const [open, setOpen] = useState<number | null>(0)

  // Get all FAQ questions as an array
  const faqKeys = ['q1', 'q2', 'q3', 'q4']
  const FAQS = faqKeys.map(key => ({
    q: t(`${key}.question`),
    a: t(`${key}.answer`)
  }))

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:py-24 overflow-hidden">
      {/* decorative half-visible poligraf image on the right */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[54%] max-w-[620px] translate-x-[18%] sm:translate-x-[12%]">
        <div className="relative h-full">
          <img src="/images/poligraf.png" alt={t('decorativeImageAlt')} className="absolute bottom-0 right-0 h-[90%] w-auto object-contain opacity-70" />
          {/* fade the image into the page background from left side, keep right edge visible */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-[#F6F3EF]/30 to-[#F6F3EF]" />
        </div>
      </div>

      {/* glass container */}
      <div className="relative z-10 overflow-hidden rounded-2xl border border-white/20 bg-transparent backdrop-blur-sm shadow-[0_20px_60px_-24px_rgba(0,0,0,0.20)] min-h-[520px]">
        <div className="p-6 sm:p-10">
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1E1E1E]">{t('title')}</h2>
            <p className="mt-2 text-[#4B4B4B]">{t('subtitle')}</p>
          </div>

          <div className="divide-y divide-white/20">
            {FAQS.map((item, idx) => {
              const isOpen = open === idx
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpen(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                    className="group flex w-full items-center gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C29B72]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white/20 rounded-md"
                  >
                    <span className="text-base sm:text-lg font-semibold text-[#1E1E1E]">{item.q}</span>
                    <span className={`ml-auto grid h-7 w-7 place-items-center rounded-full border transition-all ${isOpen ? 'rotate-45 border-[#C29B72] bg-[#C29B72]/10 text-[#C29B72]' : 'border-white/40 bg-white/40 text-[#1E1E1E]/70'}`}>+
                    </span>
                  </button>
                  {/* smooth auto-height expansion without layout jank */}
                  <div id={`faq-panel-${idx}`} role="region" className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-70'}`}>
                    <div className="overflow-hidden">
                      <p className="mt-3 pr-2 text-sm leading-relaxed text-[#1E1E1E]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* subtle top light */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  )
}
