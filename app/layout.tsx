import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import { BACKEND_URL } from '@/src/lib/backend-proxy';
import { siteConfig } from '@/src/config/site.config';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-be-vietnam-pro',
});

export async function generateMetadata(): Promise<Metadata> {
  let title = 'THUYPD.SITE — Thiết Kế & Phát Triển Website Chuyên Nghiệp, Chuẩn SEO';
  let description = 'Dịch vụ thiết kế và phát triển website chuyên nghiệp theo yêu cầu THUYPD.SITE, chuẩn tìm kiếm Google, tốc độ mở trang tức thì dưới 1 giây, bàn giao trọn gói toàn quyền sở hữu.';
  let ogImage = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${BACKEND_URL}/api/landing-config`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const cfg = data.data || data.config || data;
      if (cfg.pageTitle) title = cfg.pageTitle;
      if (cfg.metaDescription) description = cfg.metaDescription;
      if (cfg.ogImage) ogImage = cfg.ogImage;
    }
  } catch (err) {
    // fallback to default metadata
  }

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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
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

export default function RootLayout({ children }: { children: ReactNode }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.name || 'THUYPD.SITE',
      url: siteUrl,
      description: 'Dịch vụ thiết kế website chuyên nghiệp theo yêu cầu, chuẩn SEO Google, tối ưu chuyển đổi số.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.name || 'THUYPD.SITE',
      url: siteUrl,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: siteConfig.hotline || '',
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
      <body className={`${beVietnamPro.className} min-h-screen bg-[#f8fafd] text-[#0b1c30] antialiased selection:bg-[#006398]/20 selection:text-[#006398]`}>
        {children}
      </body>
    </html>
  );
}
