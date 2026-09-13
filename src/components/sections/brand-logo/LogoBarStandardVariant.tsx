'use client';

import React from 'react';
import { CountUp, SpotlightCard } from '../../common';

export interface LogoBarBrand {
  name: string;
  style: string;
}

export interface LogoBarVariantProps {
  title: string;
  items: Array<{ number: string | number; label: string }>;
  brands: LogoBarBrand[];
}

export const LogoBarStandardVariant: React.FC<LogoBarVariantProps> = ({
  title,
  items,
  brands,
}) => {
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
