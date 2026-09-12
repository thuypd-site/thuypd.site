'use client';

import React, { useEffect, useState } from 'react';
import { Providers } from '../providers';
import { Header, Footer } from '@/src/components/layout';
import { LandingPageRenderer } from '@/src/components/landing/LandingPageRenderer';
import { ThemeItem } from '@/src/types';
import { Sparkles, Eye } from 'lucide-react';

function LivePreviewApp() {
  const [selectedBudgetTier, setSelectedBudgetTier] = useState<string>('Gói Professional (7.990.000đ)');
  const [selectedWebsiteType, setSelectedWebsiteType] = useState<string>('Website Bán Hàng / Shop TMĐT');
  const [selectedNotes, setSelectedNotes] = useState<string>('');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const handleSelectPlan = (planName: string, budgetTier: string) => {
    setSelectedBudgetTier(budgetTier);
    setSelectedNotes(`Khách hàng quan tâm đăng ký ${planName}.`);
  };

  const handleSelectTheme = (theme: ThemeItem) => {
    setSelectedWebsiteType(
      theme.category === 'ecommerce'
        ? 'Website Bán Hàng / Shop TMĐT'
        : theme.category === 'corporate'
        ? 'Website Giới Thiệu Doanh Nghiệp'
        : theme.category === 'realestate'
        ? 'Website Bất Động Sản'
        : theme.category === 'spa'
        ? 'Website Dịch Vụ / Spa / Thẩm Mỹ'
        : 'Website Thiết Kế Theo Yêu Cầu Riêng'
    );
    setSelectedNotes(`Khách hàng quan tâm mẫu thiết kế: ${theme.title} (${theme.formattedPrice}).`);
  };

  // Section click detection for Admin Bidirectional selection
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
      className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#006398]/20 selection:text-[#006398] relative"
    >
      {/* Subtle preview indicator banner */}
      <div className="sticky top-0 z-50 bg-[#006398] text-white py-1 px-3 text-[11px] font-semibold flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-1.5 mx-auto">
          <Eye className="w-3.5 h-3.5 animate-pulse text-sky-200" />
          <span>Live Preview Mode — Nhấp vào bất kỳ khối nào để chỉnh sửa trực tiếp trên Admin</span>
        </div>
      </div>

      {/* Main Real Landing Header */}
      <Header />

      {/* Main Dynamic Landing Sections */}
      <main className="w-full pt-16 pb-12">
        <LandingPageRenderer
          onSelectTheme={handleSelectTheme}
          onSelectPlan={handleSelectPlan}
          selectedBudgetTier={selectedBudgetTier}
          selectedWebsiteType={selectedWebsiteType}
          selectedNotes={selectedNotes}
        />
      </main>

      {/* Main Real Footer */}
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
