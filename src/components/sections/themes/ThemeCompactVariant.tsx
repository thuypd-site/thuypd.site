'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Eye, Sparkles } from 'lucide-react';
import { ThemeVariantProps } from './ThemeStandardVariant';

export const ThemeCompactVariant: React.FC<ThemeVariantProps> = ({
  themes,
  onPreviewTheme,
  onSelectTheme,
}) => {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
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
              onClick={() => onPreviewTheme(theme)}
              className="absolute inset-0 bg-[#0b1c30]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-xs backdrop-blur-[2px] cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Xem Thử Giao Diện</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 space-y-3 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors truncate">
                  {theme.title}
                </h4>
                <span className="text-sm font-extrabold text-[#006398] shrink-0">
                  {theme.formattedPrice}
                </span>
              </div>
              <p className="text-xs text-[#45464d] mt-1 line-clamp-2">{theme.description}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#eff4ff]">
              <button
                onClick={() => onPreviewTheme(theme)}
                className="flex-1 py-2 px-2.5 text-center rounded-xl bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold hover:bg-[#dce9ff] active:scale-95 transition-all flex items-center justify-center gap-1 min-h-[40px] cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem Demo</span>
              </button>
              <button
                onClick={() => onSelectTheme(theme)}
                className="flex-1 py-2 px-2.5 text-center rounded-xl bg-[#006398] text-white text-xs font-semibold hover:bg-[#00476e] hover:shadow-md hover:shadow-[#006398]/20 active:scale-95 transition-all flex items-center justify-center gap-1 min-h-[40px] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Chọn Mẫu</span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
