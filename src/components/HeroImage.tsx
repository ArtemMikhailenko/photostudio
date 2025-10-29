'use client'
import Link from "next/link";
import Image from "next/image";
import {useTranslations} from 'next-intl';

const HERO_CARD_IMAGE = "/images/hero-desktop-1920x1080.webp";

export default function HeroImage() {
  const t = useTranslations('hero');
  
  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden flex items-center justify-center py-8 md:py-12 sm:mt-10">
      
      <div className="relative w-full">
        
       

        {/* Photo container with padding */}
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 z-10">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/10] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
            <Image
              src={HERO_CARD_IMAGE}
              alt="Studio Photography"
              fill
              className="object-cover"
              priority
              quality={95}
            />
            {/* Light overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" aria-hidden />
            
            {/* Text in top left corner */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 max-w-lg">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white drop-shadow-2xl mb-3 leading-tight">
                {t('titleLine1')}
              </h1>
              <p className="text-sm md:text-base text-white/90 drop-shadow-lg">
                {t('subtitle')}
              </p>
            </div>

            {/* Buttons - centered floating dock */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-12">
              <div className="relative">
                {/* soft glow under the dock */}
                <div className="absolute -inset-3 rounded-full bg-white/5 blur-2xl md:blur-sm opacity-90 pointer-events-none" aria-hidden />

                <div className="group/dock flex items-center gap-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-1.5 shadow-xl">
                  {/* Primary segment */}
                  <Link
                    href="#booking"
                    className="rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-6 py-3 md:px-8 md:py-4 font-semibold flex items-center gap-3 transition-all duration-300"
                  >
                    <span className="whitespace-nowrap">{t('bookShoot')}</span>
                    <span className="inline-flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-white/15 group-hover/dock:bg-white/20 transition-colors">
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>

                  {/* Secondary segment */}
                  <Link
                    href="/portfolio"
                    className="rounded-full px-6 py-3 md:px-8 md:py-4 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
                  >
                    <span className="whitespace-nowrap">{t('portfolio')}</span>
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover/dock:text-white group-hover/dock:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}