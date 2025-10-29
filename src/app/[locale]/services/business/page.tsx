import ServicePageTemplate from '@/components/ServicePageTemplate';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = { params: { locale: string } };

export default async function BusinessPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('servicePages.business');
  return (
    <ServicePageTemplate
      title={t('title')}
      subtitle={t('subtitle')}
      description={<p>{t('description')}</p>}
      service="business"
      media={[
        { type: 'image', src: '/images/works-4x3.webp', alt: 'Business portrait' },
        { type: 'image', src: '/images/equipment-4x3.webp', alt: 'Lighting setup' },
        { type: 'video', src: '/video/jelly-2.mp4', poster: '/images/hero-desktop-1920x1080.webp' }
      ]}
    />
  );
}
