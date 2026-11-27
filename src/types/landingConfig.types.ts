import { ServiceItem, AdvantageItem, PricingPlan, TestimonialItem } from './index';

export type SectionId =
  | 'header'
  | 'hero'
  | 'logobar'
  | 'services'
  | 'advantages'
  | 'themes'
  | 'pricing'
  | 'domain'
  | 'testimonials'
  | 'faq'
  | 'cta'
  | 'contact'
  | 'footer';

export interface HeaderNavItem {
  id?: string;
  name: string;
  href: string;
}

export interface HeaderSectionContent {
  ctaText?: string;
  ctaLink?: string;
  navItems?: HeaderNavItem[];
}

export interface FooterSectionContent {
  brandDescription?: string;
  servicesTitle?: string;
  quickLinksTitle?: string;
  contactTitle?: string;
  copyrightText?: string;
}

export interface BaseSectionConfig {
  id: SectionId;
  name: string;
  enabled: boolean;
  displayStyle?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
}

export interface HeroPillar {
  id: string;
  value: string;
  title: string;
  desc: string;
}

export interface HeroSectionContent {
  badgeText?: string;
  headlineMain?: string;
  headlineHighlight?: string;
  description?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryLink?: string;
  pillars?: HeroPillar[];
}

export interface LogoBarItem {
  number: string;
  label: string;
  suffix?: string;
}

export interface LogoBarContent {
  title: string;
  statsText?: string;
  items?: LogoBarItem[];
}

export interface ServicesSectionContent {
  badge: string;
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description?: string;
  desc?: string;
  days?: string;
}

export interface AdvantagesSectionContent {
  badge: string;
  title: string;
  subtitle: string;
  items?: AdvantageItem[];
  steps?: ProcessStep[];
}

export interface ThemesSectionContent {
  badge: string;
  title: string;
  subtitle: string;
}

export interface PricingSectionContent {
  badge: string;
  title: string;
  subtitle: string;
  highlightPlanId?: string;
  plans: PricingPlan[];
}

export interface DomainTldPricing {
  tld: string;
  price: string;
  label?: string;
  popular?: boolean;
}

export interface DomainSectionContent {
  badge: string;
  title: string;
  subtitle: string;
  pricing?: DomainTldPricing[];
}

export interface TestimonialsSectionContent {
  badge: string;
  title: string;
  subtitle: string;
  items: TestimonialItem[];
}

export interface ContactSectionContent {
  badge: string;
  title: string;
  subtitle: string;
  commitments?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionContent {
  badge: string;
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export interface CtaSectionContent {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink?: string;
  hotlineText?: string;
}

export type SectionConfig =
  | (BaseSectionConfig & { id: 'header'; content: HeaderSectionContent })
  | (BaseSectionConfig & { id: 'hero'; content: HeroSectionContent })
  | (BaseSectionConfig & { id: 'logobar'; content: LogoBarContent })
  | (BaseSectionConfig & { id: 'services'; content: ServicesSectionContent })
  | (BaseSectionConfig & { id: 'advantages'; content: AdvantagesSectionContent })
  | (BaseSectionConfig & { id: 'themes'; content: ThemesSectionContent })
  | (BaseSectionConfig & { id: 'pricing'; content: PricingSectionContent })
  | (BaseSectionConfig & { id: 'domain'; content: DomainSectionContent })
  | (BaseSectionConfig & { id: 'testimonials'; content: TestimonialsSectionContent })
  | (BaseSectionConfig & { id: 'faq'; content: FaqSectionContent })
  | (BaseSectionConfig & { id: 'cta'; content: CtaSectionContent })
  | (BaseSectionConfig & { id: 'contact'; content: ContactSectionContent })
  | (BaseSectionConfig & { id: 'footer'; content: FooterSectionContent });

export interface LandingPageConfig {
  version: number;
  lastUpdated: string;
  pageTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  theme?: {
    primaryColor?: string;
    accentColor?: string;
    fontFamily?: string;
  };
  sections: SectionConfig[];
  header?: HeaderSectionContent & { enabled?: boolean; isVisible?: boolean };
  footer?: FooterSectionContent & { enabled?: boolean; isVisible?: boolean };
}
