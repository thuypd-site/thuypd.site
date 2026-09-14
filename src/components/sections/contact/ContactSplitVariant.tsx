'use client';

import React from 'react';
import { Mail, MessageSquare, MapPin } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { ContactVariantProps } from './ContactCenteredVariant';
import { IconPhoneCall, IconCheckCircle } from '../../icons/CustomIcons';

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
          <span className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs uppercase font-bold border border-slate-200/80 shadow-2xs">
            {badge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30]">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Direct Contact Cards */}
        <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
          <a
            href={`tel:${hotlineRaw}`}
            className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#006398]/30 hover:bg-slate-50 transition-all duration-300 group cursor-pointer min-h-[56px] shadow-2xs hover:shadow-md"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <IconPhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs text-slate-500 block">Hotline tư vấn trực tiếp 24/7</span>
              <div className="text-sm sm:text-base font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
                {hotline}
              </div>
            </div>
          </a>

          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#006398]/30 hover:bg-slate-50 transition-all duration-300 group cursor-pointer min-h-[56px] shadow-2xs hover:shadow-md"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs text-slate-500 block">Email liên hệ chính thức</span>
              <div className="text-sm sm:text-base font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
                {email}
              </div>
            </div>
          </a>

          <a
            href={zaloUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#006398]/30 hover:bg-slate-50 transition-all duration-300 group cursor-pointer min-h-[56px] shadow-2xs hover:shadow-md"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs text-slate-500 block">Kênh hỗ trợ nhanh</span>
              <div className="text-sm sm:text-base font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
                Chat qua Zalo: {zaloPhone}
              </div>
            </div>
          </a>

          {address && (
            <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 transition-all duration-300 min-h-[56px] shadow-2xs">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-xs">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[11px] sm:text-xs text-slate-500 block">Trụ sở &amp; Văn phòng đại diện</span>
                <div className="text-xs sm:text-sm font-bold text-[#0b1c30]">
                  {address}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Guarantees / Commitments list if provided */}
        {commitments && commitments.length > 0 && (
          <div className="pt-2 sm:pt-3 space-y-2 border-t border-slate-200/70">
            {commitments.map((cmt, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#0b1c30] font-medium">
                <IconCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{cmt}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right form column */}
      <div className="lg:col-span-7">
        <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white shadow-lg border border-slate-200/90 space-y-5 sm:space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0b1c30]">
              Đăng Ký Tư Vấn &amp; Báo Giá Nhanh
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
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
