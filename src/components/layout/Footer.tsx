'use client';

import React from 'react';
import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  Gauge,
  Award,
  Lock,
  Facebook,
  Youtube,
  Github,
  ArrowUpRight,
  ChevronUp,
  ShieldCheck,
  Zap,
  Sparkles,
} from 'lucide-react';

import { siteConfig } from '../../config/site.config';
import { footerServiceLinks, footerQuickLinks } from '../../config/navigation.config';
import { useSettings } from '../../hooks/useSettings';
import { Logo } from '../common/Logo';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  const { data: settings } = useSettings();
  const siteName = settings?.siteName || siteConfig.name;
  const hotline = settings?.hotline || siteConfig.hotline;
  const hotlineRaw = settings?.hotlineRaw || siteConfig.hotlineRaw;
  const zaloPhone = settings?.zaloPhone || siteConfig.zaloPhone;
  const zaloUrl = settings?.zaloUrl || siteConfig.zaloUrl;
  const email = settings?.contactEmail || siteConfig.email;
  const address = settings?.officeAddress || siteConfig.address;
  const workingHours = settings?.workingHours || siteConfig.workingHours;

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#060c18] text-slate-300 relative overflow-hidden selection:bg-[#006398]/30 selection:text-white">
      {/* Top Hairline Glowing Gradient Border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#006398] via-[#5bb8fe]/80 to-transparent" />

      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      {/* Neon Ambient Lighting Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-72 bg-[#006398]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#5bb8fe]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full pt-12 sm:pt-16 pb-10 relative z-10">
        {/* 1. Pre-Footer Quick Consultation & Action Strip */}
        <div className="mb-12 sm:mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/15 transition-all duration-500" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006398]/25 text-cyan-300 text-xs font-bold border border-[#5bb8fe]/30">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>ĐỒNG HÀNH KỸ THUẬT 1-1 CHUYÊN SÂU</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Bạn có ý tưởng dự án hoặc muốn nâng cấp website cũ?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Trao đổi trực tiếp cùng đội ngũ kỹ sư để nhận bản tư vấn kiến trúc công nghệ & bảng báo giá trọn gói trong 15 phút.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
              <a
                href={zaloUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0068ff] to-[#0084ff] hover:from-[#0052cc] hover:to-[#0068ff] text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Nhắn Zalo Tư Vấn Ngay</span>
              </a>

              <a
                href={`tel:${hotlineRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/15 hover:border-white/30 backdrop-blur-sm transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Hotline: {hotline}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-12 border-b border-white/10">
          {/* Cột 1: Thương hiệu, Định vị & Chỉ số tin cậy (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-block">
              <Logo variant="dark" size="md" />
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              {settings?.metaDescription ||
                'Đơn vị tiên phong cung cấp giải pháp thiết kế và phát triển website chuyên nghiệp, chuẩn tìm kiếm Google, tối ưu trải nghiệm người dùng và bàn giao trọn gói sở hữu vĩnh viễn.'}
            </p>

            {/* Live Operational Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>Hạ tầng máy chủ: Hoạt động ổn định 99.9%</span>
            </div>

            {/* Social Media Links */}
            {settings?.socialLinks && Object.values(settings.socialLinks).some(Boolean) && (
              <div className="space-y-2 pt-1">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mạng Xã Hội</div>
                <div className="flex items-center gap-2">
                  {settings.socialLinks.facebook && (
                    <a
                      href={settings.socialLinks.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-[#006398] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-[#5bb8fe]/50 hover:shadow-lg hover:shadow-[#006398]/30 hover:-translate-y-0.5"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {settings.socialLinks.youtube && (
                    <a
                      href={settings.socialLinks.youtube}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="YouTube"
                      className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-600/30 hover:-translate-y-0.5"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}
                  {settings.socialLinks.github && (
                    <a
                      href={settings.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-slate-500/50 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {settings.socialLinks.zalo && (
                    <a
                      href={settings.socialLinks.zalo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Zalo"
                      className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-[#0068ff] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-[#0068ff]/50 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Quality Commitment Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-1 max-w-sm">
              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <Gauge className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[11px] font-semibold text-slate-200 block">Tải Trang &lt; 1s</span>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <Lock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <span className="text-[11px] font-semibold text-slate-200 block">Sở Hữu 100%</span>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <Award className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="text-[11px] font-semibold text-slate-200 block">Bảo Hành Trọn Đời</span>
              </div>
            </div>
          </div>

          {/* Cột 2: Dịch Vụ Mũi Nhọn (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5bb8fe] shadow-[0_0_8px_#5bb8fe]" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dịch Vụ Trọng Tâm</h4>
            </div>
            <ul className="space-y-2.5 text-sm">
              {footerServiceLinks.map((link, idx) => (
                <li key={link.id || idx}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-all flex items-center justify-between group py-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#5bb8fe] group-hover:scale-125 transition-all" />
                      <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                    </div>
                    {idx === 0 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#006398]/30 text-cyan-300 border border-[#006398]/50">
                        HOT
                      </span>
                    )}
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-cyan-400 transition-all shrink-0 ml-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Khám Phá & Lối Tắt (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Khám Phá</h4>
            </div>
            <ul className="space-y-2.5 text-sm">
              {footerQuickLinks.map((link, idx) => (
                <li key={link.id || idx}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-all flex items-center justify-between group py-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-emerald-400 group-hover:scale-125 transition-all" />
                      <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-emerald-400 transition-all shrink-0 ml-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Thông Tin Liên Hệ & Trụ Sở (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Thông Tin Liên Hệ</h4>
            </div>

            <div className="space-y-3 text-sm">
              {/* Hotline Micro-Card */}
              <a
                href={`tel:${hotlineRaw}`}
                className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#006398]/60 transition-all flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#006398]/20 text-[#5bb8fe] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Hotline tư vấn 24/7</div>
                  <div className="text-white font-bold text-sm group-hover:text-cyan-300 transition-colors">
                    {hotline}
                  </div>
                </div>
              </a>

              {/* Zalo Micro-Card */}
              <a
                href={zaloUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#0068ff]/60 transition-all flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#0068ff]/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Kênh Zalo trực tiếp</div>
                  <div className="text-white font-semibold text-sm group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <span>{zaloPhone}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 font-normal">
                      Online
                    </span>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-xs text-slate-300 hover:text-cyan-300 transition-colors px-1 py-1"
              >
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{email}</span>
              </a>

              {/* Office Address */}
              <div className="flex items-start gap-3 text-xs text-slate-300 px-1 py-1 leading-relaxed">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-3 text-xs text-slate-400 px-1 py-1">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal, Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-slate-400">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-slate-300">
              {settings?.copyrightText ||
                `© ${new Date().getFullYear()} ${siteName}. Toàn bộ bản quyền đã được đăng ký và bảo hộ.`}
            </p>
            <p className="text-[11px] text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Công nghệ web hiện đại, tải nhanh tức thì &amp; bảo mật cao</span>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#nhan-bao-gia" className="hover:text-white transition-colors">
                Chính Sách Bảo Mật
              </a>
              <span className="text-slate-600">•</span>
              <a href="#nhan-bao-gia" className="hover:text-white transition-colors">
                Điều Khoản Dịch Vụ
              </a>
              <span className="text-slate-600">•</span>
              <a href="#loi-ich" className="hover:text-white transition-colors">
                Cam Kết SLA
              </a>
            </div>

            {/* Back to Top Floating Button */}
            <button
              onClick={scrollToTop}
              aria-label="Cuộn lên đầu trang"
              title="Cuộn lên đầu trang"
              className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-[#006398] text-slate-300 hover:text-white border border-white/10 hover:border-[#5bb8fe]/50 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#006398]/30 group"
            >
              <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

