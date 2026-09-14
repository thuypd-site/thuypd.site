'use client';

import React from 'react';
import { motion } from 'motion/react';
import { SpotlightCard } from '../../common';
import { HeroVariantProps } from './HeroVariantA';
import {
  IconSparkle,
  IconArrowRight,
  IconSpeed,
  IconCorporate,
  IconShieldSecurity,
  IconBadge,
} from '../../icons/CustomIcons';

export const HeroVariantB: React.FC<HeroVariantProps> = ({
  badgeText,
  headlineMain,
  headlineHighlight,
  description,
  ctaPrimary,
  ctaSecondary,
  ctaPrimaryLink,
  ctaSecondaryLink,
  pillars = [],
}) => {
  const pillarIcons = [
    <IconSpeed key="speed" className="w-5 h-5 text-slate-700 group-hover:text-[#006398] transition-colors" />,
    <IconCorporate key="corp" className="w-5 h-5 text-slate-700 group-hover:text-[#006398] transition-colors" />,
    <IconShieldSecurity key="shield" className="w-5 h-5 text-slate-700 group-hover:text-[#006398] transition-colors" />,
  ];
  return (
    <motion.div
      key="hero-b"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center space-y-6 sm:space-y-8"
    >
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/80 shadow-2xs">
        <IconSparkle className="w-3.5 h-3.5 text-[#006398]" />
        <span className="uppercase tracking-wider">{badgeText}</span>
      </div>

      <h1 className="text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.18] font-extrabold text-[#0b1c30] max-w-4xl tracking-tight">
        {headlineMain}{' '}
        <span className="text-[#006398] bg-gradient-to-r from-[#006398] via-[#008ebf] to-[#006398] bg-clip-text text-transparent">
          {headlineHighlight}
        </span>
      </h1>

      <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl leading-relaxed mx-auto">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
        <a
          href={ctaPrimaryLink}
          className="px-6 sm:px-8 py-3.5 bg-[#006398] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg hover:shadow-[#006398]/30 hover:bg-[#00476e] active:scale-95 transition-all duration-300 inline-flex items-center gap-2 min-h-[48px]"
        >
          <span>{ctaPrimary}</span>
          <IconSparkle className="w-4 h-4" />
        </a>

        <a
          href={ctaSecondaryLink}
          className="px-6 sm:px-8 py-3.5 bg-white text-[#0b1c30] font-bold text-sm rounded-xl border border-slate-200/90 hover:bg-slate-50 hover:border-[#006398]/30 active:scale-95 transition-all duration-300 inline-flex items-center gap-2 min-h-[48px] shadow-2xs"
        >
          <span>{ctaSecondary}</span>
          <IconArrowRight className="w-4 h-4 text-[#006398]" />
        </a>
      </div>

      {/* 3 Large Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl pt-4 text-left">
        {(pillars && pillars.length > 0 ? pillars.slice(0, 3) : [
          { id: '1', title: 'Tốc Độ Tải Trang Siêu Tốc', desc: 'Trang tải tức thì dưới 1 giây, giữ chân khách hàng tuyệt đối.' },
          { id: '2', title: 'Thiết Kế Độc Bản 100%', desc: 'Không dùng mẫu nhân bản đại trà, thiết kế và phát triển chuẩn phong cách riêng.' },
          { id: '3', title: 'Toàn Quyền Sở Hữu 100%', desc: 'Bàn giao trọn gói website và quyền quản trị, bảo hành đồng hành trọn đời.' },
        ]).map((pillar, idx) => (
          <SpotlightCard
            key={pillar.id || idx}
            spotlightColor="rgba(0, 99, 152, 0.08)"
            className="p-5 sm:p-6 rounded-2xl bg-white shadow-xs border border-slate-200/90 hover:border-[#006398]/30 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4 group"
          >
            <IconBadge className="w-11 h-11 rounded-xl">
              {pillarIcons[idx % pillarIcons.length]}
            </IconBadge>
            <div>
              <div className="text-base font-bold text-[#0b1c30]">{pillar.title}</div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </motion.div>
  );
};
