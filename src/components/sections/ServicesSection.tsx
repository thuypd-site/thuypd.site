'use client';

import React from 'react';
import { ServicesSectionContent } from '../../types/landingConfig.types';
import {
  IconWebDesign,
  IconEcommerce,
  IconSEO,
  IconCloudServer,
  IconCorporate,
  IconSpeed,
  IconBadge,
} from '../icons/CustomIcons';

export interface ServicesSectionProps {
  content: ServicesSectionContent;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  design_services: <IconWebDesign size={20} />,
  ads_click: <IconEcommerce size={20} />,
  rocket_launch: <IconSpeed size={20} />,
  query_stats: <IconSEO size={20} />,
  dashboard: <IconCorporate size={20} />,
  dns: <IconCloudServer size={20} />,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ content }) => {
  const items = content.items || [];

  return (
    <section id="dich-vu" className="bg-white py-16 sm:py-20 border-b border-[#e3e8ee] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          {content.badge && (
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#533afd] mb-2">
              {content.badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0d253d] tracking-tight">
            {content.title || 'Dịch Vụ Thiết Kế & Phát Triển Website'}
          </h2>
          {content.subtitle && (
            <p className="text-sm sm:text-base text-[#64748d] mt-3 leading-relaxed">
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="group bg-white border border-[#e3e8ee] hover:border-[#533afd]/40 rounded-xl p-6 transition-all duration-200 hover:shadow-stripe flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <IconBadge size="md">
                    {ICON_MAP[item.icon] || <IconWebDesign size={20} />}
                  </IconBadge>
                  {item.tag && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#eef2ff] text-[#4434d4] text-[11px] font-medium">
                      {item.tag}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-[#0d253d] leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-[#64748d] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
