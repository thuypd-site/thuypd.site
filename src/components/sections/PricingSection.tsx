'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle,
  Sparkles,
  Check,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Layers,
  Table2,
  Zap,
  Info,
  ChevronLeft,
} from 'lucide-react';
import { usePricing } from '../../hooks/usePricing';
import { PricingSectionContent } from '../../types/landingConfig.types';

interface PricingSectionProps {
  content?: PricingSectionContent;
  displayStyle?: string;
  onSelectPlan?: (planName: string, tierBudget: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  content,
  displayStyle = 'price-b',
  onSelectPlan,
}) => {
  const { data: defaultPlans = [] } = usePricing();

  // Determine initial view style
  const initialView = displayStyle === 'price-a' || displayStyle === 'highlight-popular' || displayStyle === 'standard'
    ? 'cards'
    : 'matrix';

  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>(initialView);
  const [activeMobilePlanIndex, setActiveMobilePlanIndex] = useState<number>(1); // Default to Professional (idx 1)
  const [showScrollHint, setShowScrollHint] = useState<boolean>(true);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const pricingPlans = content?.plans && content.plans.length > 0 ? content.plans : defaultPlans;
  const badge = content?.badge || 'Bảng Giá Minh Bạch';
  const title = content?.title || 'Đầu Tư Đúng Mực, Thu Về Hiệu Quả Lâu Dài';
  const subtitle = content?.subtitle || 'Minh bạch chi phí, bàn giao mã nguồn 100%, cam kết không phát sinh bất kỳ khoản phụ phí nào trong suốt quá trình triển khai.';
  const highlightPlanId = content?.highlightPlanId || 'plan-professional';

  // Hide scroll hint once user scrolls the matrix table horizontally
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
    if (planId === 'plan-business' || planId === 'plan-basic') return 'Gói Business (5.500.000đ)';
    if (planId === 'plan-professional') return 'Gói Professional (7.990.000đ)';
    return 'Gói Thiết kế theo yêu cầu (> 15.000.000đ)';
  };

  // Matrix Rows Comparison Data
  const matrixFeatures = [
    {
      category: 'Giao Diện & Trải Nghiệm',
      name: 'Thiết kế giao diện UI/UX',
      business: 'Chuẩn mẫu ngành tối ưu',
      professional: 'May đo UI/UX riêng biệt',
      advanced: 'Độc quyền 100% không đụng hàng',
    },
    {
      category: 'Hiệu Năng & Tốc Độ',
      name: 'Tốc độ & Core Web Vitals',
      business: 'Điểm xanh 90+ (< 1.2s)',
      professional: 'Điểm xanh 98+ (< 0.8s)',
      advanced: 'Tối ưu đỉnh cao 100/100 (< 0.5s)',
    },
    {
      category: 'Hạ Tầng Lưu Trữ',
      name: 'Lưu trữ Cloud SSD NVMe',
      business: '5 GB NVMe Siêu Tốc',
      professional: '15 GB NVMe Siêu Tốc',
      advanced: '50 GB NVMe Doanh Nghiệp',
    },
    {
      category: 'Tên Miền & Bảo Mật',
      name: 'Tặng kèm tên miền quốc tế',
      business: '1 năm (.com / .net)',
      professional: '1 năm (.com / .net / .vn)',
      advanced: '1 năm (.com + .vn song hành)',
    },
    {
      category: 'SEO & Marketing',
      name: 'Chuẩn SEO On-page Google',
      business: 'Tối ưu cơ bản On-page',
      professional: 'Tối ưu chuyên sâu + Schema AI',
      advanced: 'Tối ưu SEO Tổng Thể + Audit liên tục',
    },
    {
      category: 'Tương Tác Khách Hàng',
      name: 'Tích hợp Chat Zalo, Hotline, Form',
      business: 'Đầy đủ tính năng',
      professional: 'Đầy đủ + Zalo OA tự động',
      advanced: 'Full API CRM + Tổng đài thông minh',
    },
    {
      category: 'Thương Mại Điện Tử',
      name: 'Cổng thanh toán trực tuyến',
      business: 'Chuyển khoản QR ngân hàng',
      professional: 'QR tự động + MoMo, VNPay',
      advanced: 'Cổng Visa, Mastercard & Quốc tế',
    },
    {
      category: 'Sở Hữu & Bản Quyền',
      name: 'Bàn giao mã nguồn & Database',
      business: '100% Toàn quyền sở hữu',
      professional: '100% Toàn quyền sở hữu',
      advanced: 'Toàn quyền + Bản quyền thiết kế',
    },
    {
      category: 'Bảo Hành & Đồng Hành',
      name: 'Hỗ trợ kỹ thuật & Bảo hành',
      business: '12 tháng qua Zalo',
      professional: '24/7 Trọn đời qua Hotline/Zalo',
      advanced: 'Đội ngũ kỹ sư riêng phục vụ 24/7',
    },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-[#eff4ff] relative overflow-hidden" id="bang-gia">
      {/* Background ambient decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />
      <div className="absolute -top-32 right-0 w-96 h-96 bg-[#006398]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full relative z-10">
        {/* Header Block with Segmented View Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dce9ff] text-[#006398] text-xs uppercase font-bold border border-[#006398]/15 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#006398]" />
              <span>{badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#45464d] leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* View Mode Toggle: Cards vs Feature Matrix */}
          <div className="flex items-center bg-white p-1 rounded-2xl border border-[#dce9ff] shadow-sm shrink-0 self-start md:self-end">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-[#006398] text-white shadow-md shadow-[#006398]/20'
                  : 'text-[#45464d] hover:text-[#0b1c30] hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Dạng Thẻ Gói</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-[#006398] text-white shadow-md shadow-[#006398]/20'
                  : 'text-[#45464d] hover:text-[#0b1c30] hover:bg-slate-50'
              }`}
            >
              <Table2 className="w-4 h-4" />
              <span>So Sánh Chi Tiết</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: DẠNG THẺ GÓI (CARDS VIEW) — ĐÃ TỐI ƯU CỰC ĐẸP TRÊN MOBILE & TABLET */}
        {/* ========================================================================= */}
        {viewMode === 'cards' && (
          <div className="space-y-6">
            {/* Mobile-only Quick Tier Tabs (< 640px) */}
            <div className="sm:hidden flex items-center justify-between bg-white p-1 rounded-2xl border border-[#dce9ff] shadow-xs">
              {pricingPlans.map((plan, idx) => {
                const isSelected = activeMobilePlanIndex === idx;
                const isPop = plan.isPopular || plan.id === highlightPlanId;
                return (
                  <button
                    key={plan.id || idx}
                    type="button"
                    onClick={() => setActiveMobilePlanIndex(idx)}
                    className={`flex-1 py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer truncate ${
                      isSelected
                        ? 'bg-[#006398] text-white shadow-sm'
                        : 'text-[#45464d] hover:text-[#0b1c30]'
                    }`}
                  >
                    <span>{plan.name.replace('GÓI ', '')}</span>
                    {isPop && <span className="ml-1 text-amber-300">★</span>}
                  </button>
                );
              })}
            </div>

            {/* Grid Container: Trên mobile hiển thị card đang chọn (hoặc tất cả), trên tablet 2/3 cột */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 items-stretch">
              {pricingPlans.map((plan, index) => {
                const currentPlanId = plan.id || plan.planId;
                const isPopular = plan.isPopular || (highlightPlanId ? (currentPlanId === highlightPlanId) : currentPlanId === 'plan-professional');
                const isMobileActive = activeMobilePlanIndex === index;

                return (
                  <motion.div
                    key={currentPlanId || index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className={`relative p-5 sm:p-7 lg:p-8 rounded-3xl bg-white flex flex-col justify-between transition-all duration-300 ${
                      // On mobile (< 640px), show only active tab OR show with subtle border
                      !isMobileActive ? 'hidden sm:flex' : 'flex'
                    } ${
                      isPopular
                        ? 'border-2 border-[#006398] shadow-xl md:-translate-y-2 lg:-translate-y-3 hover:-translate-y-3.5 hover:shadow-2xl ring-4 ring-[#006398]/10'
                        : 'border border-[#dce9ff] shadow-sm hover:shadow-md hover:-translate-y-1.5'
                    }`}
                  >
                    {/* Popular Pill Badge */}
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-[#006398] to-[#0284c7] text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap z-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping" />
                        <span>Khuyên Dùng · Bán Chạy Nhất</span>
                      </div>
                    )}

                    <div className="space-y-4 sm:space-y-5">
                      {/* Top Header info */}
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[11px] sm:text-xs font-extrabold uppercase tracking-wider ${
                              isPopular ? 'text-[#006398]' : 'text-[#5d606a]'
                            }`}
                          >
                            {plan.tierSubtitle || 'Gói Website Trọn Gói'}
                          </span>
                          {plan.completionDays && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#006398] border border-[#dce9ff]">
                              {plan.completionDays}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg sm:text-xl font-extrabold text-[#0b1c30] mt-1.5 leading-snug">
                          {plan.name}
                        </h3>

                        {/* Price Display */}
                        <div className="mt-3 flex items-baseline flex-wrap gap-1">
                          <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#006398] tracking-tight">
                            {plan.formattedPrice}
                          </span>
                          <span className="text-xs sm:text-sm text-[#5d606a] font-bold">VNĐ</span>
                          {currentPlanId === 'plan-advanced' && (
                            <span className="text-[#006398] font-black text-lg">+</span>
                          )}
                        </div>

                        <p className="text-xs sm:text-[13px] text-[#45464d] mt-2 leading-relaxed">
                          {plan.description}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-[#eff4ff]" />

                      {/* Features List */}
                      <div className="space-y-2.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#5d606a]">
                          Quyền lợi &amp; Tính năng bao gồm:
                        </div>
                        <ul className="space-y-2 text-xs sm:text-[13px] text-[#0b1c30]">
                          {plan.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2.5 leading-snug">
                              <CheckCircle className="w-4 h-4 text-[#006398] shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Server Renewal Box */}
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-[#f6f9ff] border border-[#dce9ff]/70 text-[#45464d] text-[11px] sm:text-xs space-y-1.5">
                        <div className="font-bold text-[#0b1c30] flex items-center justify-between">
                          <span>Phí duy trì máy chủ từ năm 2:</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-[#006398]" />
                        </div>
                        <div className="flex justify-between items-center text-slate-600">
                          <span>Duy trì 1 năm:</span>
                          <span className="font-bold text-[#0b1c30]">{plan.renewal1Year || '1.200.000đ'}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600">
                          <span>Duy trì 3 năm (-20%):</span>
                          <span className="font-extrabold text-[#006398]">{plan.renewal3Years || '2.800.000đ'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Choose Plan CTA Button */}
                    <div className="pt-6 sm:pt-7">
                      <button
                        type="button"
                        onClick={() => handleChoosePlan(plan.name, getTierSelectValue(currentPlanId))}
                        className={`w-full py-3 sm:py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer shadow-sm ${
                          isPopular
                            ? 'bg-[#006398] hover:bg-[#004f7a] text-white shadow-md shadow-[#006398]/30 hover:shadow-lg'
                            : 'bg-[#eff4ff] hover:bg-[#006398] text-[#006398] hover:text-white border border-[#dce9ff]'
                        }`}
                      >
                        <span>Đăng Ký {plan.name.replace('GÓI ', '')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: BẢNG SO SÁNH MA TRẬN (FEATURE MATRIX) — STICKY COLUMN RESPONSIVE */}
        {/* ========================================================================= */}
        {viewMode === 'matrix' && (
          <div className="space-y-3">
            {/* Horizontal Scroll Cue on Mobile/Tablet */}
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
                onScroll={handleTableScroll}
                className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#dce9ff] scrollbar-track-slate-50"
              >
                <table className="w-full text-left border-collapse min-w-[700px] sm:min-w-[820px]">
                  <thead>
                    <tr className="border-b border-[#dce9ff] bg-slate-50/80">
                      {/* Column 1: Feature Name (STICKY ON MOBILE/TABLET) */}
                      <th className="p-4 sm:p-5 lg:p-6 text-xs sm:text-sm font-extrabold text-[#0b1c30] w-[34%] sm:w-[32%] sticky left-0 z-20 bg-slate-50/95 backdrop-blur-md border-r border-[#dce9ff] shadow-[3px_0_8px_rgba(0,0,0,0.04)]">
                        Hạng mục tính năng &amp; Kỹ thuật
                      </th>

                      {/* Column 2: Business */}
                      <th className="p-4 sm:p-5 text-center w-[22%] align-bottom">
                        <div className="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Khởi Đầu</div>
                        <div className="text-sm sm:text-base font-black text-[#0b1c30] mt-0.5">Gói Business</div>
                        <div className="text-xs sm:text-sm font-bold text-[#006398] mt-1">5.500.000 ₫</div>
                      </th>

                      {/* Column 3: Professional (HIGHLIGHTED COLUMN) */}
                      <th className="p-4 sm:p-5 text-center w-[24%] bg-[#006398]/5 border-x-2 border-[#006398]/30 relative align-bottom">
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-b-lg bg-[#006398] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm whitespace-nowrap">
                          Phổ Biến Nhất
                        </span>
                        <div className="text-[10px] sm:text-xs font-bold uppercase text-[#006398] mt-2">Doanh Nghiệp</div>
                        <div className="text-sm sm:text-base font-black text-[#006398] mt-0.5">Gói Professional</div>
                        <div className="text-xs sm:text-sm font-black text-[#006398] mt-1">7.990.000 ₫</div>
                      </th>

                      {/* Column 4: Advanced */}
                      <th className="p-4 sm:p-5 text-center w-[20%] align-bottom">
                        <div className="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Độc Bản</div>
                        <div className="text-sm sm:text-base font-black text-[#0b1c30] mt-0.5">Gói Advanced</div>
                        <div className="text-xs sm:text-sm font-bold text-[#006398] mt-1">15.990.000 ₫+</div>
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

                        {/* Business Value */}
                        <td className="p-3.5 sm:p-4 text-center text-slate-600">
                          {row.business}
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
                      {/* Sticky Summary Cell */}
                      <td className="p-4 sm:p-5 font-bold text-[11px] sm:text-xs text-slate-500 sticky left-0 z-10 bg-slate-50/95 backdrop-blur-md border-r border-[#dce9ff] shadow-[3px_0_8px_rgba(0,0,0,0.04)]">
                        Bàn giao đầy đủ mã nguồn &amp; hợp đồng cam kết 0 phụ phí
                      </td>

                      {/* Business Button */}
                      <td className="p-3 sm:p-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleChoosePlan('Gói Business', 'Gói Business (5.500.000đ)')}
                          className="w-full py-2 sm:py-2.5 px-3 rounded-xl border border-[#dce9ff] bg-white text-[#006398] hover:bg-[#006398] hover:text-white font-bold text-xs transition-all shadow-xs active:scale-95 cursor-pointer truncate"
                        >
                          Chọn Business
                        </button>
                      </td>

                      {/* Professional Button (Highlighted) */}
                      <td className="p-3 sm:p-4 text-center bg-[#006398]/5 border-x-2 border-[#006398]/30">
                        <button
                          type="button"
                          onClick={() => handleChoosePlan('Gói Professional', 'Gói Professional (7.990.000đ)')}
                          className="w-full py-2 sm:py-2.5 px-3 rounded-xl bg-[#006398] hover:bg-[#004f7a] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 truncate"
                        >
                          <span>Chọn Professional</span>
                          <Sparkles className="w-3.5 h-3.5 hidden sm:inline" />
                        </button>
                      </td>

                      {/* Advanced Button */}
                      <td className="p-3 sm:p-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleChoosePlan('Gói Advanced', 'Gói Thiết kế theo yêu cầu (> 15.000.000đ)')}
                          className="w-full py-2 sm:py-2.5 px-3 rounded-xl border border-[#dce9ff] bg-white text-slate-700 hover:bg-slate-100 font-bold text-xs transition-all shadow-xs active:scale-95 cursor-pointer truncate"
                        >
                          Liên Hệ May Đo
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Footer Guarantee Note */}
        {content?.footerNote ? (
          <p className="mt-8 text-center text-xs sm:text-sm text-[#45464d] max-w-2xl mx-auto italic">
            * {content.footerNote}
          </p>
        ) : (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-[13px] text-[#45464d] font-medium">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 font-bold" />
              <span>Cam kết 100% không phụ phí ẩn</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 font-bold" />
              <span>Bàn giao mã nguồn &amp; tài khoản quản trị</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 font-bold" />
              <span>Bảo hành &amp; hỗ trợ kỹ thuật trọn đời</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
