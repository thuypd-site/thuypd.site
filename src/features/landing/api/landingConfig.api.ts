import { LandingPageConfig, SectionConfig, SectionId } from '../../../types/landingConfig.types';
import { defaultLandingConfig } from '../../../data/defaultLandingConfig';

const API_BASE = '/api/landing-config';

const VALID_SECTIONS: SectionId[] = [
  'header',
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
  'footer',
];

export function normalizeServerSection(rawSec: any): SectionConfig | null {
  if (!rawSec) return null;

  const rawKey: string = (rawSec.sectionKey || rawSec.id || '').replace(/^sec_/, '');
  let id: SectionId;

  if (rawKey === 'stats') {
    id = 'logobar';
  } else if (rawKey === 'process') {
    id = 'advantages';
  } else if (VALID_SECTIONS.includes(rawKey as SectionId)) {
    id = rawKey as SectionId;
  } else {
    return null;
  }

  const enabled =
    rawSec.enabled !== undefined
      ? Boolean(rawSec.enabled)
      : rawSec.isVisible !== undefined
        ? Boolean(rawSec.isVisible)
        : true;

  const defaultSec = defaultLandingConfig.sections.find((ds) => ds.id === id);
  const baseConfig = {
    id,
    name: rawSec.name || defaultSec?.name || id,
    enabled,
    displayStyle: 'default',
  };

  const rawContent = rawSec.content || {};

  switch (id) {
    case 'header': {
      const def = defaultSec?.id === 'header' ? defaultSec.content : null;
      const navItems =
        Array.isArray(rawContent.navItems) && rawContent.navItems.length > 0
          ? rawContent.navItems.map((item: any) => ({
              ...item,
              href:
                item.href === '#hoi-dap'
                  ? '#faq'
                  : item.href === '#loi-ich'
                    ? '#quy-trinh'
                    : item.href,
            }))
          : def?.navItems || [];

      return {
        ...baseConfig,
        id: 'header',
        content: {
          ctaText: rawContent.ctaText || def?.ctaText || 'Nhận Báo Giá',
          ctaLink: rawContent.ctaLink || def?.ctaLink || '#nhan-bao-gia',
          navItems,
        },
      };
    }

    case 'hero': {
      const def = defaultSec?.id === 'hero' ? defaultSec.content : null;
      const rawPrimaryLink = rawContent.ctaPrimaryLink || def?.ctaPrimaryLink || '#bang-gia';
      return {
        ...baseConfig,
        id: 'hero',
        content: {
          badgeText: rawContent.badgeText || rawContent.badge || def?.badgeText || '',
          headlineMain: rawContent.headlineMain || rawContent.title || def?.headlineMain || '',
          headlineHighlight:
            rawContent.headlineHighlight || rawContent.titleHighlight || def?.headlineHighlight || '',
          description: rawContent.description || rawContent.subtitle || def?.description || '',
          ctaPrimaryText: rawContent.ctaPrimaryText || def?.ctaPrimaryText || 'Xem Bảng Giá Trọn Gói',
          ctaSecondaryText: rawContent.ctaSecondaryText || def?.ctaSecondaryText || 'Khám Phá Kho Mẫu',
          ctaPrimaryLink: rawPrimaryLink === '#pricing' ? '#bang-gia' : rawPrimaryLink,
          ctaSecondaryLink: rawContent.ctaSecondaryLink || def?.ctaSecondaryLink || '#kho-giao-dien',
          pillars:
            Array.isArray(rawContent.pillars) && rawContent.pillars.length > 0
              ? rawContent.pillars
              : def?.pillars || [],
        },
      };
    }

    case 'logobar': {
      const def = defaultSec?.id === 'logobar' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'logobar',
        content: {
          title: rawContent.title || def?.title || '',
          statsText: rawContent.statsText || def?.statsText || '',
          items:
            Array.isArray(rawContent.items) && rawContent.items.length > 0
              ? rawContent.items
              : def?.items || [],
        },
      };
    }

    case 'services': {
      const def = defaultSec?.id === 'services' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'services',
        content: {
          badge: rawContent.badge || def?.badge || '',
          title: rawContent.title || def?.title || '',
          subtitle: rawContent.subtitle || def?.subtitle || '',
          items:
            Array.isArray(rawContent.items) && rawContent.items.length > 0
              ? rawContent.items
              : def?.items || [],
        },
      };
    }

    case 'advantages': {
      const def = defaultSec?.id === 'advantages' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'advantages',
        content: {
          badge: rawContent.badge || def?.badge || '',
          title: rawContent.title || def?.title || '',
          subtitle: rawContent.subtitle || def?.subtitle || '',
          steps:
            Array.isArray(rawContent.steps) && rawContent.steps.length > 0
              ? rawContent.steps
              : def?.steps || [],
          items:
            Array.isArray(rawContent.items) && rawContent.items.length > 0
              ? rawContent.items
              : def?.items || [],
        },
      };
    }

    case 'themes': {
      const def = defaultSec?.id === 'themes' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'themes',
        content: {
          badge: rawContent.badge || def?.badge || '',
          title: rawContent.title || def?.title || '',
          subtitle: rawContent.subtitle || def?.subtitle || '',
        },
      };
    }

    case 'pricing': {
      const def = defaultSec?.id === 'pricing' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'pricing',
        content: {
          badge: rawContent.badge || def?.badge || '',
          title: rawContent.title || def?.title || '',
          subtitle: rawContent.subtitle || def?.subtitle || '',
          highlightPlanId: rawContent.highlightPlanId || def?.highlightPlanId || 'plan-professional',
          plans:
            Array.isArray(rawContent.plans) && rawContent.plans.length > 0
              ? rawContent.plans
              : def?.plans || [],
        },
      };
    }

    case 'domain': {
      const def = defaultSec?.id === 'domain' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'domain',
        content: {
          badge: rawContent.badge || def?.badge || '',
          title: rawContent.title || def?.title || '',
          subtitle: rawContent.subtitle || def?.subtitle || '',
          pricing:
            Array.isArray(rawContent.pricing) && rawContent.pricing.length > 0
              ? rawContent.pricing
              : def?.pricing || [],
        },
      };
    }

    case 'testimonials': {
      const def = defaultSec?.id === 'testimonials' ? defaultSec.content : null;
      const rawItems =
        Array.isArray(rawContent.items) && rawContent.items.length > 0
          ? rawContent.items
          : def?.items || [];

      const normalizedItems = rawItems.map((item: any, idx: number) => ({
        id: item.id || `testimonial-${idx}`,
        author: item.author || item.name || 'Khách hàng',
        role: item.role || 'Đối tác',
        company: item.company || 'Doanh nghiệp',
        avatarUrl:
          item.avatarUrl ||
          item.avatar ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        quote: item.quote || item.comment || '',
        rating: typeof item.rating === 'number' ? item.rating : 5,
      }));

      return {
        ...baseConfig,
        id: 'testimonials',
        content: {
          badge: rawContent.badge || def?.badge || '',
          title: rawContent.title || def?.title || '',
          subtitle: rawContent.subtitle || def?.subtitle || '',
          items: normalizedItems,
        },
      };
    }

    case 'faq': {
      const def = defaultSec?.id === 'faq' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'faq',
        content: {
          badge: rawContent.badge || def?.badge || '',
          title: rawContent.title || def?.title || '',
          subtitle: rawContent.subtitle || def?.subtitle || '',
          items:
            Array.isArray(rawContent.items) && rawContent.items.length > 0
              ? rawContent.items
              : def?.items || [],
        },
      };
    }

    case 'cta': {
      const def = defaultSec?.id === 'cta' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'cta',
        content: {
          title: rawContent.title || def?.title || '',
          subtitle: rawContent.subtitle || def?.subtitle || '',
          buttonText: rawContent.buttonText || def?.buttonText || 'Nhận Báo Giá Ngay',
          buttonLink: rawContent.buttonLink || def?.buttonLink || '#nhan-bao-gia',
          hotlineText: rawContent.hotlineText || '',
        },
      };
    }

    case 'contact': {
      const def = defaultSec?.id === 'contact' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'contact',
        content: {
          badge: rawContent.badge || def?.badge || '',
          title: rawContent.title || def?.title || '',
          subtitle: rawContent.subtitle || def?.subtitle || '',
          commitments:
            Array.isArray(rawContent.commitments) && rawContent.commitments.length > 0
              ? rawContent.commitments
              : def?.commitments || [],
        },
      };
    }

    case 'footer': {
      const def = defaultSec?.id === 'footer' ? defaultSec.content : null;
      return {
        ...baseConfig,
        id: 'footer',
        content: {
          brandDescription: rawContent.brandDescription || def?.brandDescription || '',
          servicesTitle: rawContent.servicesTitle || def?.servicesTitle || 'Dịch Vụ',
          quickLinksTitle: rawContent.quickLinksTitle || def?.quickLinksTitle || 'Điều Hướng',
          contactTitle: rawContent.contactTitle || def?.contactTitle || 'Liên Hệ',
          copyrightText: rawContent.copyrightText || def?.copyrightText || '',
        },
      };
    }

    default:
      return null;
  }
}

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

  if (!normalizedSections.some((s) => s.id === 'header')) {
    const defaultHeader = defaultLandingConfig.sections.find((s) => s.id === 'header');
    if (defaultHeader) normalizedSections.unshift(defaultHeader);
  }

  if (!normalizedSections.some((s) => s.id === 'footer')) {
    const defaultFooter = defaultLandingConfig.sections.find((s) => s.id === 'footer');
    if (defaultFooter) normalizedSections.push(defaultFooter);
  }

  const headerSec = normalizedSections.find((s) => s.id === 'header');
  const footerSec = normalizedSections.find((s) => s.id === 'footer');

  return {
    version: rawConfig.version || defaultLandingConfig.version,
    lastUpdated: rawConfig.lastUpdated || new Date().toISOString(),
    pageTitle: rawConfig.pageTitle || defaultLandingConfig.pageTitle,
    metaDescription: rawConfig.metaDescription || defaultLandingConfig.metaDescription,
    ogImage: rawConfig.ogImage || defaultLandingConfig.ogImage,
    theme: rawConfig.theme || defaultLandingConfig.theme,
    sections: normalizedSections,
    header: headerSec
      ? { ...headerSec.content, enabled: headerSec.enabled, isVisible: headerSec.enabled }
      : undefined,
    footer: footerSec
      ? { ...footerSec.content, enabled: footerSec.enabled, isVisible: footerSec.enabled }
      : undefined,
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
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    const rawConfig = data.config || data.data || data;
    return {
      success: true,
      config: normalizeLandingPageConfig(rawConfig),
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
