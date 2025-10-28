"use client";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import Footer from './Footer';

export default function AboutPageContent() {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen relative">
      {/* Fixed background image for entire page */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/hero-desktop-1920x1080.webp"
          alt="About background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Darker overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated particles */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-[var(--primary)]/40 rounded-full opacity-60 animate-float" aria-hidden />
        <div className="absolute bottom-40 right-20 w-2 h-2 bg-white/30 rounded-full opacity-50 animate-float-delayed" aria-hidden />
        <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-[var(--accent-sand)]/30 rounded-full opacity-40 animate-float-slow" aria-hidden />
        
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center z-10">
         
          <h1 className="text-balance text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 text-white drop-shadow-2xl animate-slideIn" style={{animationDelay: '0.1s'}}>
            {t('title')}
          </h1>

          <p className="mt-4 max-w-3xl text-pretty text-lg md:text-xl leading-relaxed text-white/95 drop-shadow-lg animate-slideIn" style={{animationDelay: '0.2s'}}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16 md:pb-24 sm:pt-6 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Mission & Story - Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Mission */}
            <div className="group relative transform hover:-translate-y-2 transition-all duration-500">
              <div className="absolute -inset-2 bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-[var(--accent-sand)]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10 h-full">
                <div className="mb-6">
                  <div className="inline-flex p-4 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-2xl shadow-lg mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                    {t('mission.title')}
                  </h2>
                </div>
                <p className="text-white/90 leading-relaxed text-lg drop-shadow-md">
                  {t('mission.text')}
                </p>
              </div>
            </div>

            {/* Story */}
            <div className="group relative transform hover:-translate-y-2 transition-all duration-500">
              <div className="absolute -inset-2 bg-gradient-to-br from-[var(--accent-sand)]/20 via-transparent to-[var(--primary)]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10 h-full">
                <div className="mb-6">
                  <div className="inline-flex p-4 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-2xl shadow-lg mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                    {t('story.title')}
                  </h2>
                </div>
                <p className="text-white/90 leading-relaxed text-lg drop-shadow-md">
                  {t('story.text')}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-16">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[var(--primary)]/10 via-[var(--accent-sand)]/10 to-[var(--primary)]/10 rounded-3xl blur-xl" aria-hidden />
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl p-8 md:p-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Projects */}
                  <div className="text-center group/stat">
                    <div className="mb-3 text-5xl md:text-6xl font-bold bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] bg-clip-text text-transparent drop-shadow-lg group-hover/stat:scale-110 transition-transform duration-300">
                      {t('stats.projects')}
                    </div>
                    <div className="text-white/80 font-semibold drop-shadow-md">
                      {t('stats.projectsLabel')}
                    </div>
                  </div>

                  {/* Clients */}
                  <div className="text-center group/stat">
                    <div className="mb-3 text-5xl md:text-6xl font-bold bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] bg-clip-text text-transparent drop-shadow-lg group-hover/stat:scale-110 transition-transform duration-300">
                      {t('stats.clients')}
                    </div>
                    <div className="text-white/80 font-semibold drop-shadow-md">
                      {t('stats.clientsLabel')}
                    </div>
                  </div>

                  {/* Awards */}
                  <div className="text-center group/stat">
                    <div className="mb-3 text-5xl md:text-6xl font-bold bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] bg-clip-text text-transparent drop-shadow-lg group-hover/stat:scale-110 transition-transform duration-300">
                      {t('stats.awards')}
                    </div>
                    <div className="text-white/80 font-semibold drop-shadow-md">
                      {t('stats.awardsLabel')}
                    </div>
                  </div>

                  {/* Years */}
                  <div className="text-center group/stat">
                    <div className="mb-3 text-5xl md:text-6xl font-bold bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] bg-clip-text text-transparent drop-shadow-lg group-hover/stat:scale-110 transition-transform duration-300">
                      {t('stats.years')}
                    </div>
                    <div className="text-white/80 font-semibold drop-shadow-md">
                      {t('stats.yearsLabel')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values - 4 Cards Grid */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 drop-shadow-2xl">
              {t('values.title')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Creativity */}
              <div className="group relative transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300">
                <div className="absolute -inset-1 bg-gradient-to-br from-[var(--primary)]/30 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6 h-full">
                  <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">
                    {t('values.creativity.title')}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed drop-shadow-md">
                    {t('values.creativity.text')}
                  </p>
                </div>
              </div>

              {/* Quality */}
              <div className="group relative transform hover:-translate-y-2 hover:-rotate-1 transition-all duration-300">
                <div className="absolute -inset-1 bg-gradient-to-br from-[var(--accent-sand)]/30 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6 h-full">
                  <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">
                    {t('values.quality.title')}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed drop-shadow-md">
                    {t('values.quality.text')}
                  </p>
                </div>
              </div>

              {/* Authenticity */}
              <div className="group relative transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300">
                <div className="absolute -inset-1 bg-gradient-to-br from-[var(--primary)]/30 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6 h-full">
                  <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">
                    {t('values.authenticity.title')}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed drop-shadow-md">
                    {t('values.authenticity.text')}
                  </p>
                </div>
              </div>

              {/* Collaboration */}
              <div className="group relative transform hover:-translate-y-2 hover:-rotate-1 transition-all duration-300">
                <div className="absolute -inset-1 bg-gradient-to-br from-[var(--accent-sand)]/30 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6 h-full">
                  <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">
                    {t('values.collaboration.title')}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed drop-shadow-md">
                    {t('values.collaboration.text')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
                {t('team.title')}
              </h2>
              <p className="text-xl text-white/90 drop-shadow-lg">
                {t('team.subtitle')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="group relative transform hover:-translate-y-3 transition-all duration-500">
                <div className="absolute -inset-2 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent-sand)]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl overflow-hidden">
                  {/* Image placeholder */}
                  <div className="relative h-80 bg-gradient-to-br from-[var(--accent-beige)] to-[var(--accent-sand)] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-24 h-24 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                      {t('team.photographer.name')}
                    </h3>
                    <p className="text-[var(--primary)] font-semibold mb-3 drop-shadow-md">
                      {t('team.photographer.role')}
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed drop-shadow-md">
                      {t('team.photographer.bio')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="group relative transform hover:-translate-y-3 transition-all duration-500">
                <div className="absolute -inset-2 bg-gradient-to-br from-[var(--accent-sand)]/20 to-[var(--primary)]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl overflow-hidden">
                  {/* Image placeholder */}
                  <div className="relative h-80 bg-gradient-to-br from-[var(--accent-sand)] to-[var(--primary)] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-24 h-24 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                      {t('team.videographer.name')}
                    </h3>
                    <p className="text-[var(--primary)] font-semibold mb-3 drop-shadow-md">
                      {t('team.videographer.role')}
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed drop-shadow-md">
                      {t('team.videographer.bio')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="group relative transform hover:-translate-y-3 transition-all duration-500">
                <div className="absolute -inset-2 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent-beige)]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl overflow-hidden">
                  {/* Image placeholder */}
                  <div className="relative h-80 bg-gradient-to-br from-[var(--primary)] to-[var(--accent-beige)] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-24 h-24 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                      {t('team.editor.name')}
                    </h3>
                    <p className="text-[var(--primary)] font-semibold mb-3 drop-shadow-md">
                      {t('team.editor.role')}
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed drop-shadow-md">
                      {t('team.editor.bio')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--primary)]/20 via-[var(--accent-sand)]/20 to-[var(--primary)]/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-12 md:p-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">
                {t('cta.title')}
              </h2>
              <p className="text-xl text-white/90 mb-8 drop-shadow-lg max-w-2xl mx-auto">
                {t('cta.subtitle')}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white font-semibold rounded-full shadow-xl hover:shadow-2xl hover:shadow-[var(--primary)]/30 transition-all duration-300 hover:scale-105 text-lg"
              >
                {t('cta.button')}
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
