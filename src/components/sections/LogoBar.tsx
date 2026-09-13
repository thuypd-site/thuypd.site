'use client';

import React from 'react';
import { LogoBarContent } from '../../types/landingConfig.types';
import { CountUp, SpotlightCard } from '../common';

interface LogoBarProps {
  content?: LogoBarContent;
  displayStyle?: string;
}

export const LogoBar: React.FC<LogoBarProps> = ({ content, displayStyle = 'standard' }) => {
  const title = content?.title || 'Thương Hiệu & Khách Hàng Tin Tưởng Đồng Hành';
  const items = content?.items || [];

  const brands = [
    { name: 'VICI', style: 'font-black tracking-widest' },
    { name: 'DENTIA CLINIC', style: 'font-bold tracking-tight' },
    { name: 'HONDA', style: 'font-black tracking-wider' },
    { name: 'BẢO HOÀNG', style: 'font-serif font-bold tracking-tight' },
    { name: 'MAROSE', style: 'font-mono font-bold tracking-tighter' },
    { name: 'LOGIFLOW', style: 'font-black tracking-normal' },
  ];

  const isCompact = displayStyle === 'compact';

  if (isCompact) {
    return (
      <section className="bg-slate-50/90 border-y border-slate-200/70 py-4 sm:py-5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
          {/* Compact horizontal stat strip */}
          {items.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/80 p-3 sm:p-4 mb-3.5 shadow-xs">
              {items.map((it, idx) => (
                <div key={idx} className="flex items-center gap-2.5 px-2 py-1 justify-center sm:justify-start">
                  <span className="text-xl sm:text-2xl font-black text-[#006398] tracking-tight">
                    <CountUp value={it.number} />
                  </span>
                  <span className="text-xs font-semibold text-slate-700 leading-tight">
                    {it.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 text-center sm:text-left">
              {title}
            </span>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-5 sm:gap-7 opacity-75">
              {brands.map((brand) => (
                <span
                  key={brand.name}
                  className={`text-xs sm:text-sm text-[#0b1c30] hover:text-[#006398] transition-colors cursor-pointer ${brand.style}`}
                >
                  {brand.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50/80 border-y border-slate-200/70 py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        {/* Dynamic Key Stats Counter Grid from API */}
        {items.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-10 w-full">
            {items.map((it, idx) => (
              <SpotlightCard
                key={idx}
                spotlightColor="rgba(91, 184, 254, 0.18)"
                className="bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 text-center shadow-xs hover:shadow-md hover:border-[#006398]/40 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#006398] tracking-tight group-hover:scale-105 transition-transform duration-300">
                  <CountUp value={it.number} />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#0b1c30] mt-1.5">
                  {it.label}
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          <p className="text-xs font-semibold text-[#45464d] tracking-wider uppercase text-center">
            {title}
          </p>
          <div className="w-full flex flex-wrap items-center justify-center md:justify-between gap-5 sm:gap-6 lg:gap-8 opacity-75">
            {brands.map((brand) => (
              <span
                key={brand.name}
                className={`text-base sm:text-lg lg:text-xl text-[#0b1c30] hover:text-[#006398] hover:scale-105 transition-all duration-300 cursor-pointer py-1 ${brand.style}`}
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
