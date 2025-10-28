import { setRequestLocale } from 'next-intl/server';
import AboutPageContent from '@/components/AboutPageContent';

type Props = {
  params: { locale: string };
};

export default async function AboutPage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  return <AboutPageContent />;
}
