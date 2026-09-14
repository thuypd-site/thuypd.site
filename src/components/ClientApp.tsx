'use client';

import React, { useState } from 'react';
import { Header, Footer, FloatingWidget } from '@/src/components/layout';
import { LandingPageRenderer } from '@/src/components/landing/LandingPageRenderer';
import { ThemeItem } from '@/src/types';

import { useLandingConfig } from '@/src/features/landing/context/LandingConfigContext';

export function ClientApp() {
  const { config } = useLandingConfig();
  const isHeaderVisible = config?.header?.enabled !== false && config?.header?.isVisible !== false;
  const isFooterVisible = config?.footer?.enabled !== false && config?.footer?.isVisible !== false;

  const [selectedBudgetTier, setSelectedBudgetTier] = useState<string>('Gói Chuyên Nghiệp (7.990.000đ)');
  const [selectedWebsiteType, setSelectedWebsiteType] = useState<string>('Website Bán Hàng / Cửa Hàng Trực Tuyến');
  const [selectedNotes, setSelectedNotes] = useState<string>('');

  const handleSelectPlan = (planName: string, budgetTier: string) => {
    setSelectedBudgetTier(budgetTier);
    setSelectedNotes(`Khách hàng quan tâm đăng ký ${planName}.`);
  };

  const handleSelectTheme = (theme: ThemeItem) => {
    setSelectedWebsiteType(
      theme.category === 'ecommerce'
        ? 'Website Bán Hàng / Cửa Hàng Trực Tuyến'
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

  const handleOpenQuoteModal = () => {
    const target = document.querySelector('#nhan-bao-gia') || document.querySelector('#contact-lead');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0b1c30] flex flex-col font-sans selection:bg-[#006398]/20 selection:text-[#006398]">
      {/* Navigation Bar */}
      {isHeaderVisible && <Header onOpenQuoteModal={handleOpenQuoteModal} />}

      {/* Main Dynamic Landing Sections */}
      <main className={`w-full ${isHeaderVisible ? 'pt-20' : 'pt-0'} pb-16 sm:pb-0`}>
        <LandingPageRenderer
          onSelectTheme={handleSelectTheme}
          onSelectPlan={handleSelectPlan}
          selectedBudgetTier={selectedBudgetTier}
          selectedWebsiteType={selectedWebsiteType}
          selectedNotes={selectedNotes}
        />
      </main>

      {/* Footer */}
      {isFooterVisible && <Footer />}

      {/* Floating Quick Action Contacts */}
      <FloatingWidget />
    </div>
  );
}
