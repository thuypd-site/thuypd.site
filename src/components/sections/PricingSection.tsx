'use client';

import React from 'react';
import { CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import { PricingSectionContent } from '../../types/landingConfig.types';
import { formatPriceWithVND } from '../../core/utils/formatters';

export interface PricingSectionProps {
  content: PricingSectionContent;
  onSelectPlan?: (planName: string, budgetTier: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ content, onSelectPlan }) => {
  const plans = content.plans || [];
  const highlightId = content.highlightPlanId || 'plan-professional';

  const handleChoose = (planName: string, formattedPrice: string) => {
    const budgetLabel = `${planName} (${formattedPrice})`;
    onSelectPlan?.(planName, budgetLabel);
    document.querySelector('#nhan-bao-gia')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="bang-gia" className="bg-white py-16 sm:py-20 border-b border-[#e3e8ee] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          {content.badge && (
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#533afd] mb-2">
              {content.badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0d253d] tracking-tight">
            {content.title || 'Bảng Giá Thiết Kế Website Trọn Gói'}
          </h2>
          {content.subtitle && (
            <p className="text-sm sm:text-base text-[#64748d] mt-3 leading-relaxed">
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, idx) => {
            const planId = plan.id || plan.planId || `plan-${idx}`;
            const isPopular = Boolean(plan.isPopular) || planId === highlightId;
            const formatted = formatPriceWithVND(plan.formattedPrice || plan.price);
            const originalFormatted = plan.originalPrice
              ? formatPriceWithVND(plan.originalPrice)
              : '';

            return (
              <div
                key={planId}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-shadow ${
                  isPopular
                    ? 'bg-white border-2 border-[#533afd] shadow-stripe-lg relative'
                    : 'bg-[#f6f9fc] border border-[#e3e8ee]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-[#0d253d]">{plan.name}</h3>
                    {isPopular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#eef2ff] text-[#4434d4] text-[11px] font-semibold shrink-0">
                        {plan.tierSubtitle || 'Phổ biến nhất'}
                      </span>
                    )}
                  </div>

                  {plan.description && (
                    <p className="text-xs sm:text-sm text-[#64748d] mt-2 leading-relaxed">
                      {plan.description}
                    </p>
                  )}

                  <div className="mt-5 pb-5 border-b border-[#e3e8ee]">
                    {originalFormatted && (
                      <div className="text-xs text-[#64748d] line-through tabular-nums">
                        {originalFormatted}
                      </div>
                    )}
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl font-bold text-[#0d253d] tabular-nums tracking-tight">
                        {formatted}
                      </span>
                      {plan.period && (
                        <span className="text-xs text-[#64748d]">/ {plan.period}</span>
                      )}
                    </div>
                    {plan.completionDays && (
                      <div className="inline-flex items-center gap-1.5 text-xs text-[#273951] mt-2">
                        <Clock className="w-3.5 h-3.5 text-[#533afd]" />
                        <span>Hoàn thiện: {plan.completionDays}</span>
                      </div>
                    )}
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {(plan.features || []).map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#273951]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#533afd] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleChoose(plan.name, formatted)}
                  className={`mt-7 w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    isPopular
                      ? 'bg-[#533afd] hover:bg-[#4434d4] text-white'
                      : 'bg-white hover:bg-[#eef2ff] text-[#0d253d] border border-[#e3e8ee] hover:border-[#533afd]/40'
                  }`}
                >
                  <span>Chọn gói này</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
