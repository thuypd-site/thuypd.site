'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Grid, Zap, Shield, Smartphone, Award, Headphones, CheckCircle } from 'lucide-react';
import { CountUp } from '../../common';
import { HeroSectionContent } from '../../../types/landingConfig.types';

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
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#dce9ff] text-[#006398] text-[11px] sm:text-xs font-bold shadow-sm border border-[#006398]/15 hover:border-[#006398]/30 transition-all duration-300">
          <span className="text-[#006398] font-bold animate-bounce">⚡</span>
          <span className="tracking-tight uppercase">{badgeText}</span>
        </div>

        <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.2] lg:leading-[1.25] font-extrabold text-[#0b1c30] tracking-tight">
          {headlineMain}
          <br />
          <span className="text-[#006398] bg-gradient-to-r from-[#006398] via-[#008ebf] to-[#006398] bg-clip-text text-transparent">
            {headlineHighlight}&nbsp;
          </span>
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-[#45464d] max-w-2xl leading-relaxed">
          {description}
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-1">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="p-3 sm:p-4 rounded-xl bg-white shadow-sm border border-[#dce9ff]/70 hover:shadow-md hover:-translate-y-1 hover:border-[#006398]/30 transition-all duration-300"
            >
              <div className="text-lg sm:text-2xl lg:text-3xl text-[#006398] font-extrabold">{pillar.value}</div>
              <div className="text-[11px] sm:text-xs text-[#45464d] mt-1 leading-snug">
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
            <Rocket className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 shrink-0" />
            <span className="relative z-10">{ctaPrimary}</span>
          </a>

          <a
            href={ctaSecondaryLink}
            className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-[#0b1c30] font-bold text-sm rounded-xl shadow-sm border border-[#dce9ff] hover:bg-[#eff4ff] hover:border-[#006398]/30 hover:shadow-md active:scale-95 transition-all duration-300 min-h-[48px]"
          >
            <Grid className="w-4 h-4 mr-2 text-[#006398] shrink-0" />
            <span>{ctaSecondary}</span>
          </a>
        </div>
      </div>

      {/* Right Column: Live Quality Metrics Card */}
      <div className="lg:col-span-5 relative">
        <div className="relative p-4 sm:p-6 lg:p-7 rounded-2xl bg-white shadow-2xl backdrop-blur-xl space-y-4 sm:space-y-5 border border-[#dce9ff] animate-float transition-shadow hover:shadow-[0_25px_60px_rgba(0,99,152,0.18)]">
          <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ef4444] animate-pulse" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#f59e0b]" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10b981]" />
              <span className="text-[11px] sm:text-xs text-[#0b1c30] ml-1.5 font-bold">Chỉ Số Trải Nghiệm Khách Hàng Thực Tế</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#006398]/10 text-[#006398] text-[10px] sm:text-[11px] font-bold animate-pulse">
              Đo Lường Chuẩn
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <div className="p-3 sm:p-4 rounded-xl bg-[#eff4ff] flex flex-col justify-between border border-transparent hover:border-[#006398]/20 hover:bg-[#e5eeff] transition-all duration-300 group">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#0b1c30] font-semibold">Điểm Tối Ưu</span>
                <Zap className="w-4 h-4 text-[#006398] transition-transform duration-300 group-hover:scale-125 group-hover:rotate-45" />
              </div>
              <div className="mt-2.5 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#006398]">
                  <CountUp value="100" />
                </span>
                <span className="text-[10px] sm:text-xs text-[#45464d]">/100</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#45464d] mt-1 leading-tight">Khách lướt mượt mà, không giật lag</p>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-[#eff4ff] flex flex-col justify-between border border-transparent hover:border-[#006398]/20 hover:bg-[#e5eeff] transition-all duration-300 group">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#0b1c30] font-semibold">Tốc Độ Mở Trang</span>
                <CheckCircle className="w-4 h-4 text-[#006398] transition-transform duration-300 group-hover:scale-125" />
              </div>
              <div className="mt-2.5 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30]">&lt; 0.8</span>
                <span className="text-[10px] sm:text-xs text-[#45464d]">giây</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#45464d] mt-1 leading-tight">Bấm vào là xem ngay, không đợi chờ</p>
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2 pt-1">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] transition-all duration-200">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#006398]" />
                <span className="text-xs font-semibold text-[#0b1c30]">Bảo Mật Tuyệt Đối</span>
              </div>
              <span className="text-[11px] text-[#45464d]">Bảo vệ thông tin 24/7</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] transition-all duration-200">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#006398]" />
                <span className="text-xs font-semibold text-[#0b1c30]">Hiển Thị Hoàn Hảo</span>
              </div>
              <span className="text-[11px] text-[#45464d]">Đẹp trên mọi điện thoại & PC</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] transition-all duration-200">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#006398]" />
                <span className="text-xs font-semibold text-[#0b1c30]">Sở Hữu Vĩnh Viễn</span>
              </div>
              <span className="text-[11px] text-[#45464d]">Nắm trọn tài khoản quản trị</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#dce9ff]/90 border border-[#006398]/20 flex items-center gap-3 hover:border-[#006398]/40 transition-all duration-300 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Headphones className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0b1c30]">Hướng Dẫn Tận Tình & Cầm Tay Chỉ Việc 1-1</span>
              <span className="text-[11px] text-[#45464d]">Video chi tiết, không rành công nghệ vẫn tự cập nhật dễ dàng</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
