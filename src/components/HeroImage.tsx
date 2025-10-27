'use client'
import Link from "next/link";
import {useTranslations} from 'next-intl';

const HERO_IMAGE = "/images/hero-desktop-1920x1080.webp"; // hero image (swap this to your new file when provided)
const PESOK_IMAGE = "/images/pesok.jpg"; // sand texture for bottom of glass block

export default function HeroImage() {
  const t = useTranslations('hero');
  
  return (
    <section className="relative isolate min-h-[78svh] sm:min-h-[100svh] w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          filter: "brightness(0.95)",
        }}
      />

      {/* Bottom fade overlay to smooth transition into the next section - extended and smoother */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 sm:h-80 bg-gradient-to-b from-transparent via-[#F6F3EF]/10 to-[#F6F3EF]"
      />
      
      {/* Additional soft fade layer for even smoother transition */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-16"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(246,243,239,0.15) 25%, rgba(246,243,239,0.5) 50%, rgba(246,243,239,0.85) 75%, #F6F3EF 100%)",
        }}
      />

      {/* Subtle overlay for better text legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 600px at 75% 50%, rgba(194,155,114,0.08), transparent 60%), radial-gradient(1200px 700px at 20% 15%, rgba(255,255,255,0.15), transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center px-4 pb-16 pt-28 sm:pt-32">
        {/* Main content block with asymmetric glass design */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Centered soft glow behind the card */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-40 w-2/3 rounded-[32px] bg-gradient-to-r from-[#C29B72]/18 via-white/0 to-[#C29B72]/12 blur-2xl" />
          </div>
          
          {/* Main glass container */}
          <div
            className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/25 via-white/12 to-white/8 p-7 shadow-2xl backdrop-blur-sm sm:p-9"
          >
            {/* Inner glow effect */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#C29B72]/5 via-transparent to-white/10" />
            {/* Bottom sand texture (pesok) with gentle fade up */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%]"
              style={{
                backgroundImage: `url(${PESOK_IMAGE})`,
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
                opacity: 0.22,
                mixBlendMode: "overlay",
                WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5) 55%, rgba(0,0,0,0))",
                maskImage: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5) 55%, rgba(0,0,0,0))",
              }}
            />
            
            <div className="relative text-center">
              
              <div className="relative mb-3">
                {/* Decorative outlined duplicate behind (unusual, subtle) */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-2 -top-1 -z-10 translate-y-2 select-none opacity-25"
                  style={{
                    WebkitTextStroke: "10px rgba(194,155,114,0.08)",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                    lineHeight: 1.02,
                    fontWeight: 800,
                    fontSize: "clamp(2.2rem,5.5vw,4.2rem)",
                  }}
                >
                  {t('titleLine1')} {t('titleLine2')}
                </span>

                <h1 className="text-balance text-[clamp(2rem,5vw,3.8rem)] font-semibold leading-[1.08] tracking-tight text-[#1E1E1E]/90 sm:text-[clamp(2.4rem,5.2vw,4.8rem)] md:text-[clamp(2.7rem,5.4vw,5.2rem)] lg:text-[clamp(2.9rem,5.6vw,5.4rem)]">
                  <span className="block">{t('titleLine1')}</span>
                  <span className="block bg-gradient-to-r from-[#C29B72] to-[#A9825D] bg-clip-text text-transparent">{t('titleLine2')}</span>
                </h1>

                <div className="mt-3 h-[3px] w-28 rounded-full bg-gradient-to-r from-[#C29B72] via-[#A9825D] to-transparent" />
              </div>
              {/* Centered copy + actions */}
              <div className="mt-5 flex flex-col items-center gap-5">
                <p className="mx-auto max-w-xl text-pretty text-sm leading-relaxed text-[#2E2E2E]/85 sm:text-[15px]">
                  {t('subtitle')}
                </p>
                
                {/* Buttons row with interesting split design */}
                <div className="relative flex flex-wrap items-center justify-center gap-3">
                  {/* Primary CTA - morphing border + particle on hover */}
                  <Link
                    href="#booking"
                    className="group/btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--primary)] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_-12px_rgba(194,155,114,0.6)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_16px_40px_-14px_rgba(194,155,114,0.75)]"
                  >
                    {/* animated gradient border */}
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" style={{backgroundSize: '200% 100%', animation: 'shimmer 2s linear infinite'}} />
                    
                    <span className="relative z-10 mr-2.5">{t('bookShoot')}</span>
                    <span className="relative z-10 grid h-5 w-5 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover/btn:rotate-45">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </span>
                    
                    {/* inner glow */}
                    <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
                  </Link>
                  
                  {/* Secondary CTA - layered glass with icon morph */}
                  <Link
                    href="#portfolio"
                    className="group/sec relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/50 bg-gradient-to-br from-white/65 via-white/55 to-white/50 px-7 py-3.5 text-sm font-semibold text-[#1E1E1E] shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 hover:border-white/70 hover:from-white/75 hover:via-white/65 hover:to-white/60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                  >
                    <span>{t('portfolio')}</span>
                    {/* rotating arrow in capsule */}
                    <span className="relative grid h-6 w-6 place-items-center overflow-hidden rounded-full border border-[#1E1E1E]/8 bg-white/70 text-[#1E1E1E] transition-all duration-500 group-hover/sec:rotate-[360deg] group-hover/sec:border-[var(--primary)]/20">
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover/sec:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                    {/* shimmer line */}
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-opacity duration-300 group-hover/sec:opacity-100" />
                  </Link>
                </div>
                {/* badges removed per request */}
              </div>
            </div>
          </div>

        </div>

        {/* Polygraph decorative image - bottom left corner */}
       
      </div>
    </section>
  );
}
