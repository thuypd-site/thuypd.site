'use client';

import React, { useState } from 'react';
import { CheckCircle, Sparkles, ChevronRight, Info, Check, ArrowRight, Table2 } from 'lucide-react';

export interface PricingMatrixRow {
  category: string;
  name: string;
  basic: string;
  professional: string;
  advanced: string;
}

export interface PricingMatrixVariantProps {
  matrixFeatures: PricingMatrixRow[];
  pricingPlans?: any[];
  onChoosePlan: (planName: string, budgetTier: string) => void;
  showScrollHint: boolean;
  onTableScroll: () => void;
  tableContainerRef: React.RefObject<HTMLDivElement>;
}

export const PricingMatrixVariant: React.FC<PricingMatrixVariantProps> = ({
  matrixFeatures,
  pricingPlans = [],
  onChoosePlan,
  showScrollHint,
  onTableScroll,
  tableContainerRef,
}) => {
  const plan0 = pricingPlans[0] || { name: 'Gói Khởi Nghiệp', formattedPrice: '4.990.000 ₫' };
  const plan1 = pricingPlans[1] || { name: 'Gói Chuyên Nghiệp', formattedPrice: '7.990.000 ₫' };
  const plan2 = pricingPlans[2] || { name: 'Gói Phát Triển Theo Yêu Cầu', formattedPrice: '12.990.000 ₫+' };

  const [selectedMobilePlan, setSelectedMobilePlan] = useState<number>(1); // 0: Basic, 1: Pro, 2: Advanced
  const [mobileViewAll, setMobileViewAll] = useState<boolean>(false);

  const currentMobilePlan = selectedMobilePlan === 0 ? plan0 : selectedMobilePlan === 1 ? plan1 : plan2;
  const currentPlanKey: 'basic' | 'professional' | 'advanced' =
    selectedMobilePlan === 0 ? 'basic' : selectedMobilePlan === 1 ? 'professional' : 'advanced';

  return (
    <div className="space-y-4">
      {/* MOBILE SMART MATRIX VIEW (< 768px) */}
      <div className="block md:hidden space-y-4">
        {/* Mobile Plan Selector Tabs */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-full grid grid-cols-3 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-xs">
            <button
              type="button"
              onClick={() => setSelectedMobilePlan(0)}
              className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer truncate ${
                selectedMobilePlan === 0
                  ? 'bg-[#006398] text-white shadow-md shadow-[#006398]/20'
                  : 'text-slate-600 hover:text-[#0b1c30]'
              }`}
            >
              Khởi Nghiệp
            </button>

            <button
              type="button"
              onClick={() => setSelectedMobilePlan(1)}
              className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer truncate ${
                selectedMobilePlan === 1
                  ? 'bg-[#006398] text-white shadow-md shadow-[#006398]/20'
                  : 'text-slate-600 hover:text-[#0b1c30]'
              }`}
            >
              <span>Chuyên Nghiệp</span>
              <Sparkles className="w-3 h-3 text-cyan-300 shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => setSelectedMobilePlan(2)}
              className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer truncate ${
                selectedMobilePlan === 2
                  ? 'bg-[#006398] text-white shadow-md shadow-[#006398]/20'
                  : 'text-slate-600 hover:text-[#0b1c30]'
              }`}
            >
              Theo Yêu Cầu
            </button>
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
                  {currentMobilePlan.formattedPrice} {currentMobilePlan.formattedPrice?.includes('₫') ? '' : '₫'}
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {matrixFeatures.map((row, idx) => (
                <div key={idx} className="p-3.5 flex items-start justify-between gap-3 hover:bg-slate-50/50">
                  <div className="w-[50%] flex items-start gap-1.5 shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-[#006398] shrink-0 mt-0.5" />
                    <span className="font-medium text-[#0b1c30] leading-snug">{row.name}</span>
                  </div>

                  <div
                    className={`w-[50%] text-right font-semibold leading-snug ${
                      selectedMobilePlan === 1 ? 'text-[#006398]' : 'text-slate-700'
                    }`}
                  >
                    {row[currentPlanKey]}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Footer Action */}
            <div className="p-4 bg-slate-50/80 border-t border-slate-200/80 space-y-3">
              <button
                type="button"
                onClick={() =>
                  onChoosePlan(
                    currentMobilePlan.name,
                    `${currentMobilePlan.name} (${currentMobilePlan.formattedPrice})`
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

      {/* FULL DESKTOP & TABLET MATRIX TABLE (Or when expanded on mobile) */}
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
                  {/* Column 1: Feature Name Sticky */}
                  <th className="p-4 sm:p-5 lg:p-6 text-xs sm:text-sm font-extrabold text-[#0b1c30] w-[34%] sm:w-[32%] sticky left-0 z-20 bg-slate-50/95 backdrop-blur-md border-r border-slate-200/80 shadow-[3px_0_8px_rgba(0,0,0,0.03)]">
                    Hạng mục tính năng &amp; Kỹ thuật
                  </th>

                  {/* Column 2: Basic */}
                  <th className="p-4 sm:p-5 text-center w-[22%] align-bottom">
                    <div className="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Khởi Đầu</div>
                    <div className="text-sm sm:text-base font-black text-[#0b1c30] mt-0.5">{plan0.name}</div>
                    <div className="text-xs sm:text-sm font-bold text-[#006398] mt-1">
                      {plan0.formattedPrice} {plan0.formattedPrice?.includes('₫') ? '' : '₫'}
                    </div>
                  </th>

                  {/* Column 3: Professional (HIGHLIGHTED) */}
                  <th className="p-4 sm:p-5 text-center w-[24%] bg-[#006398]/[0.04] border-x-2 border-[#006398]/25 relative align-bottom">
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-b-lg bg-[#006398] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm whitespace-nowrap">
                      Khuyên Dùng
                    </span>
                    <div className="text-[10px] sm:text-xs font-bold uppercase text-[#006398] mt-2">Doanh Nghiệp</div>
                    <div className="text-sm sm:text-base font-black text-[#006398] mt-0.5">{plan1.name}</div>
                    <div className="text-xs sm:text-sm font-black text-[#006398] mt-1">
                      {plan1.formattedPrice} {plan1.formattedPrice?.includes('₫') ? '' : '₫'}
                    </div>
                  </th>

                  {/* Column 4: Advanced */}
                  <th className="p-4 sm:p-5 text-center w-[20%] align-bottom">
                    <div className="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Tùy Biến</div>
                    <div className="text-sm sm:text-base font-black text-[#0b1c30] mt-0.5">{plan2.name}</div>
                    <div className="text-xs sm:text-sm font-bold text-[#006398] mt-1">
                      {plan2.formattedPrice} {plan2.formattedPrice?.includes('₫') ? '' : '₫+'}
                    </div>
                  </th>
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

                    {/* Basic Value */}
                    <td className="p-3.5 sm:p-4 text-center text-slate-600">{row.basic}</td>

                    {/* Professional Value (Highlighted) */}
                    <td className="p-3.5 sm:p-4 text-center font-bold text-[#006398] bg-[#006398]/[0.04] border-x-2 border-[#006398]/25">
                      {row.professional}
                    </td>

                    {/* Advanced Value */}
                    <td className="p-3.5 sm:p-4 text-center text-slate-700 font-medium">{row.advanced}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="border-t-2 border-slate-200/90 bg-slate-50/80">
                  <td className="p-4 sm:p-5 font-bold text-xs text-[#0b1c30] sticky left-0 z-10 bg-slate-50/95 backdrop-blur-md border-r border-slate-200/80 shadow-[3px_0_8px_rgba(0,0,0,0.03)]">
                    Đăng ký tư vấn gói
                  </td>

                  {/* Basic Button */}
                  <td className="p-3 sm:p-4 text-center">
                    <button
                      type="button"
                      onClick={() => onChoosePlan(plan0.name, `${plan0.name} (${plan0.formattedPrice})`)}
                      className="w-full min-h-[40px] py-2.5 px-3 rounded-xl border border-[#dce9ff] bg-white text-[#006398] hover:bg-[#006398] hover:text-white font-bold text-xs transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      Chọn {plan0.name?.replace('Gói ', '') || 'Khởi Nghiệp'}
                    </button>
                  </td>

                  {/* Professional Button */}
                  <td className="p-3 sm:p-4 text-center bg-[#006398]/5 border-x-2 border-[#006398]/30">
                    <button
                      type="button"
                      onClick={() => onChoosePlan(plan1.name, `${plan1.name} (${plan1.formattedPrice})`)}
                      className="w-full min-h-[40px] py-2.5 px-3 rounded-xl bg-[#006398] hover:bg-[#004f7a] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <span>Chọn {plan1.name?.replace('Gói ', '') || 'Chuyên Nghiệp'}</span>
                      <Sparkles className="w-3.5 h-3.5 hidden sm:inline" />
                    </button>
                  </td>

                  {/* Advanced Button */}
                  <td className="p-3 sm:p-4 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        onChoosePlan(
                          plan2.name,
                          `${plan2.name} (${plan2.formattedPrice})`
                        )
                      }
                      className="w-full min-h-[40px] py-2.5 px-3 rounded-xl border border-[#dce9ff] bg-white text-slate-700 hover:bg-slate-100 font-bold text-xs transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      {plan2.name?.includes('Yêu Cầu') ? 'Tư Vấn Riêng' : `Chọn ${plan2.name}`}
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
