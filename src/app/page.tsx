// Switch to video-based hero per user request
import HeroVideo from "@/components/HeroVideo";
import USPSection from "@/components/USPSection";
import BrandsMarquee from "@/components/BrandsMarquee";
import Particles from "@/components/Particles";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
            <Particles density={0.40} maxSize={1.6} opacity={0.20} speed={0.85} direction="up" />

      <HeroVideo />
      <USPSection />
      <BrandsMarquee />
    </main>
  );
}
