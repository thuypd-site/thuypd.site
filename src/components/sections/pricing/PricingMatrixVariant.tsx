'use client';

import React from 'react';
import { CheckCircle, Sparkles, ChevronRight, Info } from 'lucide-react';

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
  return (
    <div className="space-y-3">
      {showScrollHint && (
        <div className="lg:hidden flex items-center justify-between gap-2 px-4 py-2 rounded-xl bg-cyan-50 border border-cyan-200/80 text-cyan-900 text-xs font-medium animate-pulse">
          <div className="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>Cột tính năng được ghim cố định. Vuốt sang ngang để so sánh các gói.</span>
          </div>
          <div className="flex items-center gap-0.5 text-cyan-600 font-bold shrink-0">
            <span>Vuốt</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-[#dce9ff] shadow-xl overflow-hidden relative">
        <div
          ref={tableContainerRef}
          onScroll={onTableScroll}
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#dce9ff] scrollbar-track-slate-50"
        >
          <table className="w-full text-left border-collapse min-w-[720px] sm:min-w-[840px]">
            <thead>
              <tr className="border-b border-[#dce9ff] bg-slate-50/80">
                {/* Column 1: Feature Name Sticky */}
                <th className="p-4 sm:p-5 lg:p-6 text-xs sm:text-sm font-extrabold text-[#0b1c30] w-[34%] sm:w-[32%] sticky left-0 z-20 bg-slate-50/95 backdrop-blur-md border-r border-[#dce9ff] shadow-[3px_0_8px_rgba(0,0,0,0.04)]">
                  Hạng mục tính năng &amp; Kỹ thuật
                </th>

                {/* Column 2: Basic */}
                <th className="p-4 sm:p-5 text-center w-[22%] align-bottom">
                  <div className="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Khởi Đầu</div>
                  <div className="text-sm sm:text-base font-black text-[#0b1c30] mt-0.5">{plan0.name}</div>
                  <div className="text-xs sm:text-sm font-bold text-[#006398] mt-1">{plan0.formattedPrice} {plan0.formattedPrice?.includes('₫') ? '' : '₫'}</div>
                </th>

                {/* Column 3: Professional (HIGHLIGHTED) */}
                <th className="p-4 sm:p-5 text-center w-[24%] bg-[#006398]/5 border-x-2 border-[#006398]/30 relative align-bottom">
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-b-lg bg-[#006398] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm whitespace-nowrap">
                    Khuyên Dùng
                  </span>
                  <div className="text-[10px] sm:text-xs font-bold uppercase text-[#006398] mt-2">Doanh Nghiệp</div>
                  <div className="text-sm sm:text-base font-black text-[#006398] mt-0.5">{plan1.name}</div>
                  <div className="text-xs sm:text-sm font-black text-[#006398] mt-1">{plan1.formattedPrice} {plan1.formattedPrice?.includes('₫') ? '' : '₫'}</div>
                </th>

                {/* Column 4: Advanced */}
                <th className="p-4 sm:p-5 text-center w-[20%] align-bottom">
                  <div className="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Tùy Biến</div>
                  <div className="text-sm sm:text-base font-black text-[#0b1c30] mt-0.5">{plan2.name}</div>
                  <div className="text-xs sm:text-sm font-bold text-[#006398] mt-1">{plan2.formattedPrice} {plan2.formattedPrice?.includes('₫') ? '' : '₫+'}</div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eff4ff] text-xs sm:text-[13px] text-[#0b1c30]">
              {matrixFeatures.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors group">
                  {/* Sticky Feature Name */}
                  <td className="p-3.5 sm:p-4 lg:p-5 font-semibold text-[#0b1c30] sticky left-0 z-10 bg-white/95 backdrop-blur-md border-r border-[#dce9ff] shadow-[3px_0_8px_rgba(0,0,0,0.04)] group-hover:bg-slate-50/95 transition-colors">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#006398] shrink-0" />
                      <span className="leading-snug">{row.name}</span>
                    </div>
                  </td>

                  {/* Basic Value */}
                  <td className="p-3.5 sm:p-4 text-center text-slate-600">
                    {row.basic}
                  </td>

                  {/* Professional Value (Highlighted) */}
                  <td className="p-3.5 sm:p-4 text-center font-bold text-[#006398] bg-[#006398]/5 border-x-2 border-[#006398]/30">
                    {row.professional}
                  </td>

                  {/* Advanced Value */}
                  <td className="p-3.5 sm:p-4 text-center text-slate-700 font-medium">
                    {row.advanced}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="border-t-2 border-[#dce9ff] bg-slate-50/80">
                <td className="p-4 sm:p-5 font-bold text-[11px] sm:text-xs text-slate-500 sticky left-0 z-10 bg-slate-50/95 backdrop-blur-md border-r border-[#dce9ff] shadow-[3px_0_8px_rgba(0,0,0,0.04)]">
                  Bàn giao đầy đủ mã nguồn &amp; hợp đồng cam kết 0 phụ phí
                </td>

                      {/* Basic Button */}
                      <td className="p-3 sm:p-4 text-center">
                        <button
                          type="button"
                          onClick={() => onChoosePlan(plan0.name, `${plan0.name} (${plan0.formattedPrice})`)}
                          className="w-full py-2.5 px-3 rounded-xl border border-[#dce9ff] bg-white text-[#006398] hover:bg-[#006398] hover:text-white font-bold text-xs transition-all shadow-xs active:scale-95 cursor-pointer truncate"
                        >
                          Chọn {plan0.name?.replace('Gói ', '') || 'Khởi Nghiệp'}
                        </button>
                      </td>

                      {/* Professional Button */}
                      <td className="p-3 sm:p-4 text-center bg-[#006398]/5 border-x-2 border-[#006398]/30">
                        <button
                          type="button"
                          onClick={() => onChoosePlan(plan1.name, `${plan1.name} (${plan1.formattedPrice})`)}
                          className="w-full py-2.5 px-3 rounded-xl bg-[#006398] hover:bg-[#004f7a] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 truncate"
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
                          className="w-full py-2.5 px-3 rounded-xl border border-[#dce9ff] bg-white text-slate-700 hover:bg-slate-100 font-bold text-xs transition-all shadow-xs active:scale-95 cursor-pointer truncate"
                        >
                          {plan2.name?.includes('Yêu Cầu') ? 'Liên Hệ Tư Vấn Riêng' : `Chọn ${plan2.name}`}
                        </button>
                      </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
