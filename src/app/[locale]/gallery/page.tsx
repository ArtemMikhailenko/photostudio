import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import GallerySection from '@/components/GallerySection'
import Footer from '@/components/Footer'

export async function generateMetadata({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  const t = await getTranslations({ locale, namespace: 'gallery' })

  return {
    title: t('title'),
    description: t('subtitle')
  }
}

export default function GalleryPage() {
  return (
    <main 
      className="relative min-h-screen w-full"
      style={{
        backgroundImage: 'url(/images/site-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative z-10">
        <GallerySection />
        <Footer />
      </div>
    </main>
  )
}
