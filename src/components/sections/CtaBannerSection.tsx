'use client';

import React from 'react';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

import { CtaSectionContent } from '../../types/landingConfig.types';
import { siteConfig } from '../../config/site.config';
import { useSettings } from '../../hooks/useSettings';

interface CtaBannerSectionProps {
  content?: CtaSectionContent;
  displayStyle?: string;
}

export const CtaBannerSection: React.FC<CtaBannerSectionProps> = ({ content }) => {
  const { data: settings } = useSettings();
  const hotline = settings?.hotline || siteConfig.hotline;
  const hotlineRaw = settings?.hotlineRaw || siteConfig.hotlineRaw;

  const title = content?.title || 'Sẵn Sàng Xây Dựng Website Đẹp Mắt & Hiệu Quả?';
  const subtitle = content?.subtitle || 'Để lại thông tin ngay hôm nay để nhận tư vấn giải pháp sát với thực tế ngành nghề và nhận báo giá trọn gói không phát sinh.';
  const buttonText = content?.buttonText || 'Nhận Tư Vấn & Báo Giá Nhanh';
  const buttonLink = content?.buttonLink || '#nhan-bao-gia';
  const hotlineText = content?.hotlineText || `Hoặc gọi Hotline trực tiếp: ${hotline}`;

  return (
    <section className="py-14 sm:py-18 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#006398] via-[#004f7c] to-[#0b1c30] text-white p-8 sm:p-12 lg:p-14 overflow-hidden shadow-xl">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold backdrop-blur-sm border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CƠ HỘI NÂNG TẦM THƯƠNG HIỆU</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {title}
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <a
                href={buttonLink}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-[#006398] font-bold text-sm hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
              >
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`tel:${hotlineRaw}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-sm transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>{hotlineText}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
