'use client';

import React from 'react';
import { siteConfig } from '../../config/site.config';
import { useSettings } from '../../hooks/useSettings';
import { ContactSectionContent } from '../../types/landingConfig.types';
import { ContactCenteredVariant, ContactSplitVariant } from './contact';

export interface ContactSectionProps {
  content?: ContactSectionContent;
  displayStyle?: string;
  initialBudgetTier?: string;
  initialWebsiteType?: string;
  initialNotes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  content,
  displayStyle,
  initialBudgetTier,
  initialWebsiteType,
  initialNotes,
}) => {
  const { data: settings } = useSettings();
  const hotline = settings?.hotline || siteConfig.hotline;
  const hotlineRaw = settings?.hotlineRaw || siteConfig.hotlineRaw;
  const zaloPhone = settings?.zaloPhone || siteConfig.zaloPhone;
  const zaloUrl = settings?.zaloUrl || siteConfig.zaloUrl;
  const email = settings?.contactEmail || siteConfig.email;
  const address = settings?.officeAddress || siteConfig.address;
  const badge = content?.badge || 'Tư Vấn Miễn Phí';
  const title = content?.title || 'Đăng Ký Nhận Tư Vấn & Phác Thảo Giao Diện';
  const subtitle = content?.subtitle || 'Điền thông tin bên dưới hoặc liên hệ trực tiếp qua Zalo/Hotline, chúng tôi sẽ phản hồi và tư vấn chu đáo trong 15 phút.';

  const isCentered = displayStyle === 'centered';

  const variantProps = {
    badge,
    title,
    subtitle,
    hotline,
    hotlineRaw,
    zaloPhone,
    zaloUrl,
    email,
    address,
    commitments: content?.commitments,
    initialBudgetTier,
    initialWebsiteType,
    initialNotes,
  };

  return (
    <section className="py-16 lg:py-24 bg-[#fafbfc] border-t border-slate-200/70 relative" id="nhan-bao-gia">
      <div id="contact-lead" className="absolute -top-24 left-0" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        {isCentered ? (
          <ContactCenteredVariant {...variantProps} />
        ) : (
          <ContactSplitVariant {...variantProps} />
        )}
      </div>
    </section>
  );
};
