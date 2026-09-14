'use client';

import React, { useState, useRef } from 'react';
import { Sparkles, Check } from 'lucide-react';
import { usePricing } from '../../hooks/usePricing';
import { PricingSectionContent } from '../../types/landingConfig.types';
import { PricingCardsVariant, PricingMatrixVariant } from './pricing';
import { formatPriceNumber, formatPriceWithVND } from '../../core/utils/formatters';

export interface PricingSectionProps {
  content?: PricingSectionContent;
  displayStyle?: string;
  onSelectPlan?: (planName: string, tierBudget: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  content,
  displayStyle = 'price-a',
  onSelectPlan,
}) => {
  const { data: defaultPlans = [] } = usePricing();

  const activeStyle = displayStyle || (content as any)?.displayStyle || (content as any)?.variant || 'price-a';
  const isMatrix = activeStyle === 'price-b' || activeStyle === 'matrix';

  const [showScrollHint, setShowScrollHint] = useState<boolean>(true);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const rawPlans = content?.plans && content.plans.length > 0 ? content.plans : defaultPlans;
  const pricingPlans = rawPlans.map((plan: any) => {
    const rawPrice = plan.formattedPrice ?? plan.price;
    let formattedPrice = formatPriceNumber(rawPrice);
    if (!formattedPrice) {
      formattedPrice = '4.990.000';
    }
    // Remove trailing '+' if present from formattedPrice since the cards UI renders '+' in a separate span
    const cleanNumber = formattedPrice.replace(/\+$/, '').trim();

    return {
      ...plan,
      id: plan.id || plan.planId,
      planId: plan.planId || plan.id,
      description: plan.description || plan.desc || plan.targetAudience || '',
      formattedPrice: cleanNumber,
      rawPrice,
      price: typeof plan.price === 'number' ? plan.price : parseInt(String(rawPrice).replace(/\D/g, ''), 10) || 0,
    };
  });

  const badge = content?.badge || 'Chi Phí Rõ Ràng';
  const title = content?.title || 'Bảng Giá Thiết Kế Website Trọn Gói';
  const subtitle =
    content?.subtitle ||
    'Chi phí rõ ràng từng hạng mục, toàn quyền sở hữu website vĩnh viễn, cam kết không phát sinh chi phí ngầm trong suốt quá trình thực hiện.';
  const highlightPlanId = content?.highlightPlanId || 'plan-professional';

  const handleTableScroll = () => {
    if (tableContainerRef.current && tableContainerRef.current.scrollLeft > 20) {
      setShowScrollHint(false);
    }
  };

  const handleChoosePlan = (planName: string, budgetTier: string) => {
    if (onSelectPlan) {
      onSelectPlan(planName, budgetTier);
    }
    const target = document.querySelector('#nhan-bao-gia') || document.querySelector('#contact-lead');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getTierSelectValue = (planOrId?: any) => {
    const plan =
      typeof planOrId === 'object' && planOrId !== null
        ? planOrId
        : pricingPlans.find((p: any) => p.id === planOrId || p.planId === planOrId);

    const planId = plan?.id || plan?.planId || planOrId;
    if (planId === 'plan-business' || planId === 'plan-basic') return 'Gói Khởi Nghiệp (4.990.000đ)';
    if (planId === 'plan-professional') return 'Gói Chuyên Nghiệp (7.990.000đ)';
    if (planId === 'plan-advanced' || planId === 'plan-custom') return 'Gói Phát Triển Theo Yêu Cầu (12.990.000đ)';
    if (plan) {
      const priceText = formatPriceNumber(plan.formattedPrice || plan.price);
      return `${plan.name} (${priceText}đ)`;
    }
    return 'Gói Chuyên Nghiệp (7.990.000đ)';
  };

  // Matrix Rows Comparison Data synchronized with current packages
  const defaultMatrixFeatures = [
    {
      category: 'Giao Diện & Trải Nghiệm',
      name: 'Thiết kế giao diện website',
      basic: 'Chuẩn ngành nghề, đẹp mắt & tối ưu',
      professional: 'Thiết kế độc quyền theo nhận diện riêng',
      advanced: 'Thiết kế độc bản 100%, phong cách cao cấp',
    },
    {
      category: 'Hiệu Năng & Tốc Độ',
      name: 'Tốc độ tải trang',
      basic: 'Tải nhanh, mượt mà (< 1.2s)',
      professional: 'Tải siêu tốc tức thì (< 0.8s)',
      advanced: 'Mở trang ngay lập tức (< 0.5s)',
    },
    {
      category: 'Hạ Tầng Lưu Trữ',
      name: 'Dung lượng lưu trữ tốc độ cao',
      basic: '3 GB lưu trữ tốc độ cao',
      professional: '8 GB lưu trữ tốc độ cao',
      advanced: '50 GB lưu trữ dung lượng lớn',
    },
    {
      category: 'Tên Miền & Bảo Mật',
      name: 'Tặng kèm tên miền quốc tế',
      basic: '1 năm (.com / .net)',
      professional: '1 năm (.com / .net / .vn)',
      advanced: '1 năm (.com + .vn song hành)',
    },
    {
      category: 'SEO & Marketing',
      name: 'Tối ưu tìm kiếm Google',
      basic: 'Cấu hình chuẩn tìm kiếm cơ bản',
      professional: 'Tối ưu chuyên sâu, dễ dàng lên top',
      advanced: 'Chiến lược tối ưu toàn diện đa ngành',
    },
    {
      category: 'Tương Tác Khách Hàng',
      name: 'Nút Gọi, Chat Zalo & Form nhận tin',
      basic: 'Tích hợp đầy đủ',
      professional: 'Đầy đủ + Tự động gửi thông báo về Zalo',
      advanced: 'Kết nối tự động Zalo, Telegram & phần mềm bán hàng',
    },
    {
      category: 'Thương Mại Điện Tử',
      name: 'Cổng thanh toán & Giỏ hàng',
      basic: 'Chuyển khoản quét mã QR ngân hàng',
      professional: 'QR tự động + Cổng thanh toán trực tuyến',
      advanced: 'Hệ thống bán hàng, quản lý đơn hàng & kho',
    },
    {
      category: 'Sở Hữu & Bản Quyền',
      name: 'Bàn giao website & Toàn quyền sở hữu',
      basic: '100% Toàn quyền sở hữu trọn đời',
      professional: '100% Toàn quyền sở hữu trọn đời',
      advanced: 'Toàn quyền sở hữu + Bản quyền thiết kế riêng',
    },
    {
      category: 'Bảo Hành & Đồng Hành',
      name: 'Hỗ trợ kỹ thuật & Bảo hành',
      basic: '12 tháng chu đáo',
      professional: '24/7 Trọn đời qua Zalo/Hotline',
      advanced: 'Kỹ sư cao cấp đồng hành 1-1',
    },
  ];

  const activeMatrixFeatures =
    content?.matrixFeatures && content.matrixFeatures.length > 0
      ? content.matrixFeatures
      : defaultMatrixFeatures;

  return (
    <section
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#fafbfc] via-white to-[#fafbfc] relative overflow-hidden"
      id="bang-gia"
    >
      {/* Subtle ambient lighting for smooth visual transition */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-r from-slate-200/20 via-blue-100/15 to-slate-200/20 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full relative z-10">
        {/* Header Block: Centered, balanced, and elegant */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs uppercase font-extrabold tracking-wider border border-slate-200/80 shadow-2xs">
            <span>{badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Render trực tiếp theo đúng cấu hình Admin chọn */}
        {isMatrix ? (
          <PricingMatrixVariant
            matrixFeatures={activeMatrixFeatures}
            pricingPlans={pricingPlans}
            highlightPlanId={highlightPlanId}
            onChoosePlan={handleChoosePlan}
            showScrollHint={showScrollHint}
            onTableScroll={handleTableScroll}
            tableContainerRef={tableContainerRef}
          />
        ) : (
          <PricingCardsVariant
            pricingPlans={pricingPlans}
            highlightPlanId={highlightPlanId}
            onChoosePlan={handleChoosePlan}
            getTierSelectValue={getTierSelectValue}
          />
        )}

        {/* Sleek Trust & Value Guarantees Strip */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/70">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center gap-2.5 text-center transition-all hover:border-[#006398]/30">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-[#006398] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-[#0b1c30]">
                100% Không Phụ Phí Ẩn
              </span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center gap-2.5 text-center transition-all hover:border-[#006398]/30">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-[#006398] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-[#0b1c30]">
                Tặng Tên Miền &amp; Hosting
              </span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center gap-2.5 text-center transition-all hover:border-[#006398]/30">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-[#006398] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-[#0b1c30]">
                Toàn Quyền Sở Hữu 100%
              </span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center gap-2.5 text-center transition-all hover:border-[#006398]/30">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-[#006398] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-[#0b1c30]">
                Bảo Hành &amp; Hỗ Trợ 24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
