"use client";
import Link from "next/link";
import Image from "next/image";
import {useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mx-auto w-full max-w-7xl px-4 pt-8 pb-6 ">
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-black/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl">
        {/* subtle gradient glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(60%_120%_at_50%_0%,rgba(179,122,69,0.12),transparent_70%)] opacity-50" />

        <div className="relative flex flex-col items-center gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-5">
          {/* Brand (reuse dark logo) */}
          <Link href="/" className="flex items-center gap-3" aria-label={t('homeLabel')}>
            <Image src="/images/logo-light.svg" alt={t('logoAlt')} width={160} height={40} className="h-auto w-20" />
          </Link>

          {/* Quick links */}
          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/80">
              <li>
                <Link href="#portfolio" className="transition hover:text-white">
                  {t('portfolio')}
                </Link>
              </li>
              <li>
                <Link href="#services" className="transition hover:text-white">
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link href="#about" className="transition hover:text-white">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="#contacts" className="transition hover:text-white">
                  {t('contacts')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* CTA / Socials minimal */}
          <div className="flex items-center gap-2">
            <Link
              href="#booking"
              className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-[var(--primary-hover)]"
            >
              {t('bookNow')}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-white/10 px-5 py-3 text-center text-[11px] text-white/60 md:px-8 md:text-left">
          <p>
            {t('copyright', {year: currentYear})}
          </p>
        </div>
      </div>
    </footer>
  );
}
