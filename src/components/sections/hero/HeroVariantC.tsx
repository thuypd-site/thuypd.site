'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Rocket, Grid, Zap, CheckCircle, XCircle, ShoppingBag, Brush, Gauge, Frown } from 'lucide-react';
import { BorderBeam } from '../../common';
import { HeroVariantProps } from './HeroVariantA';

export const HeroVariantC: React.FC<HeroVariantProps> = ({
  badgeText,
  headlineMain,
  headlineHighlight,
  description,
  ctaPrimary,
  ctaSecondary,
  ctaPrimaryLink,
  ctaSecondaryLink,
}) => {
  // Diagnostic tool state
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

  return (
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
  );
};
