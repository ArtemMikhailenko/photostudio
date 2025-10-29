import ServicesSection from "@/components/ServicesSection";
import { setRequestLocale } from 'next-intl/server';

type Props = { params: { locale: string } };

export default function ServicesPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return (
    <main className="relative isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-fixed bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/site-bg.webp)' }}
      />
      <ServicesSection />
    </main>
  );
}
