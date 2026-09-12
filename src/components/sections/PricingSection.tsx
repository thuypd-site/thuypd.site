'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle,
  Sparkles,
  Check,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Layers,
  Table2,
  Clock,
  Info,
} from 'lucide-react';
import { usePricing } from '../../hooks/usePricing';
import { PricingSectionContent } from '../../types/landingConfig.types';
import { BorderBeam } from '../common';

interface PricingSectionProps {
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

  // Prioritize 'cards' for clean balanced layout, allow matrix toggle
  const initialView = displayStyle === 'price-b' ? 'cards' : 'cards';
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>(initialView);
  const [showScrollHint, setShowScrollHint] = useState<boolean>(true);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const pricingPlans = content?.plans && content.plans.length > 0 ? content.plans : defaultPlans;
  const badge = content?.badge || 'Chi Phí Rõ Ràng';
  const title = content?.title || 'Bảng Giá Thiết Kế Website Trọn Gói';
  const subtitle =
    content?.subtitle ||
    'Minh bạch từng hạng mục, bàn giao 100% quyền sở hữu mã nguồn, cam kết không phát sinh chi phí ngầm trong suốt quá trình thực hiện.';
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
  const matrixFeatures = [
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
      advanced: 'Kết nối tự động Zalo, Telegram & phần mềm CRM',
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
            <div className="inline-flex items-center bg-white p-1 rounded-2xl border border-[#dce9ff] shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
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
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
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
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: DẠNG THẺ GÓI (CARDS VIEW) — CÂN ĐỐI TUYỆT ĐỐI & RÕ RÀNG */}
        {/* ========================================================================= */}
        {viewMode === 'cards' && (
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
                        {plan.features.map((feature, fIdx) => (
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
                      onClick={() => handleChoosePlan(plan.name, getTierSelectValue(currentPlanId))}
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
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: BẢNG SO SÁNH MA TRẬN (FEATURE MATRIX) — ĐỒNG BỘ CHÍNH XÁC */}
        {/* ========================================================================= */}
        {viewMode === 'matrix' && (
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
                onScroll={handleTableScroll}
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
                        <div className="text-sm sm:text-base font-black text-[#0b1c30] mt-0.5">Gói Khởi Nghiệp</div>
                        <div className="text-xs sm:text-sm font-bold text-[#006398] mt-1">4.990.000 ₫</div>
                      </th>

                      {/* Column 3: Professional (HIGHLIGHTED) */}
                      <th className="p-4 sm:p-5 text-center w-[24%] bg-[#006398]/5 border-x-2 border-[#006398]/30 relative align-bottom">
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-b-lg bg-[#006398] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm whitespace-nowrap">
                          Khuyên Dùng
                        </span>
                        <div className="text-[10px] sm:text-xs font-bold uppercase text-[#006398] mt-2">Doanh Nghiệp</div>
                        <div className="text-sm sm:text-base font-black text-[#006398] mt-0.5">Gói Chuyên Nghiệp</div>
                        <div className="text-xs sm:text-sm font-black text-[#006398] mt-1">7.990.000 ₫</div>
                      </th>

                      {/* Column 4: Advanced */}
                      <th className="p-4 sm:p-5 text-center w-[20%] align-bottom">
                        <div className="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Tùy Biến</div>
                        <div className="text-sm sm:text-base font-black text-[#0b1c30] mt-0.5">Gói Theo Yêu Cầu</div>
                        <div className="text-xs sm:text-sm font-bold text-[#006398] mt-1">12.990.000 ₫+</div>
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
                          onClick={() => handleChoosePlan('Gói Khởi Nghiệp', 'Gói Khởi Nghiệp (4.990.000đ)')}
                          className="w-full py-2.5 px-3 rounded-xl border border-[#dce9ff] bg-white text-[#006398] hover:bg-[#006398] hover:text-white font-bold text-xs transition-all shadow-xs active:scale-95 cursor-pointer truncate"
                        >
                          Chọn Khởi Nghiệp
                        </button>
                      </td>

                      {/* Professional Button */}
                      <td className="p-3 sm:p-4 text-center bg-[#006398]/5 border-x-2 border-[#006398]/30">
                        <button
                          type="button"
                          onClick={() => handleChoosePlan('Gói Chuyên Nghiệp', 'Gói Chuyên Nghiệp (7.990.000đ)')}
                          className="w-full py-2.5 px-3 rounded-xl bg-[#006398] hover:bg-[#004f7a] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 truncate"
                        >
                          <span>Chọn Chuyên Nghiệp</span>
                          <Sparkles className="w-3.5 h-3.5 hidden sm:inline" />
                        </button>
                      </td>

                      {/* Advanced Button */}
                      <td className="p-3 sm:p-4 text-center">
                        <button
                          type="button"
                          onClick={() =>
                            handleChoosePlan(
                              'Gói Phát Triển Theo Yêu Cầu',
                              'Gói Phát Triển Theo Yêu Cầu (12.990.000đ)'
                            )
                          }
                          className="w-full py-2.5 px-3 rounded-xl border border-[#dce9ff] bg-white text-slate-700 hover:bg-slate-100 font-bold text-xs transition-all shadow-xs active:scale-95 cursor-pointer truncate"
                        >
                          Liên Hệ Tư Vấn Riêng
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Trust & Transparency Guarantees */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <Check className="w-4 h-4 text-emerald-600 font-bold mx-auto mb-1.5" />
            <span className="text-xs sm:text-[13px] font-semibold text-[#0b1c30] block">
              100% Không Phụ Phí Ẩn
            </span>
            <span className="text-[11px] text-slate-500">Hợp đồng rõ ràng, minh bạch</span>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <Check className="w-4 h-4 text-emerald-600 font-bold mx-auto mb-1.5" />
            <span className="text-xs sm:text-[13px] font-semibold text-[#0b1c30] block">
              Tặng Tên Miền &amp; Hosting
            </span>
            <span className="text-[11px] text-slate-500">Máy chủ tốc độ cao năm đầu</span>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <Check className="w-4 h-4 text-emerald-600 font-bold mx-auto mb-1.5" />
            <span className="text-xs sm:text-[13px] font-semibold text-[#0b1c30] block">
              Toàn Quyền Sở Hữu 100%
            </span>
            <span className="text-[11px] text-slate-500">Toàn quyền quản trị vĩnh viễn</span>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <Check className="w-4 h-4 text-emerald-600 font-bold mx-auto mb-1.5" />
            <span className="text-xs sm:text-[13px] font-semibold text-[#0b1c30] block">
              Bảo Hành Kỹ Thuật Trọn Đời
            </span>
            <span className="text-[11px] text-slate-500">Hỗ trợ 24/7 qua Hotline &amp; Zalo</span>
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

