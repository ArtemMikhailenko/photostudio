'use client'
import { useMemo, useState } from 'react'
import {useTranslations, useLocale} from 'next-intl'

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

export default function BookingCalendarSection() {
  const t = useTranslations('booking')
  const locale = useLocale()
  const now = new Date()
  const [viewYear, setViewYear] = useState(now.getFullYear())
  const [viewMonth, setViewMonth] = useState(now.getMonth())
  const [selected, setSelected] = useState<Date | null>(null)
  const [slot, setSlot] = useState<string | null>(null)

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

  const times: Slot[] = useMemo(
    () => [
      '09:00','09:15','09:30','09:45','10:00','10:15','10:30','10:45','11:00','11:15','11:30','12:00',
      '12:30','13:00','13:30','14:00','14:30','15:00'
    ].map((t) => ({ t })),
    []
  )

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

  return (
    <section className="relative isolate w-full">
      {/* background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG_IMAGE})`, filter: 'saturate(1.05) brightness(0.98)' }}
      />
      {/* top/bottom fades into page bg */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 sm:h-32" style={{
        background: 'linear-gradient(to bottom, #F6F3EF 0%, rgba(246,243,239,0.6) 50%, rgba(246,243,239,0))'
      }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 sm:h-36" style={{
        background: 'linear-gradient(to top, #F6F3EF 0%, rgba(246,243,239,0.6) 50%, rgba(246,243,239,0))'
      }} />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        {/* glass container */}
        <div className="relative overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-br from-black/35 via-black/25 to-black/20 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]">
          {/* inner divider */}
          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/10 sm:block" />

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* left: calendar */}
            <div className="p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between">
                <button onClick={() => changeMonth(-1)} className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-white/80 hover:bg-white/20">‹</button>
                <div className="text-lg font-semibold text-white/90">{monthName}</div>
                <button onClick={() => changeMonth(1)} className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-white/80 hover:bg-white/20">›</button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-white/60">
                {weekdays.map(d => (
                  <div key={d} className="py-2">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
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
                        isPlaceholder ? 'opacity-0 cursor-default' : 'text-white/90 hover:bg-white/10'
                      } ${isSelected ? 'border border-white/40 bg-white/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]' : ''} ${isToday && !isSelected ? 'ring-1 ring-white/30' : ''}`}
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
              <div className="mb-3 text-sm font-medium text-white/75">{t('availableTimes')}</div>
              <div className="max-h-[360px] grid grid-cols-1 gap-3 overflow-auto pr-1 sm:grid-cols-2">
                {times.map(({ t: time }) => {
                  const selectedTime = slot === time
                  return (
                    <button
                      key={time}
                      onClick={() => setSlot(time)}
                      className={`relative h-12 w-full rounded-2xl border px-4 text-center text-base transition-all backdrop-blur-md ${
                        selectedTime
                          ? 'border-transparent bg-[var(--primary)] text-white shadow-[0_10px_30px_-10px_rgba(194,155,114,0.8)] scale-[1.02]'
                          : 'border-white/20 bg-white/10 text-white/90 hover:bg-white/20'
                      }`}
                    >
                      {!selectedTime && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white/70" />
                      )}
                      {time}
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
            </div>
          </div>

          {/* footer summary */}
          <div className="border-t border-white/10 bg-white/5 p-4 sm:p-6">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/90">{summary}</p>
              <button
                disabled={!selected || !slot}
                className="rounded-full border border-white/30 bg-white/20 px-6 py-2.5 text-sm font-semibold text-white/90 backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t('continue')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
