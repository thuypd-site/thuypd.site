'use client';

import React from 'react';
import { mockAdvantages } from '../../services/api';
import { AdvantagesSectionContent } from '../../types/landingConfig.types';
import { AdvantagesGridVariant, AdvantagesRoadmapVariant } from './advantages';
import {
  IconConsult,
  IconPrototype,
  IconDevelopment,
  IconHandover,
  IconSparkle,
} from '../icons';

export interface AdvantagesSectionProps {
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
  const badge = content?.badge || 'Quy Trình Làm Việc';
  const title = content?.title || 'Quy Trình Triển Khai 4 Bước Rõ Ràng & Bàn Giao Đúng Hẹn';
  const subtitle = content?.subtitle || 'Mỗi giai đoạn đều có kết quả cụ thể để bạn nghiệm thu trực tiếp trước khi chuyển sang bước tiếp theo.';

  const defaultRoadmapSteps = [
    {
      step: '01',
      days: 'Ngày 1 - 2',
      title: 'Lắng Nghe & Lên Khung Web',
      desc: 'Trao đổi kỹ nhu cầu thực tế, tư vấn cấu trúc trang hợp lý, thống nhất màu sắc và lên bản phác thảo khung mẫu.',
      output: 'Đầu ra: Bản phác thảo khung trang rõ ràng',
      icon: <IconConsult size={24} className="text-slate-700 group-hover:text-[#006398] transition-colors" />,
    },
    {
      step: '02',
      days: 'Ngày 3 - 5',
      title: 'Thiết Kế Giao Diện Chi Tiết',
      desc: 'Lên thiết kế đẹp mắt theo nhận diện thương hiệu của bạn. Bạn được xem và góp ý chỉnh sửa cho đến khi ưng ý.',
      output: 'Đầu ra: Bản thiết kế được bạn duyệt 100%',
      icon: <IconPrototype size={24} className="text-slate-700 group-hover:text-[#006398] transition-colors" />,
    },
    {
      step: '03',
      days: 'Ngày 6 - 8',
      title: 'Xây Dựng & Tối Ưu Hệ Thống',
      desc: 'Hiện thực hóa giao diện, tối ưu chuẩn tìm kiếm Google, đảm bảo tốc độ mở trang tức thì dưới 1 giây và chạy thử nghiệm kỹ lưỡng.',
      output: 'Đầu ra: Website chạy thử thực tế hoàn chỉnh',
      icon: <IconDevelopment size={24} className="text-slate-700 group-hover:text-[#006398] transition-colors" />,
    },
    {
      step: '04',
      days: 'Ngày 9 - 10',
      title: 'Bàn Giao & Hướng Dẫn Tận Tình',
      desc: 'Bàn giao toàn bộ quyền quản trị website và dữ liệu, gửi video hướng dẫn sử dụng 1-1 và kích hoạt chế độ hỗ trợ trọn đời.',
      output: 'Đầu ra: Toàn quyền sở hữu & Bắt đầu kinh doanh',
      icon: <IconHandover size={24} className="text-slate-700 group-hover:text-[#006398] transition-colors" />,
    },
  ];

  const stepIcons = [
    <IconConsult key="step-1" size={24} className="text-slate-700 group-hover:text-[#006398] transition-colors" />,
    <IconPrototype key="step-2" size={24} className="text-slate-700 group-hover:text-[#006398] transition-colors" />,
    <IconDevelopment key="step-3" size={24} className="text-slate-700 group-hover:text-[#006398] transition-colors" />,
    <IconHandover key="step-4" size={24} className="text-slate-700 group-hover:text-[#006398] transition-colors" />,
  ];

  const roadmapSteps = content?.steps && content.steps.length > 0
    ? content.steps.map((st, idx) => ({
        step: st.step || `0${idx + 1}`,
        days: st.days || `Giai đoạn ${idx + 1}`,
        title: st.title || `Bước ${idx + 1}`,
        desc: st.desc || st.description || '',
        output: st.output || 'Nghiệm thu trực tiếp',
        icon: stepIcons[idx % stepIcons.length],
      }))
    : defaultRoadmapSteps;

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#fafbfc] via-white to-[#fafbfc] border-y border-slate-200/60 relative overflow-hidden" id="loi-ich">
      {/* Subtle neutral background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-slate-200/30 blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        {/* Section Header */}
        <div className="mb-10 lg:mb-14">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs uppercase font-bold border border-slate-200/80 inline-block">
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

        {/* Style A: 4 Columns Parallel Cards */}
        {activeStyle === 'commits-a' && <AdvantagesGridVariant items={items} />}

        {/* Style B: Wavy Roadmap */}
        {activeStyle === 'commits-b' && <AdvantagesRoadmapVariant roadmapSteps={roadmapSteps} />}
      </div>
    </section>
  );
};
