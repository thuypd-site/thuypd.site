'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { Phone, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/site.config';
import { primaryNavItems } from '../../config/navigation.config';
import { useSettings } from '../../hooks/useSettings';
import { useLandingConfig } from '../../features/landing/context/LandingConfigContext';
import { Logo } from '../common/Logo';

interface HeaderProps {
  onOpenQuoteModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuoteModal,
}) => {
  const { data: settings } = useSettings();
  const { config } = useLandingConfig();
  const headerConfig = config?.header;

  const hotline = settings?.hotline || siteConfig.hotline;
  const hotlineRaw = settings?.hotlineRaw || siteConfig.hotlineRaw;
  const siteName = settings?.siteName || siteConfig.name;

  const isMinimal = headerConfig?.displayStyle === 'minimal' || headerConfig?.variant === 'minimal';

  const hotlineLabel = headerConfig?.hotlineLabel || 'Hotline 24/7';
  const ctaText = headerConfig?.ctaText || 'Nhận Báo Giá Ngay';
  const ctaLink = headerConfig?.ctaLink || '#nhan-bao-gia';

  const navItems = headerConfig?.navItems && headerConfig.navItems.length > 0
    ? headerConfig.navItems.map((item) => ({
        id: item.id || item.name,
        label: item.name,
        href: item.href,
      }))
    : primaryNavItems;

  const handleOpenQuote = () => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal();
    } else if (ctaLink.startsWith('#')) {
      const target = document.querySelector(ctaLink);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = ctaLink;
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string, href: string) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    if (href.startsWith('#') && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (headerConfig?.enabled === false || headerConfig?.isVisible === false) {
    return null;
  }

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#f8f9ff]/95 backdrop-blur-xl border-b border-[#dce9ff]/70 shadow-[0_4px_20px_rgba(11,28,48,0.06)] py-2.5'
          : 'bg-[#f8f9ff]/85 backdrop-blur-md border-b border-transparent py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-3.5 sm:px-6 w-full flex items-center justify-between gap-3 sm:gap-4">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home', '#');
          }}
          className="group cursor-pointer focus:outline-none shrink-0"
        >
          <Logo variant="light" size="sm" className="sm:hidden" />
          <Logo variant="light" size="md" className="hidden sm:inline-flex" />
        </a>

        {/* Desktop & Laptop Navigation (1024px+) - Hidden in minimal mode */}
        {!isMinimal && (
          <nav
            aria-label="Chính"
            className="hidden lg:flex items-center gap-1 p-1 bg-[#eff4ff]/80 backdrop-blur-md rounded-full shadow-inner border border-[#dce9ff]/60"
          >
            {navItems.map((link) => {
              const isActive = activeNav === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id, link.href);
                  }}
                  className={`px-3.5 xl:px-4 py-1.5 text-xs xl:text-sm transition-all duration-200 rounded-full font-medium ${
                    isActive
                      ? 'bg-[#006398] text-white shadow-sm font-semibold'
                      : 'text-[#45464d] hover:text-[#006398] hover:bg-[#dce9ff]/50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        )}

        {/* Right CTA & Contact */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop/Tablet Hotline */}
          <div className="hidden md:flex flex-col text-right pr-1">
            <span className="text-[11px] font-semibold text-[#45464d] tracking-wide">{hotlineLabel}</span>
            <a
              href={`tel:${hotlineRaw}`}
              className="text-sm xl:text-base text-[#006398] hover:text-[#00476e] font-extrabold tracking-tight transition-colors inline-flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{hotline}</span>
            </a>
          </div>

          {/* Consultation CTA Button */}
          <button
            onClick={handleOpenQuote}
            className={`${
              isMinimal ? 'inline-flex' : 'hidden sm:inline-flex'
            } items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#006398] to-[#004f7b] text-white text-xs sm:text-sm font-bold tracking-tight shadow-md shadow-[#006398]/20 hover:shadow-lg hover:shadow-[#006398]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300" />
            <span className="whitespace-nowrap">{ctaText}</span>
          </button>

          {/* Mobile Menu Hamburger Toggle - Hidden in minimal mode */}
          {!isMinimal && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Mở menu điều hướng"
              className="lg:hidden p-2 rounded-xl text-[#0b1c30] hover:bg-[#eff4ff] transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#f8f9ff]/98 backdrop-blur-2xl border-b border-[#dce9ff] shadow-xl overflow-hidden"
          >
            <div className="max-w-[1200px] mx-auto px-4 py-6 space-y-4">
              <nav className="flex flex-col space-y-1">
                {navItems.map((link) => {
                  const isActive = activeNav === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.id, link.href);
                      }}
                      className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-[#006398] text-white'
                          : 'text-[#0b1c30] hover:bg-[#eff4ff] hover:text-[#006398]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-4 h-4 opacity-70" />
                    </a>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-[#dce9ff] space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#eff4ff]">
                  <div className="flex items-center gap-2.5 text-[#006398]">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs font-bold">{hotlineLabel}</span>
                  </div>
                  <a
                    href={`tel:${hotlineRaw}`}
                    className="text-sm font-extrabold text-[#006398]"
                  >
                    {hotline}
                  </a>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenQuote();
                  }}
                  className="w-full py-3 rounded-xl bg-[#006398] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#006398]/20"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>{ctaText}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
