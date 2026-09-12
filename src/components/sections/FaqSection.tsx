'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { FaqSectionContent } from '../../types/landingConfig.types';

interface FaqSectionProps {
  content?: FaqSectionContent;
  displayStyle?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ content }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const badge = content?.badge || 'Giải Đáp Thắc Mắc';
  const title = content?.title || 'Những Câu Hỏi Thường Gặp Khi Làm Website';
  const subtitle = content?.subtitle || 'Các giải đáp rõ ràng cho những băn khoăn phổ biến nhất trước khi bạn quyết định làm web.';
  const items = content?.items || [
    {
      question: 'Thời gian hoàn thiện một website là bao lâu?',
      answer: 'Tùy theo nhu cầu: Gói cơ bản từ 2 - 3 ngày, gói chuyên nghiệp từ 5 - 7 ngày, và gói may đo theo yêu cầu từ 2 - 3 tuần. Chúng tôi luôn cam kết bàn giao đúng tiến độ cam kết.',
    },
    {
      question: 'Chi phí trên đã bao gồm tên miền và máy chủ (hosting) chưa?',
      answer: 'Tất cả các gói tại THUYPD.SITE đều đã bao gồm trọn gói năm đầu tiên cho tên miền quốc tế (.com / .net) và hosting Cloud NVMe tốc độ cao. Bạn không cần chi thêm khoản nào khác để chạy web.',
    },
    {
      question: 'Tôi không rành về máy tính thì có tự quản lý website được không?',
      answer: 'Hoàn toàn được! Giao diện quản trị được làm bằng tiếng Việt rất trực quan, kèm video hướng dẫn từng bước. Bạn có thể tự thay đổi hình ảnh, giá bán, bài viết ngay trên điện thoại dễ như dùng mạng xã hội.',
    },
    {
      question: 'Sau khi bàn giao, website gặp sự cố thì ai hỗ trợ?',
      answer: 'Chúng tôi bảo hành kỹ thuật và đồng hành trọn đời cùng bạn. Bất cứ khi nào cần trợ giúp, bạn chỉ cần nhắn Zalo hoặc gọi hotline là kỹ thuật sẽ kiểm tra xử lý ngay.',
    },
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 lg:py-24 bg-white" id="faq">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 w-full space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-4 py-1 rounded-full bg-[#dce9ff] text-[#006398] text-xs uppercase font-bold border border-[#006398]/15 inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#45464d] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#eff4ff]/60 border-[#006398]/30 shadow-sm'
                    : 'bg-white border-[#dce9ff]/70 hover:border-[#006398]/30 hover:bg-[#eff4ff]/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between text-left gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#0b1c30] flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#006398]/10 text-[#006398] text-xs flex items-center justify-center font-bold shrink-0">
                      {index + 1}
                    </span>
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#006398] text-white' : 'bg-[#dce9ff] text-[#006398]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#45464d] leading-relaxed border-t border-[#dce9ff]/40">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
