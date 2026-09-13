'use client';

import React from 'react';
import { Phone, Mail, MessageSquare, MapPin, CheckCircle2 } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { ContactVariantProps } from './ContactCenteredVariant';

export const ContactSplitVariant: React.FC<ContactVariantProps> = ({
  badge,
  title,
  subtitle,
  hotline,
  hotlineRaw,
  zaloPhone,
  zaloUrl,
  email,
  address,
  commitments,
  initialBudgetTier,
  initialWebsiteType,
  initialNotes,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      {/* Left info column */}
      <div className="lg:col-span-5 space-y-5 sm:space-y-6">
        <div className="space-y-3">
          <span className="px-4 py-1 rounded-full bg-[#dce9ff] text-[#006398] text-xs uppercase font-bold border border-[#006398]/15">
            {badge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#45464d] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Direct Contact Cards */}
        <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
          <a
            href={`tel:${hotlineRaw}`}
            className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#006398]/30 hover:bg-slate-50 transition-all duration-300 group cursor-pointer min-h-[56px] shadow-xs hover:shadow-md"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs text-[#45464d] block">Hotline tư vấn trực tiếp 24/7</span>
              <div className="text-sm sm:text-base font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
                {hotline}
              </div>
            </div>
          </a>

          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#006398]/30 hover:bg-slate-50 transition-all duration-300 group cursor-pointer min-h-[56px] shadow-xs hover:shadow-md"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs text-[#45464d] block">Email liên hệ chính thức</span>
              <div className="text-sm sm:text-base font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
                {email}
              </div>
            </div>
          </a>

          <a
            href={zaloUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#006398]/30 hover:bg-slate-50 transition-all duration-300 group cursor-pointer min-h-[56px] shadow-xs hover:shadow-md"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs text-[#45464d] block">Kênh hỗ trợ nhanh</span>
              <div className="text-sm sm:text-base font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
                Chat qua Zalo: {zaloPhone}
              </div>
            </div>
          </a>

          {address && (
            <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 transition-all duration-300 min-h-[56px] shadow-xs">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-sm">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[11px] sm:text-xs text-[#45464d] block">Trụ sở &amp; Văn phòng đại diện</span>
                <div className="text-xs sm:text-sm font-bold text-[#0b1c30]">
                  {address}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Guarantees / Commitments list if provided */}
        {commitments && commitments.length > 0 && (
          <div className="pt-2 sm:pt-3 space-y-2 border-t border-[#dce9ff]/60">
            {commitments.map((cmt, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#0b1c30] font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{cmt}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right form column */}
      <div className="lg:col-span-7">
        <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white shadow-xl sm:shadow-2xl border border-[#dce9ff]/80 space-y-5 sm:space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0b1c30]">
              Đăng Ký Tư Vấn &amp; Báo Giá Nhanh
            </h3>
            <p className="text-xs sm:text-sm text-[#45464d]">
              Điền thông tin bên dưới, chúng tôi sẽ liên hệ tư vấn giải pháp và báo giá cụ thể cho bạn.
            </p>
          </div>

          <ContactForm
            initialBudgetTier={initialBudgetTier}
            initialWebsiteType={initialWebsiteType}
            initialNotes={initialNotes}
          />
        </div>
      </div>
    </div>
  );
};
