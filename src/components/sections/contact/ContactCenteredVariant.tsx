'use client';

import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { IconPhoneCall, IconCheckCircle } from '../../icons/CustomIcons';

export interface ContactVariantProps {
  badge: string;
  title: string;
  subtitle: string;
  hotline: string;
  hotlineRaw: string;
  zaloPhone: string;
  zaloUrl: string;
  email: string;
  address?: string;
  commitments?: string[];
  initialBudgetTier?: string;
  initialWebsiteType?: string;
  initialNotes?: string;
}

export const ContactCenteredVariant: React.FC<ContactVariantProps> = ({
  badge,
  title,
  subtitle,
  hotline,
  hotlineRaw,
  zaloPhone,
  zaloUrl,
  email,
  commitments,
  initialBudgetTier,
  initialWebsiteType,
  initialNotes,
}) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs uppercase font-bold border border-slate-200/80 shadow-2xs inline-block">
          {badge}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30]">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-white shadow-lg border border-slate-200/90 space-y-6">
        <div className="space-y-1 text-center sm:text-left pb-1 border-b border-slate-100">
          <h3 className="text-lg sm:text-xl font-bold text-[#0b1c30]">
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

      {/* Quick Contact Horizontal Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
        <a
          href={`tel:${hotlineRaw}`}
          className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#006398]/30 hover:bg-slate-50 transition-all group shadow-2xs"
        >
          <div className="w-10 h-10 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-xs">
            <IconPhoneCall className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="text-[10px] text-slate-500 block">Hotline 24/7</span>
            <span className="text-xs sm:text-sm font-bold text-[#0b1c30] group-hover:text-[#006398]">{hotline}</span>
          </div>
        </a>

        <a
          href={zaloUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#006398]/30 hover:bg-slate-50 transition-all group shadow-2xs"
        >
          <div className="w-10 h-10 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-xs">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="text-[10px] text-slate-500 block">Chat Zalo</span>
            <span className="text-xs sm:text-sm font-bold text-[#0b1c30] group-hover:text-[#006398]">{zaloPhone}</span>
          </div>
        </a>

        <a
          href={`mailto:${email}`}
          className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#006398]/30 hover:bg-slate-50 transition-all group shadow-2xs"
        >
          <div className="w-10 h-10 rounded-xl bg-[#006398] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Mail className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="text-[10px] text-slate-500 block">Email chính thức</span>
            <span className="text-xs sm:text-sm font-bold text-[#0b1c30] group-hover:text-[#006398] truncate block">{email}</span>
          </div>
        </a>
      </div>

      {/* Commitments Banner */}
      {commitments && commitments.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
          {commitments.map((cmt, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-[#0b1c30] font-medium">
              <IconCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{cmt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
