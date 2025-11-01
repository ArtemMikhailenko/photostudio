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
  features,
}: {
  title: string;
  subtitle?: string;
  description: ReactNode;
  media: MediaItem[];
  showBooking?: boolean;
  whatsappHref?: string;
  service?: string;
  features?: string[];
}) {
  return (
    <div className="relative isolate">

      {/* Header section: glass hero with side CTA card */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-28 pb-10 sm:pt-36 sm:pb-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/25 bg-white/10 shadow-xl backdrop-blur-xl">
          {/* ambient shine */}
          <div aria-hidden className="pointer-events-none absolute -inset-1 bg-[radial-gradient(900px_340px_at_15%_10%,rgba(179,122,69,0.22),transparent_60%)]" />
          <div className="relative grid grid-cols-1 gap-6 p-6 sm:grid-cols-5 sm:p-10">
            {/* text */}
            <div className="sm:col-span-3">
              {subtitle && (
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[.14em] text-white/70">
                  {subtitle}
                </div>
              )}
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">{title}</h1>
              <div className="mt-4 prose prose-invert max-w-none text-white/90 prose-p:my-0 prose-p:text-white/90">
                {description}
              </div>
              
            </div>

            {/* side card (simplified, no input-like box) */}
            <aside className="sm:col-span-2">
              <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/15 p-4 sm:p-6 shadow-lg">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-1 opacity-70"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))" }}
                />
                <div className="relative space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[var(--primary)]" />
                    <span className="text-sm font-semibold text-white/80">SIMILIA STUDIO</span>
                  </div>

                  <div className="grid gap-2">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#25D366]/30"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                        <path d="M20.52 3.48A11.94 11.94 0 0012.06.01 11.99 11.99 0 000 12c0 2.1.55 4.02 1.5 5.7L.04 24l6.42-1.67A11.93 11.93 0 0012 24a12 12 0 008.49-20.52h.03zM12 21.77c-1.86 0-3.6-.5-5.1-1.38l-.36-.21-3.8 1 1.01-3.7-.23-.38A9.79 9.79 0 012.23 12C2.22 6.94 6.26 2.9 11.33 2.9c2.63 0 5.1 1.02 6.96 2.89A9.78 9.78 0 0121.77 12c0 5.06-4.04 9.1-9.1 9.1zm5.3-7.1c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.2-.44-2.28-1.41-.84-.75-1.41-1.68-1.58-1.97-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.49s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.1 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.74-.71 1.98-1.4.24-.68.24-1.26.17-1.39-.07-.13-.26-.2-.55-.35z" />
                      </svg>
                      WhatsApp
                    </a>

                    {showBooking && (
                      <Link
                        href="#booking"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[var(--primary-hover)]"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7 2h10a2 2 0 012 2v2H5V4a2 2 0 012-2zm12 8H5v10a2 2 0 002 2h10a2 2 0 002-2V10zM7 0a4 4 0 00-4 4v14a4 4 0 004 4h10a4 4 0 004-4V4a4 4 0 00-4-4H7z" />
                        </svg>
                        Book now
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Features strip */}
      {features && features.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 pb-6 sm:pb-8">
          <div className="flex flex-wrap items-center gap-3">
            {features.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[12px] font-medium text-white/90 backdrop-blur-sm"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                {f}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Media grid */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-5">
          {media.map((m, i) => {
            const layout =
              i === 0
                ? "sm:col-span-7 sm:row-span-2 h-[240px] sm:h-[420px]"
                : i === 1
                ? "sm:col-span-5 h-[220px]"
                : i === 2
                ? "sm:col-span-5 h-[220px]"
                : "sm:col-span-4 h-[200px]";
            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-sm ${layout}`}
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {m.type === "image" ? (
                  <Image
                    src={m.src}
                    alt={m.alt || ""}
                    width={1600}
                    height={1000}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <video
                    src={m.src}
                    poster={"poster" in m ? m.poster : undefined}
                    controls
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            );
          })}
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
