"use client"
import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

// Simple, photo-only gallery from /public/images/studio
// - Rounded corners, large tiles
// - 2 cols on mobile, 3 cols on desktop
// - Minimal hover and a clean lightbox
export default function GallerySection() {
  const studioFiles = [
    'R3N07178-HDR-2.jpg',
    'R3N07183-HDR.jpg',
    'R3N07210.jpg',
    'R3N07219.jpg',
    'R3N07221.jpg',
    'R3N07227.jpg',
    'R3N07230-Pano.jpg',
    'R3N07236-HDR.jpg',
    'R3N07240-HDR.jpg',
    'R3N07251-HDR.jpg',
    'R3N07254-HDR.jpg',
    'R3N07255.jpg',
    'R3N07261.jpg',
    'R3N07270-HDR.jpg',
    'R3N07280-HDR.jpg',
    'R3N07282-HDR.jpg',
    'R3N07287-HDR.jpg',
    'R3N07290-HDR.jpg',
    'R3N07292-HDR.jpg',
    'R3N07294-HDR.jpg',
    'R3N07305-HDR.jpg',
  ]

  const t = useTranslations('gallery')
  const images = studioFiles.map((f, i) => ({ id: `studio-${i}`, src: `/images/studio/${f}` }))
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 })

  return (
    <section className="relative w-full overflow-hidden pt-28 md:pt-32 pb-14 sm:pb-20">
      <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Subtle caption/title */}
        <div className="mb-5 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-sm font-semibold text-white/85 backdrop-blur-md">
            <svg className="h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h4l2-3h6l2 3h4v12H3z"/><path d="M12 9a4 4 0 100 8 4 4 0 000-8z"/></svg>
            <span>{t('title')}</span>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-3 sm:p-6 shadow-2xl backdrop-blur-md">
          {/* subtle inner gradient edge for style consistency */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-white/5" />
          <div className="relative grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {images.map((img, idx) => (
              <figure
                key={img.id}
                onClick={() => setLightbox({ open: true, index: idx })}
                className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-2xl border border-white/20 bg-black/30 shadow-md transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
              >
                <Image
                  src={img.src}
                  alt="Studio photo"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                  className="object-cover"
                  priority={idx < 6}
                />
                {/* hover accent ring */}
                <div className="pointer-events-none absolute -inset-px rounded-2xl border border-white/0 transition-colors duration-300 group-hover:border-white/30" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </figure>
            ))}
          </div>
        </div>
      </div>
      <Lightbox items={images} state={lightbox} setState={setLightbox} />
    </section>
  )
}

function Lightbox({ items, state, setState }: { items: { id: string; src: string }[]; state: { open: boolean; index: number }; setState: React.Dispatch<React.SetStateAction<{ open: boolean; index: number }>> }) {
  useEffect(() => {
    if (!state.open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = overflow }
  }, [state.open])

  const onClose = useCallback(() => setState(s => ({ ...s, open: false })), [setState])
  const onPrev = useCallback(() => setState(s => ({ ...s, index: (s.index - 1 + items.length) % items.length })), [items.length, setState])
  const onNext = useCallback(() => setState(s => ({ ...s, index: (s.index + 1) % items.length })), [items.length, setState])

  useEffect(() => {
    if (!state.open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state.open, onClose, onPrev, onNext])

  if (!state.open || items.length === 0) return null
  const current = items[state.index]

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm" onClick={onClose}>
      <button aria-label="Close" onClick={(e) => { e.stopPropagation(); onClose() }} className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/10 p-2 text-white shadow hover:bg-white/20">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
      {items.length > 1 && (
        <>
          <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); onPrev() }} className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-3 text-white shadow hover:bg-white/20">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button aria-label="Next" onClick={(e) => { e.stopPropagation(); onNext() }} className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-3 text-white shadow hover:bg-white/20">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </>
      )}
      <div className="relative mx-2 h-[78vh] w-[94vw] sm:h-[82vh] sm:w-[92vw]" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/20 bg-black/40 shadow-2xl">
          <Image src={current.src} alt="Studio photo" fill sizes="100vw" className="object-contain" priority />
        </div>
        <div className="pointer-events-none absolute bottom-3 right-4 rounded-full border border-white/30 bg-black/50 px-3 py-1 text-sm text-white/90">
          {state.index + 1} / {items.length}
        </div>
      </div>
    </div>
  )
}