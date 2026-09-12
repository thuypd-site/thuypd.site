'use client';

import React from 'react';
import { motion } from 'motion/react';

import { 
  ArrowRight, 
  Palette, 
  Building2, 
  MousePointerClick, 
  TrendingUp, 
  Server, 
  Wrench, 
  Sparkles,
  Zap,
  ShieldCheck,
  Code2,
  CheckCircle
} from 'lucide-react';
import { useServices } from '../../hooks/useServices';
import { ServicesSectionContent } from '../../types/landingConfig.types';
import { BorderBeam, SpotlightCard } from '../common';

const iconMap: Record<string, React.ReactNode> = {
  design_services: <Palette className="w-6 h-6 sm:w-7 sm:h-7" />,
  domain: <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />,
  ads_click: <MousePointerClick className="w-6 h-6 sm:w-7 sm:h-7" />,
  query_stats: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />,
  dns: <Server className="w-6 h-6 sm:w-7 sm:h-7" />,
  build_circle: <Wrench className="w-6 h-6 sm:w-7 sm:h-7" />,
};

interface ServicesSectionProps {
  content?: ServicesSectionContent;
  displayStyle?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ content, displayStyle = 'services-b' }) => {
  const { data: defaultServices = [] } = useServices();

  const activeStyle = (() => {
    if (displayStyle === 'services-a' || displayStyle === 'grid-3' || displayStyle === 'grid-2' || displayStyle === 'compact') {
      return 'services-a';
    }
    return 'services-b'; // Default to modern Bento Grid (Stripe)
  })();

  const services = content?.items && content.items.length > 0 ? content.items : defaultServices;
  const badge = content?.badge || 'Dịch Vụ Trọng Tâm';
  const title = content?.title || 'Giải Pháp Thiết Kế & Phát Triển Website Toàn Diện';
  const subtitle = content?.subtitle || 'Lựa chọn kiến trúc website phù hợp nhất với mô hình kinh doanh của bạn, tối ưu chuyển đổi và đồng hành kỹ thuật bền lâu.';

  return (
    <section className="py-16 lg:py-24 bg-white" id="dich-vu">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        {/* Section Header */}
        <div className="mb-10 lg:mb-14">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3.5 py-1 rounded-full bg-[#dce9ff] text-[#006398] text-xs uppercase font-bold border border-[#006398]/15 inline-block">
              {badge}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-[#45464d] leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* STYLE A: Grid 6 Symmetric Cards */}
        {activeStyle === 'services-a' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id || service.serviceId || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="h-full"
              >
                <SpotlightCard
                  spotlightColor="rgba(91, 184, 254, 0.15)"
                  className="h-full p-6 rounded-2xl bg-white shadow-sm border border-[#dce9ff]/80 hover:border-[#006398]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#006398] flex items-center justify-center group-hover:bg-[#006398] group-hover:text-white group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                      {iconMap[service.icon] || <Sparkles className="w-6 h-6" />}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#eff4ff] flex items-center justify-between">
                    <span className="text-xs text-[#006398] font-semibold">{service.tag}</span>
                    <a
                      href="#nhan-bao-gia"
                      className="flex items-center gap-1 text-xs font-bold text-[#006398] group-hover:translate-x-1 transition-transform"
                    >
                      <span>Xem chi tiết</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* STYLE B: Bento Grid (Stripe Modern) */}
        {activeStyle === 'services-b' && (
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
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#006398]/20 blur-3xl rounded-full pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#006398] text-white font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    FLAGSHIP SERVICE
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-cyan-300 font-mono text-[10px] sm:text-xs font-bold">
                    Phát triển riêng 100% · Giao diện độc quyền
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                  Thiết Kế & Xây Dựng Website Theo Yêu Cầu Doanh Nghiệp
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  Phát triển giao diện độc bản theo nhận diện thương hiệu, đáp ứng chính xác mô hình kinh doanh, dễ dàng kết nối phần mềm quản trị và cổng thanh toán tự động.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-lg bg-white/10 text-white text-xs font-medium border border-white/15 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Bảo hành trọn đời
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/10 text-white text-xs font-medium border border-white/15 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Chuẩn tìm kiếm Google
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/10 text-white text-xs font-medium border border-white/15 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Toàn quyền sở hữu
                  </span>
                </div>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs sm:text-sm text-cyan-300 font-semibold">
                  Giao diện sắc nét, trải nghiệm mượt mà &amp; tải trang tức thì
                </span>
                <a
                  href="#nhan-bao-gia"
                  className="px-5 py-2.5 rounded-xl bg-white text-[#0b1c30] hover:bg-[#cce5ff] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md group-hover:scale-105 active:scale-95"
                >
                  <span>Tư vấn giải pháp</span>
                  <ArrowRight className="w-4 h-4 text-[#006398]" />
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
                spotlightColor="rgba(91, 184, 254, 0.16)"
                className="h-full p-6 sm:p-7 rounded-3xl bg-[#eff4ff] border border-[#dce9ff] shadow-sm hover:shadow-xl hover:border-[#006398]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#006398] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <MousePointerClick className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#006398]">
                    Tối Ưu Chuyển Đổi
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
                    Landing Page Quảng Cáo Tối Ưu Chốt Đơn
                  </h3>
                  <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                    Bố cục dẫn dắt tâm lý người mua, nút gọi và chat Zalo nổi bật, tốc độ mở trang tức thì giúp tối ưu tối đa chi phí quảng cáo Ads.
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#dce9ff] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#006398]">Tối ưu Facebook / TikTok / Google Ads</span>
                  <ArrowRight className="w-4 h-4 text-[#006398] group-hover:translate-x-1 transition-transform" />
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
                spotlightColor="rgba(91, 184, 254, 0.15)"
                className="h-full p-6 rounded-3xl bg-white border border-[#dce9ff] shadow-sm hover:shadow-xl hover:border-[#006398]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#eff4ff] text-[#006398] flex items-center justify-center group-hover:bg-[#006398] group-hover:text-white transition-all">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#006398]">
                    Nâng Tầm Uy Tín
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
                    Website Giới Thiệu Công Ty &amp; Dịch Vụ
                  </h3>
                  <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                    Khẳng định uy tín thương hiệu với phong cách hiện đại, thanh lịch, như một hồ sơ năng lực số chuyên nghiệp tiếp cận đối tác lớn.
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#eff4ff] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#006398]">Khẳng định uy tín thương hiệu</span>
                  <ArrowRight className="w-4 h-4 text-[#006398] group-hover:translate-x-1 transition-transform" />
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
                spotlightColor="rgba(91, 184, 254, 0.15)"
                className="h-full p-6 rounded-3xl bg-white border border-[#dce9ff] shadow-sm hover:shadow-xl hover:border-[#006398]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#eff4ff] text-[#006398] flex items-center justify-center group-hover:bg-[#006398] group-hover:text-white transition-all">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#006398]">
                    Chuẩn SEO Google
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
                    Tối Ưu Chuẩn SEO &amp; Lên Top Bền Vững
                  </h3>
                  <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                    Cấu trúc website thân thiện với Google, tối ưu tốc độ và thẻ tìm kiếm giúp thương hiệu của bạn tiếp cận khách hàng tiềm năng lâu dài.
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#eff4ff] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#006398]">Tăng lượng khách tự nhiên</span>
                  <ArrowRight className="w-4 h-4 text-[#006398] group-hover:translate-x-1 transition-transform" />
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
                spotlightColor="rgba(91, 184, 254, 0.15)"
                className="h-full p-6 rounded-3xl bg-white border border-[#dce9ff] shadow-sm hover:shadow-xl hover:border-[#006398]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#eff4ff] text-[#006398] flex items-center justify-center group-hover:bg-[#006398] group-hover:text-white transition-all">
                    <Server className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#006398]">
                    Hạ Tầng &amp; Nâng Cấp
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
                    Máy Chủ Tốc Độ Cao &amp; Nâng Cấp Web Cũ
                  </h3>
                  <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                    Cung cấp máy chủ tốc độ cao an toàn, sao lưu tự động hàng tuần và nâng cấp các website cũ chạy chậm trở nên nhanh mượt.
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#eff4ff] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#006398]">Vận hành ổn định 99.9%</span>
                  <ArrowRight className="w-4 h-4 text-[#006398] group-hover:translate-x-1 transition-transform" />
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
