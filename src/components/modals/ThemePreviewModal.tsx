'use client';

import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeItem } from '../../types/theme.types';

export interface ThemePreviewModalProps {
  theme: ThemeItem | null;
  onClose: () => void;
  onRequestQuote: (theme: ThemeItem) => void;
}

export const ThemePreviewModal: React.FC<ThemePreviewModalProps> = ({
  theme,
  onClose,
  onRequestQuote,
}) => {
  useEffect(() => {
    if (!theme) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [theme, onClose]);

  const hasValidDemoUrl = Boolean(
    theme?.demoUrl && (theme.demoUrl.startsWith('http://') || theme.demoUrl.startsWith('https://'))
  );

  return (
    <AnimatePresence>
      {theme && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d253d]/55 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-[#e3e8ee] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-stripe-lg flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#e3e8ee] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#533afd]">
                  {theme.categoryName}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#0d253d] truncate">
                  {theme.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng cửa sổ xem trước"
                className="p-2 rounded-full text-[#64748d] hover:text-[#0d253d] hover:bg-[#f6f9fc] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7">
                <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#e3e8ee] bg-[#f6f9fc]">
                  {theme.imageUrl ? (
                    <img
                      src={theme.imageUrl}
                      alt={theme.imageAlt || theme.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-[#64748d]">
                      Không có ảnh xem trước
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-[#64748d]">Chi phí triển khai trọn gói</div>
                    <div className="text-2xl font-bold text-[#0d253d] tabular-nums mt-0.5">
                      {theme.formattedPrice}
                    </div>
                  </div>

                  {theme.description && (
                    <p className="text-sm text-[#273951] leading-relaxed">{theme.description}</p>
                  )}

                  {theme.features && theme.features.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-[#e3e8ee]">
                      <div className="text-xs font-semibold text-[#0d253d]">
                        Tính năng nổi bật đi kèm
                      </div>
                      <ul className="space-y-2">
                        {theme.features.map((feat, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-[#273951]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#533afd] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => onRequestQuote(theme)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#533afd] hover:bg-[#4434d4] text-white text-sm font-medium transition-colors cursor-pointer"
                  >
                    <span>Chọn mẫu này để nhận báo giá</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {hasValidDemoUrl && (
                    <a
                      href={theme.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#e3e8ee] hover:bg-[#f6f9fc] text-[#0d253d] text-sm font-medium transition-colors"
                    >
                      <span>Mở trang demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
