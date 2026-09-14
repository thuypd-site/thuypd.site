'use client';

import React from 'react';
import {
  IconArrowRight,
  IconPhoneCall,
  IconSparkle,
} from '../../icons/CustomIcons';

export interface CtaVariantProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  hotlineText: string;
  hotlineRaw: string;
}

export const CtaBoxedVariant: React.FC<CtaVariantProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  hotlineText,
  hotlineRaw,
}) => {
  return (
    <div className="relative rounded-3xl bg-gradient-to-r from-[#006398] via-[#004f7c] to-[#0b1c30] text-white p-8 sm:p-12 lg:p-14 overflow-hidden shadow-lg border border-slate-800">
      {/* Soft Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-bold backdrop-blur-sm border border-white/15">
          <IconSparkle className="w-3.5 h-3.5 text-cyan-300" />
          <span>BẮT ĐẦU DỰ ÁN NGAY HÔM NAY</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {title}
        </h2>

        <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
          <a
            href={buttonLink}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-[#006398] font-bold text-sm hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
          >
            <span>{buttonText}</span>
            <IconArrowRight className="w-4 h-4" />
          </a>

          <a
            href={`tel:${hotlineRaw}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-sm transition-all"
          >
            <IconPhoneCall className="w-4 h-4 text-cyan-300" />
            <span>{hotlineText}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
