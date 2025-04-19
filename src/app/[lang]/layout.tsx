/**
 * Next.js App Router Layout Dosyası
 *
 * Bu dosya, tüm sayfalar için ortak layout'u tanımlar.
 * Font yüklemeleri, viewport ayarları ve dil desteği burada yapılandırılır.
 *
 * @module Layout
 */

import { Nunito } from 'next/font/google';
import ClientLayout from '../client-layout';
import type { Viewport, Metadata } from 'next';

/**
 * Nunito font konfigürasyonu
 * Tüm site için tek font olarak kullanılır
 */
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

/**
 * Metadata tanımlamaları
 * SEO, favicon ve tema rengi ayarlarını içerir
 */
export const metadata: Metadata = {
  icons: {
    icon: [
      {
        url: '/favicon/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
};

/**
 * Viewport meta etiketleri
 * Tema rengi için light/dark mode desteği sağlar
 */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

/**
 * Statik sayfa parametrelerini oluşturur
 * Next.js build zamanında desteklenen diller için rotalar oluşturur
 *
 * @returns {Promise<Array<{lang: string}>>} Desteklenen diller için route parametreleri
 */
export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }];
}

/**
 * Root Layout Bileşeni
 * Tüm sayfalar için temel HTML yapısını ve ortak özellikleri sağlar
 *
 * @param {Object} props - Bileşen props'ları
 * @param {React.ReactNode} props.children - Alt bileşenler
 * @param {Object} props.params - Route parametreleri
 * @param {string} props.params.lang - Aktif dil kodu (tr/en)
 * @returns {Promise<JSX.Element>} Layout bileşeni
 */
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // Tüm params objesini bekle
  const resolvedParams = await Promise.resolve(params);

  return (
    <html lang={resolvedParams.lang} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" href="/favicon/favicon-32x32.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${nunito.className} h-full`}
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
