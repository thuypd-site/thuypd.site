'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

import { Eye, ArrowRight, Sparkles, MessageCircleQuestion } from 'lucide-react';
import { ThemeCategory, ThemeItem } from '../../types';
import { useThemes } from '../../hooks/useThemes';
import { ThemePreviewModal } from '../modals/ThemePreviewModal';
import { ThemesSectionContent } from '../../types/landingConfig.types';

interface ThemeShowcaseSectionProps {
  content?: ThemesSectionContent;
  displayStyle?: string;
  onSelectTheme?: (theme: ThemeItem) => void;
}

export const ThemeShowcaseSection: React.FC<ThemeShowcaseSectionProps> = ({ content, onSelectTheme }) => {
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory>('all');
  const [activePreviewTheme, setActivePreviewTheme] = useState<ThemeItem | null>(null);

  const badge = content?.badge || 'Kho Giao Diện';
  const title = content?.title || 'Mẫu Giao Diện Website Đẹp Mắt & Thu Hút Khách Hàng';
  const subtitle = content?.subtitle || 'Bộ sưu tập mẫu giao diện thực tế đa ngành nghề, dễ dàng tùy biến theo nhận diện thương hiệu của bạn.';

  // TanStack Query for caching and server state
  const { data: themes = [], isLoading } = useThemes(selectedCategory);

  const categories: { id: ThemeCategory; label: string }[] = [
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

        {/* Category Filter Tabs (Swipeable on mobile, flex-wrap on tablet/desktop) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer min-h-[40px] flex items-center ${
                selectedCategory === cat.id
                  ? 'bg-[#006398] text-white shadow-sm'
                  : 'bg-slate-100 text-[#0b1c30] hover:bg-slate-200/80 hover:text-[#006398]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Themes Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl bg-white p-4 shadow-sm border border-[#dce9ff] animate-pulse space-y-4">
                <div className="aspect-[16/10] bg-slate-200 rounded-xl" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {themes.map((theme) => (
              <motion.div
                key={theme.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-white shadow-sm border border-[#dce9ff]/70 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Image Showcase */}
                <div className="relative overflow-hidden aspect-[16/10] bg-[#eff4ff]">
                  <img
                    src={theme.imageUrl}
                    alt={theme.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#006398] text-xs font-bold shadow-sm">
                    {theme.categoryName}
                  </div>
                  <button
                    onClick={() => setActivePreviewTheme(theme)}
                    className="absolute inset-0 bg-[#0b1c30]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-xs backdrop-blur-[2px]"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Xem Thử Giao Diện</span>
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
                        {theme.title}
                      </h4>
                      <span className="text-base font-extrabold text-[#006398]">{theme.formattedPrice}</span>
                    </div>
                    <p className="text-xs text-[#45464d] mt-1 line-clamp-2">{theme.description}</p>
                  </div>

                  {/* Actions (44px min tap targets) */}
                  <div className="flex items-center gap-2 pt-2 border-t border-[#eff4ff]">
                    <button
                      onClick={() => setActivePreviewTheme(theme)}
                      className="flex-1 py-2.5 px-3 text-center rounded-xl bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold hover:bg-[#dce9ff] active:scale-95 transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Xem Thực Tế</span>
                    </button>
                    <button
                      onClick={() => handleSelectTheme(theme)}
                      className="flex-1 py-2.5 px-3 text-center rounded-xl bg-[#006398] text-white text-xs font-semibold hover:bg-[#00476e] hover:shadow-md hover:shadow-[#006398]/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
                    >
                      <Sparkles className="w-4 h-4 text-cyan-300" />
                      <span>Tạo Website</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
