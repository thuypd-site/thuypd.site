'use client';

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp, Sparkles } from 'lucide-react';

import { siteConfig } from '../../config/site.config';
import { useSettings } from '../../hooks/useSettings';

export const FloatingWidget: React.FC = () => {
  const { data: settings } = useSettings();
  const hotline = settings?.hotline || siteConfig.hotline;
  const hotlineRaw = settings?.hotlineRaw || siteConfig.hotlineRaw;
  const zaloUrl = settings?.zaloUrl || siteConfig.zaloUrl;

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToQuote = () => {
    const target = document.querySelector('#nhan-bao-gia');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop & Tablet Floating Action Buttons (Hotline, Zalo, BackToTop) */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-center gap-3">
        {/* Hotline Button */}
        <a
          href={`tel:${hotlineRaw}`}
          title={`Gọi Hotline ${hotline}`}
          className="w-12 h-12 rounded-full bg-[#ef4444] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all group relative"
        >
          <span className="absolute -inset-1 rounded-full bg-[#ef4444]/40 animate-ping pointer-events-none" />
          <Phone className="w-5 h-5 relative z-10" />
        </a>

        {/* Zalo Button */}
        <a
          href={zaloUrl}
          target="_blank"
          rel="noreferrer"
          title="Chat Zalo Tư Vấn Trực Tiếp"
          className="w-12 h-12 rounded-full bg-[#0068ff] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all group relative"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="absolute right-14 bg-[#0b1c30] text-white text-xs font-semibold py-1.5 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
            Chat Zalo Ngay
          </span>
        </a>

        {/* Back to top */}
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            title="Lên đầu trang"
            className="w-10 h-10 rounded-full bg-white text-[#0b1c30] border border-[#dce9ff] flex items-center justify-center shadow-md hover:bg-[#eff4ff] active:scale-95 transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Mobile Sticky Bottom Floating Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#dce9ff] px-4 py-2.5 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <a
          href={`tel:${hotlineRaw}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs flex items-center justify-center gap-1.5 border border-rose-200 active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Gọi {hotline}</span>
        </a>

        <a
          href={zaloUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center gap-1.5 border border-blue-200 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Chat Zalo</span>
        </a>

        <button
          type="button"
          onClick={scrollToQuote}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#006398] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-transform cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-cyan-300" />
          <span>Báo Giá</span>
        </button>
      </div>
    </>
  );
};
