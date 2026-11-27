'use client';

import React from 'react';
import { AdvantagesSectionContent } from '../../types/landingConfig.types';

export interface AdvantagesSectionProps {
  content: AdvantagesSectionContent;
}

export const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({ content }) => {
  const steps =
    content.steps && content.steps.length > 0
      ? content.steps
      : [
          {
            step: '01',
            days: 'Ngày 1 - 2',
            title: 'Tiếp Nhận & Lên Khung',
            desc: 'Trao đổi mục tiêu kinh doanh, thống nhất cấu trúc nội dung và phương án triển khai.',
          },
          {
            step: '02',
            days: 'Ngày 3 - 5',
            title: 'Thiết Kế Giao Diện',
            desc: 'Hoàn thiện bản thiết kế theo đúng màu sắc thương hiệu để bạn duyệt trước.',
          },
          {
            step: '03',
            days: 'Ngày 6 - 8',
            title: 'Lập Trình & Tối Ưu',
            desc: 'Xây dựng hệ thống chuẩn mobile, tối ưu tốc độ tải trang và cấu hình SEO.',
          },
          {
            step: '04',
            days: 'Ngày 9 - 10',
            title: 'Nghiệm Thu & Bảo Hành',
            desc: 'Bàn giao toàn bộ tài khoản quản trị, hướng dẫn 1-1 và kích hoạt bảo hành.',
          },
        ];

  return (
    <section
      id="quy-trinh"
      className="bg-[#f6f9fc] py-16 sm:py-20 border-b border-[#e3e8ee] scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          {content.badge && (
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#533afd] mb-2">
              {content.badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0d253d] tracking-tight">
            {content.title || '4 Bước Triển Khai Rõ Ràng Từ Ý Tưởng Đến Bàn Giao'}
          </h2>
          {content.subtitle && (
            <p className="text-sm sm:text-base text-[#64748d] mt-3 leading-relaxed">
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((st, idx) => (
            <div
              key={st.step || idx}
              className="bg-white border border-[#e3e8ee] rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#eef2ff] text-[#4434d4] text-sm font-bold tabular-nums">
                    {st.step || `0${idx + 1}`}
                  </span>
                  {st.days && (
                    <span className="text-xs font-medium text-[#64748d] tabular-nums">
                      {st.days}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-[#0d253d]">{st.title}</h3>
                <p className="text-xs sm:text-sm text-[#64748d] mt-2 leading-relaxed">
                  {st.desc || st.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
