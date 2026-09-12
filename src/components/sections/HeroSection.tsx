'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { 
  Rocket, 
  Grid, 
  Zap, 
  Shield, 
  Smartphone, 
  Award, 
  Headphones, 
  CheckCircle, 
  Sparkles, 
  Eye, 
  XCircle, 
  Lightbulb, 
  ShoppingBag, 
  Brush, 
  Gauge, 
  Frown,
  Check
} from 'lucide-react';
import { HeroSectionContent } from '../../types/landingConfig.types';
import { BorderBeam, CountUp, SpotlightCard } from '../common';

interface HeroSectionProps {
  content?: HeroSectionContent;
  displayStyle?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ content, displayStyle = 'split' }) => {
  // Normalize style aliases
  const activeStyle = (() => {
    if (displayStyle === 'hero-b' || displayStyle === 'centered') return 'hero-b';
    if (displayStyle === 'hero-a' || displayStyle === 'split-modern' || displayStyle === 'split' || displayStyle === 'minimal') return 'hero-a';
    return 'hero-c'; // Default to modern SaaS Glow
  })();

  // Diagnostic tool state for hero-c
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<number>(0);

  const diagnosticSolutions = [
    {
      id: 0,
      title: 'Web chạy chậm',
      desc: 'Tải lâu, khách sốt ruột thoát trang ngay',
      icon: <Gauge className="w-4 h-4 text-amber-400" />,
      solution: 'Tối ưu hình ảnh siêu nhẹ, công nghệ tăng tốc thông minh và máy chủ tốc độ cao giúp website mở tức thì dưới 1 giây.',
      solIcon: <Zap className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: 1,
      title: 'Dễ tự sửa & bán hàng',
      desc: 'Thao tác đơn giản, cập nhật bằng điện thoại',
      icon: <ShoppingBag className="w-4 h-4 text-cyan-300" />,
      solution: 'Trang quản trị tiếng Việt trực quan, tự đăng bài và sửa giá dễ như dùng mạng xã hội, tích hợp Zalo và nút gọi chốt đơn nhanh.',
      solIcon: <ShoppingBag className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: 2,
      title: 'Thiết kế sang trọng, độc bản',
      desc: 'Không trùng lặp, chuẩn phong cách riêng',
      icon: <Brush className="w-4 h-4 text-emerald-400" />,
      solution: 'Thiết kế & phát triển giao diện riêng biệt theo nhận diện thương hiệu của bạn, bố cục hiện đại, nâng tầm uy tín doanh nghiệp với đối tác.',
      solIcon: <Brush className="w-4 h-4 text-emerald-400" />,
    },
  ];

  const badgeText = content?.badgeText || 'Thiết Kế Website Theo Yêu Cầu • Chuẩn SEO Google • Bàn Giao Trọn Gói';
  const headlineMain = content?.headlineMain || 'Thiết Kế Website Chuyên Nghiệp,';
  const headlineHighlight = content?.headlineHighlight || 'Đúng Ý & Tối Ưu Chuyển Đổi';
  const description = content?.description || 'Chúng tôi thiết kế và phát triển website độc bản theo phong cách thương hiệu của bạn, tối ưu tốc độ mở trang dưới 1 giây, chuẩn SEO Google và bàn giao 100% quyền quản trị. Dễ dàng tự cập nhật nội dung, không lo phát sinh chi phí ngầm.';
  const ctaPrimary = content?.ctaPrimaryText || 'Xem Báo Giá Trọn Gói';
  const ctaSecondary = content?.ctaSecondaryText || 'Tư Vấn Miễn Phí';
  const ctaPrimaryLink = content?.ctaPrimaryLink || '#pricing';
  const ctaSecondaryLink = content?.ctaSecondaryLink || '#contact-lead';
  const pillars = content?.pillars && content.pillars.length > 0 ? content.pillars : [
    { id: 'p1', value: '100%', title: 'Đúng Ý & Chuẩn Gu', desc: 'Thiết kế riêng biệt theo nhận diện thương hiệu bạn' },
    { id: 'p2', value: '< 1s', title: 'Tải Trang Siêu Tốc', desc: 'Đạt 98-100 điểm Google, giữ chân khách hàng tối đa' },
    { id: 'p3', value: 'Trọn Đời', title: 'Toàn Quyền Sở Hữu', desc: 'Bàn giao trọn bộ mã nguồn, bảo hành chu đáo lâu dài' },
  ];

  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-20 transition-all duration-500" id="hero-section-container">
      {/* Background Gradients & Ambient Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(0, 99, 152, 0.12) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 35%, #000 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 35%, #000 30%, transparent 80%)',
          }}
        />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1000px] h-[520px] bg-gradient-to-tr from-[#006398]/15 via-[#dce9ff]/60 to-transparent blur-3xl rounded-full opacity-80 animate-pulse-glow" />
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#5bb8fe]/20 blur-3xl rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-[#006398]/10 blur-3xl rounded-full animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        {/* STYLE A: Split Grid (Classic) */}
        {activeStyle === 'hero-a' && (
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
        )}

        {/* STYLE B: Center Focus (Linear) */}
        {activeStyle === 'hero-b' && (
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
        )}

        {/* STYLE C: SaaS Glow (Modern Dark ⚡) */}
        {activeStyle === 'hero-c' && (
          <motion.div
            key="hero-c"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="w-full rounded-3xl bg-[#0b1320] border border-[#006398]/30 shadow-[0_25px_60px_rgba(0,99,152,0.3)] p-5 sm:p-8 lg:p-12 relative overflow-hidden text-white"
          >
            {/* Glowing Accent Orbs inside Dark Card */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#006398]/25 blur-3xl rounded-full pointer-events-none animate-pulse-glow" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#008ebf]/20 blur-3xl rounded-full pointer-events-none animate-pulse-glow" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase text-emerald-300">
                  {badgeText}
                </span>
              </div>

              <h1 className="text-[28px] sm:text-[40px] lg:text-[52px] font-extrabold tracking-tight leading-[1.2]">
                {headlineMain}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cce5ff] via-[#5bb8fe] to-[#93ccff]">
                  {headlineHighlight}
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
                {description}
              </p>
            </div>

            {/* Comparison Grid: Market Pain Points vs THUYPD Commitments */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-6 sm:mt-8 w-full max-w-5xl mx-auto">
              {/* Left Column: Danger / Market Reality */}
              <div className="p-5 sm:p-7 rounded-2xl bg-red-950/30 border border-red-500/30 backdrop-blur-md space-y-4 hover:border-red-500/50 transition-all">
                <div className="flex items-center gap-3 pb-3 border-b border-red-500/20">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                    <Frown className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] sm:text-xs uppercase text-red-400 font-bold tracking-wider">
                      THỰC TẾ ĐÁNG NGẠI
                    </span>
                    <h3 className="text-base sm:text-lg text-red-200 font-bold">
                      Nỗi lo thường gặp khi làm web
                    </h3>
                  </div>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Web tải chậm, khách thoát nhanh:</strong> Mở trang quá 3 giây khiến khách sốt ruột bỏ đi, lãng phí tiền quảng cáo.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Chi phí phát sinh bất ngờ:</strong> Báo giá ban đầu rẻ nhưng sau đó liên tục thu thêm phí sửa đổi và máy chủ.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Bị giữ mã nguồn, khó chuyển đổi:</strong> Khi cần nâng cấp hoặc đổi đơn vị hỗ trợ thì bị gây khó dễ, phụ thuộc.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Giao diện rập khuôn, khó dùng:</strong> Mẫu cài sẵn đại trà, bố cục rối mắt và rất khó tự thay đổi nội dung.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Right Column: Success / THUYPD Commitments */}
              <div className="p-5 sm:p-7 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 backdrop-blur-md space-y-4 shadow-xl hover:border-emerald-400/60 transition-all">
                <div className="flex items-center gap-3 pb-3 border-b border-emerald-500/20">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] sm:text-xs uppercase text-emerald-400 font-bold tracking-wider">
                      CAM KẾT RÕ RÀNG
                    </span>
                    <h3 className="text-base sm:text-lg text-emerald-200 font-bold">
                      Giải pháp an tâm tại THUYPD.SITE
                    </h3>
                  </div>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Tốc độ mở trang tức thì &lt; 0.8s:</strong> Tải trang nhanh vượt trội, giữ chân khách hàng tối đa.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Báo giá trọn gói 0 đồng phát sinh:</strong> Hợp đồng minh bạch từng mục, cam kết hoàn tiền nếu thu thêm phí.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Bàn giao 100% quyền sở hữu:</strong> Cấp đầy đủ tài khoản quản trị và mã nguồn để bạn toàn quyền làm chủ.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Giao diện đẹp mắt, dễ quản trị:</strong> Thiết kế chuẩn nhận diện thương hiệu, tự sửa bài viết và giá bán dễ dàng.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Interactive Need Diagnostic Widget */}
            <div className="relative z-10 w-full max-w-4xl mx-auto mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden">
              <BorderBeam size={280} duration={9} colorFrom="#5bb8fe" colorTo="#006398" />
              <div className="text-center mb-3 sm:mb-4">
                <span className="text-[11px] sm:text-xs font-mono uppercase text-[#cce5ff] tracking-wider font-bold">
                  CHẨN ĐOÁN NHANH NHU CẦU
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                  Bạn đang gặp trở ngại nào cần giải quyết?
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {diagnosticSolutions.map((item) => {
                  const isSelected = selectedDiagnostic === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedDiagnostic(item.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#006398] text-white border-[#5bb8fe] shadow-md ring-2 ring-[#5bb8fe]/40'
                          : 'border-white/20 bg-white/10 hover:bg-white/15 text-slate-200'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm flex items-center gap-2">
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                        {item.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Real-time solution display */}
              <div className="mt-3 sm:mt-4 p-3.5 rounded-xl bg-black/40 border border-white/10 text-left min-h-[44px] flex items-center">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs sm:text-sm">
                  {diagnosticSolutions[selectedDiagnostic].solIcon}
                  <span>
                    <strong>Giải pháp: </strong>
                    {diagnosticSolutions[selectedDiagnostic].solution}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions inside Dark Card */}
            <div className="relative z-10 pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href={ctaPrimaryLink}
                className="px-6 sm:px-8 py-3.5 rounded-xl bg-[#006398] text-white font-bold text-sm hover:bg-[#00476e] transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 min-h-[48px]"
              >
                <Rocket className="w-4 h-4" />
                <span>{ctaPrimary}</span>
              </a>

              <a
                href={ctaSecondaryLink}
                className="px-6 sm:px-8 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all flex items-center gap-2 active:scale-95 min-h-[48px]"
              >
                <Grid className="w-4 h-4" />
                <span>{ctaSecondary}</span>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
