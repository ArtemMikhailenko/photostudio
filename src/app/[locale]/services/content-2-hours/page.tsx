import ServicePageTemplate from '@/components/ServicePageTemplate';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = { params: { locale: string } };

export default async function ContentTwoHoursPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('servicePages.content2h');
  const ts = await getTranslations('services.content');
  return (
    <ServicePageTemplate
      title={t('title')}
      subtitle={t('subtitle')}
      description={<p>{t('description')}</p>}
      service="content-2-hours"
      media={[
        { type: 'image', src: '/images/works-4x3.webp', alt: 'Works' },
        { type: 'image', src: '/images/gallery-4x3.webp', alt: 'Studio' },
        { type: 'video', src: '/video/hero.mp4', poster: '/images/hero-desktop-1920x1080.webp' }
      ]}
    />
  );
}
