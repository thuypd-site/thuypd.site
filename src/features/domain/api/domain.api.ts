import { DomainCheckResult } from '../../../types/domain.types';

export const checkDomainApi = async (domain: string, tld: string): Promise<DomainCheckResult> => {
  const cleanDomain = domain.trim().toLowerCase();
  const cleanTld = tld.trim().toLowerCase();

  try {
    const res = await fetch(
      `/api/domain/check?domain=${encodeURIComponent(cleanDomain)}&tld=${encodeURIComponent(cleanTld)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (res.ok) {
      const responseData = await res.json();
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
            ? `Xin chúc mừng! Tên miền ${cleanDomain}${cleanTld} đang sẵn sàng để đăng ký ngay!`
            : `Tên miền ${cleanDomain}${cleanTld} đã được đăng ký.`),
        details: resultData.details,
        alternatives: resultData.alternatives || [],
      };
    }
  } catch (err) {
    console.warn('[checkDomainApi] API call failed, falling back:', err);
  }

  // Fallback nếu kết nối mạng gặp sự cố
  const fullDomain = `${cleanDomain}${cleanTld}`;
  const priceMap: Record<string, string> = {
    '.com': '299.000 ₫/năm',
    '.vn': '650.000 ₫/năm',
    '.com.vn': '550.000 ₫/năm',
    '.net': '320.000 ₫/năm',
    '.site': '199.000 ₫/năm',
  };

  return {
    domain: cleanDomain,
    tld: cleanTld,
    fullDomain,
    isAvailable: true,
    pricePerYear: priceMap[cleanTld] || '299.000 ₫/năm',
    message: `Tên miền ${fullDomain} đang sẵn sàng kiểm tra đăng ký!`,
    alternatives: [],
  };
};

