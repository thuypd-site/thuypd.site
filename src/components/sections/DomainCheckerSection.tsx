'use client';

import React, { useState } from 'react';
import { Search, Loader2, CheckCircle2, AlertCircle, Zap, Shield, Lock } from 'lucide-react';

import { useDomainCheck } from '../../hooks/useDomainCheck';
import { DomainSectionContent } from '../../types/landingConfig.types';

interface DomainCheckerSectionProps {
  content?: DomainSectionContent;
  displayStyle?: string;
}

export const DomainCheckerSection: React.FC<DomainCheckerSectionProps> = ({ content }) => {
  const [domainName, setDomainName] = useState('');
  const [tld, setTld] = useState('.com');
  const [validationError, setValidationError] = useState('');

  const { mutate: checkDomain, data: result, isPending } = useDomainCheck();

  const badge = content?.badge || 'Khởi Tạo Tương Lai';
  const title = content?.title || 'Kiểm Tra & Đăng Ký Tên Miền Ngay Hôm Nay';
  const subtitle = content?.subtitle || 'Tên miền là tài sản nhận diện thương hiệu trên Internet. Hãy giữ lấy tên miền thương hiệu ngay trước khi đối thủ đăng ký mất. Miễn phí ẩn thông tin chủ thể & tặng kèm chứng chỉ bảo mật!';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDomain = domainName.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');

    if (!cleanDomain || cleanDomain.length < 2) {
      setValidationError('Vui lòng nhập tên miền tối thiểu 2 ký tự.');
      return;
    }

    setValidationError('');
    checkDomain({ domain: cleanDomain, tld });
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-[#0f172a] text-white shadow-2xl relative overflow-hidden">
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

            {/* Input Form */}
            <form
              onSubmit={handleSearch}
              className="p-2 sm:p-1.5 rounded-2xl bg-white shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-[#0b1c30] transition-all duration-300 focus-within:ring-4 focus-within:ring-[#006398]/40"
            >
              <div className="flex items-center flex-1 w-full px-3 sm:px-4 py-2 bg-slate-50 sm:bg-transparent rounded-xl sm:rounded-none">
                <span className="text-sm sm:text-base text-[#45464d] font-bold select-none pr-1">www.</span>
                <input
                  type="text"
                  value={domainName}
                  onChange={(e) => {
                    setDomainName(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  placeholder="Nhập tên miền bạn muốn (ví dụ: mybrand)"
                  className="w-full bg-transparent text-sm sm:text-base text-[#0b1c30] focus:outline-none placeholder:text-[#45464d]/60 border-none p-0 focus:ring-0 min-h-[36px]"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <select
                  value={tld}
                  onChange={(e) => setTld(e.target.value)}
                  className="bg-[#eff4ff] px-3.5 py-2.5 sm:py-2.5 rounded-xl text-xs sm:text-sm text-[#0b1c30] font-bold focus:outline-none border-none cursor-pointer hover:bg-[#e5eeff] transition-colors min-h-[44px]"
                >
                  <option value=".com">.com (299k/năm)</option>
                  <option value=".vn">.vn (650k/năm)</option>
                  <option value=".net">.net (320k/năm)</option>
                  <option value=".com.vn">.com.vn (550k/năm)</option>
                </select>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#006398] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#00476e] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-[#006398]/30 disabled:opacity-75 min-h-[44px]"
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
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-200 text-xs flex items-center justify-center gap-2 border border-amber-500/30">
                <AlertCircle className="w-4 h-4 shrink-0" />
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
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
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
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Zap className="w-4 h-4 text-cyan-400" /> Kích hoạt chỉ trong 1 phút
              </span>
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Shield className="w-4 h-4 text-cyan-400" /> Quyền sở hữu chính chủ 100%
              </span>
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Lock className="w-4 h-4 text-cyan-400" /> Miễn phí bảo vệ danh tính cá nhân
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
