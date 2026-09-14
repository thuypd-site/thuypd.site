'use client';

import React, { useState } from 'react';
import { CheckCircle, Sparkles, ArrowRight, Table2 } from 'lucide-react';

export interface PricingMatrixRow {
  category: string;
  name: string;
  basic?: string;
  professional?: string;
  advanced?: string;
  [key: string]: any;
}

export interface PricingMatrixVariantProps {
  matrixFeatures: PricingMatrixRow[];
  pricingPlans?: any[];
  highlightPlanId?: string;
  onChoosePlan: (planName: string, budgetTier: string) => void;
  showScrollHint?: boolean;
  onTableScroll?: () => void;
  tableContainerRef?: React.RefObject<HTMLDivElement>;
}

export const PricingMatrixVariant: React.FC<PricingMatrixVariantProps> = ({
  matrixFeatures,
  pricingPlans = [],
  highlightPlanId,
  onChoosePlan,
  onTableScroll,
  tableContainerRef,
}) => {
  // Tìm gói khuyên dùng mặc định từ config BE (isPopular hoặc khớp highlightPlanId)
  const defaultHighlightIndex = Math.max(
    0,
    pricingPlans.findIndex(
      (p, idx) =>
        p.isPopular ||
        (highlightPlanId ? p.id === highlightPlanId || p.planId === highlightPlanId : idx === 1)
    )
  );

  const [selectedMobilePlan, setSelectedMobilePlan] = useState<number>(defaultHighlightIndex);
  const [mobileViewAll, setMobileViewAll] = useState<boolean>(false);

  const currentMobilePlan = pricingPlans[selectedMobilePlan] || pricingPlans[0] || {
    name: 'Gói Chuyên Nghiệp',
    formattedPrice: '7.990.000 ₫',
  };

  // Helper lấy giá trị tính năng linh hoạt từ BE data thay vì fix cứng
  const getFeatureValue = (row: PricingMatrixRow, plan: any, planIndex: number) => {
    if (!plan) return '—';
    const planId = (plan.id || plan.planId || '').toLowerCase();

    // 1. Khớp chính xác theo key plan.id hoặc plan.planId trong row
    if (plan.id && row[plan.id] !== undefined) return row[plan.id];
    if (plan.planId && row[plan.planId] !== undefined) return row[plan.planId];

    // 2. Khớp theo alias cơ bản của các gói nếu row dùng basic/professional/advanced
    if (planId.includes('basic') || planId.includes('khoi-nghiep') || planIndex === 0) {
      return row.basic ?? (row as any).business ?? '—';
    }
    if (planId.includes('pro') || planId.includes('chuyen-nghiep') || planIndex === 1) {
      return row.professional ?? '—';
    }
    return row.advanced ?? (row as any).enterprise ?? '—';
  };

  const isPlanHighlighted = (plan: any, index: number) => {
    return Boolean(
      plan.isPopular ||
      (highlightPlanId ? plan.id === highlightPlanId || plan.planId === highlightPlanId : index === 1)
    );
  };

  return (
    <div className="space-y-4">
      {/* MOBILE SMART MATRIX VIEW (< 768px) */}
      <div className="block md:hidden space-y-4">
        {/* Mobile Plan Selector Tabs - Hoàn toàn động từ BE config */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-full flex p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-xs overflow-x-auto scrollbar-none">
            {pricingPlans.map((plan, idx) => {
              const isPopular = isPlanHighlighted(plan, idx);
              const tabName = plan.name?.replace(/^Gói\s+/i, '') || `Gói ${idx + 1}`;

              return (
                <button
                  key={plan.id || plan.planId || idx}
                  type="button"
                  onClick={() => setSelectedMobilePlan(idx)}
                  className={`flex-1 min-w-[90px] py-2 px-2 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer truncate ${
                    selectedMobilePlan === idx
                      ? 'bg-[#006398] text-white shadow-md shadow-[#006398]/20'
                      : 'text-slate-600 hover:text-[#0b1c30]'
                  }`}
                >
                  <span className="truncate">{tabName}</span>
                  {isPopular && <Sparkles className="w-3 h-3 text-cyan-300 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Mobile Comparison Table */}
        {!mobileViewAll ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden">
            <div className="p-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#0b1c30]">Hạng mục tính năng</span>
              <div className="text-right">
                <span className="text-xs font-black text-[#006398] block">{currentMobilePlan.name}</span>
                <span className="text-[10px] text-slate-500 font-semibold">
                  {currentMobilePlan.formattedPrice || currentMobilePlan.price}
                  {(currentMobilePlan.formattedPrice || currentMobilePlan.price)?.toString().includes('₫') ? '' : '₫'}
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {matrixFeatures.map((row, idx) => {
                const cellValue = getFeatureValue(row, currentMobilePlan, selectedMobilePlan);
                const isPro = isPlanHighlighted(currentMobilePlan, selectedMobilePlan);

                return (
                  <div key={idx} className="p-3.5 flex items-start justify-between gap-3 hover:bg-slate-50/50">
                    <div className="w-[50%] flex items-start gap-1.5 shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-[#006398] shrink-0 mt-0.5" />
                      <span className="font-medium text-[#0b1c30] leading-snug">{row.name}</span>
                    </div>

                    <div
                      className={`w-[50%] text-right font-semibold leading-snug ${
                        isPro ? 'text-[#006398]' : 'text-slate-700'
                      }`}
                    >
                      {cellValue}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Footer Action */}
            <div className="p-4 bg-slate-50/80 border-t border-slate-200/80 space-y-3">
              <button
                type="button"
                onClick={() =>
                  onChoosePlan(
                    currentMobilePlan.name,
                    `${currentMobilePlan.name} (${currentMobilePlan.formattedPrice || currentMobilePlan.price})`
                  )
                }
                className="w-full py-3 px-4 rounded-xl bg-[#006398] hover:bg-[#004f7a] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Đăng Ký {currentMobilePlan.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setMobileViewAll(true)}
                className="w-full text-center text-xs text-[#006398] font-semibold hover:underline py-1 flex items-center justify-center gap-1 cursor-pointer"
              >
                <Table2 className="w-3.5 h-3.5" />
                <span>Xem đối chiếu tất cả các gói</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end pb-1">
            <button
              type="button"
              onClick={() => setMobileViewAll(false)}
              className="text-xs text-[#006398] font-bold hover:underline cursor-pointer"
            >
              ✕ Thu gọn xem theo từng gói
            </button>
          </div>
        )}
      </div>

      {/* FULL DESKTOP & TABLET MATRIX TABLE (Hoàn toàn động theo mảng pricingPlans từ BE) */}
      <div className={`space-y-3 ${mobileViewAll ? 'block' : 'hidden md:block'}`}>
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden relative">
          <div
            ref={tableContainerRef}
            onScroll={onTableScroll}
            className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-slate-50"
          >
            <table className="w-full text-left border-collapse min-w-[720px] sm:min-w-[840px]">
              <thead>
                <tr className="border-b border-slate-200/90 bg-slate-50/80">
                  {/* Cột cố định: Tên tính năng */}
                  <th className="p-4 sm:p-5 lg:p-6 text-xs sm:text-sm font-extrabold text-[#0b1c30] w-[30%] sm:w-[28%] sticky left-0 z-20 bg-slate-50/95 backdrop-blur-md border-r border-slate-200/80 shadow-[3px_0_8px_rgba(0,0,0,0.03)]">
                    Hạng mục tính năng &amp; Kỹ thuật
                  </th>

                  {/* Render động các cột theo pricingPlans từ BE */}
                  {pricingPlans.map((plan, pIdx) => {
                    const isPopular = isPlanHighlighted(plan, pIdx);
                    const subtitle = plan.tierSubtitle || (isPopular ? 'Khuyên Dùng' : 'Tiêu Chuẩn');
                    const formattedPrice = plan.formattedPrice || plan.price;

                    return (
                      <th
                        key={plan.id || plan.planId || pIdx}
                        className={`p-4 sm:p-5 text-center align-bottom transition-colors ${
                          isPopular
                            ? 'bg-[#006398]/[0.04] border-x-2 border-[#006398]/25 relative'
                            : ''
                        }`}
                      >
                        {isPopular && (
                          <span className="absolute -top-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-b-lg bg-[#006398] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm whitespace-nowrap">
                            Khuyên Dùng
                          </span>
                        )}
                        <div
                          className={`text-[10px] sm:text-xs font-bold uppercase ${
                            isPopular ? 'text-[#006398] mt-2' : 'text-slate-500'
                          }`}
                        >
                          {subtitle}
                        </div>
                        <div
                          className={`text-sm sm:text-base font-black mt-0.5 ${
                            isPopular ? 'text-[#006398]' : 'text-[#0b1c30]'
                          }`}
                        >
                          {plan.name}
                        </div>
                        <div
                          className={`text-xs sm:text-sm font-bold mt-1 ${
                            isPopular ? 'text-[#006398]' : 'text-[#006398]'
                          }`}
                        >
                          {formattedPrice} {formattedPrice?.toString().includes('₫') ? '' : '₫'}
                          {plan.isCustom || plan.id === 'plan-advanced' ? '+' : ''}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs sm:text-[13px] text-[#0b1c30]">
                {matrixFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors group">
                    {/* Sticky Feature Name */}
                    <td className="p-3.5 sm:p-4 lg:p-5 font-semibold text-[#0b1c30] sticky left-0 z-10 bg-white/95 backdrop-blur-md border-r border-slate-200/80 shadow-[3px_0_8px_rgba(0,0,0,0.03)] group-hover:bg-slate-50/95 transition-colors">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#006398] shrink-0" />
                        <span className="leading-snug">{row.name}</span>
                      </div>
                    </td>

                    {/* Render động từng giá trị theo pricingPlans */}
                    {pricingPlans.map((plan, pIdx) => {
                      const isPopular = isPlanHighlighted(plan, pIdx);
                      const cellValue = getFeatureValue(row, plan, pIdx);

                      return (
                        <td
                          key={plan.id || plan.planId || pIdx}
                          className={`p-3.5 sm:p-4 text-center ${
                            isPopular
                              ? 'font-bold text-[#006398] bg-[#006398]/[0.04] border-x-2 border-[#006398]/25'
                              : 'text-slate-600 font-medium'
                          }`}
                        >
                          {cellValue}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="border-t-2 border-slate-200/90 bg-slate-50/80">
                  <td className="p-4 sm:p-5 font-bold text-xs text-[#0b1c30] sticky left-0 z-10 bg-slate-50/95 backdrop-blur-md border-r border-slate-200/80 shadow-[3px_0_8px_rgba(0,0,0,0.03)]">
                    Đăng ký tư vấn gói
                  </td>

                  {/* Render động các nút CTA theo pricingPlans */}
                  {pricingPlans.map((plan, pIdx) => {
                    const isPopular = isPlanHighlighted(plan, pIdx);
                    const btnLabel =
                      plan.isCustom || plan.id === 'plan-advanced' || plan.name?.toLowerCase().includes('yêu cầu')
                        ? 'Tư Vấn Riêng'
                        : `Chọn ${plan.name?.replace(/^Gói\s+/i, '') || 'Gói Này'}`;

                    return (
                      <td
                        key={plan.id || plan.planId || pIdx}
                        className={`p-3 sm:p-4 text-center ${
                          isPopular ? 'bg-[#006398]/[0.04] border-x-2 border-[#006398]/25' : ''
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            onChoosePlan(
                              plan.name,
                              `${plan.name} (${plan.formattedPrice || plan.price})`
                            )
                          }
                          className={`w-full min-h-[40px] py-2.5 px-3 rounded-xl font-bold text-xs transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 ${
                            isPopular
                              ? 'bg-[#006398] hover:bg-[#004f7a] text-white shadow-md'
                              : 'border border-slate-200 bg-white text-slate-700 hover:bg-[#006398] hover:text-white hover:border-[#006398]'
                          }`}
                        >
                          <span>{btnLabel}</span>
                          {isPopular && <Sparkles className="w-3.5 h-3.5 hidden sm:inline" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
