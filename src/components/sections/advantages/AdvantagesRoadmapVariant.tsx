'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Calendar, Sparkles } from 'lucide-react';
import { SpotlightCard } from '../../common';

export interface RoadmapStepItem {
  step: string;
  days: string;
  title: string;
  desc: string;
  output: string;
  icon: React.ReactNode;
}

export interface AdvantagesRoadmapVariantProps {
  roadmapSteps: RoadmapStepItem[];
}

export const AdvantagesRoadmapVariant: React.FC<AdvantagesRoadmapVariantProps> = ({
  roadmapSteps,
}) => {
  return (
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
      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${
          roadmapSteps.length >= 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
        } gap-5 sm:gap-6 relative z-10`}
      >
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
          Tư Vấn Quy Trình Chi Tiết
        </a>
      </div>
    </div>
  );
};
