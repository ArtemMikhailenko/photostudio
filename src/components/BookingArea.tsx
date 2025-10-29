"use client";
import { useState } from 'react';
import {useTranslations} from 'next-intl';
import BookingCalendarSection from './BookingCalendarSection';

export default function BookingArea() {
  const t = useTranslations('booking');
  const s = useTranslations('servicesMenu');
  const [service, setService] = useState<string>('studio');

  const options: Array<{value: string; label: string}> = [
    { value: 'studio', label: 'Студия (аренда)' },
    { value: 'content-2-hours', label: s('content2h') },
    { value: 'business', label: s('business') },
    { value: 'fashion', label: s('fashion') },
    { value: 'artist', label: s('artist') },
  ];

  return (
    <section id="booking" className="relative isolate w-full">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <label className="text-sm font-medium text-[#1E1E1E]">
            {t('selectService', { default: 'Выберите услугу' })}
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm shadow-sm backdrop-blur"
          >
            {options.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>
      <BookingCalendarSection service={service} />
    </section>
  );
}
