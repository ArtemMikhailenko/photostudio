export default function BrandsMarquee() {
  const brands = [
    "Apple",
    "Adidas",
    "Samsung",
    "Zara",
    "IKEA",
    "L'Oréal",
    "Nike",
    "Coca‑Cola",
  ];

  // Build one row content duplicated for seamless loop
  const Row = ({ outline = false, reverse = false }: { outline?: boolean; reverse?: boolean }) => (
    <div className="relative overflow-hidden py-6">
      <div
        className={`pause-if-reduced will-change-transform flex w-[200%] items-center gap-10 whitespace-nowrap ${
          reverse
            ? "motion-safe:animate-[marquee-right_28s_linear_infinite]"
            : "motion-safe:animate-[marquee-left_36s_linear_infinite]"
        }`}
      >
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="flex shrink-0 items-center gap-10 px-2">
            {brands.map((b) => (
              <div key={b + idx} className="flex items-center gap-6">
                <span
                  className={`text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight ${
                    outline ? "text-outline" : "text-white"
                  }`}
                  style={outline ? { WebkitTextStroke: "2px #ffffff" } : undefined}
                >
                  {b}
                </span>
                <span className="text-4xl text-[#D4FF3D]">•</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* cute swirl accents */}
      <svg
        className="pointer-events-none absolute -top-2 left-8 hidden h-8 w-8 text-purple-300/80 sm:block"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 12c3-5 7 0 8 2s4 3 7 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg
        className="pointer-events-none absolute -bottom-1 right-10 hidden h-8 w-8 rotate-180 text-purple-300/80 sm:block"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 12c3-5 7 0 8 2s4 3 7 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  return (
    <section className="relative isolate bg-black py-10 text-white sm:py-14">
      {/* backdrop grain / stars */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
          opacity: 0.25,
        }}
      />

      {/* Row 1: filled text moving left */}
      <Row outline={false} reverse={false} />
      {/* Row 2: outline text moving right and a bit faster for parallax-y feel */}
      <Row outline={true} reverse={true} />
    </section>
  );
}
