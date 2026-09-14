'use client';

import React from 'react';
import { CountUp, SpotlightCard } from '../../common';
import {
  IconWebDesign,
  IconSparkle,
  IconSpeed,
  IconConsult,
} from '../../icons/CustomIcons';

export interface LogoBarBrand {
  name: string;
  style: string;
}

export interface LogoBarVariantProps {
  title: string;
  statsText?: string;
  items: Array<{ number: string | number; label: string; suffix?: string }>;
  brands: LogoBarBrand[];
}

export const LogoBarStandardVariant: React.FC<LogoBarVariantProps> = ({
  title,
  statsText,
  items,
  brands,
}) => {
  const statIcons = [
    <IconWebDesign key="0" className="w-4 h-4 sm:w-4.5 sm:h-4.5" />,
    <IconSparkle key="1" className="w-4 h-4 sm:w-4.5 sm:h-4.5" />,
    <IconSpeed key="2" className="w-4 h-4 sm:w-4.5 sm:h-4.5" />,
    <IconConsult key="3" className="w-4 h-4 sm:w-4.5 sm:h-4.5" />,
  ];

  return (
    <section className="bg-gradient-to-b from-[#fafbfc] via-slate-50/60 to-[#fafbfc] border-y border-slate-200/70 py-10 sm:py-14 lg:py-16 relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full">
        {/* Tier 1: Dynamic Key Stats Counter Grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 w-full">
            {items.map((it, idx) => (
              <SpotlightCard
                key={idx}
                spotlightColor="rgba(0, 99, 152, 0.08)"
                className="bg-white/95 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-[#006398]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 group-hover:bg-[#006398] text-slate-700 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs">
                    {statIcons[idx % statIcons.length]}
                  </div>
                  {it.suffix && (
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md hidden sm:inline-block">
                      {it.suffix}
                    </span>
                  )}
                </div>

                <div className="space-y-0.5 sm:space-y-1">
                  <div className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#006398] tracking-tight group-hover:scale-105 transition-transform duration-300">
                    <CountUp value={it.number} />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#0b1c30] leading-snug">
                    {it.label}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}

        {/* Subtle Divider */}
        <div className="h-px w-full max-w-3xl mx-auto bg-gradient-to-r from-transparent via-slate-200 to-transparent my-8 sm:my-10" />

        {/* Tier 2: Brands / Client Logos */}
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-600">
              {title}
            </h3>
            {statsText && (
              <p className="text-[11px] sm:text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                {statsText}
              </p>
            )}
          </div>

          {/* Balanced 3-col on Mobile, 6-col on Tablet & Desktop */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 items-center">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="h-11 sm:h-13 lg:h-14 rounded-xl sm:rounded-2xl bg-white/60 hover:bg-white border border-slate-200/60 hover:border-slate-300 shadow-2xs hover:shadow-xs flex items-center justify-center p-2 transition-all duration-300 cursor-pointer group"
              >
                <span
                  className={`text-[11px] sm:text-xs lg:text-sm text-slate-700 group-hover:text-[#006398] group-hover:scale-105 transition-all text-center truncate select-none ${brand.style}`}
                >
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
