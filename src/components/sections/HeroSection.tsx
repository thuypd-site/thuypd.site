'use client';

import React from 'react';
import { AnimatePresence } from 'motion/react';
import { HeroSectionContent } from '../../types/landingConfig.types';
import { HeroVariantA, HeroVariantB, HeroVariantC } from './hero';

export interface HeroSectionProps {
  content?: HeroSectionContent;
  displayStyle?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ content, displayStyle = 'split' }) => {
  // Normalize style aliases
  const activeStyle = (() => {
    if (displayStyle === 'hero-b' || displayStyle === 'centered') return 'hero-b';
    if (displayStyle === 'hero-a' || displayStyle === 'split-modern' || displayStyle === 'split' || displayStyle === 'minimal') return 'hero-a';
    return 'hero-c'; // Default to modern SaaS Glow
  })();

  const badgeText = content?.badgeText || 'Thiết Kế Website Theo Yêu Cầu • Chuẩn SEO Google • Bàn Giao Trọn Gói';
  const headlineMain = content?.headlineMain || 'Thiết Kế Website Chuyên Nghiệp,';
  const headlineHighlight = content?.headlineHighlight || 'Đúng Ý & Tối Ưu Chuyển Đổi';
  const description = content?.description || 'Chúng tôi thiết kế và phát triển website độc bản theo phong cách thương hiệu của bạn, tối ưu tốc độ mở trang dưới 1 giây, chuẩn SEO Google và bàn giao 100% quyền quản trị. Dễ dàng tự cập nhật nội dung, không lo phát sinh chi phí ngầm.';
  const ctaPrimary = content?.ctaPrimaryText || 'Xem Báo Giá Trọn Gói';
  const ctaSecondary = content?.ctaSecondaryText || 'Tư Vấn Miễn Phí';
  const ctaPrimaryLink = content?.ctaPrimaryLink || '#pricing';
  const ctaSecondaryLink = content?.ctaSecondaryLink || '#contact-lead';
  const pillars = content?.pillars && content.pillars.length > 0 ? content.pillars : [
    { id: 'p1', value: '100%', title: 'Đúng Ý & Chuẩn Gu', desc: 'Thiết kế riêng biệt theo nhận diện thương hiệu bạn' },
    { id: 'p2', value: '< 1s', title: 'Tải Trang Siêu Tốc', desc: 'Đạt 98-100 điểm Google, giữ chân khách hàng tối đa' },
    { id: 'p3', value: 'Trọn Đời', title: 'Toàn Quyền Sở Hữu', desc: 'Bàn giao trọn bộ mã nguồn, bảo hành chu đáo lâu dài' },
  ];

  const variantProps = {
    badgeText,
    headlineMain,
    headlineHighlight,
    description,
    ctaPrimary,
    ctaSecondary,
    ctaPrimaryLink,
    ctaSecondaryLink,
    pillars,
    content,
  };

  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-20 transition-all duration-500" id="hero-section-container">
      {/* Background Gradients & Ambient Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(0, 99, 152, 0.07) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 35%, #000 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 35%, #000 30%, transparent 80%)',
          }}
        />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[480px] bg-gradient-to-tr from-[#006398]/08 via-[#e2e8f0]/40 to-transparent blur-3xl rounded-full opacity-60 animate-pulse-glow" />
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-[#006398]/05 blur-3xl rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 -right-32 w-72 h-72 bg-[#5bb8fe]/05 blur-3xl rounded-full animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        <AnimatePresence mode="wait">
          {activeStyle === 'hero-a' && <HeroVariantA key="hero-a" {...variantProps} />}
          {activeStyle === 'hero-b' && <HeroVariantB key="hero-b" {...variantProps} />}
          {activeStyle === 'hero-c' && <HeroVariantC key="hero-c" {...variantProps} />}
        </AnimatePresence>
      </div>
    </section>
  );
};
