'use client';

import React from 'react';
import { FileSearch, Palette, Code, CheckCircle, Sparkles } from 'lucide-react';
import { mockAdvantages } from '../../services/api';
import { AdvantagesSectionContent } from '../../types/landingConfig.types';
import { AdvantagesGridVariant, AdvantagesRoadmapVariant } from './advantages';

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
      desc: 'Hiện thực hóa giao diện, tối ưu chuẩn tìm kiếm Google, đảm bảo tốc độ mở trang tức thì dưới 1 giây và chạy thử nghiệm kỹ lưỡng.',
      output: 'Đầu ra: Website chạy thử thực tế hoàn chỉnh',
      icon: <Code className="w-6 h-6 text-blue-600" />,
    },
    {
      step: '04',
      days: 'Ngày 9 - 10',
      title: 'Bàn Giao & Hướng Dẫn Tận Tình',
      desc: 'Bàn giao toàn bộ quyền quản trị website và dữ liệu, gửi video hướng dẫn sử dụng 1-1 và kích hoạt chế độ hỗ trợ trọn đời.',
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
