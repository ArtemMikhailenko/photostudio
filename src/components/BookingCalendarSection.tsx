'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import {useTranslations, useLocale} from 'next-intl'
import { useRouter } from '@/i18n/routing';

const BG_IMAGE = '/images/site-bg.webp' // background image for the section

type Slot = {
  t: string
  disabled?: boolean
}

function getDaysInMonth(year: number, month: number) {
  // month: 0-11
  const last = new Date(year, month + 1, 0).getDate()
  return last
}

function getFirstWeekday(year: number, month: number) {
  // 0 Sun - 6 Sat
  return new Date(year, month, 1).getDay()
}

export default function BookingCalendarSection({ service }: { service?: string }) {
  const t = useTranslations('booking')
  const sm = useTranslations('servicesMenu')
  const locale = useLocale()
  const now = new Date()
  const [viewYear, setViewYear] = useState(now.getFullYear())
  const [viewMonth, setViewMonth] = useState(now.getMonth())
  const [selected, setSelected] = useState<Date | null>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [serviceSel, setServiceSel] = useState<string>(service || 'studio')
  const router = useRouter();
  const [durationHours, setDurationHours] = useState<number>(2)
  const [busy, setBusy] = useState<Array<{start: string; end: string; colorId?: string | null; summary?: string}>>([])
  const [calendarWarning, setCalendarWarning] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [focusIdx, setFocusIdx] = useState(0)
  const ddRef = useRef<HTMLDivElement>(null)

  const serviceOptions = useMemo(
    () => [
      { value: 'studio', label: sm('studio') },
      { value: 'content-2-hours', label: sm('content2h') },
      { value: 'business', label: sm('business') },
      { value: 'fashion', label: sm('fashion') },
      { value: 'artist', label: sm('artist') },
    ],
    [sm]
  )

  // close dropdown on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent | TouchEvent) {
      if (!ddRef.current) return
      if (!ddRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('touchstart', onDoc)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('touchstart', onDoc)
    }
  }, [])

  function selectService(value: string) {
    setServiceSel(value)
    setOpen(false)
  }

  const monthName = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(new Date(viewYear, viewMonth, 1)),
    [viewYear, viewMonth, locale]
  )

  const weekdays = useMemo(() => [
    t('weekdays.sun'),
    t('weekdays.mon'),
    t('weekdays.tue'),
    t('weekdays.wed'),
    t('weekdays.thu'),
    t('weekdays.fri'),
    t('weekdays.sat')
  ], [t])

  const days = useMemo(() => {
    const total = getDaysInMonth(viewYear, viewMonth)
    const first = getFirstWeekday(viewYear, viewMonth)
    const arr: Array<number | null> = Array(first).fill(null)
    for (let d = 1; d <= total; d++) arr.push(d)
    return arr
  }, [viewYear, viewMonth])

  // Working hours: from 05:00 to 24:00 in 15-minute increments
  const times: Slot[] = useMemo(() => {
    const slots: Slot[] = []
    for (let h = 5; h < 24; h++) {
      for (let m of [0, 15, 30, 45]) {
        const hh = String(h).padStart(2, '0')
        const mm = String(m).padStart(2, '0')
        slots.push({ t: `${hh}:${mm}` })
      }
    }
    return slots
  }, [])

  function changeMonth(delta: number) {
    let m = viewMonth + delta
    let y = viewYear
    if (m < 0) { m = 11; y -= 1 }
    if (m > 11) { m = 0; y += 1 }
    setViewYear(y)
    setViewMonth(m)
  }

  function selectDay(d: number | null) {
    if (!d) return
    setSelected(new Date(viewYear, viewMonth, d))
  }

  const summary = selected && slot
    ? t('summary', {
        date: new Intl.DateTimeFormat(locale, { weekday: 'long', month: 'long', day: 'numeric' }).format(selected),
        time: slot
      })
    : t('chooseDateAndTime')

  const rate = 215
  const vatRate = 0.18
  const subtotal = rate * durationHours
  const vat = Math.round(subtotal * vatRate)
  const total = subtotal + vat

  function proceedToCheckout(dateObj: Date, timeStr: string) {
    // Build local date (YYYY-MM-DD) to avoid UTC shift that causes off-by-one day
    const y = dateObj.getFullYear()
    const m = String(dateObj.getMonth() + 1).padStart(2, '0')
    const d = String(dateObj.getDate()).padStart(2, '0')
    const dateStr = `${y}-${m}-${d}`
    router.push(`/booking/checkout?date=${encodeURIComponent(dateStr)}&time=${encodeURIComponent(timeStr)}&service=${encodeURIComponent(serviceSel)}`)
  }

  // Fetch busy slots for the selected day from our API (Google Calendar)
  useEffect(() => {
    if (!selected) return
    const startOfDay = new Date(selected)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(selected)
    endOfDay.setHours(23, 59, 59, 999)
    const url = `/api/calendar/check?start=${encodeURIComponent(startOfDay.toISOString())}&end=${encodeURIComponent(endOfDay.toISOString())}`
    fetch(url)
      .then(async (r) => {
        const data = await r.json()
        setBusy(Array.isArray(data.busy) ? data.busy : [])
        setCalendarWarning(data.warning || null)
      })
      .catch(() => {
        setBusy([])
        setCalendarWarning('Не удалось получить занятые слоты')
      })
  }, [selected])

  // Check if a slot overlaps any busy interval considering duration
  function isSlotBusy(dateObj: Date, timeStr: string) {
    const [hh, mm] = timeStr.split(':').map(Number)
    const start = new Date(dateObj)
    start.setHours(hh, mm || 0, 0, 0)
    const end = new Date(start)
    end.setHours(start.getHours() + durationHours)
    return busy.some(({ start: s, end: e }) => {
      const bs = new Date(s)
      const be = new Date(e)
      return start < be && end > bs // intervals overlap
    })
  }

  // Get color indicator for a slot based on event type (colorId)
  function getSlotColor(dateObj: Date, timeStr: string): 'rent' | 'services' | null {
    const [hh, mm] = timeStr.split(':').map(Number)
    const start = new Date(dateObj)
    start.setHours(hh, mm || 0, 0, 0)
    const end = new Date(start)
    end.setHours(start.getHours() + durationHours)
    
    for (const { start: s, end: e, colorId } of busy) {
      const bs = new Date(s)
      const be = new Date(e)
      if (start < be && end > bs) {
        // colorId '9' = blue (rent), '10' = green (services), '11' = red (external)
        if (colorId === '9') return 'rent'
        if (colorId === '10') return 'services'
        return 'rent' // default fallback
      }
    }
    return null
  }

  return (
    <>
    <section className="relative isolate w-full">
      {/* Background image is now on main page, no need for it here */}

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        {/* glass container */}
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/1 backdrop-blur-md shadow-[0_24px_70px_-24px_rgba(0,0,0,0.45)]">
          {/* soft ambient bronze */}
          <div aria-hidden className="pointer-events-none absolute -inset-1 opacity-70" style={{background:'radial-gradient(900px 320px at 8% 0%, rgba(194,155,114,0.18), transparent 60%)'}}/>
          {/* inner divider */}
          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/10 sm:block" />

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* left: calendar */}
            <div className="p-6 sm:p-8">
              {/* Service selector placed exactly above the calendar */}
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white/90">{t('selectService')}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]/80" aria-hidden />
                </div>
                <div className="relative" ref={ddRef}>
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    onClick={() => {
                      const idx = serviceOptions.findIndex(o => o.value === serviceSel)
                      setFocusIdx(Math.max(0, idx))
                      setOpen(v => !v)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                        e.preventDefault()
                        if (!open) setOpen(true)
                        const dir = e.key === 'ArrowDown' ? 1 : -1
                        setFocusIdx((i) => {
                          const n = (i + dir + serviceOptions.length) % serviceOptions.length
                          return n
                        })
                      } else if (e.key === 'Enter' && open) {
                        e.preventDefault()
                        const opt = serviceOptions[focusIdx]
                        if (opt) selectService(opt.value)
                      } else if (e.key === 'Escape') {
                        setOpen(false)
                      }
                    }}
                    className="min-w-[240px] rounded-[22px] border border-white/35 bg-white/15 px-4 pl-10 pr-8 py-2 text-base text-white/95 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)] backdrop-blur-2xl transition hover:bg-white/20 focus:outline-none"
                  >
                    {/* left icon */}
                    <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    {serviceOptions.find(o => o.value === serviceSel)?.label}
                    {/* right chevron */}
                    <svg className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/80 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
                  </button>

                  {open && (
                    <div className="absolute right-0 z-20 mt-2 w-[300px] min-w-[260px] overflow-hidden rounded-2xl border border-white/60 bg-white/80 text-[#1A1A1A] backdrop-blur-3xl shadow-[0_28px_70px_-24px_rgba(0,0,0,0.55)]">
                      <div aria-hidden className="pointer-events-none absolute inset-0" style={{background:'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.75))'}}/>
                      <ul role="listbox" aria-activedescendant={`opt-${focusIdx}`} className="relative max-h-64 overflow-auto py-2">
                        {serviceOptions.map((opt, idx) => {
                          const active = idx === focusIdx
                          const selected = opt.value === serviceSel
                          return (
                            <li
                              id={`opt-${idx}`}
                              key={opt.value}
                              role="option"
                              aria-selected={selected}
                              onMouseEnter={() => setFocusIdx(idx)}
                              onMouseDown={(e) => { e.preventDefault(); selectService(opt.value) }}
                              className={`mx-1 flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm ${active ? 'bg-black/5' : 'hover:bg-black/5'}`}
                            >
                              <span>{opt.label}</span>
                              {selected && <svg width="16" height="16" viewBox="0 0 24 24" className="text-[#1A1A1A]" fill="currentColor"><path d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.7-7.7 1.4 1.4z"/></svg>}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <button onClick={() => changeMonth(-1)} className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-white/80 hover:bg-white/20">‹</button>
                <div className="text-lg font-semibold text-white/90">{monthName}</div>
                <button onClick={() => changeMonth(1)} className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-white/80 hover:bg-white/20">›</button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-white/70">
                {weekdays.map(d => (
                  <div key={d} className="py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">{d}</div>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1">
                {days.map((d, i) => {
                  const isToday = d === now.getDate() && viewMonth === now.getMonth() && viewYear === now.getFullYear()
                  const isSelected = !!selected && d && selected.getDate() === d && selected.getMonth() === viewMonth && selected.getFullYear() === viewYear
                  const isPlaceholder = d === null
                  return (
                    <button
                      key={i}
                      disabled={isPlaceholder}
                      onClick={() => selectDay(d)}
                      className={`relative h-12 rounded-2xl text-sm transition-all ${
                        isPlaceholder ? 'opacity-0 cursor-default' : 'text-white/90 border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm'
                      } ${isSelected ? 'border-white/40 bg-white/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]' : ''} ${isToday && !isSelected ? 'ring-1 ring-white/25' : ''}`}
                    >
                      {!isPlaceholder && (
                        <span className="relative z-[1]">{d}</span>
                      )}
                      {isSelected && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-0 rounded-2xl"
                          style={{
                            boxShadow: '0 0 0 2px rgba(194,155,114,0.55), 0 6px 18px -6px rgba(0,0,0,0.35)'
                          }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* right: times */}
            <div className="p-6 sm:p-8">
              <div className="mb-2 text-sm font-medium text-white/75">{t('availableTimes')}</div>
              {/* Legend */}
              <div className="mb-3 flex items-center gap-3 text-[11px] text-white/70">
                <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-sky-400/70"/>rent</span>
                <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400/70"/>services</span>
              </div>
              <div className="max-h-[360px] grid grid-cols-1 gap-3 overflow-auto pr-1 sm:grid-cols-2">
                {times.map(({ t: time }) => {
                  const selectedTime = slot === time
                  const disabledByBusy = !!(selected && isSlotBusy(selected, time))
                  const slotColor = selected ? getSlotColor(selected, time) : null
                  
                  // Color indicators: blue for rent, green for services
                  const colorClass = disabledByBusy && slotColor === 'rent' 
                    ? 'border-sky-400/60 bg-sky-500/20'
                    : disabledByBusy && slotColor === 'services'
                    ? 'border-emerald-400/60 bg-emerald-500/20'
                    : ''
                    
                  return (
                    <button
                      key={time}
                      disabled={disabledByBusy}
                      onClick={() => {
                        setSlot(time)
                        // Если выбрана дата: если выбран конкретный сервис, идём сразу на оплату,
                        // иначе показываем модалку с вопросом про услуги
                        if (selected) {
                          if (serviceSel && serviceSel !== 'studio') {
                            proceedToCheckout(selected, time)
                          } else {
                            setShowConfirm(true)
                          }
                        }
                      }}
                      className={`relative h-12 w-full rounded-2xl border px-4 text-center text-base transition-all backdrop-blur-xl ${
                        selectedTime
                          ? 'border-transparent bg-[var(--primary)]/90 text-white shadow-[0_10px_30px_-10px_rgba(194,155,114,0.8)] scale-[1.02]'
                          : disabledByBusy 
                          ? `${colorClass} text-white/50 cursor-not-allowed`
                          : 'border-white/15 bg-white/8 text-white/90 hover:bg-white/15'
                      }`}
                    >
                      {!selectedTime && !disabledByBusy && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white/70" />
                      )}
                      {time}
                      {disabledByBusy && slotColor && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-70">
                          {slotColor === 'rent' ? '🩵' : '💚'}
                        </span>
                      )}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 hover:opacity-100"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)'
                        }}
                      />
                    </button>
                  )
                })}
              </div>

              {/* Price calculation */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                {calendarWarning && (
                  <div className="mb-2 rounded-md border border-yellow-300/40 bg-yellow-200/10 px-2 py-1 text-xs text-yellow-100">
                    {calendarWarning}
                  </div>
                )}
                <div className="flex items-center justify-between text-sm text-white/90">
                  <div>Длительность (ч)</div>
                  <div className="flex items-center gap-2">
                    <input type="number" min={1} max={12} value={durationHours} onChange={(e) => setDurationHours(Number(e.target.value)||1)} className="w-16 rounded-md bg-white/5 px-2 py-1 text-white/90" />
                  </div>
                </div>
                <div className="mt-3 text-sm text-white/80">215 ₪ в час + 18% НДС</div>
                <div className="mt-2 flex items-center justify-between text-sm text-white/90"><span>Сумма без НДС</span><span>{subtotal} ₪</span></div>
                <div className="mt-1 flex items-center justify-between text-sm text-white/90"><span>НДС (18%)</span><span>{vat} ₪</span></div>
                <div className="mt-2 flex items-center justify-between text-base font-semibold text-white"><span>Итого</span><span>{total} ₪</span></div>
              </div>
            </div>
          </div>

          {/* footer summary */}
          <div className="border-t border-white/10 bg-white/5 p-4 sm:p-6">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/90">{summary}</p>
              <button
                disabled={!selected || !slot}
                onClick={() => {
                  if (!selected || !slot) return
                  if (serviceSel && serviceSel !== 'studio') {
                    proceedToCheckout(selected, slot)
                  } else {
                    setShowConfirm(true)
                  }
                }}
                className="rounded-full border border-white/30 bg-white/20 px-6 py-2.5 text-sm font-semibold text-white/90 backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t('continue')}
              </button>
            </div>
          </div>
        </div>
      </div>
  </section>
    {/* Confirmation modal shown after selecting slot */}
    {showConfirm && selected && slot && (
      <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40" onClick={() => setShowConfirm(false)} />
        <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <h3 className="text-lg font-semibold">Нужны ли вам услуги фотографа или видеографа?</h3>
               <p className="mt-2 text-sm text-gray-600">Выберите опцию для продолжения бронирования.</p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => {
                setShowConfirm(false)
                // Next-intl router prefixes locale automatically, so pass a locale-agnostic path
                router.push(`/services`)
              }}
              className="flex-1 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"
            >
              Да, посмотреть услуги
            </button>
            <button
              onClick={() => {
                if (!selected || !slot) return
                setShowConfirm(false)
                proceedToCheckout(selected, slot)
              }}
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold"
            >
              Нет, продолжить
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  )
}
