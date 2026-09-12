import { LandingPageConfig, SectionConfig, SectionId } from '../../../types/landingConfig.types';
import { defaultLandingConfig } from '../../../data/defaultLandingConfig';

const API_BASE = '/api/landing-config';

/**
 * Normalizes section keys and field schemas between Backend API (remote or local)
 * and FE Client typed state.
 */
export function normalizeServerSection(rawSec: any): SectionConfig | null {
  if (!rawSec) return null;

  // Determine section key
  const rawKey: string = (rawSec.sectionKey || rawSec.id || '').replace(/^sec_/, '');
  let id: SectionId;

  if (rawKey === 'stats') {
    id = 'logobar';
  } else if (rawKey === 'process') {
    id = 'advantages';
  } else if (
    [
      'hero',
      'logobar',
      'services',
      'advantages',
      'themes',
      'pricing',
      'domain',
      'testimonials',
      'faq',
      'cta',
      'contact',
    ].includes(rawKey)
  ) {
    id = rawKey as SectionId;
  } else {
    return null;
  }

  const enabled = rawSec.enabled !== undefined 
    ? Boolean(rawSec.enabled) 
    : (rawSec.isVisible !== undefined ? Boolean(rawSec.isVisible) : true);

  const displayStyle = rawSec.displayStyle || rawSec.variant || 'standard';

  // Find default fallback section to preserve availableStyles and default pillars/options
  const defaultSec = defaultLandingConfig.sections.find((ds) => ds.id === id);

  const baseConfig = {
    id,
    name: rawSec.name || defaultSec?.name || id,
    enabled,
    displayStyle,
    availableStyles: rawSec.availableStyles || defaultSec?.availableStyles || [
      { value: displayStyle, label: 'Mặc định', description: 'Giao diện chuẩn' },
    ],
  };

  const rawContent = rawSec.content || {};

  switch (id) {
    case 'hero': {
      const defContent = defaultSec?.id === 'hero' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'hero',
        content: {
          badgeText: rawContent.badgeText || rawContent.badge || defContent?.badgeText || '',
          headlineMain: rawContent.headlineMain || rawContent.title || defContent?.headlineMain || '',
          headlineHighlight: rawContent.headlineHighlight || rawContent.titleHighlight || defContent?.headlineHighlight || '',
          description: rawContent.description || rawContent.subtitle || defContent?.description || '',
          ctaPrimaryText: rawContent.ctaPrimaryText || defContent?.ctaPrimaryText || 'Khám Phá Bảng Giá',
          ctaSecondaryText: rawContent.ctaSecondaryText || defContent?.ctaSecondaryText || 'Tư Vấn Miễn Phí',
          ctaPrimaryLink: rawContent.ctaPrimaryLink || '#pricing',
          ctaSecondaryLink: rawContent.ctaSecondaryLink || '#contact-lead',
          ratingBadgeText: rawContent.ratingBadgeText || '',
          heroImageUrl: rawContent.heroImageUrl || '',
          pillars: rawContent.pillars && rawContent.pillars.length > 0 
            ? rawContent.pillars 
            : (defContent?.pillars || []),
        },
      };
    }

    case 'logobar': {
      const defContent = defaultSec?.id === 'logobar' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'logobar',
        content: {
          title: rawContent.title || defContent?.title || 'Khách Hàng Tiêu Biểu Tin Tưởng Đồng Hành',
          statsText: rawContent.statsText || defContent?.statsText || '',
          items: rawContent.items && rawContent.items.length > 0 ? rawContent.items : (defContent?.items || []),
        },
      };
    }

    case 'services': {
      const defContent = defaultSec?.id === 'services' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'services',
        content: {
          badge: rawContent.badge || defContent?.badge || 'Hệ Sinh Thái Toàn Diện',
          title: rawContent.title || defContent?.title || 'Giải Pháp Thiết Kế Website',
          subtitle: rawContent.subtitle || defContent?.subtitle || '',
          items: rawContent.items && rawContent.items.length > 0 ? rawContent.items : (defContent?.items || []),
        },
      };
    }

    case 'advantages': {
      const defContent = defaultSec?.id === 'advantages' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'advantages',
        content: {
          badge: rawContent.badge || defContent?.badge || 'Quy Trình Triển Khai',
          title: rawContent.title || defContent?.title || 'Quy Trình Minh Bạch & Chuẩn Chỉ',
          subtitle: rawContent.subtitle || defContent?.subtitle || '',
          steps: rawContent.steps && rawContent.steps.length > 0 ? rawContent.steps : (defContent?.steps || []),
          items: rawContent.items && rawContent.items.length > 0 ? rawContent.items : (defContent?.items || []),
        },
      };
    }

    case 'themes': {
      const defContent = defaultSec?.id === 'themes' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'themes',
        content: {
          badge: rawContent.badge || defContent?.badge || 'Bộ Sưu Tập Mẫu',
          title: rawContent.title || defContent?.title || 'Kho Giao Diện Đẳng Cấp Theo Từng Ngành',
          subtitle: rawContent.subtitle || defContent?.subtitle || '',
          ctaText: rawContent.ctaText || 'Xem Tất Cả Giao Diện Mẫu',
          ctaLink: rawContent.ctaLink || '#kho-giao-dien',
        },
      };
    }

    case 'pricing': {
      const defContent = defaultSec?.id === 'pricing' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'pricing',
        content: {
          badge: rawContent.badge || defContent?.badge || 'Bảng Giá Minh Bạch',
          title: rawContent.title || defContent?.title || 'Đầu Tư Đúng Mực, Thu Về Hiệu Quả Lâu Dài',
          subtitle: rawContent.subtitle || defContent?.subtitle || '',
          highlightPlanId: rawContent.highlightPlanId || 'plan-professional',
          footerNote: rawContent.footerNote || '',
          plans: rawContent.plans && rawContent.plans.length > 0 ? rawContent.plans : (defContent?.plans || []),
        },
      };
    }

    case 'testimonials': {
      const defContent = defaultSec?.id === 'testimonials' ? defaultSec.content : null;
      const rawItems = rawContent.items || defContent?.items || [];
      const normalizedItems = rawItems.map((item: any, idx: number) => ({
        id: item.id || `testimonial-${idx}`,
        author: item.author || item.name || 'Khách hàng',
        role: item.role || 'Đối tác',
        company: item.company || 'Doanh nghiệp',
        avatarUrl: item.avatarUrl || item.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        quote: item.quote || item.comment || '',
        rating: typeof item.rating === 'number' ? item.rating : 5,
      }));

      return {
        ...baseConfig,
        id: 'testimonials',
        content: {
          badge: rawContent.badge || defContent?.badge || 'Khách Hàng Chia Sẻ',
          title: rawContent.title || defContent?.title || 'Đánh Giá Thực Tế Từ Đối Tác',
          subtitle: rawContent.subtitle || defContent?.subtitle || '',
          items: normalizedItems,
        },
      };
    }

    case 'faq': {
      return {
        ...baseConfig,
        id: 'faq',
        content: {
          badge: rawContent.badge || 'GIẢI ĐÁP THẮC MẮC',
          title: rawContent.title || 'Câu Hỏi Thường Gặp Khi Thiết Kế Website',
          subtitle: rawContent.subtitle || 'Những câu hỏi được khách hàng quan tâm nhiều nhất.',
          items: rawContent.items || [],
        },
      };
    }

    case 'cta': {
      return {
        ...baseConfig,
        id: 'cta',
        content: {
          title: rawContent.title || 'Sẵn Sàng Bứt Phá Doanh Số Cùng Website Đẳng Cấp?',
          subtitle: rawContent.subtitle || 'Để lại thông tin ngay hôm nay để nhận tư vấn miễn phí.',
          buttonText: rawContent.buttonText || 'Đăng Ký Tư Vấn & Nhận Báo Giá',
          buttonLink: rawContent.buttonLink || '#contact-lead',
          hotlineText: rawContent.hotlineText || '',
        },
      };
    }

    case 'contact': {
      const defContent = defaultSec?.id === 'contact' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'contact',
        content: {
          badge: rawContent.badge || defContent?.badge || 'Liên Hệ Trực Tiếp',
          title: rawContent.title || defContent?.title || 'Nhận Báo Giá Thiết Kế Web Trong 15 Phút',
          subtitle: rawContent.subtitle || defContent?.subtitle || '',
          commitments: rawContent.commitments || defContent?.commitments,
        },
      };
    }

    case 'domain': {
      const defContent = defaultSec?.id === 'domain' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'domain',
        content: {
          badge: rawContent.badge || defContent?.badge || 'Tra Cứu Trực Tuyến',
          title: rawContent.title || defContent?.title || 'Kiểm Tra Tên Miền Đẹp Cho Doanh Nghiệp',
          subtitle: rawContent.subtitle || defContent?.subtitle || '',
        },
      };
    }

    default:
      return null;
  }
}

/**
 * Normalizes full LandingPageConfig payload from backend API
 */
export function normalizeLandingPageConfig(rawConfig: any): LandingPageConfig {
  if (!rawConfig) return defaultLandingConfig;

  const rawSections = Array.isArray(rawConfig?.sections) ? rawConfig.sections : [];
  if (rawSections.length === 0) {
    return defaultLandingConfig;
  }

  const normalizedSections: SectionConfig[] = [];
  for (const s of rawSections) {
    const normalized = normalizeServerSection(s);
    if (normalized) {
      normalizedSections.push(normalized);
    }
  }

  // Ensure 'domain' section is retained if not explicitly present
  if (!normalizedSections.some((s) => s.id === 'domain')) {
    const defaultDomain = defaultLandingConfig.sections.find((s) => s.id === 'domain');
    if (defaultDomain) {
      const pricingIndex = normalizedSections.findIndex((s) => s.id === 'pricing');
      if (pricingIndex !== -1) {
        normalizedSections.splice(pricingIndex + 1, 0, defaultDomain);
      } else {
        normalizedSections.push(defaultDomain);
      }
    }
  }

  return {
    version: rawConfig.version || defaultLandingConfig.version,
    lastUpdated: rawConfig.lastUpdated || new Date().toISOString(),
    pageTitle: rawConfig.pageTitle,
    metaDescription: rawConfig.metaDescription,
    ogImage: rawConfig.ogImage,
    theme: rawConfig.theme,
    sections: normalizedSections,
  };
}

export async function fetchLandingConfigApi(): Promise<{
  success: boolean;
  config?: LandingPageConfig;
  message?: string;
}> {
  try {
    const res = await fetch(`${API_BASE}?_t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    // Check both envelope formats: data.config or data.data or root
    const rawConfig = data.config || data.data || data;
    const finalConfig = normalizeLandingPageConfig(rawConfig);

    return {
      success: true,
      config: finalConfig,
    };
  } catch (error) {
    console.warn('[LandingConfig API] Fetch failed, using client fallback:', error);
    return { success: false, message: (error as Error).message };
  }
}

