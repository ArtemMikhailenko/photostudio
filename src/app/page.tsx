// Switch to video-based hero per user request
import HeroVideo from "@/components/HeroVideo";
import USPSection from "@/components/USPSection";
import BrandsMarquee from "@/components/BrandsMarquee";
import Particles from "@/components/Particles";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
            <Particles density={0.10} maxSize={1.2} opacity={0.32} speed={0.5} />

      <HeroVideo />
      <USPSection />
      <BrandsMarquee />
    </main>
  );
}
