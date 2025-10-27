import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Footer from '@/components/Footer'
import EquipmentSection from '@/components/EquipmentSection'

export async function generateMetadata({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  const t = await getTranslations({ locale, namespace: 'equipment' })

  return {
    title: t('title'),
    description: t('subtitle')
  }
}

export default function EquipmentPage() {
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
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10">
        <EquipmentSection />
        <Footer />
      </div>
    </main>
  )
}
