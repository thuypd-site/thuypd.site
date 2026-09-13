'use client';

import React from 'react';
import { CountUp } from '../../common';
import { LogoBarVariantProps } from './LogoBarStandardVariant';

export const LogoBarCompactVariant: React.FC<LogoBarVariantProps> = ({
  title,
  items,
  brands,
}) => {
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
};
