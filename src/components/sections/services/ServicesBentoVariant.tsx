'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BorderBeam, SpotlightCard } from '../../common';
import {
  IconWebDesign,
  IconEcommerce,
  IconCorporate,
  IconSEO,
  IconCloudServer,
  IconCheckCircle,
  IconArrowRight,
  IconBadge,
} from '../../icons';

export interface ServicesBentoVariantProps {
  services?: any[];
}

export const ServicesBentoVariant: React.FC<ServicesBentoVariantProps> = ({ services = [] }) => {
  const s0 = services[0] || {
    title: 'Thiết Kế & Xây Dựng Website Theo Yêu Cầu Doanh Nghiệp',
    description: 'Phát triển giao diện độc bản theo nhận diện thương hiệu, đáp ứng chính xác mô hình kinh doanh, dễ dàng kết nối phần mềm quản trị và cổng thanh toán tự động.',
    tag: 'DỊCH VỤ TRỌNG TÂM',
  };

  const s1 = services[1] || {
    title: 'Landing Page Quảng Cáo Tối Ưu Chốt Đơn',
    description: 'Bố cục dẫn dắt tâm lý người mua, nút gọi và chat Zalo nổi bật, tốc độ mở trang tức thì giúp tối ưu tối đa chi phí quảng cáo Ads.',
    tag: 'Tối Ưu Chuyển Đổi',
  };

  const s2 = services[2] || {
    title: 'Website Giới Thiệu Công Ty & Dịch Vụ',
    description: 'Khẳng định uy tín thương hiệu với phong cách hiện đại, thanh lịch, như một hồ sơ năng lực số chuyên nghiệp tiếp cận đối tác lớn.',
    tag: 'Nâng Tầm Uy Tín',
  };

  const s3 = services[3] || {
    title: 'Tối Ưu Chuẩn SEO & Lên Top Bền Vững',
    description: 'Cấu trúc website thân thiện với Google, tối ưu tốc độ và thẻ tìm kiếm giúp thương hiệu của bạn tiếp cận khách hàng tiềm năng lâu dài.',
    tag: 'Chuẩn SEO Google',
  };

  const s4 = services[4] || {
    title: 'Máy Chủ Tốc Độ Cao & Nâng Cấp Web Cũ',
    description: 'Cung cấp máy chủ tốc độ cao an toàn, sao lưu tự động hàng tuần và nâng cấp các website cũ chạy chậm trở nên nhanh mượt.',
    tag: 'Hạ Tầng & Nâng Cấp',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
      {/* 1. Large Flagship Card (col-span-12 lg:col-span-8) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="md:col-span-12 lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0b1c30] to-[#0d2a4a] text-white shadow-xl relative overflow-hidden flex flex-col justify-between border border-[#006398]/30 group"
      >
        {/* Border Beam subtle light trace */}
        <BorderBeam size={280} duration={12} borderWidth={1.5} colorFrom="#38bdf8" colorTo="#0284c7" />

        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#006398]/15 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#006398] text-white font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              {s0.tag || 'DỊCH VỤ TRỌNG TÂM'}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-cyan-300 font-mono text-[10px] sm:text-xs font-bold">
              Phát triển riêng 100% · Giao diện độc quyền
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
            {s0.title}
          </h3>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            {s0.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-white/10 text-slate-200 text-xs font-medium border border-white/10 flex items-center gap-1.5">
              <IconCheckCircle size={15} className="text-cyan-300" />
              Bảo hành trọn đời
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/10 text-slate-200 text-xs font-medium border border-white/10 flex items-center gap-1.5">
              <IconCheckCircle size={15} className="text-cyan-300" />
              Chuẩn tìm kiếm Google
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/10 text-slate-200 text-xs font-medium border border-white/10 flex items-center gap-1.5">
              <IconCheckCircle size={15} className="text-cyan-300" />
              Toàn quyền sở hữu
            </span>
          </div>
        </div>

        <div className="relative z-10 pt-6 mt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs sm:text-sm text-slate-300 font-medium">
            Giao diện sắc nét, trải nghiệm mượt mà &amp; tải trang tức thì
          </span>
          <a
            href="#nhan-bao-gia"
            className="px-5 py-2.5 rounded-xl bg-white text-[#0b1c30] hover:bg-[#e0f0ff] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md group-hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Tư vấn giải pháp</span>
            <IconArrowRight size={16} className="text-[#006398]" />
          </a>
        </div>
      </motion.div>

      {/* 2. Top-right Card: Landing Page Tối Ưu Chuyển Đổi */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="md:col-span-6 lg:col-span-4 h-full"
      >
        <SpotlightCard
          spotlightColor="rgba(0, 99, 152, 0.08)"
          className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-lg hover:border-[#006398]/40 transition-all duration-300 flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <IconBadge size="md">
              <IconEcommerce size={24} />
            </IconBadge>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {s1.tag || 'Tối Ưu Chuyển Đổi'}
            </div>
            <h3 className="text-lg font-extrabold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
              {s1.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
              {s1.description}
            </p>
          </div>

          <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">Tối ưu Facebook / TikTok / Google Ads</span>
            <IconArrowRight size={15} className="text-[#006398] group-hover:translate-x-1 transition-transform" />
          </div>
        </SpotlightCard>
      </motion.div>

      {/* 3. Lower Row: Card 1 (Website Giới Thiệu Doanh Nghiệp) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="md:col-span-6 lg:col-span-4 h-full"
      >
        <SpotlightCard
          spotlightColor="rgba(0, 99, 152, 0.08)"
          className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-lg hover:border-[#006398]/40 transition-all duration-300 flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <IconBadge size="md">
              <IconCorporate size={24} />
            </IconBadge>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {s2.tag || 'Nâng Tầm Uy Tín'}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
              {s2.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
              {s2.description}
            </p>
          </div>

          <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">{s2.tag || 'Khẳng định uy tín thương hiệu'}</span>
            <IconArrowRight size={15} className="text-[#006398] group-hover:translate-x-1 transition-transform" />
          </div>
        </SpotlightCard>
      </motion.div>

      {/* 4. Lower Row: Card 2 (Chuẩn SEO & Core Web Vitals) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="md:col-span-6 lg:col-span-4 h-full"
      >
        <SpotlightCard
          spotlightColor="rgba(0, 99, 152, 0.08)"
          className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-lg hover:border-[#006398]/40 transition-all duration-300 flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <IconBadge size="md">
              <IconSEO size={24} />
            </IconBadge>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {s3.tag || 'Chuẩn SEO Google'}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
              {s3.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
              {s3.description}
            </p>
          </div>

          <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">{s3.tag || 'Tăng lượng khách tự nhiên'}</span>
            <IconArrowRight size={15} className="text-[#006398] group-hover:translate-x-1 transition-transform" />
          </div>
        </SpotlightCard>
      </motion.div>

      {/* 5. Lower Row: Card 3 (Tên Miền & Nâng Cấp Bảo Trì) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="md:col-span-6 lg:col-span-4 h-full"
      >
        <SpotlightCard
          spotlightColor="rgba(0, 99, 152, 0.08)"
          className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-lg hover:border-[#006398]/40 transition-all duration-300 flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <IconBadge size="md">
              <IconCloudServer size={24} />
            </IconBadge>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {s4.tag || 'Hạ Tầng & Nâng Cấp'}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
              {s4.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
              {s4.description}
            </p>
          </div>

          <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">{s4.tag || 'Vận hành ổn định 99.9%'}</span>
            <IconArrowRight size={15} className="text-[#006398] group-hover:translate-x-1 transition-transform" />
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
};

