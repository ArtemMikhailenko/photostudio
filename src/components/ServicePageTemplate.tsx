"use client";
import Image from "next/image";
import { ReactNode } from "react";
import { Link } from "@/i18n/routing";
import BookingCalendarSection from "./BookingCalendarSection";

type MediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string; alt?: string };

export default function ServicePageTemplate({
  title,
  subtitle,
  description,
  media,
  showBooking = true,
  whatsappHref = "https://wa.me/972501234567",
  service,
}: {
  title: string;
  subtitle?: string;
  description: ReactNode;
  media: MediaItem[];
  showBooking?: boolean;
  whatsappHref?: string;
  service?: string;
}) {
  return (
    <div className="relative isolate">
      {/* Background image (fixed, no blur/overlay) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-fixed bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/site-bg.webp)' }}
      />

      {/* Header section */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-28 pb-8 sm:pt-36 sm:pb-10">
  <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/10 p-6 shadow-xl sm:p-10 backdrop-blur-sm">
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex items-center gap-3">
              {subtitle && (
                <span className="inline-flex items-center rounded-full border border-[#B37A45]/40 bg-[#B37A45]/20 px-3 py-1 text-xs font-semibold text-white">
                  {subtitle}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h1>
            <div className="prose prose-invert max-w-none text-white/90 prose-p:my-0 prose-p:text-white/90">
              {description}
            </div>

            {/* Actions */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {showBooking && (
                <Link
                  href="#booking"
                  className="rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[var(--primary-hover)]"
                >
                  Забронировать
                </Link>
              )}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#25D366]/40 bg-[#25D366]/20 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#25D366]/30"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Media grid */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:pb-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((m, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 shadow-md"
            >
              {m.type === "image" ? (
                <Image
                  src={m.src}
                  alt={m.alt || ""}
                  width={1200}
                  height={800}
                  className="h-64 w-full object-cover sm:h-56"
                />
              ) : (
                <video
                  src={m.src}
                  poster={"poster" in m ? m.poster : undefined}
                  controls
                  className="h-64 w-full object-cover sm:h-56"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Booking section */}
      {showBooking && (
        <div id="booking" className="pb-16 sm:pb-24">
          <BookingCalendarSection service={service} />
        </div>
      )}
    </div>
  );
}
