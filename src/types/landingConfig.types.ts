import { ServiceItem, AdvantageItem, PricingPlan, TestimonialItem, ThemeItem } from './index';

export type SectionId = 
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
  | 'contact';

export interface SectionStyleOption {
  value: string;
  label: string;
  description: string;
}

export interface BaseSectionConfig {
  id: SectionId;
  name: string;
  enabled: boolean;
  displayStyle: string;
  availableStyles: SectionStyleOption[];
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
  ratingBadgeText?: string;
  heroImageUrl?: string;
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
  output?: string;
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
  ctaText?: string;
  ctaLink?: string;
}

export interface PricingSectionContent {
  badge: string;
  title: string;
  subtitle: string;
  highlightPlanId?: string;
  footerNote?: string;
  plans: PricingPlan[];
}

export interface DomainSectionContent {
  badge: string;
  title: string;
  subtitle: string;
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
  | (BaseSectionConfig & { id: 'contact'; content: ContactSectionContent });

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
}

declare global {
  interface Window {
    __INITIAL_LANDING_CONFIG__?: LandingPageConfig;
  }
}
