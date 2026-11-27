import { cache } from 'react';
import { BACKEND_URL } from './backend-proxy';
import { defaultLandingConfig } from '@/src/data/defaultLandingConfig';
import { LandingPageConfig } from '@/src/types/landingConfig.types';
import { SiteSettings } from '@/src/types/settings.types';
import { siteConfig } from '@/src/config/site.config';
import { normalizeLandingPageConfig } from '@/src/features/landing/api/landingConfig.api';

export const getServerLandingConfig = cache(async (): Promise<LandingPageConfig> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${BACKEND_URL}/api/landing-config`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const cfg = data.data || data.config || data;
      if (cfg && Array.isArray(cfg.sections) && cfg.sections.length > 0) {
        return normalizeLandingPageConfig(cfg);
      }
    }
  } catch (err) {
    console.warn('[SSR] Failed to fetch landing config, using default:', err);
  }

  return defaultLandingConfig;
});

export const getServerSettings = cache(async (): Promise<SiteSettings | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${BACKEND_URL}/api/client/settings`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const s = data.data || data.settings || data;
      if (s && (s.siteName || s.hotline || s.contactEmail || s.officeAddress)) {
        const rawZalo = s.zaloPhone || s.zaloNumber || s.zalo || siteConfig.zaloPhone;
        const cleanZalo = (rawZalo || '').replace(/\D/g, '');
        const rawHotline = s.hotline || siteConfig.hotline;
        const cleanHotline = (rawHotline || '').replace(/\D/g, '');

        return {
          _id: s._id,
          id: s.id || s._id,
          siteName: s.siteName || s.companyName || siteConfig.name,
          tagline: s.tagline || s.brandSlogan || '',
          hotline: s.hotline || siteConfig.hotline,
          hotlineRaw: cleanHotline || siteConfig.hotlineRaw,
          zaloPhone: s.zaloPhone || s.zaloNumber || s.zalo || siteConfig.zaloPhone,
          zaloUrl: cleanZalo ? `https://zalo.me/${cleanZalo}` : siteConfig.zaloUrl,
          contactEmail: s.contactEmail || s.email || siteConfig.email,
          officeAddress: s.officeAddress || s.address || siteConfig.address,
          metaDescription: s.metaDescription || '',
          socialLinks: s.socialLinks || {},
          workingHours: s.workingHours || siteConfig.workingHours,
          logoUrl: s.logoUrl || siteConfig.logoUrl,
          companyName: s.companyName || siteConfig.name,
          brandSlogan: s.brandSlogan || '',
          copyrightText: s.copyrightText || '',
        };
      }
    }
  } catch (err) {
    console.warn('[SSR] Failed to fetch settings, using fallback:', err);
  }

  return null;
});
