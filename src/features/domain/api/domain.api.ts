import { DomainCheckResult } from '../../../types/domain.types';

export const checkDomainApi = async (domain: string, tld: string): Promise<DomainCheckResult> => {
  const cleanDomain = domain.trim().toLowerCase();
  const cleanTld = tld.trim().toLowerCase();

  const res = await fetch(
    `/api/client/domain/check?domain=${encodeURIComponent(cleanDomain)}&tld=${encodeURIComponent(cleanTld)}`,
    {
      method: 'GET',
      headers: { Accept: 'application/json' },
    }
  );

  const responseData = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(responseData?.message || 'Không thể kiểm tra tên miền lúc này. Vui lòng thử lại.');
  }

  const resultData = responseData.data || responseData;
  return {
    domain: resultData.domain || cleanDomain,
    tld: resultData.tld || cleanTld,
    fullDomain: resultData.fullDomain || `${cleanDomain}${cleanTld}`,
    isAvailable: Boolean(resultData.isAvailable),
    pricePerYear: resultData.pricePerYear || '299.000 ₫/năm',
    message:
      resultData.message ||
      (resultData.isAvailable
        ? `Tên miền ${cleanDomain}${cleanTld} đang khả dụng để đăng ký.`
        : `Tên miền ${cleanDomain}${cleanTld} đã được đăng ký.`),
    details: resultData.details,
    alternatives: Array.isArray(resultData.alternatives) ? resultData.alternatives : [],
  };
};
