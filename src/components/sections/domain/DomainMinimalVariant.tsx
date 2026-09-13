'use client';

import React from 'react';
import { Search, Loader2, CheckCircle2, AlertCircle, Zap, Shield, Lock } from 'lucide-react';
import { DomainVariantProps } from './DomainStandardVariant';

export const DomainMinimalVariant: React.FC<DomainVariantProps> = ({
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
    <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-slate-50 border border-[#dce9ff] text-[#0b1c30] shadow-sm">
      <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-5">
        <span className="px-4 py-1 rounded-full bg-[#dce9ff] text-[#006398] text-xs uppercase font-bold tracking-wider border border-[#006398]/15 inline-block">
          {badge}
        </span>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] leading-tight">
          {title}
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-[#45464d] leading-relaxed">
          {subtitle}
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="p-2 sm:p-1.5 rounded-2xl bg-white shadow-md flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-[#0b1c30] transition-all duration-300 border border-[#dce9ff] focus-within:ring-4 focus-within:ring-[#006398]/40"
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
          <div className="p-3 rounded-xl text-xs flex items-center justify-center gap-2 border bg-amber-50 text-amber-800 border-amber-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
            <span>{validationError}</span>
          </div>
        )}

        {/* API Result Display */}
        {result && !validationError && (
          <div
            className={`p-4 rounded-xl text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-md border ${
              result.isAvailable
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
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
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-6 text-xs text-[#45464d] pt-2">
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
