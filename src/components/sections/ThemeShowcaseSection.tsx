'use client';

import React, { useState } from 'react';
import { ArrowRight, MessageCircleQuestion } from 'lucide-react';
import { ThemeCategory, ThemeItem } from '../../types';
import { useThemes } from '../../hooks/useThemes';
import { ThemePreviewModal } from '../modals/ThemePreviewModal';
import { ThemesSectionContent } from '../../types/landingConfig.types';
import { ThemeCompactVariant, ThemeStandardVariant } from './themes';

export interface ThemeShowcaseSectionProps {
  content?: ThemesSectionContent;
  displayStyle?: string;
  onSelectTheme?: (theme: ThemeItem) => void;
}

export const ThemeShowcaseSection: React.FC<ThemeShowcaseSectionProps> = ({
  content,
  displayStyle = 'standard',
  onSelectTheme,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory>('all');
  const [activePreviewTheme, setActivePreviewTheme] = useState<ThemeItem | null>(null);

  const isCompact = displayStyle === 'compact';
  const badge = content?.badge || 'Kho Giao Diện';
  const title = content?.title || 'Mẫu Giao Diện Website Đẹp Mắt & Thu Hút Khách Hàng';
  const subtitle = content?.subtitle || 'Bộ sưu tập mẫu giao diện thực tế đa ngành nghề, dễ dàng tùy biến theo nhận diện thương hiệu của bạn.';

  const { data: themes = [], isLoading } = useThemes(selectedCategory);

  const rawCategories = (content as any)?.categories;
  const categories: { id: ThemeCategory; label: string }[] =
    Array.isArray(rawCategories) && rawCategories.length > 0
      ? rawCategories.map((c: any) => ({
          id: (c.id || c.key || c.value) as ThemeCategory,
          label: c.label || c.name || c.title,
        }))
      : [
          { id: 'all', label: 'Tất cả mẫu' },
          { id: 'ecommerce', label: 'Bán Hàng' },
          { id: 'corporate', label: 'Doanh Nghiệp' },
          { id: 'realestate', label: 'Bất Động Sản' },
          { id: 'spa', label: 'Thẩm Mỹ & Spa' },
          { id: 'furniture', label: 'Nội Thất' },
        ];

  const handleSelectTheme = (theme: ThemeItem) => {
    if (onSelectTheme) {
      onSelectTheme(theme);
    }
    const target = document.querySelector('#nhan-bao-gia');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white" id="kho-giao-dien">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full space-y-10">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
            <span className="px-4 py-1 rounded-full bg-[#dce9ff] text-[#006398] text-xs uppercase font-bold border border-[#006398]/15">
              {badge}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30]">
              {title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#45464d] leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="pt-1 md:pt-0">
            <a
              href="#nhan-bao-gia"
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#006398] font-bold hover:underline"
            >
              <span>Khám phá các mẫu giao diện</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap min-h-[44px] flex items-center cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#006398] text-white shadow-md shadow-[#006398]/20'
                  : 'bg-[#eff4ff] text-[#45464d] hover:bg-[#dce9ff] hover:text-[#0b1c30]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Theme Grid */}
        {isLoading ? (
          <div className={`grid ${isCompact ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'}`}>
            {[1, 2, 3, 4, 5, 6].slice(0, isCompact ? 8 : 6).map((n) => (
              <div
                key={n}
                className="rounded-2xl bg-slate-50 border border-slate-100 p-4 space-y-4 animate-pulse"
              >
                <div className="aspect-[16/10] bg-slate-200 rounded-xl w-full" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : isCompact ? (
          <ThemeCompactVariant
            themes={themes}
            onPreviewTheme={setActivePreviewTheme}
            onSelectTheme={handleSelectTheme}
          />
        ) : (
          <ThemeStandardVariant
            themes={themes}
            onPreviewTheme={setActivePreviewTheme}
            onSelectTheme={handleSelectTheme}
          />
        )}

        {/* Custom request banner */}
        <div className="p-5 sm:p-8 rounded-2xl bg-[#f6f9fc] border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-[#0b1c30]">Bạn vẫn chưa tìm được giao diện vừa ý?</h4>
            <p className="text-xs sm:text-sm text-[#45464d]">
              Hãy chia sẻ mong muốn hoặc gửi mẫu website tham khảo, chúng tôi sẽ chọn lọc hoặc thiết kế riêng bản demo phù hợp nhất.
            </p>
          </div>
          <a
            href="#nhan-bao-gia"
            className="relative overflow-hidden group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0b1c30] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md hover:shadow-xl hover:bg-[#004f7c] active:scale-95 transition-all w-full sm:w-auto shrink-0 min-h-[48px]"
          >
            <MessageCircleQuestion className="w-4 h-4" />
            <span>Tư Vấn Thiết Kế Riêng</span>
          </a>
        </div>
      </div>

      {/* Theme preview modal */}
      <ThemePreviewModal
        theme={activePreviewTheme}
        isOpen={Boolean(activePreviewTheme)}
        onClose={() => setActivePreviewTheme(null)}
        onSelectThemeForQuote={handleSelectTheme}
      />
    </section>
  );
};
