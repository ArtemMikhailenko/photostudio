"use client";
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';
import HeroMinimal from './HeroMinimal';
import Footer from './Footer';

export default function ContactPageContent() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen relative">
      {/* Fixed background image for entire page */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/hero-desktop-1920x1080.webp"
          alt="Contact background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Elegant gradient overlay - consistent darkness throughout */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero section with transparent background */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] w-full overflow-hidden flex items-center">
        {/* Decorative shapes */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[var(--primary)]/10 rounded-full blur-3xl animate-float" aria-hidden />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float-delayed" aria-hidden />
        
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center z-10">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur-md shadow-lg animate-slideIn">
            <svg className="w-4 h-4 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>Tel Aviv, Israel</span>
          </div>

          <h1 className="text-balance text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 text-white drop-shadow-2xl animate-slideIn" style={{animationDelay: '0.1s'}}>
            {t('title')}
          </h1>

          <p className="mt-4 max-w-3xl text-pretty text-lg md:text-xl leading-relaxed text-white/95 drop-shadow-lg animate-slideIn" style={{animationDelay: '0.2s'}}>
            {t('subtitle')}
          </p>

          {/* Quick contact buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-slideIn" style={{animationDelay: '0.3s'}}>
            <a
              href={`tel:${t('info.phone')}`}
              className="group flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white font-semibold rounded-full shadow-xl hover:shadow-2xl hover:shadow-[var(--primary)]/30 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
            <a
              href={`mailto:${t('info.email')}`}
              className="group flex items-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border border-white/30 shadow-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </section>
      
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        {/* Animated particles */}
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-[var(--primary)] rounded-full opacity-60 animate-float" aria-hidden />
        <div className="absolute top-20 right-1/3 w-3 h-3 bg-white/40 rounded-full opacity-40 animate-float-delayed" aria-hidden />
        <div className="absolute bottom-40 left-1/2 w-2 h-2 bg-[var(--primary)]/60 rounded-full opacity-50 animate-float-slow" aria-hidden />
        
        <div className="max-w-7xl mx-auto relative">
          {/* Asymmetric Grid Layout */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column - Contact Form (Larger, spans 7 cols) */}
            <div className="lg:col-span-7 relative">
              <div className="sticky top-24 transform lg:-rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Decorative background */}
                <div className="absolute -inset-4 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--accent-sand)]/5 rounded-3xl blur-2xl" aria-hidden />
                
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                      {t('formTitle')}
                    </h2>
                    <p className="text-white/90 drop-shadow-md">
                      {t('formSubtitle')}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-semibold text-white mb-2 drop-shadow-md">
                        {t('name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('namePlaceholder')}
                        required
                        className="w-full px-4 py-3.5 bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder:text-white/50 focus:border-[var(--primary)] focus:bg-white/15 focus:ring-4 focus:ring-[var(--primary)]/20 transition-all duration-300 outline-none backdrop-blur-sm"
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group">
                        <label htmlFor="email" className="block text-sm font-semibold text-white mb-2 drop-shadow-md">
                          {t('email')}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t('emailPlaceholder')}
                          required
                          className="w-full px-4 py-3.5 bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder:text-white/50 focus:border-[var(--primary)] focus:bg-white/15 focus:ring-4 focus:ring-[var(--primary)]/20 transition-all duration-300 outline-none backdrop-blur-sm"
                        />
                      </div>
                      <div className="group">
                        <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2 drop-shadow-md">
                          {t('phone')}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t('phonePlaceholder')}
                          className="w-full px-4 py-3.5 bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder:text-white/50 focus:border-[var(--primary)] focus:bg-white/15 focus:ring-4 focus:ring-[var(--primary)]/20 transition-all duration-300 outline-none backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="group">
                      <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2 drop-shadow-md">
                        {t('subject')}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={t('subjectPlaceholder')}
                        required
                        className="w-full px-4 py-3.5 bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder:text-white/50 focus:border-[var(--primary)] focus:bg-white/15 focus:ring-4 focus:ring-[var(--primary)]/20 transition-all duration-300 outline-none backdrop-blur-sm"
                      />
                    </div>

                    {/* Message */}
                    <div className="group">
                      <label htmlFor="message" className="block text-sm font-semibold text-white mb-2 drop-shadow-md">
                        {t('message')}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t('messagePlaceholder')}
                        required
                        rows={6}
                        className="w-full px-4 py-3.5 bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder:text-white/50 focus:border-[var(--primary)] focus:bg-white/15 focus:ring-4 focus:ring-[var(--primary)]/20 transition-all duration-300 outline-none resize-none backdrop-blur-sm"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group relative w-full px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[var(--primary)]/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[var(--primary-hover)] to-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {status === 'sending' ? (
                          <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('sending')}
                          </>
                        ) : (
                          <>
                            {t('submit')}
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </span>
                    </button>

                    {/* Status Messages */}
                    {status === 'success' && (
                      <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl text-green-800 font-medium flex items-center gap-3 animate-slideIn">
                        <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {t('success')}
                      </div>
                    )}
                    {status === 'error' && (
                      <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-800 font-medium flex items-center gap-3 animate-slideIn">
                        <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {t('error')}
                      </div>
                    )}
                  </form>
                </div> {/* End of relative bg-white/10 backdrop-blur-md */}
              </div> {/* End of sticky top-24 */}
            </div> {/* End of lg:col-span-7 Left Column */}

            {/* Right Column - Map & Contact Info (spans 5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Interactive Map - with tilt effect */}
              <div className="relative group transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="absolute -inset-2 bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-[var(--accent-sand)]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
                
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl overflow-hidden">
                  <div className="p-6 border-b border-white/20">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3 drop-shadow-lg">
                      <svg className="w-7 h-7 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {t('map.title')}
                    </h3>
                  </div>
                  
                  {/* Map placeholder - replace with actual Google Maps embed */}
                  <div className="relative h-[400px] bg-gradient-to-br from-[var(--accent-beige)] to-[var(--accent-sand)]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.6284890674186!2d34.77481287639045!3d32.07420597389184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4ca6193b7c1f%3A0xc1fb72a4c7c6d4a!2sTel%20Aviv-Yafo%2C%20Israel!5e0!3m2!1sen!2s!4v1698765432100!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    
                    {/* View Larger Link */}
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-sm font-semibold text-[var(--foreground)] shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                      {t('map.viewLarger')}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Info Cards - Staggered layout */}
              <div className="grid gap-4">
                
                {/* Address & Hours - Full width with hover lift */}
                <div className="relative group transform hover:-translate-y-2 transition-all duration-300">
                  <div className="absolute -inset-1 bg-gradient-to-br from-[var(--primary)]/20 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                  <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-xl text-white shadow-lg">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-2 drop-shadow-md">{t('info.title')}</h4>
                        <p className="text-sm text-white/80 leading-relaxed drop-shadow-md">
                          {t('info.address')}<br />
                          {t('info.city')}
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/20">
                          <p className="text-xs font-semibold text-white mb-1 drop-shadow-md">{t('info.hours')}</p>
                          <p className="text-sm text-white/80 drop-shadow-md">
                            {t('info.hoursText')}<br />
                            {t('info.hoursWeekend')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone & Email - Split into two cards in a row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="relative group transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-br from-[var(--primary)]/20 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-5 hover:shadow-xl transition-shadow duration-300 h-full">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white/70 mb-1.5 drop-shadow-md">Phone</p>
                          <a href={`tel:${t('info.phone')}`} className="text-sm font-bold text-white hover:text-[var(--primary)] transition-colors drop-shadow-md block">
                            {t('info.phone')}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative group transform hover:-translate-y-2 hover:-rotate-1 transition-all duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-br from-[var(--accent-sand)]/30 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-5 hover:shadow-xl transition-shadow duration-300 h-full">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white/70 mb-1.5 drop-shadow-md">Email</p>
                          <a href={`mailto:${t('info.email')}`} className="text-sm font-bold text-white hover:text-[var(--primary)] transition-colors drop-shadow-md block break-all">
                            {t('info.email')}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media - with stagger animation */}
                <div className="relative group transform hover:-translate-y-2 transition-all duration-300">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)]/20 via-[var(--accent-sand)]/20 to-[var(--primary)]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                  <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6">
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2 drop-shadow-lg">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    {t('social.title')}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Instagram */}
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative overflow-hidden flex flex-col items-center gap-3 px-4 py-5 bg-white/10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm"
                    >
                      {/* Animated background on hover */}
                      <span className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent-sand)]/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" aria-hidden />
                      
                      {/* Icon with decorative circle */}
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-full opacity-20 group-hover/btn:opacity-30 blur-sm transition-opacity" aria-hidden />
                        <div className="relative p-3 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-full text-white shadow-lg group-hover/btn:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </div>
                      </div>
                      
                      <span className="relative font-semibold text-white text-sm group-hover/btn:text-[var(--primary)] transition-colors drop-shadow-md">
                        Instagram
                      </span>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/972501234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative overflow-hidden flex flex-col items-center gap-3 px-4 py-5 bg-white/10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm"
                    >
                      {/* Animated background on hover */}
                      <span className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent-sand)]/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" aria-hidden />
                      
                      {/* Icon with decorative circle */}
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-full opacity-20 group-hover/btn:opacity-30 blur-sm transition-opacity" aria-hidden />
                        <div className="relative p-3 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-full text-white shadow-lg group-hover/btn:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </div>
                      </div>
                      
                      <span className="relative font-semibold text-white text-sm group-hover/btn:text-[var(--primary)] transition-colors drop-shadow-md">
                        WhatsApp
                      </span>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative overflow-hidden flex flex-col items-center gap-3 px-4 py-5 bg-white/10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm"
                    >
                      {/* Animated background on hover */}
                      <span className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent-sand)]/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" aria-hidden />
                      
                      {/* Icon with decorative circle */}
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-full opacity-20 group-hover/btn:opacity-30 blur-sm transition-opacity" aria-hidden />
                        <div className="relative p-3 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-full text-white shadow-lg group-hover/btn:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </div>
                      </div>
                      
                      <span className="relative font-semibold text-white text-sm group-hover/btn:text-[var(--primary)] transition-colors drop-shadow-md">
                        Facebook
                      </span>
                    </a>

                    {/* Telegram */}
                    <a
                      href="https://t.me/yourstudio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative overflow-hidden flex flex-col items-center gap-3 px-4 py-5 bg-white/10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm"
                    >
                      {/* Animated background on hover */}
                      <span className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent-sand)]/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" aria-hidden />
                      
                      {/* Icon with decorative circle */}
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-full opacity-20 group-hover/btn:opacity-30 blur-sm transition-opacity" aria-hidden />
                        <div className="relative p-3 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] rounded-full text-white shadow-lg group-hover/btn:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                          </svg>
                        </div>
                      </div>
                      
                      <span className="relative font-semibold text-white text-sm group-hover/btn:text-[var(--primary)] transition-colors drop-shadow-md">
                        Telegram
                      </span>
                    </a>
                  </div> {/* End of social grid */}
                </div> {/* End of relative bg-white/10 */}
                </div> {/* End of relative group transform for Social Media */}

              </div> {/* End of grid gap-4 Contact Info Cards */}

            </div> {/* End of lg:col-span-5 Right Column */}
          </div> 
        </div>
    
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
