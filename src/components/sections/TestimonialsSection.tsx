'use client';

import React from 'react';
import { motion } from 'motion/react';

import { Star } from 'lucide-react';
import { mockTestimonials } from '../../services/api';
import { TestimonialsSectionContent } from '../../types/landingConfig.types';

interface TestimonialsSectionProps {
  content?: TestimonialsSectionContent;
  displayStyle?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ content, displayStyle = 'cards' }) => {
  const items = content?.items && content.items.length > 0 ? content.items : mockTestimonials;
  const badge = content?.badge || 'Cảm Nhận Thực Tế';
  const title = content?.title || 'Đồng Hành Cùng Sự Tăng Trưởng Của Khách Hàng';
  const subtitle = content?.subtitle || 'Những chia sẻ chân thật từ các chủ cửa hàng và doanh nghiệp sau khi đưa website vào hoạt động thực tế.';

  const isCompact = displayStyle === 'compact';

  return (
    <section className="py-16 lg:py-24 bg-[#fafbfc] border-y border-slate-200/70" id="danh-gia">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-14">
          <span className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs uppercase font-bold border border-slate-200/80 shadow-2xs">
            {badge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30]">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Review Cards Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 ${isCompact ? 'gap-3 sm:gap-4' : 'gap-4 sm:gap-6 lg:gap-8'}`}>
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`${isCompact ? 'p-4 sm:p-5' : 'p-5 sm:p-7'} rounded-2xl bg-white shadow-sm border border-slate-200/80 flex flex-col justify-between space-y-4 sm:space-y-5 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 star-hover-group`}
            >
              <div className="space-y-3">
                {/* 5 Stars */}
                <div className="flex text-amber-500 gap-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400 star-icon transition-transform"
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>

              </div>

              {/* Author info */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img
                  src={item.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={item.author}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-[#006398]/10 group-hover:ring-[#006398] transition-all shrink-0"
                  loading="lazy"
                />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#0b1c30]">{item.author}</div>
                  <div className="text-[11px] sm:text-xs text-slate-500">
                    {item.role} · <span className="text-[#006398] font-medium">{item.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
