'use client';

import React, { useState } from 'react';
import { Globe, Search, CheckCircle2, XCircle, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import { useDomainCheck } from '../../features/domain/hooks/useDomainCheck';
import { DomainSectionContent } from '../../types/landingConfig.types';
import { DomainAlternative } from '../../types/domain.types';

export interface DomainCheckerSectionProps {
  content: DomainSectionContent;
}

const DEFAULT_PRICING = [
  { tld: '.com', price: '299.000 ₫/năm', popular: true },
  { tld: '.vn', price: '650.000 ₫/năm', popular: true },
  { tld: '.com.vn', price: '550.000 ₫/năm' },
  { tld: '.net', price: '320.000 ₫/năm' },
  { tld: '.site', price: '199.000 ₫/năm' },
  { tld: '.xyz', price: '150.000 ₫/năm' },
];

export const DomainCheckerSection: React.FC<DomainCheckerSectionProps> = ({ content }) => {
  const pricingList = content.pricing && content.pricing.length > 0 ? content.pricing : DEFAULT_PRICING;
  const [domainInput, setDomainInput] = useState('');
  const [selectedTld, setSelectedTld] = useState(pricingList[0]?.tld || '.com');
  const [validationError, setValidationError] = useState<string | null>(null);

  const { mutate: checkDomain, data: result, isPending, isError, error } = useDomainCheck();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    let clean = domainInput.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
    if (!clean) {
      setValidationError('Vui lòng nhập tên thương hiệu hoặc tên miền cần tra cứu.');
      return;
    }

    let tldToCheck = selectedTld;
    const dotIndex = clean.indexOf('.');
    if (dotIndex !== -1) {
      const extractedTld = clean.slice(dotIndex);
      if (pricingList.some((p) => p.tld === extractedTld)) {
        tldToCheck = extractedTld;
        setSelectedTld(extractedTld);
        clean = clean.slice(0, dotIndex);
      }
    }

    if (clean.length < 2) {
      setValidationError('Tên miền phải có ít nhất 2 ký tự.');
      return;
    }

    checkDomain({ domain: clean, tld: tldToCheck });
  };

  const handleSelectForQuote = (fullDomain: string, price: string) => {
    window.dispatchEvent(new CustomEvent('select-domain', { detail: { domain: fullDomain, price } }));
    document.querySelector('#nhan-bao-gia')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="ten-mien"
      className="bg-white py-16 sm:py-20 border-b border-[#e3e8ee] scroll-mt-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          {content.badge && (
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#533afd] mb-2">
              {content.badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0d253d] tracking-tight">
            {content.title || 'Tra Cứu Tên Miền Cho Thương Hiệu'}
          </h2>
          {content.subtitle && (
            <p className="text-sm sm:text-base text-[#64748d] mt-3 max-w-xl mx-auto leading-relaxed">
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="stripe-card rounded-2xl p-5 sm:p-7 space-y-5">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Globe className="w-4 h-4 text-[#64748d] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="Nhập tên thương hiệu (vd: anphat, thuonghieu)..."
                className="w-full h-11 pl-10 pr-4 rounded-lg border border-[#a8c3de] bg-white text-sm text-[#0d253d] focus:border-[#533afd] focus:outline-none"
              />
            </div>

            <select
              value={selectedTld}
              onChange={(e) => setSelectedTld(e.target.value)}
              aria-label="Chọn đuôi tên miền"
              className="h-11 px-3.5 rounded-lg border border-[#a8c3de] bg-[#f6f9fc] text-sm font-medium text-[#0d253d] focus:border-[#533afd] focus:outline-none"
            >
              {pricingList.map((p) => (
                <option key={p.tld} value={p.tld}>
                  {p.tld}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={isPending}
              className="h-11 px-6 rounded-full bg-[#533afd] hover:bg-[#4434d4] text-white text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-70 shrink-0"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>{isPending ? 'Đang kiểm tra...' : 'Kiểm tra'}</span>
            </button>
          </form>

          {validationError && (
            <div className="flex items-center gap-2 text-xs text-[#ea2261]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {isError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>
                {(error as Error)?.message || 'Không thể kiểm tra tên miền lúc này. Vui lòng thử lại sau.'}
              </span>
            </div>
          )}

          {result && (
            <div className="space-y-3">
              <div
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  result.isAvailable
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : 'bg-[#f6f9fc] border-[#e3e8ee]'
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.isAvailable ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#64748d] shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-sm font-bold text-[#0d253d]">{result.fullDomain}</div>
                    <p className="text-xs text-[#273951] mt-0.5">{result.message}</p>
                  </div>
                </div>

                {result.isAvailable && (
                  <button
                    type="button"
                    onClick={() => handleSelectForQuote(result.fullDomain, result.pricePerYear)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#533afd] hover:bg-[#4434d4] text-white text-xs font-medium shrink-0 cursor-pointer"
                  >
                    <span>Giữ tên miền này ({result.pricePerYear})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {result.alternatives && result.alternatives.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {result.alternatives.slice(0, 4).map((alt: DomainAlternative) => (
                    <div
                      key={alt.fullDomain}
                      className="px-3.5 py-2.5 rounded-lg border border-[#e3e8ee] bg-white flex items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <span className="font-semibold text-[#0d253d]">{alt.fullDomain}</span>
                        <span className="text-[#64748d] ml-2 tabular-nums">{alt.pricePerYear}</span>
                      </div>
                      {alt.isAvailable ? (
                        <button
                          type="button"
                          onClick={() => handleSelectForQuote(alt.fullDomain, alt.pricePerYear)}
                          className="text-[#533afd] hover:text-[#4434d4] font-medium cursor-pointer"
                        >
                          Chọn →
                        </button>
                      ) : (
                        <span className="text-[#64748d]">Đã đăng ký</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Compact TLD Pricing Strip */}
          <div className="pt-4 border-t border-[#e3e8ee] flex flex-wrap items-center justify-center gap-2">
            {pricingList.map((item) => (
              <button
                key={item.tld}
                type="button"
                onClick={() => setSelectedTld(item.tld)}
                className={`px-3 py-1 rounded-full text-xs border transition-colors tabular-nums cursor-pointer ${
                  selectedTld === item.tld
                    ? 'bg-[#eef2ff] border-[#533afd]/40 text-[#4434d4] font-semibold'
                    : 'bg-[#f6f9fc] border-[#e3e8ee] text-[#273951] hover:border-[#a8c3de]'
                }`}
              >
                <span className="font-semibold">{item.tld}</span>
                <span className="text-[#64748d] ml-1.5">{item.price}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
