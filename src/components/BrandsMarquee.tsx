export default function BrandsMarquee() {
  const brands = [
    "RENUAR",
    "CRAISER JEANS",
    "ZARA",
    "NIKE",
    "BSI",
    "MOSHE PERETZ",
    "ADIDAS",
    "VOGUE",
  ];

  // Build one row content duplicated for seamless loop
  const Row = ({ outline = false, reverse = false }: { outline?: boolean; reverse?: boolean }) => (
    <div
      className={`relative overflow-hidden py-6 ${reverse ? "-rotate-[0.4deg]" : "rotate-[0.4deg]"}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, rgba(0,0,0,0.9) 6%, rgba(0,0,0,0.9) 94%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, rgba(0,0,0,0.9) 6%, rgba(0,0,0,0.9) 94%, transparent)",
      }}
    >
      <div
        className={`pause-if-reduced will-change-transform flex min-w-max items-center gap-10 whitespace-nowrap ${
          reverse
            ? "motion-safe:animate-[marquee-right_28s_linear_infinite]"
            : "motion-safe:animate-[marquee-left_36s_linear_infinite]"
        }`}
      >
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="flex shrink-0 items-center gap-10 px-2">
            {brands.map((b) => (
              <div
                key={b + idx}
                className="group relative flex items-center gap-6 transition-transform duration-300 ease-out hover:-translate-y-0.5"
              >
                <span
                  className={`relative text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight transition-transform duration-300 will-change-transform group-hover:scale-[1.03] ${
                    outline
                      ? "text-transparent"
                      : "bg-gradient-to-b from-[#1E1E1E] via-[#1E1E1E] to-[#1E1E1E]/85 bg-clip-text text-transparent drop-shadow-[0_6px_18px_rgba(0,0,0,0.10)]"
                  }`}
                  style={
                    outline
                      ? { WebkitTextStroke: "2px var(--primary)", color: "transparent" }
                      : undefined
                  }
                >
                  {b}
                  {/* shine sweep on hover for filled text */}
                  {!outline && (
                    <span className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                      <span className="absolute -left-10 top-0 h-full w-10 rotate-12 bg-gradient-to-r from-white/60 to-white/0 opacity-0 transition-all duration-700 group-hover:translate-x-[160%] group-hover:opacity-70" />
                    </span>
                  )}
                </span>
                <span className="text-4xl text-[var(--primary)] motion-safe:animate-[pulse-soft_3s_ease-in-out_infinite]">•</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* subtle glow line across the row for visual interest */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#C29B72]/20 to-transparent opacity-15 blur-sm"
      />

      {/* cute swirl accents */}
      <svg
  className="pointer-events-none absolute -top-2 left-8 hidden h-8 w-8 text-[#C29B72]/60 sm:block"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 12c3-5 7 0 8 2s4 3 7 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg
  className="pointer-events-none absolute -bottom-1 right-10 hidden h-8 w-8 rotate-180 text-[#C29B72]/60 sm:block"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 12c3-5 7 0 8 2s4 3 7 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  return (
    <section className="relative isolate bg-[#F6F3EF] py-10 text-[#1E1E1E] sm:py-14">
      {/* backdrop grain / subtle pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: "radial-gradient(rgba(194,155,114,0.06) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
          opacity: 0.3,
        }}
      />

      {/* Row 1: filled gradient text moving left */}
      <Row outline={false} reverse={false} />
      {/* Row 2: bronze outline moving right for parallax */}
      <Row outline={true} reverse={true} />
    </section>
  );
}
