'use client';

import React from 'react';
import { motion } from 'motion/react';

import { 
  MousePointer, 
  BadgeDollarSign, 
  KeyRound, 
  Headset, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  FileSearch, 
  Palette, 
  Code, 
  CheckCircle, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { SpotlightCard } from '../common';
import { mockAdvantages } from '../../services/api';
import { AdvantagesSectionContent } from '../../types/landingConfig.types';

const iconMap: Record<string, React.ReactNode> = {
  touch_app: <MousePointer className="w-6 h-6" />,
  price_check: <BadgeDollarSign className="w-6 h-6" />,
  key: <KeyRound className="w-6 h-6" />,
  support_agent: <Headset className="w-6 h-6" />,
  speed: <Zap className="w-6 h-6" />,
  security: <ShieldCheck className="w-6 h-6" />,
};

interface AdvantagesSectionProps {
  content?: AdvantagesSectionContent;
  displayStyle?: string;
}

export const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({ content, displayStyle = 'commits-b' }) => {
  const activeStyle = (() => {
    if (displayStyle === 'commits-a' || displayStyle === 'grid-3' || displayStyle === 'grid-4') {
      return 'commits-a';
    }
    return 'commits-b'; // Default to Wavy Roadmap
  })();

  const items = content?.items && content.items.length > 0 ? content.items : mockAdvantages;
  const badge = content?.badge || 'Lộ Trình Minh Bạch';
  const title = content?.title || '4 Bước Triển Khai Rõ Ràng — Bàn Giao Đúng Hẹn';
  const subtitle = content?.subtitle || 'Mỗi giai đoạn đều có kết quả cụ thể để bạn kiểm tra và duyệt trực tiếp trước khi chuyển sang bước tiếp theo.';

  // Default fallback steps
  const defaultRoadmapSteps = [
    {
      step: '01',
      days: 'Ngày 1 - 2',
      title: 'Lắng Nghe & Lên Khung Web',
      desc: 'Trao đổi kỹ nhu cầu thực tế, tư vấn cấu trúc trang hợp lý, thống nhất màu sắc và lên bản phác thảo khung mẫu.',
      output: 'Đầu ra: Bản phác thảo khung trang rõ ràng',
      icon: <FileSearch className="w-6 h-6 text-[#006398]" />,
    },
    {
      step: '02',
      days: 'Ngày 3 - 5',
      title: 'Thiết Kế Giao Diện Chi Tiết',
      desc: 'Lên thiết kế đẹp mắt theo nhận diện thương hiệu của bạn. Bạn được xem và góp ý chỉnh sửa cho đến khi ưng ý.',
      output: 'Đầu ra: Bản thiết kế được bạn duyệt 100%',
      icon: <Palette className="w-6 h-6 text-purple-600" />,
    },
    {
      step: '03',
      days: 'Ngày 6 - 8',
      title: 'Xây Dựng & Tối Ưu Hệ Thống',
      desc: 'Hiện thực hóa các tính năng thực tế, tối ưu chuẩn SEO Google, cài đặt tốc độ mở trang dưới 1 giây và chạy thử nghiệm.',
      output: 'Đầu ra: Website chạy thử thực tế hoàn chỉnh',
      icon: <Code className="w-6 h-6 text-blue-600" />,
    },
    {
      step: '04',
      days: 'Ngày 9 - 10',
      title: 'Bàn Giao & Hướng Dẫn Tận Tình',
      desc: 'Bàn giao toàn bộ quyền quản trị và mã nguồn, gửi video hướng dẫn sử dụng 1-1 và kích hoạt chế độ hỗ trợ trọn đời.',
      output: 'Đầu ra: Toàn quyền sở hữu & Bắt đầu kinh doanh',
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
    },
  ];

  const stepIcons = [
    <FileSearch key="step-1" className="w-6 h-6 text-[#006398]" />,
    <Palette key="step-2" className="w-6 h-6 text-purple-600" />,
    <Code key="step-3" className="w-6 h-6 text-blue-600" />,
    <Sparkles key="step-4" className="w-6 h-6 text-amber-600" />,
    <CheckCircle key="step-5" className="w-6 h-6 text-emerald-600" />,
  ];


  const roadmapSteps = content?.steps && content.steps.length > 0
    ? content.steps.map((st, index) => ({
        step: st.step || `0${index + 1}`,
        days: st.days || `Giai đoạn ${index + 1}`,
        title: st.title,
        desc: st.desc || st.description || '',
        output: st.output || 'Đầu ra nghiệm thu thực tế',
        icon: stepIcons[index % stepIcons.length],
      }))
    : defaultRoadmapSteps;

  return (
    <section className="py-16 lg:py-24 bg-[#f6f9fc] border-y border-slate-200/80 relative overflow-hidden" id="loi-ich">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-blue-100/40 via-cyan-100/30 to-blue-100/40 blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        {/* Section Header */}
        <div className="mb-10 lg:mb-14">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3.5 py-1 rounded-full bg-[#dce9ff] text-[#006398] text-xs uppercase font-bold border border-[#006398]/15 inline-block">
              {badge}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
              {activeStyle === 'commits-b' ? 'Lộ Trình Thực Thi Lượn Sóng 4 Bước (Wavy Roadmap)' : title}
            </h2>
            <p className="text-sm sm:text-base text-[#45464d] leading-relaxed">
              {activeStyle === 'commits-b'
                ? 'Mọi giai đoạn đều có mốc nghiệm thu rõ ràng, đảm bảo đúng tiến độ và cam kết bàn giao 100%.'
                : subtitle}
            </p>
          </div>
        </div>

        {/* STYLE A: 4 Columns Parallel Cards */}
        {activeStyle === 'commits-a' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((adv, idx) => (
              <motion.div
                key={adv.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="h-full"
              >
                <SpotlightCard
                  spotlightColor="rgba(91, 184, 254, 0.15)"
                  className="h-full p-6 rounded-2xl bg-white shadow-sm border border-[#dce9ff]/80 space-y-4 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#006398]/10 text-[#006398] flex items-center justify-center group-hover:bg-[#006398] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      {iconMap[adv.icon] || <CheckCircle2 className="w-6 h-6" />}
                    </div>
                    <h3 className="text-base font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors leading-snug">
                      {adv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                  <div className="pt-2 text-[11px] font-bold text-[#006398] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Cam kết chuẩn hợp đồng</span>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* STYLE B: Wavy Roadmap 4 Steps 🌊 */}
        {activeStyle === 'commits-b' && (
          <div className="relative py-4 sm:py-8">
            {/* Desktop Decorative Wavy SVG Path */}
            <div className="hidden lg:block absolute top-[48%] left-10 right-10 -translate-y-1/2 pointer-events-none z-0">
              <svg className="w-full h-24 overflow-visible" fill="none">
                <path
                  d="M 40 40 Q 280 -10 520 40 T 1000 40"
                  stroke="#006398"
                  strokeWidth="2.5"
                  strokeDasharray="8 8"
                  strokeOpacity="0.35"
                />
              </svg>
            </div>

            {/* Mobile / Tablet vertical connecting line */}
            <div className="lg:hidden absolute top-8 bottom-8 left-7 w-0.5 bg-gradient-to-b from-[#006398] via-[#5bb8fe] to-emerald-500 opacity-30 pointer-events-none" />

            {/* Dynamic Steps Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 ${roadmapSteps.length >= 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-5 sm:gap-6 relative z-10`}>
              {roadmapSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`h-full ${
                    index % 2 === 1 ? 'lg:translate-y-4' : 'lg:-translate-y-2'
                  }`}
                >
                  <SpotlightCard
                    spotlightColor="rgba(91, 184, 254, 0.15)"
                    className="h-full p-5 sm:p-6 rounded-3xl bg-white shadow-md border border-slate-200/80 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                  >
                    {/* Top Step Number Badge & Timeline Pill */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                          {item.icon}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#006398]/10 text-[#006398] font-mono text-[11px] font-extrabold flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.days}
                          </span>
                          <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-[#006398] transition-colors">
                            {item.step}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#45464d] mt-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Output Deliverable Banner */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] sm:text-xs font-semibold text-[#006398] flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                        <span className="truncate">{item.output}</span>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>

            {/* Bottom Commitment Summary Bar */}
            <div className="mt-10 sm:mt-12 p-4 sm:p-6 rounded-2xl bg-white border border-[#dce9ff] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0b1c30]">
                    Cam kết hợp đồng minh bạch 100% · Bồi hoàn nếu chậm tiến độ
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#45464d]">
                    Mỗi bước nghiệm thu đều có tài khoản test trực tiếp trước khi thanh toán giai đoạn tiếp theo.
                  </p>
                </div>
              </div>

              <a
                href="#nhan-bao-gia"
                className="px-5 py-2.5 rounded-xl bg-[#006398] text-white text-xs sm:text-sm font-bold hover:bg-[#004f7a] transition-all shadow-md shrink-0 whitespace-nowrap"
              >
                Nhận Lộ Trình Chi Tiết
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
