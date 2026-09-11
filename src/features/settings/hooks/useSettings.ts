import { useQuery } from '@tanstack/react-query';
import { fetchSettingsApi } from '../api/settings.api';
import { SiteSettings } from '../../../types/settings.types';
import { siteConfig } from '../../../config/site.config';

const defaultFallbackSettings: SiteSettings = {
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

export const useSettings = () => {
  const initialData =
    typeof window !== 'undefined' && (window as any).__INITIAL_SETTINGS__
      ? (window as any).__INITIAL_SETTINGS__
      : defaultFallbackSettings;

  return useQuery<SiteSettings>({
    queryKey: ['site-settings'],
    queryFn: fetchSettingsApi,
    initialData,
    staleTime: 5 * 60 * 1000,
  });
};
