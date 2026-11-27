'use client';

import React from 'react';
import { LogoBarContent } from '../../types/landingConfig.types';
import { CountUp } from '../common/CountUp';

export interface LogoBarProps {
  content: LogoBarContent;
}

export const LogoBar: React.FC<LogoBarProps> = ({ content }) => {
  const title = content.title || 'Con Số Minh Chứng Năng Lực Triển Khai';
  const items =
    content.items && content.items.length > 0
      ? content.items
      : [
          { number: '150+', label: 'Website đã hoàn thiện' },
          { number: '99.8%', label: 'Khách hàng hài lòng' },
          { number: '3 - 5', label: 'Ngày bàn giao trung bình', suffix: 'ngày' },
          { number: '24/7', label: 'Hỗ trợ kỹ thuật trực tiếp' },
        ];

  return (
    <section className="bg-[#f6f9fc] border-b border-[#e3e8ee] py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748d]">
            {title}
          </p>
          {content.statsText && (
            <p className="text-xs text-[#64748d]">{content.statsText}</p>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e3e8ee] rounded-xl px-5 py-4"
            >
              <div className="text-2xl sm:text-3xl font-bold text-[#0d253d] tabular-nums tracking-tight">
                {item.number.includes('-') || item.number.includes('/') ? (
                  <span>
                    {item.number}
                    {item.suffix ? ` ${item.suffix}` : ''}
                  </span>
                ) : (
                  <CountUp value={item.number} />
                )}
              </div>
              <div className="text-xs sm:text-sm text-[#64748d] mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
