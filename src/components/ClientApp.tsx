'use client';

import React, { useState } from 'react';
import { Header, Footer, FloatingWidget } from '@/src/components/layout';
import { LandingPageRenderer } from '@/src/features/landing/components/LandingPageRenderer';
import { ThemeItem } from '@/src/types';
import { useLandingConfig } from '@/src/features/landing/context/LandingConfigContext';

export function ClientApp() {
  const { config } = useLandingConfig();
  const isHeaderVisible = config?.header?.enabled !== false && config?.header?.isVisible !== false;
  const isFooterVisible = config?.footer?.enabled !== false && config?.footer?.isVisible !== false;

  const [selectedBudgetTier, setSelectedBudgetTier] = useState<string>('');
  const [selectedWebsiteType, setSelectedWebsiteType] = useState<string>('Website Doanh Nghiệp');
  const [selectedNotes, setSelectedNotes] = useState<string>('');

  const handleSelectPlan = (planName: string, budgetTier: string) => {
    setSelectedBudgetTier(budgetTier);
    setSelectedNotes(`Quan tâm đăng ký ${planName}.`);
  };

  const handleSelectTheme = (theme: ThemeItem) => {
    const categoryToType: Record<string, string> = {
      ecommerce: 'Website Bán Hàng & Thương Mại Điện Tử',
      corporate: 'Website Giới Thiệu Doanh Nghiệp',
      realestate: 'Website Bất Động Sản',
      spa: 'Website Dịch Vụ / Spa / Thẩm Mỹ',
      furniture: 'Website Nội Thất & Kiến Trúc',
      portfolio: 'Website Portfolio / Studio',
    };
    setSelectedWebsiteType(categoryToType[theme.category] || 'Website Thiết Kế Theo Yêu Cầu Riêng');
    setSelectedNotes(`Quan tâm mẫu giao diện: ${theme.title} (${theme.formattedPrice}).`);
  };

  const handleOpenQuoteModal = () => {
    const target = document.querySelector('#nhan-bao-gia');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0d253d] flex flex-col font-sans">
      {isHeaderVisible && <Header onOpenQuoteModal={handleOpenQuoteModal} />}

      <main className={`w-full ${isHeaderVisible ? 'pt-16' : 'pt-0'} pb-16 sm:pb-0`}>
        <LandingPageRenderer
          onSelectTheme={handleSelectTheme}
          onSelectPlan={handleSelectPlan}
          selectedBudgetTier={selectedBudgetTier}
          selectedWebsiteType={selectedWebsiteType}
          selectedNotes={selectedNotes}
        />
      </main>

      {isFooterVisible && <Footer />}
      <FloatingWidget />
    </div>
  );
}
