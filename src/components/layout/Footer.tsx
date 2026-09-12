'use client';

import React from 'react';
import { Phone, Mail, MessageSquare, MapPin, Clock, Gauge, Award, Lock, Facebook, Youtube, Github } from 'lucide-react';

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

  return (
    <footer className="w-full bg-[#0b1320] text-slate-300 border-t border-white/10 relative overflow-hidden">
      <div className="absolute -top-40 right-0 w-96 h-96 bg-[#006398]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-80 h-80 bg-[#5bb8fe]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-white/10">
          {/* Cột 1: Thương hiệu & Định vị */}
          <div className="lg:col-span-4 space-y-5">
            <div className="group">
              <Logo variant="dark" size="md" />
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              {settings?.metaDescription || 'Đơn vị tiên phong cung cấp giải pháp lập trình website theo yêu cầu, chuẩn SEO Google Onpage 98+, tối ưu trải nghiệm người dùng và bàn giao mã nguồn 100% sở hữu vĩnh viễn.'}
            </p>

            {/* Social Links from Admin API */}
            {settings?.socialLinks && Object.values(settings.socialLinks).some(Boolean) && (
              <div className="flex items-center gap-2.5 pt-1">
                {settings.socialLinks.facebook && (
                  <a
                    href={settings.socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#006398] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
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
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
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
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
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
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0068ff] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}

            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <span>PageSpeed 98+</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>SSL 256-bit</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Bảo Hành Trọn Đời</span>
              </div>
            </div>
          </div>

          {/* Cột 2: Dịch vụ mũi nhọn */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dịch Vụ Nổi Bật</h4>
            <ul className="space-y-2.5 text-sm">
              {footerServiceLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006398] group-hover:bg-cyan-400 transition-colors" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Liên kết nhanh */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Khám Phá</h4>
            <ul className="space-y-2.5 text-sm">
              {footerQuickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-white transition-colors" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Thông tin liên hệ & Văn phòng */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Kết Nối Với Chúng Tôi</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-slate-400">Hotline tư vấn 24/7</div>
                  <a
                    href={`tel:${hotlineRaw}`}
                    className="text-white hover:text-cyan-300 font-bold transition-colors"
                  >
                    {hotline}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-slate-400">Zalo Hỗ Trợ Trực Tiếp</div>
                  <a
                    href={zaloUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:text-cyan-300 font-semibold transition-colors"
                  >
                    {zaloPhone} (Chat Ngay)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-slate-400">Hòm thư điện tử</div>
                  <a
                    href={`mailto:${email}`}
                    className="text-white hover:text-cyan-300 transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-slate-400">Trụ sở chính</div>
                  <div className="text-slate-300 text-xs leading-relaxed">{address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-slate-400">Giờ làm việc</div>
                  <div className="text-slate-300 text-xs">{workingHours}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thanh bản quyền */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{settings?.copyrightText || `© ${new Date().getFullYear()} ${siteName}. Toàn bộ bản quyền đã được đăng ký và bảo hộ pháp lý.`}</p>
          <div className="flex items-center gap-4">
            <a href="#nhan-bao-gia" className="hover:text-white transition-colors">
              Chính Sách Bảo Mật
            </a>
            <span>•</span>
            <a href="#nhan-bao-gia" className="hover:text-white transition-colors">
              Điều Khoản Dịch Vụ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
