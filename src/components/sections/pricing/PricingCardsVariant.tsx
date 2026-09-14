'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { BorderBeam } from '../../common';
import {
  IconSparkle,
  IconClock,
  IconArrowRight,
} from '../../icons/CustomIcons';

export interface PricingCardsVariantProps {
  pricingPlans: any[];
  highlightPlanId?: string;
  onChoosePlan: (planName: string, budgetTier: string) => void;
  getTierSelectValue: (planOrId?: any) => string;
}

export const PricingCardsVariant: React.FC<PricingCardsVariantProps> = ({
  pricingPlans,
  highlightPlanId,
  onChoosePlan,
  getTierSelectValue,
}) => {
  const popularIndex = pricingPlans.findIndex(
    (p, idx) =>
      p.isPopular ||
      (highlightPlanId ? (p.id === highlightPlanId || p.planId === highlightPlanId) : idx === 1)
  );
  const defaultIndex = popularIndex >= 0 ? popularIndex : 0;
  const [activePlanIndex, setActivePlanIndex] = useState<number>(defaultIndex);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSelectTab = (index: number) => {
    setActivePlanIndex(index);
    const targetCard = cardRefs.current[index];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  };

  const handleContainerScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.85;
    if (cardWidth > 0) {
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex >= 0 && newIndex < pricingPlans.length && newIndex !== activePlanIndex) {
        setActivePlanIndex(newIndex);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Mobile/Tablet Quick Tab Selector (Chỉ hiện dưới màn hình Desktop lg) */}
      <div className="lg:hidden flex flex-col items-center">
        <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200/80 shadow-2xs max-w-full overflow-x-auto scrollbar-none">
          {pricingPlans.map((plan, idx) => {
            const currentPlanId = plan.id || plan.planId;
            const isPopular =
              plan.isPopular ||
              (highlightPlanId ? currentPlanId === highlightPlanId : currentPlanId === 'plan-professional');

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectTab(idx)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activePlanIndex === idx
                    ? 'bg-[#006398] text-white shadow-md shadow-[#006398]/20'
                    : 'text-slate-600 hover:text-[#0b1c30]'
                }`}
              >
                <span>{plan.name?.replace('Gói ', '')}</span>
                {isPopular && <IconSparkle className="w-3 h-3 text-cyan-300" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards Container: Snap Carousel on Mobile/Tablet -> 3-Col Grid on Desktop */}
      <div
        onScroll={handleContainerScroll}
        className="flex lg:grid overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-none gap-5 lg:grid-cols-3 lg:gap-6 xl:gap-8 items-stretch pt-5 pb-6 lg:pb-2 -mx-4 sm:-mx-6 px-4 sm:px-6 lg:mx-0 lg:px-0"
      >
        {pricingPlans.map((plan, index) => {
          const currentPlanId = plan.id || plan.planId;
          const isPopular =
            plan.isPopular ||
            (highlightPlanId ? currentPlanId === highlightPlanId : currentPlanId === 'plan-professional');

          return (
            <motion.div
              key={currentPlanId || index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className={`snap-center shrink-0 w-[86vw] max-w-[360px] sm:max-w-[400px] lg:w-full lg:max-w-none relative p-6 sm:p-7 xl:p-8 rounded-3xl bg-white flex flex-col justify-between transition-all duration-300 ${
                isPopular
                  ? 'border-2 border-[#006398] shadow-lg shadow-[#006398]/10 lg:-translate-y-2 ring-4 ring-[#006398]/5 hover:-translate-y-3'
                  : 'border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#006398]/30 hover:-translate-y-1.5'
              }`}
            >
              {/* Glowing Border Beam for Popular Plan */}
              {isPopular && <BorderBeam size={260} duration={8} colorFrom="#5bb8fe" colorTo="#006398" />}

              {/* Top Popular Floating Badge */}
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#006398] text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1.5 whitespace-nowrap z-10">
                  <IconSparkle className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span>Khuyên Dùng Cho Doanh Nghiệp</span>
                </div>
              )}

              {/* Upper Content Block */}
              <div className="space-y-4 sm:space-y-5 flex-1 flex flex-col">
                {/* Tier Subtitle & Completion Days */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                      isPopular
                        ? 'bg-[#006398]/10 text-[#006398]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {plan.tierSubtitle || 'Gói Website Trọn Gói'}
                  </span>

                  {plan.completionDays && (
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/80 flex items-center gap-1">
                      <IconClock className="w-3 h-3 text-[#006398]" />
                      <span>{plan.completionDays}</span>
                    </span>
                  )}
                </div>

                {/* Plan Name */}
                <h3 className="text-xl sm:text-2xl font-black text-[#0b1c30] leading-snug tracking-tight">
                  {plan.name}
                </h3>

                {/* Description with responsive height */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[40px] lg:min-h-[48px]">
                  {plan.description}
                </p>

                {/* Price Block */}
                <div className="py-3 px-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-baseline flex-wrap gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-[#006398] tracking-tight">
                      {plan.formattedPrice}
                    </span>
                    <span className="text-sm font-bold text-slate-600">₫</span>
                    {(plan.isCustom || currentPlanId === 'plan-advanced' || plan.name?.toLowerCase().includes('yêu cầu') || String(plan.rawPrice || '').includes('+')) && (
                      <span className="text-[#006398] font-black text-xl">+</span>
                    )}
                    <span className="text-xs text-slate-500 font-medium ml-1">/ trọn gói bàn giao</span>
                  </div>
                </div>

                {/* Feature Deliverables List */}
                <div className="space-y-3 pt-1 flex-1 flex flex-col">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#0b1c30]">
                    Đặc quyền gói bao gồm:
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#0b1c30] flex-1">
                    {plan.features.map((feature: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-start gap-2.5 leading-snug">
                        <Check className="w-4 h-4 text-emerald-600 font-bold shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Footer Section: CTA Button + Subtle Renewal Info */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                {/* Choose Plan CTA Button */}
                <button
                  type="button"
                  onClick={() => onChoosePlan(plan.name, getTierSelectValue(plan))}
                  className={`w-full min-h-[46px] sm:min-h-[48px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer ${
                    isPopular
                      ? 'bg-[#006398] hover:bg-[#004f7a] text-white shadow-md shadow-[#006398]/20 hover:shadow-lg'
                      : 'bg-slate-100 hover:bg-[#006398] text-slate-800 hover:text-white border border-slate-200 hover:border-[#006398]'
                  }`}
                >
                  <span>
                    {plan.isCustom || currentPlanId === 'plan-advanced' || plan.name?.toLowerCase().includes('yêu cầu')
                      ? 'Liên Hệ Tư Vấn Giải Pháp'
                      : `Đăng Ký ${plan.name.replace(/^Gói\s+/i, '')}`}
                  </span>
                  <IconArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dots Indicator for Mobile */}
      <div className="lg:hidden flex justify-center items-center gap-1.5 pt-1">
        {pricingPlans.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            onClick={() => handleSelectTab(dotIdx)}
            aria-label={`Chuyển đến gói ${dotIdx + 1}`}
            className={`transition-all duration-200 rounded-full cursor-pointer ${
              activePlanIndex === dotIdx
                ? 'w-6 h-2 bg-[#006398]'
                : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
