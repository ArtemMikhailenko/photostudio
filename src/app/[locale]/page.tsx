// Switch to image-based hero per new design system
import Image from "next/image";
import HeroImage from "@/components/HeroImage";
import USPSection from "@/components/USPSection";
import BrandsMarquee from "@/components/BrandsMarquee";
import Particles from "@/components/Particles";
import USPShowcase from "@/components/USPShowcase";
import ServicesSection from "@/components/ServicesSection";
import BookingCalendarSection from "@/components/BookingCalendarSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden relative text-white">
      {/* Fixed background image for entire page */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/site-bg.webp"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Darker overlay for better readability */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* <Particles density={0.40} maxSize={1.6} opacity={0.12} speed={0.85} direction="up" color="#B37A45" /> */}

      <HeroImage />
      <ServicesSection />
  <BookingCalendarSection />
      <BrandsMarquee />
      <FAQSection />
      <Footer />
    </main>
  );
}
