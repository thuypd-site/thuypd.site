'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Check, Layers, Table2 } from 'lucide-react';
import { usePricing } from '../../hooks/usePricing';
import { PricingSectionContent } from '../../types/landingConfig.types';
import { PricingCardsVariant, PricingMatrixVariant } from './pricing';

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

  const isMatrixDefault = displayStyle === 'price-b' || displayStyle === 'matrix';
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>(isMatrixDefault ? 'matrix' : 'cards');

  useEffect(() => {
    setViewMode(displayStyle === 'price-b' || displayStyle === 'matrix' ? 'matrix' : 'cards');
  }, [displayStyle]);

  const [showScrollHint, setShowScrollHint] = useState<boolean>(true);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const rawPlans = content?.plans && content.plans.length > 0 ? content.plans : defaultPlans;
  const pricingPlans = rawPlans.map((plan: any) => {
    let formattedPrice = plan.formattedPrice || plan.price;
    if (typeof formattedPrice === 'number') {
      formattedPrice = formattedPrice.toLocaleString('vi-VN');
    } else if (typeof formattedPrice === 'string') {
      formattedPrice = formattedPrice.replace(/[đ₫]/g, '').trim();
    }
    return {
      ...plan,
      id: plan.id || plan.planId,
      planId: plan.planId || plan.id,
      description: plan.description || plan.desc || plan.targetAudience || '',
      formattedPrice: formattedPrice || '4.990.000',
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

  const getTierSelectValue = (planId?: string) => {
    if (planId === 'plan-business' || planId === 'plan-basic') return 'Gói Khởi Nghiệp (4.990.000đ)';
    if (planId === 'plan-professional') return 'Gói Chuyên Nghiệp (7.990.000đ)';
    return 'Gói Phát Triển Theo Yêu Cầu (12.990.000đ)';
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
    <section className="py-16 sm:py-20 lg:py-24 bg-[#f6f9fc] border-y border-slate-200/80 relative overflow-hidden" id="bang-gia">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-white/90 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-32 right-0 w-96 h-96 bg-[#006398]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full relative z-10">
        {/* Header Block: Centered, balanced, and elegant */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dce9ff] text-[#006398] text-xs uppercase font-bold border border-[#006398]/15 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#006398]" />
            <span>{badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#45464d] leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* Centered Segmented Control: Dạng Thẻ Gói vs So Sánh Chi Tiết */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center bg-white p-1.5 rounded-2xl border border-[#dce9ff] shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`min-h-[44px] flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-[#006398] text-white shadow-md shadow-[#006398]/20'
                    : 'text-[#45464d] hover:text-[#0b1c30] hover:bg-slate-50'
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span>Dạng Thẻ Gói</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('matrix')}
                className={`min-h-[44px] flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  viewMode === 'matrix'
                    ? 'bg-[#006398] text-white shadow-md shadow-[#006398]/20'
                    : 'text-[#45464d] hover:text-[#0b1c30] hover:bg-slate-50'
                }`}
              >
                <Table2 className="w-4 h-4 shrink-0" />
                <span>So Sánh Chi Tiết</span>
              </button>
            </div>
          </div>
        </div>

        {/* View 1: Dạng Thẻ Gói */}
        {viewMode === 'cards' && (
          <PricingCardsVariant
            pricingPlans={pricingPlans}
            highlightPlanId={highlightPlanId}
            onChoosePlan={handleChoosePlan}
            getTierSelectValue={getTierSelectValue}
          />
        )}

        {/* View 2: Bảng So Sánh Ma Trận */}
        {viewMode === 'matrix' && (
          <PricingMatrixVariant
            matrixFeatures={activeMatrixFeatures}
            pricingPlans={pricingPlans}
            onChoosePlan={handleChoosePlan}
            showScrollHint={showScrollHint}
            onTableScroll={handleTableScroll}
            tableContainerRef={tableContainerRef}
          />
        )}

        {/* Bottom Trust & Transparency Guarantees */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 text-center">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-[#006398]/30 transition-all flex flex-col justify-center">
            <Check className="w-4 h-4 text-emerald-600 font-bold mx-auto mb-1.5" />
            <span className="text-xs sm:text-[13px] font-bold text-[#0b1c30] block">
              100% Không Phụ Phí Ẩn
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Hợp đồng rõ ràng, minh bạch</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-[#006398]/30 transition-all flex flex-col justify-center">
            <Check className="w-4 h-4 text-emerald-600 font-bold mx-auto mb-1.5" />
            <span className="text-xs sm:text-[13px] font-bold text-[#0b1c30] block">
              Tặng Tên Miền &amp; Hosting
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Máy chủ tốc độ cao năm đầu</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-[#006398]/30 transition-all flex flex-col justify-center">
            <Check className="w-4 h-4 text-emerald-600 font-bold mx-auto mb-1.5" />
            <span className="text-xs sm:text-[13px] font-bold text-[#0b1c30] block">
              Toàn Quyền Sở Hữu 100%
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Toàn quyền quản trị vĩnh viễn</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-[#006398]/30 transition-all flex flex-col justify-center">
            <Check className="w-4 h-4 text-emerald-600 font-bold mx-auto mb-1.5" />
            <span className="text-xs sm:text-[13px] font-bold text-[#0b1c30] block">
              Bảo Hành Kỹ Thuật Trọn Đời
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Hỗ trợ 24/7 qua Hotline &amp; Zalo</span>
          </div>
        </div>

        {content?.footerNote && (
          <p className="mt-6 text-center text-xs text-[#45464d] max-w-2xl mx-auto italic">
            * {content.footerNote}
          </p>
        )}
      </div>
    </section>
  );
};
