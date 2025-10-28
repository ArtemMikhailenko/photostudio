import Link from "next/link";
import Image from "next/image";

interface HeroMinimalProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function HeroMinimal({ title, subtitle, backgroundImage }: HeroMinimalProps = {}) {
  return (
    <section className="relative isolate min-h-[50vh] md:min-h-[60vh] w-full overflow-hidden">
      {backgroundImage ? (
        <>
          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src={backgroundImage}
              alt="Hero background"
              fill
              className="object-cover scale-105"
              priority
              quality={90}
            />
            {/* Elegant gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[var(--background)]" />
            
            {/* Subtle vignette effect */}
            <div className="absolute inset-0 bg-radial-gradient opacity-40" style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
            }} />
          </div>
        </>
      ) : (
        <>
          {/* Soft gradient background matching our color scheme */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(1200px 600px at 60% 20%, rgba(194,155,114,0.12), transparent 70%), radial-gradient(1000px 500px at 30% 70%, rgba(212,196,176,0.08), transparent 70%), var(--background)",
            }}
          />
          
          {/* Floating decorative orbs */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-[var(--primary)]/10 to-transparent rounded-full blur-3xl animate-float" aria-hidden />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-[var(--accent-sand)]/15 to-transparent rounded-full blur-3xl animate-float-delayed" aria-hidden />
        </>
      )}

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pb-16 pt-32 md:pt-40 text-center">
        <h1 className={`text-balance text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 ${
          backgroundImage ? 'text-white drop-shadow-lg' : 'text-[var(--foreground)]'
        }`}>
          {title || "Снимаем эмоции. Создаём истории."}
        </h1>

        <p className={`mt-4 max-w-3xl text-pretty text-lg md:text-xl leading-relaxed ${
          backgroundImage ? 'text-white/90 drop-shadow-md' : 'text-[var(--foreground-secondary)]'
        }`}>
          {subtitle || "Портреты, love story, семейные и коммерческие съёмки. Наш подход — свет, цвет и атмосфера ради идеального кадра."}
        </p>
      </div>
    </section>
  );
}
