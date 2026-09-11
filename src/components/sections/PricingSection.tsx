'use client';

import React from 'react';
import { motion } from 'motion/react';

import { CheckCircle, Sparkles, Check, X, ShieldCheck, ArrowRight } from 'lucide-react';
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

  const activeStyle = (() => {
    if (displayStyle === 'price-a' || displayStyle === 'highlight-popular' || displayStyle === 'standard') {
      return 'price-a';
    }
    return 'price-b'; // Default to Feature Matrix Table
  })();

  const pricingPlans = content?.plans && content.plans.length > 0 ? content.plans : defaultPlans;
  const badge = content?.badge || 'Bảng Giá Minh Bạch';
  const title = content?.title || 'Đầu Tư Đúng Mực, Thu Về Hiệu Quả Lâu Dài';
  const subtitle = content?.subtitle || 'Minh bạch chi phí, bàn giao mã nguồn 100%, cam kết không phát sinh bất kỳ khoản phụ phí nào trong suốt quá trình triển khai.';
  const highlightPlanId = content?.highlightPlanId || 'plan-professional';

  const handleChoosePlan = (planName: string, budgetTier: string) => {
    if (onSelectPlan) {
      onSelectPlan(planName, budgetTier);
    }
    const target = document.querySelector('#nhan-bao-gia');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getTierSelectValue = (planId?: string) => {
    if (planId === 'plan-business') return 'Gói Business (5.500.000đ)';
    if (planId === 'plan-professional') return 'Gói Professional (7.990.000đ)';
    return 'Gói Thiết kế theo yêu cầu (> 15.000.000đ)';
  };

  // Matrix Rows Comparison Data
  const matrixFeatures = [
    {
      name: 'Thiết kế giao diện UI/UX',
      business: 'Chuẩn mẫu ngành tối ưu',
      professional: 'May đo UI/UX riêng biệt',
      advanced: 'Độc quyền 100% không đụng hàng',
    },
    {
      name: 'Tốc độ & Core Web Vitals',
      business: 'Điểm xanh 90+ (< 1.2s)',
      professional: 'Điểm xanh 98+ (< 0.8s)',
      advanced: 'Tối ưu đỉnh cao 100/100 (< 0.5s)',
    },
    {
      name: 'Lưu trữ Cloud SSD NVMe',
      business: '5 GB NVMe Siêu Tốc',
      professional: '15 GB NVMe Siêu Tốc',
      advanced: '50 GB NVMe Doanh Nghiệp',
    },
    {
      name: 'Tặng kèm tên miền quốc tế',
      business: '1 năm (.com / .net)',
      professional: '1 năm (.com / .net / .vn)',
      advanced: '1 năm (.com + .vn song hành)',
    },
    {
      name: 'Chuẩn SEO On-page Google',
      business: 'Tối ưu cơ bản On-page',
      professional: 'Tối ưu chuyên sâu + Schema AI',
      advanced: 'Tối ưu SEO Tổng Thể + Audit liên tục',
    },
    {
      name: 'Tích hợp Chat Zalo, Hotline, Form',
      business: 'Đầy đủ',
      professional: 'Đầy đủ + Zalo OA tự động',
      advanced: 'Full API CRM + Tổng đài thông minh',
    },
    {
      name: 'Cổng thanh toán trực tuyến',
      business: 'Chuyển khoản QR ngân hàng',
      professional: 'QR tự động + MoMo, VNPay',
      advanced: 'Cổng Visa, Mastercard & Thẻ quốc tế',
    },
    {
      name: 'Bàn giao mã nguồn & Database',
      business: '100% Toàn quyền sở hữu',
      professional: '100% Toàn quyền sở hữu',
      advanced: 'Toàn quyền + Bản quyền thiết kế',
    },
    {
      name: 'Hỗ trợ kỹ thuật & Bảo hành',
      business: '12 tháng qua Zalo',
      professional: '24/7 Trọn đời qua Hotline/Zalo',
      advanced: 'Đội ngũ kỹ sư riêng phục vụ 24/7',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#eff4ff]" id="bang-gia">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        {/* Header */}
        <div className="mb-10 lg:mb-14">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3.5 py-1 rounded-full bg-[#dce9ff] text-[#006398] text-xs uppercase font-bold border border-[#006398]/15 inline-block">
              {badge}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-[#45464d] leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* STYLE A: 3 Cards */}
        {activeStyle === 'price-a' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {pricingPlans.map((plan, index) => {
              const currentPlanId = plan.id || plan.planId;
              const isPopular = plan.isPopular || (highlightPlanId ? (currentPlanId === highlightPlanId) : currentPlanId === 'plan-professional');
              return (
                <motion.div
                  key={currentPlanId || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative p-6 sm:p-8 rounded-3xl bg-white shadow-sm border flex flex-col justify-between transition-all duration-300 ${
                    isPopular
                      ? 'ring-2 ring-[#006398] shadow-2xl lg:-translate-y-3 hover:-translate-y-4 hover:shadow-[0_25px_50px_rgba(0,99,152,0.22)]'
                      : 'border-[#dce9ff]/80 hover:shadow-xl hover:-translate-y-2'
                  }`}
                >
                  {/* Popular Pill */}
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#006398] text-white text-[11px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                      <span>Khuyên Dùng · Được Chọn Nhiều Nhất</span>
                    </div>
                  )}

                  <div className="space-y-5">
                    <div>
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          isPopular ? 'text-[#006398]' : 'text-[#45464d]'
                        }`}
                      >
                        {plan.tierSubtitle || 'Gói Website Trọn Gói'}
                      </span>
                      <h3 className="text-xl font-extrabold text-[#0b1c30] mt-1">{plan.name}</h3>

                      <div className="mt-3 flex items-baseline">
                        <span className="text-3xl lg:text-4xl font-extrabold text-[#006398]">
                          {plan.formattedPrice}
                        </span>
                        <span className="text-xs sm:text-sm text-[#45464d] ml-1.5 font-semibold">VNĐ</span>
                        {currentPlanId === 'plan-advanced' && <span className="text-[#006398] font-bold text-xl">+</span>}
                      </div>

                      <p className="text-xs text-[#45464d] mt-2 leading-relaxed">{plan.description}</p>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-[#0b1c30]">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#006398] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Server renewal details */}
                    <div className="p-3.5 rounded-xl bg-[#eff4ff] text-[#45464d] text-[11px] sm:text-xs space-y-1.5">
                      <div className="font-semibold text-[#0b1c30]">Phí duy trì máy chủ từ năm 2:</div>
                      <div className="flex justify-between">
                        <span>Duy trì 1 năm:</span>
                        <span className="font-bold text-[#0b1c30]">{plan.renewal1Year || '1.000.000đ'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duy trì 3 năm (-20%):</span>
                        <span className="font-bold text-[#006398]">{plan.renewal3Years || '2.400.000đ'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Plan Button */}
                  <div className="pt-6">
                    <button
                      onClick={() => handleChoosePlan(plan.name, getTierSelectValue(currentPlanId))}
                      className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
                        isPopular
                          ? 'bg-[#006398] text-white hover:bg-[#004f7a] shadow-lg shadow-[#006398]/30 hover:shadow-xl'
                          : 'bg-[#eff4ff] text-[#006398] hover:bg-[#006398] hover:text-white border border-[#dce9ff]'
                      }`}
                    >
                      <span>Chọn Gói Này</span>
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* STYLE B: Feature Matrix Table (Detailed Comparison) */}
        {activeStyle === 'price-b' && (
          <div className="bg-white rounded-3xl border border-[#dce9ff] shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-[#dce9ff] bg-slate-50/70">
                    <th className="p-5 sm:p-6 text-sm font-extrabold text-[#0b1c30] w-1/3">
                      Hạng mục tính năng &amp; Kỹ thuật
                    </th>
                    <th className="p-5 sm:p-6 text-center w-[22%]">
                      <div className="text-xs font-bold uppercase text-slate-500">Tiêu Chuẩn</div>
                      <div className="text-base sm:text-lg font-extrabold text-[#0b1c30]">Gói Business</div>
                      <div className="text-sm font-bold text-[#006398] mt-1">5.500.000 ₫</div>
                    </th>
                    <th className="p-5 sm:p-6 text-center w-[25%] bg-[#006398]/5 relative">
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-b-md bg-[#006398] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        Phổ Biến Nhất
                      </span>
                      <div className="text-xs font-bold uppercase text-[#006398] mt-1">Doanh Nghiệp</div>
                      <div className="text-base sm:text-lg font-extrabold text-[#006398]">Gói Professional</div>
                      <div className="text-sm font-extrabold text-[#006398] mt-1">7.990.000 ₫</div>
                    </th>
                    <th className="p-5 sm:p-6 text-center w-[20%]">
                      <div className="text-xs font-bold uppercase text-slate-500">May Đo Riêng</div>
                      <div className="text-base sm:text-lg font-extrabold text-[#0b1c30]">Gói Advanced</div>
                      <div className="text-sm font-bold text-[#006398] mt-1">15.990.000 ₫+</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eff4ff] text-xs sm:text-sm text-[#0b1c30]">
                  {matrixFeatures.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 sm:p-5 font-semibold text-[#0b1c30] flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#006398] shrink-0" />
                        <span>{row.name}</span>
                      </td>
                      <td className="p-4 sm:p-5 text-center text-slate-600">
                        {row.business}
                      </td>
                      <td className="p-4 sm:p-5 text-center font-bold text-[#006398] bg-[#006398]/5">
                        {row.professional}
                      </td>
                      <td className="p-4 sm:p-5 text-center text-slate-700 font-medium">
                        {row.advanced}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-[#dce9ff] bg-slate-50/50">
                    <td className="p-5 font-bold text-xs sm:text-sm text-slate-500">
                      Bàn giao đầy đủ mã nguồn &amp; hợp đồng cam kết không phát sinh
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleChoosePlan('Gói Business', 'Gói Business (5.500.000đ)')}
                        className="w-full py-2.5 px-3 rounded-xl border border-[#dce9ff] bg-white text-[#006398] hover:bg-[#006398] hover:text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
                      >
                        Chọn Business
                      </button>
                    </td>
                    <td className="p-4 text-center bg-[#006398]/5">
                      <button
                        onClick={() => handleChoosePlan('Gói Professional', 'Gói Professional (7.990.000đ)')}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#006398] text-white hover:bg-[#004f7a] font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Chọn Professional</span>
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleChoosePlan('Gói Advanced', 'Gói Thiết kế theo yêu cầu (> 15.000.000đ)')}
                        className="w-full py-2.5 px-3 rounded-xl border border-[#dce9ff] bg-white text-slate-700 hover:bg-slate-100 font-bold text-xs transition-all shadow-sm cursor-pointer"
                      >
                        Liên Hệ May Đo
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {content?.footerNote && (
          <p className="mt-8 text-center text-xs sm:text-sm text-[#45464d] max-w-2xl mx-auto italic">
            * {content.footerNote}
          </p>
        )}
      </div>
    </section>
  );
};
