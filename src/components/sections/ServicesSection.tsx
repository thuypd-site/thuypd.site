'use client';

import React from 'react';
import { useServices } from '../../hooks/useServices';
import { ServicesSectionContent } from '../../types/landingConfig.types';
import { ServicesBentoVariant, ServicesGridVariant } from './services';

export interface ServicesSectionProps {
  content?: ServicesSectionContent;
  displayStyle?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ content, displayStyle = 'services-b' }) => {
  const { data: defaultServices = [] } = useServices();

  const activeStyle = (() => {
    if (displayStyle === 'services-a' || displayStyle === 'grid-3' || displayStyle === 'grid-2' || displayStyle === 'compact') {
      return 'services-a';
    }
    return 'services-b'; // Default to modern Bento Grid (Stripe)
  })();

  const services = content?.items && content.items.length > 0 ? content.items : defaultServices;
  const badge = content?.badge || 'Dịch Vụ Trọng Tâm';
  const title = content?.title || 'Giải Pháp Thiết Kế & Phát Triển Website Toàn Diện';
  const subtitle = content?.subtitle || 'Lựa chọn kiến trúc website phù hợp nhất với mô hình kinh doanh của bạn, tối ưu chuyển đổi và đồng hành kỹ thuật bền lâu.';

  return (
    <section className="py-16 lg:py-24 bg-white" id="dich-vu">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        {/* Section Header */}
        <div className="mb-10 lg:mb-14">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3.5 py-1 rounded-full bg-[#dce9ff] text-[#006398] text-xs uppercase font-bold border border-[#006398]/15 inline-block">
              {badge}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-[#45464d] leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Style A: Grid Cards */}
        {activeStyle === 'services-a' && <ServicesGridVariant services={services} />}

        {/* Style B: Bento Grid */}
        {activeStyle === 'services-b' && <ServicesBentoVariant services={services} />}
      </div>
    </section>
  );
};
