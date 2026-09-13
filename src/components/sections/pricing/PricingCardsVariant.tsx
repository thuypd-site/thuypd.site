'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Sparkles, Check, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import { BorderBeam } from '../../common';

export interface PricingCardsVariantProps {
  pricingPlans: any[];
  highlightPlanId?: string;
  onChoosePlan: (planName: string, budgetTier: string) => void;
  getTierSelectValue: (planId?: string) => string;
}

export const PricingCardsVariant: React.FC<PricingCardsVariantProps> = ({
  pricingPlans,
  highlightPlanId,
  onChoosePlan,
  getTierSelectValue,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
      {pricingPlans.map((plan, index) => {
        const currentPlanId = plan.id || plan.planId;
        const isPopular =
          plan.isPopular ||
          (highlightPlanId ? currentPlanId === highlightPlanId : currentPlanId === 'plan-professional');

        return (
          <motion.div
            key={currentPlanId || index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className={`relative p-6 sm:p-8 rounded-3xl bg-white flex flex-col justify-between transition-all duration-300 ${
              isPopular
                ? 'border-2 border-[#006398] shadow-2xl shadow-[#006398]/10 lg:-translate-y-3 ring-4 ring-[#006398]/10 hover:-translate-y-4 hover:shadow-2xl'
                : 'border border-[#dce9ff] shadow-md hover:shadow-xl hover:-translate-y-1.5'
            }`}
          >
            {/* Glowing Border Beam for Popular Plan */}
            {isPopular && <BorderBeam size={260} duration={8} colorFrom="#5bb8fe" colorTo="#006398" />}

            {/* Top Popular Floating Badge */}
            {isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#006398] to-[#0284c7] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap z-10">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Khuyên Dùng Cho Doanh Nghiệp</span>
              </div>
            )}

            {/* Upper Content Block */}
            <div className="space-y-5">
              {/* Tier Subtitle & Completion Days */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                    isPopular
                      ? 'bg-[#006398]/10 text-[#006398]'
                      : 'bg-slate-100 text-[#5d606a]'
                  }`}
                >
                  {plan.tierSubtitle || 'Gói Website Trọn Gói'}
                </span>

                {plan.completionDays && (
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[#006398] border border-[#dce9ff] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#006398]" />
                    <span>{plan.completionDays}</span>
                  </span>
                )}
              </div>

              {/* Plan Name */}
              <h3 className="text-xl sm:text-2xl font-black text-[#0b1c30] leading-snug tracking-tight">
                {plan.name}
              </h3>

              {/* Description with fixed min-height for perfect visual alignment */}
              <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed min-h-[44px]">
                {plan.description}
              </p>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-[#f8fafd] border border-[#dce9ff]/80">
                <div className="flex items-baseline flex-wrap gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-[#006398] tracking-tight">
                    {plan.formattedPrice}
                  </span>
                  <span className="text-sm font-bold text-[#5d606a]">VNĐ</span>
                  {currentPlanId === 'plan-advanced' && (
                    <span className="text-[#006398] font-black text-xl">+</span>
                  )}
                </div>
                <div className="text-[11px] font-medium text-slate-500 mt-1">
                  Chi phí trọn gói 1 lần • Không phụ phí ngầm
                </div>
              </div>

              {/* Feature Deliverables List */}
              <div className="space-y-3 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#0b1c30] flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#006398]" />
                  <span>Đặc quyền gói bao gồm:</span>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#0b1c30]">
                  {plan.features.map((feature: string, fIdx: number) => (
                    <li key={fIdx} className="flex items-start gap-2.5 leading-snug">
                      <Check className="w-4 h-4 text-emerald-600 font-bold shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Footer Section: Hosting Renewal Pill + CTA Button */}
            <div className="mt-6 pt-5 border-t border-[#eff4ff] space-y-4">
              {/* Server Renewal Box */}
              <div className="p-3 rounded-xl bg-[#f6f9ff] border border-[#dce9ff]/70 text-[#45464d] text-[11px] space-y-1">
                <div className="font-bold text-[#0b1c30] flex items-center justify-between">
                  <span>Phí duy trì từ năm 2:</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#006398]" />
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Gia hạn 1 năm:</span>
                  <span className="font-bold text-[#0b1c30]">{plan.renewal1Year || '1.200.000đ'}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Đã gồm Tên miền quốc tế + Máy chủ lưu trữ năm đầu
                </div>
              </div>

              {/* Choose Plan CTA Button */}
              <button
                type="button"
                onClick={() => onChoosePlan(plan.name, getTierSelectValue(currentPlanId))}
                className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer ${
                  isPopular
                    ? 'bg-gradient-to-r from-[#006398] to-[#0284c7] hover:from-[#004f7a] hover:to-[#006398] text-white shadow-lg shadow-[#006398]/30 hover:shadow-xl hover:scale-[1.01]'
                    : 'bg-slate-100 hover:bg-[#006398] text-[#006398] hover:text-white border border-slate-200 hover:border-[#006398]'
                }`}
              >
                <span>
                  {currentPlanId === 'plan-advanced'
                    ? 'Liên Hệ Tư Vấn Giải Pháp'
                    : `Đăng Ký ${plan.name.replace('GÓI ', '')}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
