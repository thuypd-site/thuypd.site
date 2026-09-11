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
  logoUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1VcisAZRnMcS6Skjxw4IiiVEzdN-NrJcfS26UU0mh0K833g198YPaysMvEDIcrf7VNNGP_6Ae2twqCwPD3vUSSFFOUcakXHNy17lYu5nmkXCh1-LOQcJjRvyOepY5WUDlD8aYYDdT2wgAojW7cqEQHI4j-5Mtw_-CEJHT4BRH9Rm5s9MwQUm6qiYoVJXXQexxZ9ruNTum_k6PlI2kV9jShIvlBXnd93As-zoWLyxuXTRbbh26M1KUdzUHsC',
} as const;

export type SiteConfig = typeof siteConfig;
