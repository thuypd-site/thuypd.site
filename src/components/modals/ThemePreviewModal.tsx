'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { X, ExternalLink, Check, Smartphone, Tablet, Monitor, Sparkles } from 'lucide-react';
import { ThemeItem } from '../../types';

interface ThemePreviewModalProps {
  theme: ThemeItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectThemeForQuote: (theme: ThemeItem) => void;
}

export const ThemePreviewModal: React.FC<ThemePreviewModalProps> = ({
  theme,
  isOpen,
  onClose,
  onSelectThemeForQuote,
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!isOpen || !theme) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0b1c30]/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[#dce9ff]"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-[#eff4ff] border-b border-[#dce9ff]">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#006398]/10 text-[#006398] text-[11px] sm:text-xs font-bold shrink-0">
                {theme.categoryName}
              </span>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#0b1c30] truncate">{theme.title}</h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Device switchers */}
              <div className="hidden sm:flex items-center gap-1 bg-white p-1 rounded-xl border border-[#dce9ff]">
                <button
                  onClick={() => setDeviceView('desktop')}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                    deviceView === 'desktop' ? 'bg-[#006398] text-white' : 'text-[#45464d] hover:bg-[#eff4ff]'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Desktop</span>
                </button>
                <button
                  onClick={() => setDeviceView('tablet')}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                    deviceView === 'tablet' ? 'bg-[#006398] text-white' : 'text-[#45464d] hover:bg-[#eff4ff]'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Tablet</span>
                </button>
                <button
                  onClick={() => setDeviceView('mobile')}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                    deviceView === 'mobile' ? 'bg-[#006398] text-white' : 'text-[#45464d] hover:bg-[#eff4ff]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Mobile</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 text-[#45464d] transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto p-4 sm:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            {/* Visual Preview Device Container */}
            <div className="lg:col-span-8 flex flex-col items-center">
              <div
                className={`w-full transition-all duration-300 rounded-xl overflow-hidden border-4 border-slate-800 bg-slate-900 shadow-xl ${
                  deviceView === 'desktop'
                    ? 'max-w-full'
                    : deviceView === 'tablet'
                    ? 'max-w-[540px]'
                    : 'max-w-[320px]'
                }`}
              >
                {/* Simulated browser bar */}
                <div className="bg-slate-800 px-3 py-2 flex items-center gap-2 border-b border-slate-700">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex-1 bg-slate-900 px-2 py-0.5 rounded text-[10px] text-slate-400 font-mono truncate">
                    https://demo.thuypd.site/{theme.id}
                  </div>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={theme.imageUrl}
                    alt={theme.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Right Information & Package Details */}
            <div className="lg:col-span-4 space-y-5">
              <div>
                <span className="text-xs font-semibold text-[#45464d]">Giá trọn gói khởi tạo</span>
                <div className="text-3xl font-extrabold text-[#006398]">{theme.formattedPrice}</div>
                <p className="text-xs text-[#45464d] mt-1">{theme.description}</p>
              </div>

              {/* Feature bullet points */}
              <div className="space-y-2.5 bg-[#eff4ff] p-4 rounded-xl">
                <h4 className="text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
                  Điểm Nổi Bật Tiêu Chuẩn THUYPD.SITE
                </h4>
                <ul className="space-y-2 text-xs text-[#0b1c30]">
                  {theme.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#006398] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Perks included */}
              <div className="text-xs text-[#45464d] space-y-1.5 border-t border-[#dce9ff] pt-4">
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Miễn phí tên miền .com 1 năm</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Miễn phí máy chủ tốc độ cao 5GB năm đầu</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Toàn quyền sở hữu website 100%</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    onSelectThemeForQuote(theme);
                    onClose();
                  }}
                  className="w-full py-3 bg-[#006398] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#00476e] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Chọn Mẫu Này & Nhận Báo Giá</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-slate-100 text-[#45464d] rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
                >
                  Đóng Xem Trước
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
