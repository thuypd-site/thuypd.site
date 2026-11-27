'use client';

import React, { useState, useEffect } from 'react';
import { PhoneCall, ArrowUp, MessageCircle } from 'lucide-react';
import { useSettings } from '../../features/settings/hooks/useSettings';

export const FloatingWidget: React.FC = () => {
  const { settings } = useSettings();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 480);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2.5">
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Lên đầu trang"
            className="w-10 h-10 rounded-full bg-white border border-[#e3e8ee] shadow-stripe text-[#0d253d] hover:border-[#533afd] hover:text-[#533afd] flex items-center justify-center transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-2 p-1.5 rounded-full bg-white border border-[#e3e8ee] shadow-stripe-lg">
          {settings.zaloUrl && (
            <a
              href={settings.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#eef2ff] hover:bg-[#e0e7ff] text-[#4434d4] text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat Zalo</span>
            </a>
          )}
          <a
            href={`tel:${settings.hotlineRaw || settings.hotline.replace(/\D/g, '')}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#533afd] hover:bg-[#4434d4] text-white text-xs font-semibold transition-colors tabular-nums"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{settings.hotline}</span>
          </a>
        </div>
      </div>

      {/* Mobile bottom action bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e3e8ee] px-4 py-2.5 grid grid-cols-2 gap-2.5">
        <a
          href={`tel:${settings.hotlineRaw || settings.hotline.replace(/\D/g, '')}`}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-[#e3e8ee] bg-white text-[#0d253d] text-xs font-semibold tabular-nums"
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#533afd]" />
          <span>Gọi {settings.hotline}</span>
        </a>
        <a
          href={settings.zaloUrl || '#nhan-bao-gia'}
          target={settings.zaloUrl ? '_blank' : undefined}
          rel={settings.zaloUrl ? 'noopener noreferrer' : undefined}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#533afd] text-white text-xs font-semibold"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Tư Vấn Zalo</span>
        </a>
      </div>
    </>
  );
};
