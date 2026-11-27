'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, Gauge, ShieldCheck, Globe } from 'lucide-react';
import { HeroSectionContent } from '../../types/landingConfig.types';

export interface HeroSectionProps {
  content: HeroSectionContent;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  const badgeText =
    content.badgeText || 'Thiết kế website theo yêu cầu · Chuẩn SEO Google · Bàn giao 100%';
  const headlineMain = content.headlineMain || 'Thiết Kế Website Chuyên Nghiệp,';
  const headlineHighlight = content.headlineHighlight || 'Tối Ưu Tốc Độ & Chuyển Đổi';
  const description =
    content.description ||
    'Xây dựng website độc bản theo nhận diện thương hiệu của bạn, tải trang dưới 1 giây, chuẩn SEO Google và bàn giao toàn quyền quản trị không chi phí ẩn.';
  const ctaPrimaryText = content.ctaPrimaryText || 'Xem Bảng Giá Trọn Gói';
  const ctaPrimaryLink =
    !content.ctaPrimaryLink || content.ctaPrimaryLink === '#pricing'
      ? '#bang-gia'
      : content.ctaPrimaryLink;
  const ctaSecondaryText = content.ctaSecondaryText || 'Khám Phá Kho Mẫu';
  const ctaSecondaryLink = content.ctaSecondaryLink || '#kho-giao-dien';
  const pillars =
    content.pillars && content.pillars.length > 0
      ? content.pillars
      : [
          { id: 'p1', value: '150+', title: 'Dự án bàn giao', desc: 'Đa dạng ngành nghề' },
          { id: 'p2', value: '< 0.8s', title: 'Tốc độ tải trang', desc: 'Chuẩn Google Core Vitals' },
          { id: 'p3', value: '100%', title: 'Toàn quyền sở hữu', desc: 'Bàn giao mã nguồn & domain' },
        ];

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="stripe-hero-mesh relative overflow-hidden border-b border-[#e3e8ee] pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#e3e8ee] shadow-sm text-xs font-medium text-[#4434d4]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#533afd]" />
              <span>{badgeText}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0d253d] leading-[1.12]">
              {headlineMain}{' '}
              <span className="text-[#533afd]">{headlineHighlight}</span>
            </h1>

            <p className="text-base sm:text-lg text-[#273951] leading-relaxed max-w-2xl">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={ctaPrimaryLink}
                onClick={(e) => handleAnchor(e, ctaPrimaryLink)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#533afd] hover:bg-[#4434d4] active:bg-[#2e2b8c] text-white text-sm font-medium transition-colors shadow-sm"
              >
                <span>{ctaPrimaryText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={ctaSecondaryLink}
                onClick={(e) => handleAnchor(e, ctaSecondaryLink)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#f6f9fc] text-[#0d253d] border border-[#e3e8ee] text-sm font-medium transition-colors"
              >
                <span>{ctaSecondaryText}</span>
              </a>
            </div>

            {/* Compact Metrics Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#e3e8ee]">
              {pillars.slice(0, 3).map((p) => (
                <div key={p.id}>
                  <div className="text-xl sm:text-2xl font-bold text-[#0d253d] tabular-nums">
                    {p.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#273951] mt-0.5">
                    {p.title}
                  </div>
                  <div className="text-xs text-[#64748d] hidden sm:block mt-0.5">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Composited Product Showcase (Stripe Signature Pattern) */}
          <div className="lg:col-span-5">
            <div className="stripe-card rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#e3e8ee]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e3e8ee]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e3e8ee]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e3e8ee]" />
                  <span className="ml-1 text-xs font-mono text-[#64748d]">
                    lighthouse-report
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eef2ff] text-[#4434d4] text-[11px] font-semibold">
                  Chuẩn Production
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#f6f9fc] border border-[#e3e8ee]">
                  <div className="flex items-center justify-between text-xs text-[#64748d]">
                    <span>Hiệu năng</span>
                    <Gauge className="w-4 h-4 text-[#533afd]" />
                  </div>
                  <div className="text-2xl font-bold text-[#0d253d] tabular-nums mt-1.5">
                    99<span className="text-sm font-normal text-[#64748d]">/100</span>
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
                    Tải trang &lt; 0.8s
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f6f9fc] border border-[#e3e8ee]">
                  <div className="flex items-center justify-between text-xs text-[#64748d]">
                    <span>Chuẩn SEO</span>
                    <Globe className="w-4 h-4 text-[#533afd]" />
                  </div>
                  <div className="text-2xl font-bold text-[#0d253d] tabular-nums mt-1.5">
                    100<span className="text-sm font-normal text-[#64748d]">/100</span>
                  </div>
                  <div className="text-[11px] text-[#4434d4] font-medium mt-0.5">
                    Schema &amp; OpenGraph
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f6f9fc] border border-[#e3e8ee] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0d253d]">
                    Tiêu chuẩn bàn giao trọn gói
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                {[
                  'Giao diện thiết kế riêng, chuẩn Mobile & Desktop',
                  'Trang quản trị tiếng Việt trực quan, dễ tự sửa',
                  'Tặng tên miền, hosting năm đầu & SSL bảo mật',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-[#273951]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#533afd] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
