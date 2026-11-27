'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FaqSectionContent } from '../../types/landingConfig.types';

export interface FaqSectionProps {
  content: FaqSectionContent;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ content }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = content.items || [];

  if (items.length === 0) return null;

  return (
    <section
      id="faq"
      className="bg-white py-16 sm:py-20 border-b border-[#e3e8ee] scroll-mt-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          {content.badge && (
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#533afd] mb-2">
              {content.badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0d253d] tracking-tight">
            {content.title || 'Giải Đáp Nhanh Trước Khi Bắt Đầu'}
          </h2>
          {content.subtitle && (
            <p className="text-sm sm:text-base text-[#64748d] mt-3 leading-relaxed">
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="divide-y divide-[#e3e8ee] border border-[#e3e8ee] rounded-2xl bg-white overflow-hidden">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#f6f9fc] transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold text-[#0d253d]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#64748d] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#533afd]' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-[#273951] leading-relaxed">
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
