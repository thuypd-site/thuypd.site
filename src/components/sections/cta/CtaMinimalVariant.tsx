'use client';

import React from 'react';
import {
  IconArrowRight,
  IconPhoneCall,
  IconSparkle,
} from '../../icons/CustomIcons';
import { CtaVariantProps } from './CtaBoxedVariant';

export const CtaMinimalVariant: React.FC<CtaVariantProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  hotlineText,
  hotlineRaw,
}) => {
  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
      <div className="space-y-2 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/80">
          <IconSparkle className="w-3.5 h-3.5 text-[#006398]" />
          <span>BẮT ĐẦU DỰ ÁN NGAY</span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
        <a
          href={buttonLink}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#006398] text-white font-bold text-xs sm:text-sm hover:bg-[#00476e] active:scale-95 transition-all shadow-md hover:shadow-lg hover:shadow-[#006398]/20"
        >
          <span>{buttonText}</span>
          <IconArrowRight className="w-4 h-4" />
        </a>

        <a
          href={`tel:${hotlineRaw}`}
          className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white text-[#0b1c30] border border-slate-200/90 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all"
        >
          <IconPhoneCall className="w-4 h-4 text-[#006398]" />
          <span>{hotlineText}</span>
        </a>
      </div>
    </div>
  );
};
