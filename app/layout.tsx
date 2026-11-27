import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/src/config/site.config';
import { getServerLandingConfig, getServerSettings } from '@/src/lib/server-data';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-be-vietnam-pro',
});

export async function generateMetadata(): Promise<Metadata> {
  const cfg = await getServerLandingConfig();
  const title =
    cfg.pageTitle || 'THUYPD.SITE — Thiết Kế & Phát Triển Website Chuyên Nghiệp, Chuẩn SEO';
  const description =
    cfg.metaDescription ||
    'Dịch vụ thiết kế và phát triển website chuyên nghiệp theo yêu cầu THUYPD.SITE, chuẩn tìm kiếm Google, tốc độ tải trang dưới 1 giây, bàn giao trọn gói toàn quyền sở hữu.';
  const ogImage =
    cfg.ogImage ||
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: siteConfig.name || 'THUYPD.SITE',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: 'vi_VN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/icon.svg',
      shortcut: '/icon.svg',
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const settings = await getServerSettings();

  const telephone = settings?.hotline || siteConfig.hotline || '';
  const orgName = settings?.siteName || siteConfig.name || 'THUYPD.SITE';

  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: orgName,
      url: siteUrl,
      description:
        'Dịch vụ thiết kế website chuyên nghiệp theo yêu cầu, chuẩn SEO Google, tối ưu chuyển đổi số.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: orgName,
      url: siteUrl,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone,
        contactType: 'customer service',
        areaServed: 'VN',
        availableLanguage: ['Vietnamese', 'English'],
      },
    },
  ];

  return (
    <html lang="vi" className={`scroll-smooth ${beVietnamPro.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body
        className={`${beVietnamPro.className} min-h-screen bg-white text-[#0d253d] antialiased selection:bg-[#533afd]/15 selection:text-[#4434d4]`}
      >
        {children}
      </body>
    </html>
  );
}
