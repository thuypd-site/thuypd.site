'use client';

import React, { useState } from 'react';
import { useDomainCheck } from '../../hooks/useDomainCheck';
import { DomainSectionContent } from '../../types/landingConfig.types';
import { DomainMinimalVariant, DomainStandardVariant } from './domain';

export interface DomainCheckerSectionProps {
  content?: DomainSectionContent;
  displayStyle?: string;
}

export const DomainCheckerSection: React.FC<DomainCheckerSectionProps> = ({
  content,
  displayStyle = 'standard',
}) => {
  const [domainName, setDomainName] = useState('');
  const [tld, setTld] = useState('.com');
  const [validationError, setValidationError] = useState('');

  const { mutate: checkDomain, data: result, isPending } = useDomainCheck();

  const isMinimal = displayStyle === 'minimal';
  const badge = content?.badge || 'Tra Cứu Nhanh';
  const title = content?.title || 'Kiểm Tra Tên Miền Cho Thương Hiệu Của Bạn';
  const subtitle =
    content?.subtitle ||
    'Tên miền là địa chỉ nhận diện thương hiệu của bạn trên internet. Hãy kiểm tra và giữ ngay tên miền đẹp trước khi người khác đăng ký mất!';

  const knownTlds = ['.com.vn', '.net.vn', '.org.vn', '.edu.vn', '.vn', '.com', '.net', '.org', '.site', '.xyz', '.info', '.biz'];

  const handleSearch = (e?: React.FormEvent, overrideTld?: string) => {
    if (e) e.preventDefault();

    let input = domainName.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
    let selectedTld = overrideTld || tld;

    // Tự động nhận diện nếu user gõ kèm đuôi tên miền trong ô input
    for (const ext of knownTlds) {
      if (input.endsWith(ext)) {
        selectedTld = ext;
        input = input.slice(0, -ext.length);
        setTld(ext);
        break;
      }
    }

    const cleanDomain = input.replace(/[^a-z0-9-]/g, '');

    if (!cleanDomain || cleanDomain.length < 2) {
      setValidationError('Vui lòng nhập tên miền tối thiểu 2 ký tự hợp lệ.');
      return;
    }

    setValidationError('');
    checkDomain({ domain: cleanDomain, tld: selectedTld });
  };

  const handleSelectAlternative = (altTld: string) => {
    setTld(altTld);
    handleSearch(undefined, altTld);
  };

  const handleRegisterDomain = (targetDomain: string, targetPrice?: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('select-domain', {
          detail: { domain: targetDomain, price: targetPrice },
        })
      );
      const contactSection = document.getElementById('nhan-bao-gia');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const pricing = content?.pricing;

  const variantProps = {
    badge,
    title,
    subtitle,
    pricing,
    domainName,
    setDomainName,
    tld,
    setTld,
    handleSearch,
    handleSelectAlternative,
    handleRegisterDomain,
    isPending,
    validationError,
    result,
  };

  return (
    <section className="py-16 sm:py-20 bg-white" id="tra-cuu-ten-mien">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        {isMinimal ? (
          <DomainMinimalVariant {...variantProps} />
        ) : (
          <DomainStandardVariant {...variantProps} />
        )}
      </div>
    </section>
  );
};
