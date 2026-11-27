'use client';

import React, { useState } from 'react';
import { Eye, Loader2 } from 'lucide-react';
import { useThemes } from '../../features/themes/hooks/useThemes';
import { ThemeCategory, ThemeItem } from '../../types/theme.types';
import { ThemesSectionContent } from '../../types/landingConfig.types';
import { ThemePreviewModal } from '../modals/ThemePreviewModal';

export interface ThemeShowcaseSectionProps {
  content: ThemesSectionContent;
  onSelectTheme?: (theme: ThemeItem) => void;
}

const CATEGORIES: { id: ThemeCategory; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'corporate', label: 'Doanh nghiệp' },
  { id: 'ecommerce', label: 'Bán hàng' },
  { id: 'realestate', label: 'Bất động sản' },
  { id: 'spa', label: 'Thẩm mỹ & Spa' },
  { id: 'furniture', label: 'Nội thất' },
];

export const ThemeShowcaseSection: React.FC<ThemeShowcaseSectionProps> = ({
  content,
  onSelectTheme,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory>('all');
  const [previewTheme, setPreviewTheme] = useState<ThemeItem | null>(null);
  const { data: themes = [], isLoading } = useThemes(selectedCategory);

  const handleRequestQuote = (theme: ThemeItem) => {
    setPreviewTheme(null);
    onSelectTheme?.(theme);
    document.querySelector('#nhan-bao-gia')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="kho-giao-dien"
      className="bg-[#f6f9fc] py-16 sm:py-20 border-b border-[#e3e8ee] scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            {content.badge && (
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#533afd] mb-2">
                {content.badge}
              </span>
            )}
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0d253d] tracking-tight">
              {content.title || 'Khám Phá Giao Diện Thực Tế Theo Ngành Nghề'}
            </h2>
            {content.subtitle && (
              <p className="text-sm sm:text-base text-[#64748d] mt-3 leading-relaxed">
                {content.subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#533afd] text-white'
                      : 'bg-white text-[#273951] border border-[#e3e8ee] hover:border-[#a8c3de]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-sm text-[#64748d] gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#533afd]" />
            <span>Đang tải kho giao diện mẫu...</span>
          </div>
        ) : themes.length === 0 ? (
          <div className="bg-white border border-[#e3e8ee] rounded-xl p-10 text-center text-sm text-[#64748d]">
            Chưa có mẫu giao diện trong danh mục này.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <div
                key={theme.id || theme._id || theme.title}
                onClick={() => setPreviewTheme(theme)}
                className="group bg-white border border-[#e3e8ee] hover:border-[#533afd]/40 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-stripe flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[16/10] bg-[#f6f9fc] overflow-hidden border-b border-[#e3e8ee]">
                  {theme.imageUrl ? (
                    <img
                      src={theme.imageUrl}
                      alt={theme.imageAlt || theme.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#64748d]">
                      Ảnh xem trước
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/95 border border-[#e3e8ee] text-[11px] font-medium text-[#0d253d]">
                    {theme.categoryName}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-[#0d253d] leading-snug">
                      {theme.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748d] mt-1.5 line-clamp-2 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#e3e8ee] flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-[#0d253d] tabular-nums">
                      {theme.formattedPrice}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewTheme(theme);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#eef2ff] hover:bg-[#533afd] text-[#4434d4] hover:text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem chi tiết</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ThemePreviewModal
        theme={previewTheme}
        onClose={() => setPreviewTheme(null)}
        onRequestQuote={handleRequestQuote}
      />
    </section>
  );
};
