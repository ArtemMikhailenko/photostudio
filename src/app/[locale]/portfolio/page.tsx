import PortfolioSection from "@/components/PortfolioSection";
import Footer from "@/components/Footer";

export default function PortfolioPage() {
  return (
    <main 
      className="min-h-screen"
      style={{
        backgroundImage: 'url(/images/site-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <PortfolioSection />
      <Footer />
    </main>
  );
}
