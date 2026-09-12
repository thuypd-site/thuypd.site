/**
 * Site Configuration - THUYPD.SITE
 * Centralized brand metadata, contact information, and business hours.
 */
export const siteConfig = {
  name: 'THUYPD.SITE',
  
  // Contacts
  hotline: '1900 888 999',
  hotlineRaw: '1900888999',
  zaloPhone: '0828.01.0000',
  zaloUrl: 'https://zalo.me/0828010000',
  email: 'contact@thuypd.site',
  
  // Addresses & Operations
  address: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, P. 22, Q. Bình Thạnh, TP. Hồ Chí Minh',
  workingHours: 'Thứ 2 - Thứ 7: 08:00 - 18:00 | Hotline & Kỹ thuật: 24/7/365',
  
  // Brand Assets
  logoUrl: '/logo.svg',
  logoDarkUrl: '/logo-dark.svg',
  logoIconUrl: '/logo-icon.svg',
} as const;

export type SiteConfig = typeof siteConfig;
