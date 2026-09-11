export interface SiteSettings {
  _id?: string;
  id?: string;
  siteName: string;
  tagline?: string;
  companyName?: string;
  brandSlogan?: string;
  hotline: string;
  hotlineRaw?: string;
  zaloPhone: string;
  zaloUrl?: string;
  contactEmail: string;
  officeAddress: string;
  workingHours?: string;
  metaDescription?: string;
  logoUrl?: string;
  copyrightText?: string;
  socialLinks?: {
    facebook?: string;
    youtube?: string;
    github?: string;
    zalo?: string;
    tiktok?: string;
  };
}
