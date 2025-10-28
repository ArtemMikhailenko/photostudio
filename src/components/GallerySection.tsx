'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs, EffectFade, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/effect-fade'

type GalleryImage = {
  id: string
  src: string
  title: string
  description: string
  category: string
}

export default function GallerySection() {
  const t = useTranslations('gallery')
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const images: GalleryImage[] = [
    {
      id: '1',
      src: '/images/gallery-4x3.webp',
      title: t('images.studio1.title'),
      description: t('images.studio1.description'),
      category: 'studio'
    },
    {
      id: '2',
      src: '/images/works-4x3.webp',
      title: t('images.studio2.title'),
      description: t('images.studio2.description'),
      category: 'studio'
    },
    {
      id: '3',
      src: '/images/equipment-4x3.webp',
      title: t('images.equipment1.title'),
      description: t('images.equipment1.description'),
      category: 'equipment'
    },
    {
      id: '4',
      src: '/images/gallery-4x3.webp',
      title: t('images.setup1.title'),
      description: t('images.setup1.description'),
      category: 'setup'
    },
    {
      id: '5',
      src: '/images/works-4x3.webp',
      title: t('images.setup2.title'),
      description: t('images.setup2.description'),
      category: 'setup'
    },
    {
      id: '6',
      src: '/images/equipment-4x3.webp',
      title: t('images.lighting1.title'),
      description: t('images.lighting1.description'),
      category: 'lighting'
    },
    {
      id: '7',
      src: '/images/gallery-4x3.webp',
      title: t('images.studio3.title'),
      description: t('images.studio3.description'),
      category: 'studio'
    },
    {
      id: '8',
      src: '/images/works-4x3.webp',
      title: t('images.equipment2.title'),
      description: t('images.equipment2.description'),
      category: 'equipment'
    },
    {
      id: '9',
      src: '/images/equipment-4x3.webp',
      title: t('images.lighting1.title'),
      description: t('images.lighting1.description'),
      category: 'lighting'
    },
    {
      id: '10',
      src: '/images/gallery-4x3.webp',
      title: t('images.studio1.title'),
      description: t('images.studio1.description'),
      category: 'studio'
    }
  ]

  const currentImage = images[activeIndex]

  return (
    <section className="relative min-h-screen w-full overflow-hidden py-20 sm:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
              {t('badge')}
            </span>
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-2xl">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80 drop-shadow-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Gallery Container */}
        <div className="relative overflow-hidden rounded-[3rem] border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl shadow-2xl p-6 sm:p-8">
          
          {/* Inner glow effect */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#C29B72]/5 via-transparent to-white/10 rounded-[3rem]" />
          
          <div className="relative z-10">
          

          
          {/* Large Featured Image - Swiper Main */}
          <div className="relative">
            <Swiper
              modules={[Navigation, Thumbs, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="gallery-main-swiper rounded-3xl overflow-hidden"
              speed={700}
              watchSlidesProgress={true}
            >
              {images.map((image, index) => (
                <SwiperSlide key={image.id}>
                  <div className="group relative overflow-hidden rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-2xl">
                    
                    {/* Featured Image Container */}
                    <div className="relative aspect-[21/9] sm:aspect-[21/8] overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, 90vw"
                      />
                      
                      {/* Gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                      
                      {/* Animated corner accents */}
                      <div className="absolute left-0 top-0 h-40 w-40 bg-gradient-to-br from-[var(--primary)]/40 to-transparent opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
                      <div className="absolute bottom-0 right-0 h-40 w-40 bg-gradient-to-tl from-[var(--primary)]/40 to-transparent opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
                      
                      {/* Scan line effect */}
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan" />
                      </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8">
                      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
                        <div className="flex-1">
                          <div className="mb-2 sm:mb-3 inline-block rounded-full border border-white/30 bg-black/50 px-3 py-1 backdrop-blur-lg">
                            <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                              {t(`categories.${currentImage.category}`)}
                            </span>
                          </div>
                          <h2 className="mb-2 text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-2xl">
                            {currentImage.title}
                          </h2>
                          <p className="max-w-2xl text-sm sm:text-base text-white/80 drop-shadow-lg">
                            {currentImage.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="swiper-button-prev-custom flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-lg shadow-lg transition-all duration-300 hover:scale-110 hover:bg-black/70 hover:border-[var(--primary)]/50">
                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button className="swiper-button-next-custom flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-lg shadow-lg transition-all duration-300 hover:scale-110 hover:bg-black/70 hover:border-[var(--primary)]/50">
                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Thumbnail Slider - Swiper */}
          <div className="relative mt-6">
            <Swiper
              modules={[Navigation, Thumbs]}
              onSwiper={setThumbsSwiper}
              spaceBetween={12}
              slidesPerView="auto"
              watchSlidesProgress={true}
              slideToClickedSlide={true}
              navigation={{
                prevEl: '.thumb-prev',
                nextEl: '.thumb-next',
              }}
              breakpoints={{
                320: {
                  spaceBetween: 8,
                },
                640: {
                  spaceBetween: 12,
                },
                1024: {
                  spaceBetween: 16,
                }
              }}
              className="gallery-thumbs-swiper !py-4 !px-2"
            >
              {images.map((image, index) => {
                const isActive = index === activeIndex
                return (
                <SwiperSlide key={image.id} className="!w-36 sm:!w-44 md:!w-52">
                  <div
                    className={`group relative cursor-pointer overflow-visible rounded-2xl transition-all duration-500 ${
                      isActive ? 'scale-100' : 'scale-95 hover:scale-100'
                    }`}
                  >
                      {/* Wrapper for border and shadow effects */}
                      <div className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 ${
                        isActive
                          ? 'border-[var(--primary)] bg-white/20 shadow-2xl shadow-[var(--primary)]/40'
                          : 'border-white/30 bg-white/10 hover:border-white/50 hover:shadow-xl'
                      }`}>
                        {/* Thumbnail Image */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={image.src}
                            alt={image.title}
                            fill
                            sizes="250px"
                            className={`object-cover transition-all duration-700 ${
                              isActive 
                                ? 'scale-105 brightness-110' 
                                : 'scale-100 group-hover:scale-110 group-hover:brightness-110'
                            }`}
                          />
                          
                          {/* Overlay with gradient */}
                          <div className={`absolute inset-0 transition-all duration-500 ${
                            isActive
                              ? 'bg-gradient-to-t from-[var(--primary)]/70 via-[var(--primary)]/20 to-transparent'
                              : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50'
                          }`} />

                          {/* Active Indicator */}
                          {isActive && (
                            <div className="absolute right-2 top-2">
                              <div className="rounded-full border-2 border-white bg-[var(--primary)] p-1 shadow-lg animate-pulse">
                                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </div>
                          )}

                          {/* Hover Eye Icon */}
                          {!isActive && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                              <div className="rounded-full bg-black/60 p-3 backdrop-blur-lg border border-white/30 transform transition-transform duration-300 group-hover:scale-110">
                                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Thumbnail Info */}
                        <div className="p-2 sm:p-3">
                          <h3 className={`text-xs sm:text-sm font-bold transition-all duration-300 line-clamp-1 ${
                            isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                          }`}>
                            {image.title}
                          </h3>
                          <div className="mt-1 sm:mt-1.5 flex items-center gap-2">
                            <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                              isActive
                                ? 'bg-[var(--primary)] w-full'
                                : 'bg-white/20 w-0 group-hover:w-full group-hover:bg-[var(--primary)]/50'
                            }`} />
                            <span className={`text-[10px] font-semibold transition-colors duration-300 ${
                              isActive ? 'text-[var(--primary)]' : 'text-white/50 group-hover:text-white/70'
                            }`}>
                              {(index + 1).toString().padStart(2, '0')}
                            </span>
                          </div>
                        </div>

                        {/* Shine sweep effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                      </div>
                      
                      {/* Outer glow for active item */}
                      {isActive && (
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[var(--primary)]/30 to-[var(--primary)]/10 blur-lg -z-10 animate-pulse" />
                      )}
                    </div>
                </SwiperSlide>
              )})}
            </Swiper>

            {/* Navigation Buttons */}
            <button className="thumb-prev absolute left-0 top-1/2 z-20 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/30 bg-black/70 backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-110 hover:bg-black/80 hover:border-[var(--primary)]/50">
              <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button className="thumb-next absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-2 sm:translate-x-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/30 bg-black/70 backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-110 hover:bg-black/80 hover:border-[var(--primary)]/50">
              <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>

        {/* Bottom Features */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="group rounded-3xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-[var(--primary)]/30 hover:bg-white/15">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 to-transparent transition-transform duration-300 group-hover:scale-110">
              <svg className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-white">{t('features.professional.title')}</h3>
            <p className="text-sm text-white/70">{t('features.professional.description')}</p>
          </div>

          <div className="group rounded-3xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-[var(--primary)]/30 hover:bg-white/15">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 to-transparent transition-transform duration-300 group-hover:scale-110">
              <svg className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-white">{t('features.lighting.title')}</h3>
            <p className="text-sm text-white/70">{t('features.lighting.description')}</p>
          </div>

          <div className="group rounded-3xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-[var(--primary)]/30 hover:bg-white/15">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 to-transparent transition-transform duration-300 group-hover:scale-110">
              <svg className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-white">{t('features.versatile.title')}</h3>
            <p className="text-sm text-white/70">{t('features.versatile.description')}</p>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}