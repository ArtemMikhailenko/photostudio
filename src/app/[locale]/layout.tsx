import type { Metadata } from "next";
import { Geist_Mono, Manrope, Unbounded, Rubik } from "next/font/google";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalParticles from "@/components/GlobalParticles";

const manrope = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

// Hebrew-friendly font to ensure proper glyph coverage for RTL
const hebrew = Rubik({
  variable: "--font-hebrew",
  subsets: ["hebrew"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SIMILIA Photo Studio",
  description: "Professional photography: portraits, family, commercial shoots",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
 
  return (
    <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <body className={`${manrope.variable} ${geistMono.variable} ${display.variable} ${locale === 'he' ? hebrew.variable : ''} antialiased font-sans`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {/* Global fixed background for all pages */}
          <div className="fixed inset-0 -z-10">
            <img
              src="/images/site-bg.webp"
              alt="Background"
              className="h-full w-full object-cover"
            />
          </div>
          <Header />
          {children}
          <Footer />
          {/* <GlobalParticles /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
