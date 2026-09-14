'use client';

import React from 'react';
import { LogoBarContent } from '../../types/landingConfig.types';
import { LogoBarCompactVariant, LogoBarStandardVariant } from './brand-logo';

export interface LogoBarProps {
  content?: LogoBarContent;
  displayStyle?: string;
}

export const LogoBar: React.FC<LogoBarProps> = ({ content, displayStyle = 'standard' }) => {
  const title = content?.title || 'Thương Hiệu & Khách Hàng Tin Tưởng Đồng Hành';
  const statsText = content?.statsText;

  const defaultStats = [
    { number: '150+', label: 'Dự án đã bàn giao', suffix: 'đúng tiến độ' },
    { number: '99.2%', label: 'Khách hàng hài lòng', suffix: 'đồng hành lâu dài' },
    { number: '< 0.8s', label: 'Tốc độ mở trang', suffix: 'tối ưu tức thì' },
    { number: '24/7', label: 'Hỗ trợ kỹ thuật', suffix: 'đồng hành 1-1' },
  ];

  const items = content?.items && content.items.length > 0 ? content.items : defaultStats;

  const defaultBrands = [
    { name: 'VICI', style: 'font-black tracking-widest' },
    { name: 'DENTIA CLINIC', style: 'font-bold tracking-tight' },
    { name: 'HONDA', style: 'font-black tracking-wider' },
    { name: 'BẢO HOÀNG', style: 'font-serif font-bold tracking-tight' },
    { name: 'MAROSE', style: 'font-mono font-bold tracking-tighter' },
    { name: 'LOGIFLOW', style: 'font-black tracking-normal' },
  ];

  const brands = (content as any)?.brands && (content as any).brands.length > 0 ? (content as any).brands : defaultBrands;

  const isCompact = displayStyle === 'compact';

  const variantProps = {
    title,
    statsText,
    items,
    brands,
  };

  if (isCompact) {
    return <LogoBarCompactVariant {...variantProps} />;
  }

  return <LogoBarStandardVariant {...variantProps} />;
};
