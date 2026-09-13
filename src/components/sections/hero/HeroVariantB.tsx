'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Rocket, Eye, Gauge, Award, CheckCircle } from 'lucide-react';
import { SpotlightCard } from '../../common';
import { HeroVariantProps } from './HeroVariantA';

export const HeroVariantB: React.FC<HeroVariantProps> = ({
  badgeText,
  headlineMain,
  headlineHighlight,
  description,
  ctaPrimary,
  ctaSecondary,
  ctaPrimaryLink,
  ctaSecondaryLink,
}) => {
  return (
    <motion.div
      key="hero-b"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center space-y-6 sm:space-y-8"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006398]/10 text-[#006398] text-xs font-bold border border-[#006398]/20 shadow-sm animate-pulse">
        <Sparkles className="w-4 h-4" />
        <span>{badgeText}</span>
      </div>

      <h1 className="text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.18] font-extrabold text-[#0b1c30] max-w-4xl tracking-tight">
        {headlineMain}{' '}
        <span className="text-[#006398] bg-gradient-to-r from-[#006398] via-[#008ebf] to-[#006398] bg-clip-text text-transparent">
          {headlineHighlight}
        </span>
      </h1>

      <p className="text-sm sm:text-base lg:text-lg text-[#45464d] max-w-3xl leading-relaxed mx-auto">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
        <a
          href={ctaPrimaryLink}
          className="px-6 sm:px-8 py-3.5 bg-[#006398] text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-[#006398]/35 hover:bg-[#00476e] active:scale-95 transition-all duration-300 inline-flex items-center gap-2 min-h-[48px]"
        >
          <Rocket className="w-4 h-4" />
          <span>{ctaPrimary}</span>
        </a>

        <a
          href={ctaSecondaryLink}
          className="px-6 sm:px-8 py-3.5 bg-white text-[#0b1c30] font-bold text-sm rounded-xl border border-[#dce9ff] hover:bg-[#eff4ff] hover:border-[#006398]/30 active:scale-95 transition-all duration-300 inline-flex items-center gap-2 min-h-[48px]"
        >
          <Eye className="w-4 h-4 text-[#006398]" />
          <span>{ctaSecondary}</span>
        </a>
      </div>

      {/* 3 Large Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl pt-4 text-left">
        <SpotlightCard
          spotlightColor="rgba(91, 184, 254, 0.15)"
          className="p-5 sm:p-6 rounded-2xl bg-white shadow-md border border-[#dce9ff] hover:border-[#006398]/40 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-[#006398]/10 text-[#006398] flex items-center justify-center shrink-0">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <div className="text-base font-bold text-[#0b1c30]">Tốc Độ Tải Trang Siêu Tốc</div>
            <p className="text-xs sm:text-sm text-[#45464d] mt-1 leading-relaxed">
              Trang tải tức thì dưới 1 giây, giữ chân khách hàng tuyệt đối.
            </p>
          </div>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(91, 184, 254, 0.15)"
          className="p-5 sm:p-6 rounded-2xl bg-white shadow-md border border-[#dce9ff] hover:border-[#006398]/40 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-[#006398]/10 text-[#006398] flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-base font-bold text-[#0b1c30]">Thiết Kế Độc Bản 100%</div>
            <p className="text-xs sm:text-sm text-[#45464d] mt-1 leading-relaxed">
              Không dùng mẫu nhân bản đại trà, thiết kế và phát triển chuẩn phong cách riêng.
            </p>
          </div>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(91, 184, 254, 0.15)"
          className="p-5 sm:p-6 rounded-2xl bg-white shadow-md border border-[#dce9ff] hover:border-[#006398]/40 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-[#006398]/10 text-[#006398] flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-base font-bold text-[#0b1c30]">Toàn Quyền Sở Hữu 100%</div>
            <p className="text-xs sm:text-sm text-[#45464d] mt-1 leading-relaxed">
              Bàn giao trọn gói website và quyền quản trị, bảo hành đồng hành trọn đời.
            </p>
          </div>
        </SpotlightCard>
      </div>
    </motion.div>
  );
};
