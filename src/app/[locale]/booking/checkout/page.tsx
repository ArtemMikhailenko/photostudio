import { setRequestLocale } from 'next-intl/server';
import CheckoutForm from '@/components/CheckoutForm';
import Image from 'next/image';

type Props = { params: { locale: string }, searchParams?: { [key: string]: string | string[] | undefined } }

export default function CheckoutPage({ params: { locale }, searchParams }: Props) {
  setRequestLocale(locale);
  const date = typeof searchParams?.date === 'string' ? searchParams.date : undefined;
  const time = typeof searchParams?.time === 'string' ? searchParams.time : undefined;
  const service = typeof searchParams?.service === 'string' ? searchParams.service : undefined;

  return (
    <main className="relative min-h-screen pt-28 pb-12 sm:pt-32 sm:pb-16">
      {/* Fixed background image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/site-bg.webp"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <CheckoutForm initialDate={date} initialTime={time} initialService={service} />
      </div>
    </main>
  )
}

// Ensure this page is rendered per request so search params are available
export const dynamic = 'force-dynamic'
