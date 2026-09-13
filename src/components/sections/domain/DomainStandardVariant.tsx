'use client';

import React from 'react';
import { Search, Loader2, CheckCircle2, AlertCircle, Zap, Shield, Lock } from 'lucide-react';

export interface DomainVariantProps {
  badge: string;
  title: string;
  subtitle: string;
  domainName: string;
  setDomainName: (val: string) => void;
  tld: string;
  setTld: (val: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isPending: boolean;
  validationError: string;
  result: any;
}

export const DomainStandardVariant: React.FC<DomainVariantProps> = ({
  badge,
  title,
  subtitle,
  domainName,
  setDomainName,
  tld,
  setTld,
  handleSearch,
  isPending,
  validationError,
  result,
}) => {
  return (
    <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-[#0b1c30] text-white shadow-2xl relative overflow-hidden border border-slate-800/80">
      {/* Ambient Glows */}
      <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#006398]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-[#5bb8fe]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 relative z-10">
        <span className="px-4 py-1 rounded-full bg-white/10 text-cyan-300 text-xs uppercase font-bold tracking-wider border border-white/10 inline-block">
          {badge}
        </span>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
          {title}
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
          {subtitle}
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="p-2 sm:p-1.5 rounded-2xl bg-white shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-[#0b1c30] transition-all duration-300 border border-transparent focus-within:ring-4 focus-within:ring-[#006398]/40"
        >
          <div className="flex items-center flex-1 w-full px-3 sm:px-4 py-2 bg-slate-50 sm:bg-transparent rounded-xl sm:rounded-none">
            <span className="text-sm sm:text-base text-[#45464d] font-bold select-none pr-1">www.</span>
            <input
              type="text"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              placeholder="Nhập tên miền bạn muốn (ví dụ: mybrand)"
              className="w-full bg-transparent text-sm sm:text-base text-[#0b1c30] focus:outline-none placeholder:text-[#45464d]/60 border-none p-0 focus:ring-0 min-h-[36px]"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <select
              value={tld}
              onChange={(e) => setTld(e.target.value)}
              className="bg-slate-100 hover:bg-slate-200/80 px-3.5 py-2.5 sm:py-2.5 rounded-xl text-xs sm:text-sm text-[#0b1c30] font-bold focus:outline-none border-none cursor-pointer transition-colors min-h-[44px]"
            >
              <option value=".com">.com (299k/năm)</option>
              <option value=".vn">.vn (650k/năm)</option>
              <option value=".net">.net (320k/năm)</option>
              <option value=".com.vn">.com.vn (550k/năm)</option>
            </select>

            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#006398] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#00476e] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-[#006398]/30 disabled:opacity-75 min-h-[44px] cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang tra cứu...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Kiểm Tra</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Validation Error Message */}
        {validationError && (
          <div className="p-3 rounded-xl text-xs flex items-center justify-center gap-2 border bg-amber-500/20 text-amber-200 border-amber-500/30">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
            <span>{validationError}</span>
          </div>
        )}

        {/* API Result Display */}
        {result && !validationError && (
          <div
            className={`p-4 rounded-xl text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-md border ${
              result.isAvailable
                ? 'bg-emerald-500/20 text-emerald-100 border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-100 border-amber-500/30'
            }`}
          >
            <div className="flex items-center gap-2 text-left">
              {result.isAvailable ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              )}
              <span>{result.message}</span>
            </div>

            {result.isAvailable && (
              <a
                href="#nhan-bao-gia"
                className="w-full sm:w-auto text-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shrink-0 transition-colors shadow-sm min-h-[38px] flex items-center justify-center"
              >
                Đăng ký giữ tên ({result.pricePerYear})
              </a>
            )}
          </div>
        )}

        {/* Security and SLA badges */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-6 text-xs text-slate-400 pt-2">
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#006398]" /> Kích hoạt chỉ trong 1 phút
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-[#006398]" /> Quyền sở hữu chính chủ 100%
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#006398]" /> Miễn phí bảo vệ danh tính cá nhân
          </span>
        </div>
      </div>
    </div>
  );
};
