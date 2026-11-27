'use client';

import React from 'react';
import { useLandingConfig } from '../context/LandingConfigContext';
import { HeroSection } from '../../../components/sections/HeroSection';
import { LogoBar } from '../../../components/sections/LogoBar';
import { ServicesSection } from '../../../components/sections/ServicesSection';
import { AdvantagesSection } from '../../../components/sections/AdvantagesSection';
import { ThemeShowcaseSection } from '../../../components/sections/ThemeShowcaseSection';
import { PricingSection } from '../../../components/sections/PricingSection';
import { DomainCheckerSection } from '../../../components/sections/DomainCheckerSection';
import { TestimonialsSection } from '../../../components/sections/TestimonialsSection';
import { FaqSection } from '../../../components/sections/FaqSection';
import { CtaBannerSection } from '../../../components/sections/CtaBannerSection';
import { ContactSection } from '../../../components/sections/ContactSection';
import { ThemeItem } from '../../../types';

export interface LandingPageRendererProps {
  onSelectTheme?: (theme: ThemeItem) => void;
  onSelectPlan?: (planName: string, budgetTier: string) => void;
  selectedBudgetTier?: string;
  selectedWebsiteType?: string;
  selectedNotes?: string;
}

export const LandingPageRenderer: React.FC<LandingPageRendererProps> = ({
  onSelectTheme,
  onSelectPlan,
  selectedBudgetTier,
  selectedWebsiteType,
  selectedNotes,
}) => {
  const { sections } = useLandingConfig();

  return (
    <div className="w-full">
      {sections
        .filter((sec) => sec.enabled)
        .map((sec) => {
          switch (sec.id) {
            case 'hero':
              return (
                <div key={sec.id} id="section-hero" data-section-id={sec.id}>
                  <HeroSection content={sec.content} />
                </div>
              );
            case 'logobar':
              return (
                <div key={sec.id} id="section-logobar" data-section-id={sec.id}>
                  <LogoBar content={sec.content} />
                </div>
              );
            case 'services':
              return (
                <div key={sec.id} id="section-services" data-section-id={sec.id}>
                  <ServicesSection content={sec.content} />
                </div>
              );
            case 'advantages':
              return (
                <div key={sec.id} id="section-advantages" data-section-id={sec.id}>
                  <AdvantagesSection content={sec.content} />
                </div>
              );
            case 'themes':
              return (
                <div key={sec.id} id="section-themes" data-section-id={sec.id}>
                  <ThemeShowcaseSection content={sec.content} onSelectTheme={onSelectTheme} />
                </div>
              );
            case 'pricing':
              return (
                <div key={sec.id} id="section-pricing" data-section-id={sec.id}>
                  <PricingSection content={sec.content} onSelectPlan={onSelectPlan} />
                </div>
              );
            case 'domain':
              return (
                <div key={sec.id} id="section-domain" data-section-id={sec.id}>
                  <DomainCheckerSection content={sec.content} />
                </div>
              );
            case 'testimonials':
              return (
                <div key={sec.id} id="section-testimonials" data-section-id={sec.id}>
                  <TestimonialsSection content={sec.content} />
                </div>
              );
            case 'faq':
              return (
                <div key={sec.id} id="section-faq" data-section-id={sec.id}>
                  <FaqSection content={sec.content} />
                </div>
              );
            case 'cta':
              return (
                <div key={sec.id} id="section-cta" data-section-id={sec.id}>
                  <CtaBannerSection content={sec.content} />
                </div>
              );
            case 'contact':
              return (
                <div key={sec.id} id="section-contact" data-section-id={sec.id}>
                  <ContactSection
                    content={sec.content}
                    initialBudgetTier={selectedBudgetTier}
                    initialWebsiteType={selectedWebsiteType}
                    initialNotes={selectedNotes}
                  />
                </div>
              );
            default:
              return null;
          }
        })}
    </div>
  );
};
