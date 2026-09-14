'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

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

  // Helper lấy giá trị tính năng linh hoạt từ BE data
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
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* MOBILE SMART MATRIX VIEW (< 768px)                                       */}
      {/* ========================================================================= */}
      <div className="block md:hidden space-y-4">
        {/* Mobile Plan Selector Tabs - Không icon thừa, tối ưu UX */}
        <div className="flex flex-col items-center">
          <div className="w-full flex p-1 bg-slate-100 rounded-2xl border border-slate-200/80 shadow-xs overflow-x-auto scrollbar-none">
            {pricingPlans.map((plan, idx) => {
              const tabName = plan.name?.replace(/^Gói\s+/i, '') || `Gói ${idx + 1}`;

              return (
                <button
                  key={plan.id || plan.planId || idx}
                  type="button"
                  onClick={() => setSelectedMobilePlan(idx)}
                  className={`flex-1 min-w-[90px] py-2.5 px-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer truncate ${
                    selectedMobilePlan === idx
                      ? 'bg-[#006398] text-white shadow-md shadow-[#006398]/20'
                      : 'text-slate-600 hover:text-[#0b1c30]'
                  }`}
                >
                  <span className="truncate">{tabName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Mobile Comparison Table */}
        {!mobileViewAll ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden">
            {/* Header: Title bên trái, Tên gói & Giá bên phải cân đối */}
            <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  So sánh gói
                </span>
                <span className="text-xs font-extrabold text-[#0b1c30]">
                  Tính năng &amp; Kỹ thuật
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-[#006398] block">
                  {currentMobilePlan.name}
                </span>
                <span className="text-xs font-bold text-slate-600">
                  {currentMobilePlan.formattedPrice || currentMobilePlan.price}
                  {(currentMobilePlan.formattedPrice || currentMobilePlan.price)?.toString().includes('₫') ? '' : '₫'}
                </span>
              </div>
            </div>

            {/* List hàng: Loại bỏ hoàn toàn icon thừa */}
            <div className="divide-y divide-slate-100 text-xs">
              {matrixFeatures.map((row, idx) => {
                const cellValue = getFeatureValue(row, currentMobilePlan, selectedMobilePlan);
                const isPro = isPlanHighlighted(currentMobilePlan, selectedMobilePlan);
                const showCategory = idx === 0 || row.category !== matrixFeatures[idx - 1]?.category;

                return (
                  <React.Fragment key={idx}>
                    {showCategory && (
                      <div className="py-2 px-4 bg-slate-50/90 text-[11px] font-extrabold uppercase tracking-wider text-[#006398] border-t border-slate-200/70">
                        {row.category}
                      </div>
                    )}
                    <div className="p-3.5 flex items-start justify-between gap-3 hover:bg-slate-50/50">
                      <div className="w-[52%] font-medium text-[#0b1c30] leading-snug">
                        {row.name}
                      </div>
                      <div
                        className={`w-[48%] text-right font-semibold leading-snug ${
                          isPro ? 'text-[#006398]' : 'text-slate-700'
                        }`}
                      >
                        {cellValue}
                      </div>
                    </div>
                  </React.Fragment>
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
                className="w-full text-center text-xs text-[#006398] font-semibold hover:underline py-1 flex items-center justify-center cursor-pointer"
              >
                <span>Xem đối chiếu 3 cột đầy đủ</span>
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

      {/* ========================================================================= */}
      {/* FULL DESKTOP & TABLET MATRIX TABLE                                        */}
      {/* ========================================================================= */}
      <div className={`space-y-3 ${mobileViewAll ? 'block' : 'hidden md:block'}`}>
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden relative">
          <div
            ref={tableContainerRef}
            onScroll={onTableScroll}
            className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-slate-50"
          >
            <table className="w-full table-fixed min-w-[760px] lg:min-w-[880px] text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/90 bg-slate-50/90">
                  {/* Cột 1: Tiêu đề so sánh tính năng được cân chỉnh chiều cao */}
                  <th className="py-6 px-5 sm:px-6 align-bottom w-[34%] sticky left-0 z-20 bg-slate-50/95 backdrop-blur-md border-r border-slate-200/80 shadow-[3px_0_8px_rgba(0,0,0,0.02)]">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        So Sánh Chi Tiết
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-[#0b1c30]">
                        Tính Năng &amp; Kỹ Thuật
                      </h3>
                    </div>
                  </th>

                  {/* Render động các cột theo pricingPlans từ BE với tỷ lệ chia đều */}
                  {pricingPlans.map((plan, pIdx) => {
                    const isPopular = isPlanHighlighted(plan, pIdx);
                    const subtitle = plan.tierSubtitle || (isPopular ? 'Khuyên Dùng' : 'Tiêu Chuẩn');
                    const formattedPrice = plan.formattedPrice || plan.price;

                    return (
                      <th
                        key={plan.id || plan.planId || pIdx}
                        className={`py-6 px-3 sm:px-4 text-center align-bottom transition-colors relative ${
                          isPopular
                            ? 'bg-[#006398]/[0.04] border-x-2 border-[#006398]/25'
                            : ''
                        }`}
                      >
                        {isPopular && (
                          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-0.5 rounded-full bg-[#006398] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs whitespace-nowrap z-10">
                            Khuyên Dùng
                          </span>
                        )}
                        <div className="space-y-1">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            {subtitle}
                          </div>
                          <div
                            className={`text-base sm:text-lg font-black tracking-tight ${
                              isPopular ? 'text-[#006398]' : 'text-[#0b1c30]'
                            }`}
                          >
                            {plan.name}
                          </div>
                          <div className="text-sm sm:text-base font-black text-[#006398] pt-0.5">
                            {formattedPrice} {formattedPrice?.toString().includes('₫') ? '' : '₫'}
                            {plan.isCustom || plan.id === 'plan-advanced' ? '+' : ''}
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs sm:text-[13px] text-[#0b1c30]">
                {matrixFeatures.map((row, idx) => {
                  const showCategoryHeader = idx === 0 || row.category !== matrixFeatures[idx - 1]?.category;

                  return (
                    <React.Fragment key={idx}>
                      {/* Category Header Row phân tách nội dung cân đối */}
                      {showCategoryHeader && (
                        <tr className="bg-slate-50/90 border-t border-slate-200/80">
                          <td
                            colSpan={pricingPlans.length + 1}
                            className="py-2.5 px-5 sm:px-6 text-[11px] font-extrabold uppercase tracking-wider text-[#006398] sticky left-0 z-10 bg-slate-50/95 backdrop-blur-md"
                          >
                            {row.category}
                          </td>
                        </tr>
                      )}

                      <tr className="hover:bg-slate-50/70 transition-colors group">
                        {/* Tên tính năng sạch sẽ - KHÔNG CÓ ICON THỪA */}
                        <td className="py-3.5 px-5 sm:px-6 font-medium text-[#0b1c30] sticky left-0 z-10 bg-white/95 backdrop-blur-md border-r border-slate-200/80 shadow-[3px_0_8px_rgba(0,0,0,0.02)] group-hover:bg-slate-50/95 transition-colors leading-snug">
                          {row.name}
                        </td>

                        {/* Render động từng giá trị theo pricingPlans */}
                        {pricingPlans.map((plan, pIdx) => {
                          const isPopular = isPlanHighlighted(plan, pIdx);
                          const cellValue = getFeatureValue(row, plan, pIdx);

                          return (
                            <td
                              key={plan.id || plan.planId || pIdx}
                              className={`py-3.5 px-3 sm:px-4 text-center leading-snug ${
                                isPopular
                                  ? 'font-semibold text-[#006398] bg-[#006398]/[0.04] border-x-2 border-[#006398]/25'
                                  : 'text-slate-600 font-medium'
                              }`}
                            >
                              {cellValue}
                            </td>
                          );
                        })}
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>

              <tfoot>
                <tr className="border-t-2 border-slate-200/90 bg-slate-50/90">
                  <td className="py-5 px-5 sm:px-6 font-bold text-xs text-slate-400 sticky left-0 z-10 bg-slate-50/95 backdrop-blur-md border-r border-slate-200/80 shadow-[3px_0_8px_rgba(0,0,0,0.02)]">
                    Lựa chọn gói
                  </td>

                  {/* Render động các nút CTA sạch sẽ, dứt khoát */}
                  {pricingPlans.map((plan, pIdx) => {
                    const isPopular = isPlanHighlighted(plan, pIdx);
                    const btnLabel =
                      plan.isCustom || plan.id === 'plan-advanced' || plan.name?.toLowerCase().includes('yêu cầu')
                        ? 'Tư Vấn Riêng'
                        : `Chọn ${plan.name?.replace(/^Gói\s+/i, '') || 'Gói Này'}`;

                    return (
                      <td
                        key={plan.id || plan.planId || pIdx}
                        className={`py-5 px-3 sm:px-4 text-center ${
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
                          className={`w-full min-h-[42px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-[13px] transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center ${
                            isPopular
                              ? 'bg-[#006398] hover:bg-[#004f7a] text-white shadow-md'
                              : 'border border-slate-200 bg-white text-slate-700 hover:bg-[#006398] hover:text-white hover:border-[#006398]'
                          }`}
                        >
                          <span>{btnLabel}</span>
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
