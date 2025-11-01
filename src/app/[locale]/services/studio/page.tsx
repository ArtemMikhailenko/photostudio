import ServicePageTemplate from '@/components/ServicePageTemplate';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = { params: { locale: string } };

export default async function StudioRentalPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('servicePages.studio');
  const ts = await getTranslations('services.studio');
  return (
    <ServicePageTemplate
      title={t('title')}
      subtitle={t('subtitle')}
      description={
        <>
          <p>{t('description')}</p>
          <ul className="mt-3 list-disc pl-5 text-white/90">
            <li>{t('pricing.base')}</li>
            <li>{t('pricing.photographer')}</li>
            <li>{t('pricing.videographer')}</li>
          </ul>
        </>
      }
      service="studio"
      features={[ts('bullet1'), ts('bullet2'), ts('bullet3')]}
      media={[
        { type: 'image', src: '/images/studio/R3N07178-HDR-2.webp', alt: 'Studio space' },
        { type: 'image', src: '/images/studio/R3N07230-Pano.webp', alt: 'Studio pano' },
        { type: 'image', src: '/images/studio/R3N07255.webp', alt: 'Equipment corner' }
      ]}
    />
  );
}
