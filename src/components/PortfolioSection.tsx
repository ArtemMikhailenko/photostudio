"use client"
import { useEffect, useMemo, useState, useCallback } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

type Category = 'all' | 'business' | 'fashion' | 'model' | 'video'
type MediaItem = {
  id: string
  type: 'image' | 'video'
  src: string
  category: Exclude<Category, 'all'>
}

export default function PortfolioSection() {
  const t = useTranslations('portfolio')
  const [active, setActive] = useState<Category>('all')

  // Media pool from existing assets. Duplicate with variety for a rich grid.
  const media: MediaItem[] = useMemo(() => {
    const img = {
      business: ['/images/works-4x3.webp', '/images/hero-desktop-1920x1080.webp', '/images/pesok.jpg'],
      fashion: ['/images/gallery-4x3.webp', '/images/poligraf.png', '/images/hero-desktop-1920x1080.webp'],
      model: ['/images/equipment-4x3.webp', '/images/gallery-4x3.webp', '/images/works-4x3.webp'],
      video: [] as string[],
    }
    const vids = ['/video/hero.mp4', '/video/jelly-2.mp4']

    const make = (arr: string[], category: Exclude<Category, 'all'>, type: 'image' | 'video') =>
      arr.map((src, i) => ({ id: `${category}-${type}-${i}`, type, src, category }))

    // Build a bigger set by repeating with slight permutations
    return [
      ...make(img.business, 'business', 'image'),
      ...make(img.fashion, 'fashion', 'image'),
      ...make(img.model, 'model', 'image'),
      ...make(vids, 'video', 'video'),
      // duplicates for volume
      ...make(img.business, 'business', 'image').map((m, i) => ({ ...m, id: m.id + '-d' + i })),
      ...make(img.fashion, 'fashion', 'image').map((m, i) => ({ ...m, id: m.id + '-d' + i })),
      ...make(img.model, 'model', 'image').map((m, i) => ({ ...m, id: m.id + '-d' + i })),
      ...make(vids, 'video', 'video').map((m, i) => ({ ...m, id: m.id + '-d' + i })),
    ]
  }, [])

  const filters: { key: Category; label: string }[] = [
    { key: 'all', label: t('filters.all') },
    { key: 'business', label: t('filters.business') },
    { key: 'fashion', label: t('filters.fashion') },
    { key: 'model', label: t('filters.model') },
    { key: 'video', label: t('filters.video') },
  ]

  const items = active === 'all' ? media : media.filter((m) => m.category === active)
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 })

  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-16">
      <div className=" z-10 mx-auto w-full mt-20">
        {/* Filters only — no titles/subtitles */}
        <div className=" mb-6 sm:mb-10">
          <div className=" overflow-hidden border border-white/10 backdrop-blur-sm shadow-2xl">
            <div className="flex flex-wrap items-center gap-2 p-3 sm:p-4">
              {filters.map((f) => {
                const isActive = active === f.key
                const count = f.key === 'all' ? media.length : media.filter((m) => m.category === f.key).length
                return (
                  <button
                    key={f.key}
                    onClick={() => setActive(f.key)}
                    className={`group relative rounded-2xl px-4 py-2 text-sm font-semibold transition-all ${
                      isActive ? 'bg-white/20 text-white shadow-lg' : 'text-white/70 hover:text-white/90 hover:bg-white/10'
                    }`}
                    aria-pressed={isActive}
                  >
                    {isActive && <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--primary)]/20 to-transparent" />}
                    <span className="relative flex items-center gap-2">
                      {f.label}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-white/60'}`}>{count}</span>
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>

        {/* Dense media grid */}
        <div className=" overflow-hidden border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-3 sm:p-6 shadow-2xl backdrop-blur-sm ">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {items.map((m, idx) => (
              <figure
                key={m.id}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20 bg-black/30 shadow-md transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => setLightbox({ open: true, index: idx })}
              >
                {m.type === 'image' ? (
                  <Image src={m.src} alt="Portfolio image" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                ) : (
                  <video
                    className="h-full w-full object-cover"
                    src={m.src}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                  />
                )}

                {/* Subtle overlay + video indicator, no text */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {m.type === 'video' && (
                  <div className="pointer-events-none absolute right-2 top-2 rounded-full border border-white/30 bg-black/60 p-1.5 backdrop-blur-sm">
                    <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                )}
              </figure>
            ))}
          </div>
        </div>
      </div>
  <Lightbox items={items} state={lightbox} setState={setLightbox} />
    </section>
  )
}

// --- Lightbox ---
function Lightbox({ items, state, setState }: { items: MediaItem[]; state: { open: boolean; index: number }; setState: React.Dispatch<React.SetStateAction<{ open: boolean; index: number }>> }) {

  // Body scroll lock
  useEffect(() => {
    if (!state.open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = overflow }
  }, [state.open])

  const onClose = useCallback(() => setState((s) => ({ ...s, open: false })), [])
  const onPrev = useCallback(() => setState((s) => ({ ...s, index: (s.index - 1 + items.length) % items.length })), [items.length])
  const onNext = useCallback(() => setState((s) => ({ ...s, index: (s.index + 1) % items.length })), [items.length])

  // Keyboard controls
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
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Controls */}
      <button
        aria-label="Close"
        onClick={(e) => { e.stopPropagation(); onClose() }}
        className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/10 p-2 text-white shadow hover:bg-white/20"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>

      {items.length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-3 text-white shadow hover:bg-white/20"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-3 text-white shadow hover:bg-white/20"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </>
      )}

      {/* Content container to stop propagation */}
      <div className="relative mx-2 h-[78vh] w-[94vw] sm:h-[82vh] sm:w-[92vw]" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/20 bg-black/40 shadow-2xl">
          {current.type === 'image' ? (
            <Image
              src={current.src}
              alt="Full size"
              fill
              priority
              className="object-contain"
              sizes="100vw"
            />
          ) : (
            <video
              className="h-full w-full object-contain"
              src={current.src}
              controls
              playsInline
              autoPlay
            />
          )}
        </div>
        {/* Counter */}
        <div className="pointer-events-none absolute bottom-3 right-4 rounded-full border border-white/30 bg-black/50 px-3 py-1 text-sm text-white/90">
          {state.index + 1} / {items.length}
        </div>
      </div>
    </div>
  )
}

// no helpers
