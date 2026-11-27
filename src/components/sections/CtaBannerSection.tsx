'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CtaSectionContent } from '../../types/landingConfig.types';

export interface CtaBannerSectionProps {
  content: CtaSectionContent;
}

export const CtaBannerSection: React.FC<CtaBannerSectionProps> = ({ content }) => {
  const buttonLink = content.buttonLink || '#nhan-bao-gia';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (buttonLink.startsWith('#')) {
      e.preventDefault();
      document.querySelector(buttonLink)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-white py-12 sm:py-16 border-b border-[#e3e8ee]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="stripe-hero-mesh border border-[#e3e8ee] rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-xl sm:text-3xl font-bold text-[#0d253d] tracking-tight">
              {content.title || 'Sẵn Sàng Nâng Cấp Website Cho Doanh Nghiệp?'}
            </h2>
            {content.subtitle && (
              <p className="text-sm text-[#273951] mt-2 leading-relaxed">{content.subtitle}</p>
            )}
          </div>
          <a
            href={buttonLink}
            onClick={handleClick}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#533afd] hover:bg-[#4434d4] text-white text-sm font-medium transition-colors shrink-0"
          >
            <span>{content.buttonText || 'Nhận Báo Giá Ngay'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
