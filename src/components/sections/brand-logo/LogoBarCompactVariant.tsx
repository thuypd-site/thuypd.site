'use client';

import React from 'react';
import { CountUp } from '../../common';
import { LogoBarVariantProps } from './LogoBarStandardVariant';
import {
  IconWebDesign,
  IconSparkle,
  IconSpeed,
  IconConsult,
} from '../../icons/CustomIcons';

export const LogoBarCompactVariant: React.FC<LogoBarVariantProps> = ({
  title,
  statsText,
  items,
  brands,
}) => {
  const statIcons = [
    <IconWebDesign key="0" className="w-3.5 h-3.5" />,
    <IconSparkle key="1" className="w-3.5 h-3.5" />,
    <IconSpeed key="2" className="w-3.5 h-3.5" />,
    <IconConsult key="3" className="w-3.5 h-3.5" />,
  ];

  return (
    <section className="bg-slate-50/70 border-y border-slate-200/70 py-6 sm:py-8">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full space-y-5 sm:space-y-6">
        {/* Compact stats grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
            {items.map((it, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs hover:border-[#006398]/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#006398] flex items-center justify-center shrink-0">
                  {statIcons[idx % statIcons.length]}
                </div>
                <div className="truncate">
                  <div className="text-lg sm:text-xl font-black text-[#006398] tracking-tight leading-none">
                    <CountUp value={it.number} />
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-slate-700 leading-tight truncate mt-1">
                    {it.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Compact Brands Strip */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 pt-1 border-t border-slate-200/60">
          <div className="shrink-0 text-center md:text-left">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
              {title}
            </span>
            {statsText && (
              <span className="text-[10px] text-slate-600 block">
                {statsText}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 w-full md:w-auto items-center">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="h-9 sm:h-10 px-3 rounded-lg bg-white/80 border border-slate-200/60 hover:border-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <span
                  className={`text-[10px] sm:text-xs text-slate-700 hover:text-[#006398] transition-colors truncate ${brand.style}`}
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
