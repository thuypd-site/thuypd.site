'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CountUp } from '../../common';
import { HeroSectionContent } from '../../../types/landingConfig.types';
import {
  IconSpeed,
  IconClock,
  IconShieldSecurity,
  IconResponsive,
  IconCorporate,
  IconConsult,
  IconSparkle,
  IconArrowRight,
  IconCheckCircle,
} from '../../icons/CustomIcons';

export interface HeroVariantProps {
  badgeText: string;
  headlineMain: string;
  headlineHighlight: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryLink: string;
  ctaSecondaryLink: string;
  pillars: Array<{ id: string; value: string; title: string; desc: string }>;
  content?: HeroSectionContent;
}

export const HeroVariantA: React.FC<HeroVariantProps> = ({
  badgeText,
  headlineMain,
  headlineHighlight,
  description,
  ctaPrimary,
  ctaSecondary,
  ctaPrimaryLink,
  ctaSecondaryLink,
  pillars,
}) => {
  return (
    <motion.div
      key="hero-a"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
    >
      <div className="lg:col-span-7 space-y-5 sm:space-y-6">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-bold border border-slate-200/80 shadow-2xs hover:border-[#006398]/30 transition-all duration-300">
          <IconSparkle className="w-3.5 h-3.5 text-[#006398]" />
          <span className="tracking-tight uppercase">{badgeText}</span>
        </div>

        <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.2] lg:leading-[1.25] font-extrabold text-[#0b1c30] tracking-tight">
          {headlineMain}
          <br />
          <span className="text-[#006398] bg-gradient-to-r from-[#006398] via-[#008ebf] to-[#006398] bg-clip-text text-transparent">
            {headlineHighlight}&nbsp;
          </span>
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl leading-relaxed">
          {description}
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-1">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="p-3 sm:p-4 rounded-xl bg-white shadow-xs border border-slate-200/80 hover:shadow-md hover:-translate-y-1 hover:border-[#006398]/30 transition-all duration-300"
            >
              <div className="text-lg sm:text-2xl lg:text-3xl text-[#006398] font-extrabold">{pillar.value}</div>
              <div className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-snug">
                <strong className="text-[#0b1c30] block font-semibold text-xs sm:text-sm">{pillar.title}</strong>
                <span className="hidden sm:inline">{pillar.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
          <a
            href={ctaPrimaryLink}
            className="relative overflow-hidden group inline-flex items-center justify-center px-6 py-3.5 bg-[#006398] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg hover:shadow-[#006398]/30 hover:bg-[#00476e] active:scale-95 transition-all duration-300 min-h-[48px]"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <IconSparkle className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110 shrink-0" />
            <span className="relative z-10">{ctaPrimary}</span>
          </a>

          <a
            href={ctaSecondaryLink}
            className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-[#0b1c30] font-bold text-sm rounded-xl shadow-xs border border-slate-200/90 hover:bg-slate-50 hover:border-[#006398]/30 hover:shadow-sm active:scale-95 transition-all duration-300 min-h-[48px]"
          >
            <span className="mr-1.5">{ctaSecondary}</span>
            <IconArrowRight className="w-4 h-4 text-[#006398] shrink-0" />
          </a>
        </div>
      </div>

      {/* Right Column: Live Quality Metrics Card */}
      <div className="lg:col-span-5 relative">
        <div className="relative p-4 sm:p-6 lg:p-7 rounded-2xl bg-white shadow-xl backdrop-blur-xl space-y-4 sm:space-y-5 border border-slate-200/90 animate-float transition-shadow hover:shadow-[0_20px_50px_rgba(0,99,152,0.12)]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#006398]" />
              <span className="text-[11px] sm:text-xs text-[#0b1c30] ml-1.5 font-bold">Chỉ Số Trải Nghiệm Khách Hàng</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-bold">
              Tiêu Chuẩn Cao
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <div className="p-3 sm:p-4 rounded-xl bg-slate-50 flex flex-col justify-between border border-slate-100 hover:border-[#006398]/20 hover:bg-slate-100/70 transition-all duration-300 group">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#0b1c30] font-semibold">Điểm Tối Ưu</span>
                <IconSpeed className="w-4 h-4 text-[#006398] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="mt-2.5 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#006398]">
                  <CountUp value="100" />
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500">/100</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-tight">Khách lướt mượt mà, không giật lag</p>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-50 flex flex-col justify-between border border-slate-100 hover:border-[#006398]/20 hover:bg-slate-100/70 transition-all duration-300 group">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#0b1c30] font-semibold">Tốc Độ Mở Trang</span>
                <IconClock className="w-4 h-4 text-[#006398] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="mt-2.5 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30]">&lt; 0.8</span>
                <span className="text-[10px] sm:text-xs text-slate-500">giây</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-tight">Bấm vào là xem ngay, không chờ đợi</p>
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2 pt-1">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/80 hover:bg-slate-100/80 transition-all duration-200">
              <div className="flex items-center gap-2">
                <IconShieldSecurity className="w-4 h-4 text-[#006398]" />
                <span className="text-xs font-semibold text-[#0b1c30]">Bảo Mật Tuyệt Đối</span>
              </div>
              <span className="text-[11px] text-slate-500">Bảo vệ thông tin 24/7</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/80 hover:bg-slate-100/80 transition-all duration-200">
              <div className="flex items-center gap-2">
                <IconResponsive className="w-4 h-4 text-[#006398]" />
                <span className="text-xs font-semibold text-[#0b1c30]">Hiển Thị Hoàn Hảo</span>
              </div>
              <span className="text-[11px] text-slate-500">Đẹp trên mọi thiết bị</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/80 hover:bg-slate-100/80 transition-all duration-200">
              <div className="flex items-center gap-2">
                <IconCorporate className="w-4 h-4 text-[#006398]" />
                <span className="text-xs font-semibold text-[#0b1c30]">Sở Hữu Vĩnh Viễn</span>
              </div>
              <span className="text-[11px] text-slate-500">Nắm trọn tài khoản quản trị</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 hover:border-[#006398]/30 transition-all duration-300 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-xs">
              <IconConsult className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0b1c30]">Hướng Dẫn Tận Tình &amp; Cầm Tay Chỉ Việc 1-1</span>
              <span className="text-[11px] text-slate-500">Video chi tiết, không rành công nghệ vẫn tự cập nhật dễ dàng</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
