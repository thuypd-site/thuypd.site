'use client';

import React from 'react';
import { PhoneCall, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useSettings } from '../../features/settings/hooks/useSettings';
import { useLandingConfig } from '../../features/landing/context/LandingConfigContext';
import { footerServiceLinks, footerQuickLinks } from '../../config/navigation.config';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  const { settings } = useSettings();
  const { sections } = useLandingConfig();
  const currentYear = new Date().getFullYear();

  const footerSec = sections.find((s) => s.id === 'footer');
  const fc = footerSec?.id === 'footer' ? footerSec.content : undefined;

  const brandDescription =
    fc?.brandDescription ||
    'Dịch vụ thiết kế & phát triển website chuyên nghiệp theo yêu cầu — tốc độ tải nhanh, chuẩn SEO Google và bàn giao toàn quyền sở hữu.';
  const servicesTitle = fc?.servicesTitle || 'Dịch Vụ';
  const quickLinksTitle = fc?.quickLinksTitle || 'Điều Hướng';
  const contactTitle = fc?.contactTitle || 'Liên Hệ';
  const copyrightText =
    fc?.copyrightText || `© ${currentYear} ${settings.siteName || 'THUYPD.SITE'}. Bảo lưu mọi quyền.`;

  const scrollToHref = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="bg-white border-t border-[#e3e8ee] text-[#273951]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-[#64748d] leading-relaxed max-w-sm">
              {brandDescription}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f6f9fc] border border-[#e3e8ee] text-xs font-medium text-[#273951]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Hạ tầng vận hành ổn định 99.9%</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0d253d]">
              {servicesTitle}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerServiceLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => scrollToHref(e, item.href)}
                    className="text-[#64748d] hover:text-[#533afd] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0d253d]">
              {quickLinksTitle}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerQuickLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => scrollToHref(e, item.href)}
                    className="text-[#64748d] hover:text-[#533afd] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0d253d]">
              {contactTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#64748d]">
              {settings.hotline && (
                <li>
                  <a
                    href={`tel:${settings.hotlineRaw || settings.hotline.replace(/\D/g, '')}`}
                    className="inline-flex items-center gap-2 hover:text-[#0d253d] tabular-nums"
                  >
                    <PhoneCall className="w-4 h-4 text-[#533afd] shrink-0" />
                    <span className="font-medium text-[#0d253d]">{settings.hotline}</span>
                  </a>
                </li>
              )}
              {settings.zaloUrl && (
                <li>
                  <a
                    href={settings.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-[#533afd]"
                  >
                    <MessageCircle className="w-4 h-4 text-[#533afd] shrink-0" />
                    <span>Zalo: {settings.zaloPhone || settings.hotline}</span>
                  </a>
                </li>
              )}
              {settings.contactEmail && (
                <li>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="inline-flex items-center gap-2 hover:text-[#0d253d] break-all"
                  >
                    <Mail className="w-4 h-4 text-[#533afd] shrink-0" />
                    <span>{settings.contactEmail}</span>
                  </a>
                </li>
              )}
              {settings.officeAddress && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#533afd] shrink-0 mt-0.5" />
                  <span className="leading-snug">{settings.officeAddress}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#e3e8ee] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748d]">
          <p>{copyrightText}</p>
          {settings.workingHours && <p>{settings.workingHours}</p>}
        </div>
      </div>
    </footer>
  );
};
