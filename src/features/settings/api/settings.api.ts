import { httpClient } from '../../../core/http/client';
import { SiteSettings } from '../../../types/settings.types';
import { siteConfig } from '../../../config/site.config';

export const fetchSettingsApi = async (): Promise<SiteSettings> => {
  try {
    const data = await httpClient<any>(`/api/client/settings?_t=${Date.now()}`);
    const s = data?.data || data?.settings || data;
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
  } catch (err) {
    console.warn('[Settings API] Fallback to siteConfig:', err);
  }

  return {
    siteName: siteConfig.name,
    hotline: siteConfig.hotline,
    hotlineRaw: siteConfig.hotlineRaw,
    zaloPhone: siteConfig.zaloPhone,
    zaloUrl: siteConfig.zaloUrl,
    contactEmail: siteConfig.email,
    officeAddress: siteConfig.address,
    workingHours: siteConfig.workingHours,
    logoUrl: siteConfig.logoUrl,
  };
};
