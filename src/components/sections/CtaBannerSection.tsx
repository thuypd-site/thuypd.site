'use client';

import React from 'react';
import { CtaSectionContent } from '../../types/landingConfig.types';
import { siteConfig } from '../../config/site.config';
import { useSettings } from '../../hooks/useSettings';
import { CtaBoxedVariant, CtaMinimalVariant } from './cta';

export interface CtaBannerSectionProps {
  content?: CtaSectionContent;
  displayStyle?: string;
}

export const CtaBannerSection: React.FC<CtaBannerSectionProps> = ({
  content,
  displayStyle = 'banner_boxed',
}) => {
  const { data: settings } = useSettings();
  const hotline = settings?.hotline || siteConfig.hotline;
  const hotlineRaw = settings?.hotlineRaw || siteConfig.hotlineRaw;

  const isMinimal = displayStyle === 'minimal';
  const title = content?.title || 'Sẵn Sàng Xây Dựng Website Đẹp Mắt & Bứt Phá Doanh Thu?';
  const subtitle = content?.subtitle || 'Liên hệ ngay hôm nay để nhận tư vấn giải pháp tối ưu cho ngành nghề của bạn và nhận báo giá trọn gói minh bạch.';
  const buttonText = content?.buttonText || 'Nhận Báo Giá & Tư Vấn Miễn Phí';
  const buttonLink = content?.buttonLink || '#nhan-bao-gia';
  const hotlineText = content?.hotlineText || `Hoặc gọi Hotline trực tiếp: ${hotline}`;

  const variantProps = {
    title,
    subtitle,
    buttonText,
    buttonLink,
    hotlineText,
    hotlineRaw,
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        {isMinimal ? (
          <CtaMinimalVariant {...variantProps} />
        ) : (
          <CtaBoxedVariant {...variantProps} />
        )}
      </div>
    </section>
  );
};
