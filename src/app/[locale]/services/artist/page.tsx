import ServicePageTemplate from '@/components/ServicePageTemplate';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = { params: { locale: string } };

export default async function ArtistPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('servicePages.artist');
  return (
    <ServicePageTemplate
      title={t('title')}
      subtitle={t('subtitle')}
      description={<p>{t('description')}</p>}
      service="artist"
      media={[
        { type: 'image', src: '/images/works-4x3.webp', alt: 'Artist portrait' },
        { type: 'image', src: '/images/gallery-4x3.webp', alt: 'Studio mood' },
        { type: 'video', src: '/video/jelly-2.mp4', poster: '/images/hero-desktop-1920x1080.webp' }
      ]}
    />
  );
}
