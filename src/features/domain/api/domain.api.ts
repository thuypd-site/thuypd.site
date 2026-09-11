import { DomainCheckResult } from '../../../types/domain.types';

export const checkDomainApi = async (domain: string, tld: string): Promise<DomainCheckResult> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const fullDomain = `${domain.toLowerCase()}${tld}`;
  const priceMap: Record<string, string> = {
    '.com': '299.000 ₫/năm',
    '.vn': '650.000 ₫/năm',
    '.net': '320.000 ₫/năm',
    '.vn.vn': '550.000 ₫/năm',
  };

  const isUnavailable = ['google', 'facebook', 'apple', 'amazon', 'shopee', 'lazada', 'microsoft'].includes(
    domain.toLowerCase()
  );

  if (isUnavailable) {
    return {
      domain,
      tld,
      fullDomain,
      isAvailable: false,
      pricePerYear: priceMap[tld] || '299.000 ₫/năm',
      message: `Tên miền ${fullDomain} đã được đăng ký. Bạn hãy thử đuôi tên miền khác hoặc tên thương hiệu phụ.`,
    };
  }

  return {
    domain,
    tld,
    fullDomain,
    isAvailable: true,
    pricePerYear: priceMap[tld] || '299.000 ₫/năm',
    message: `Xin chúc mừng! Tên miền ${fullDomain} đang sẵn sàng để đăng ký ngay!`,
  };
};
