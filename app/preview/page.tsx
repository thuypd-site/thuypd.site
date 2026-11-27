'use client';

import React, { useState } from 'react';
import { Providers } from '../providers';
import { Header, Footer } from '@/src/components/layout';
import { LandingPageRenderer } from '@/src/features/landing/components/LandingPageRenderer';
import { ThemeItem } from '@/src/types';
import { Eye } from 'lucide-react';

function LivePreviewApp() {
  const [selectedBudgetTier, setSelectedBudgetTier] = useState<string>('');
  const [selectedWebsiteType, setSelectedWebsiteType] = useState<string>('Website Doanh Nghiệp');
  const [selectedNotes, setSelectedNotes] = useState<string>('');

  const handleSelectPlan = (planName: string, budgetTier: string) => {
    setSelectedBudgetTier(budgetTier);
    setSelectedNotes(`Quan tâm đăng ký ${planName}.`);
  };

  const handleSelectTheme = (theme: ThemeItem) => {
    setSelectedWebsiteType(
      theme.category === 'ecommerce'
        ? 'Website Bán Hàng & Thương Mại Điện Tử'
        : theme.category === 'corporate'
          ? 'Website Giới Thiệu Doanh Nghiệp'
          : 'Website Thiết Kế Theo Yêu Cầu Riêng'
    );
    setSelectedNotes(`Quan tâm mẫu thiết kế: ${theme.title} (${theme.formattedPrice}).`);
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;
    const sectionEl = target?.closest('[data-section-id]') as HTMLElement | null;
    if (sectionEl) {
      const sectionKey = sectionEl.getAttribute('data-section-id');
      if (sectionKey && window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'THUYPD_SECTION_CLICKED', sectionKey }, '*');
      }
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className="min-h-screen bg-white text-[#0d253d] flex flex-col font-sans relative"
    >
      <div className="sticky top-0 z-50 bg-[#0d253d] text-white py-1.5 px-3 text-xs font-medium flex items-center justify-center gap-2 border-b border-white/10">
        <Eye className="w-3.5 h-3.5 text-indigo-300" />
        <span>Chế độ Xem Trước — Nhấp vào bất kỳ khối nào để chọn chỉnh sửa trên Admin</span>
      </div>

      <Header />

      <main className="w-full pt-16 pb-10">
        <LandingPageRenderer
          onSelectTheme={handleSelectTheme}
          onSelectPlan={handleSelectPlan}
          selectedBudgetTier={selectedBudgetTier}
          selectedWebsiteType={selectedWebsiteType}
          selectedNotes={selectedNotes}
        />
      </main>

      <Footer />
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Providers>
      <LivePreviewApp />
    </Providers>
  );
}
