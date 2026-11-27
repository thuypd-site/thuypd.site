'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { TestimonialsSectionContent } from '../../types/landingConfig.types';

export interface TestimonialsSectionProps {
  content: TestimonialsSectionContent;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ content }) => {
  const items = content.items || [];
  if (items.length === 0) return null;

  return (
    <section
      id="danh-gia"
      className="bg-[#f6f9fc] py-16 sm:py-20 border-b border-[#e3e8ee] scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          {content.badge && (
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#533afd] mb-2">
              {content.badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0d253d] tracking-tight">
            {content.title || 'Được Tin Tưởng Bởi Doanh Nghiệp & Chủ Cửa Hàng'}
          </h2>
          {content.subtitle && (
            <p className="text-sm sm:text-base text-[#64748d] mt-3 leading-relaxed">
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#e3e8ee] rounded-xl p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: item.rating || 5 }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#273951] leading-relaxed">“{item.quote}”</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#e3e8ee]">
                <img
                  src={item.avatarUrl}
                  alt={item.author}
                  loading="lazy"
                  className="w-10 h-10 rounded-full object-cover border border-[#e3e8ee] shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#0d253d] truncate">
                    {item.author}
                  </div>
                  <div className="text-xs text-[#64748d] truncate">
                    {item.role} · {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
