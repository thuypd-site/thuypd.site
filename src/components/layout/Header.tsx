'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { primaryNavItems } from '../../config/navigation.config';
import { useSettings } from '../../features/settings/hooks/useSettings';
import { useLandingConfig } from '../../features/landing/context/LandingConfigContext';
import { Logo } from '../common/Logo';

export interface HeaderProps {
  onOpenQuoteModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const { settings } = useSettings();
  const { sections } = useLandingConfig();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string>('');

  const headerSec = sections.find((s) => s.id === 'header');
  const headerContent = headerSec?.id === 'header' ? headerSec.content : undefined;

  const navItems =
    headerContent?.navItems && headerContent.navItems.length > 0
      ? headerContent.navItems.map((item) => ({
          id: item.id || item.href,
          label: item.name,
          href: item.href,
        }))
      : primaryNavItems;

  const ctaText = headerContent?.ctaText || 'Nhận Báo Giá';
  const ctaLink = headerContent?.ctaLink || '#nhan-bao-gia';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const targets = navItems
      .map((item) => {
        if (!item.href.startsWith('#')) return null;
        return document.querySelector(item.href);
      })
      .filter((el): el is Element => Boolean(el));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.4] }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navItems]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setActiveHref(href);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#e3e8ee] shadow-sm'
          : 'bg-white/80 backdrop-blur-sm border-b border-[#e3e8ee]/70'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveHref('');
          }}
          className="shrink-0 focus:outline-none"
          aria-label="THUYPD.SITE Trang chủ"
        >
          <Logo size="sm" />
        </a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Điều hướng chính">
          {navItems.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#533afd] bg-[#eef2ff]'
                    : 'text-[#273951] hover:text-[#0d253d] hover:bg-[#f6f9fc]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 shrink-0">
          {settings.hotline && (
            <a
              href={`tel:${settings.hotlineRaw || settings.hotline.replace(/\D/g, '')}`}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-medium text-[#64748d] hover:text-[#0d253d] px-2.5 py-1.5 rounded-full hover:bg-[#f6f9fc] transition-colors tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-[#533afd]" />
              <span>{settings.hotline}</span>
            </a>
          )}

          {onOpenQuoteModal ? (
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#533afd] hover:bg-[#4434d4] active:bg-[#2e2b8c] text-white text-sm font-medium transition-colors cursor-pointer"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <a
              href={ctaLink}
              onClick={(e) => handleNavClick(e, ctaLink)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#533afd] hover:bg-[#4434d4] active:bg-[#2e2b8c] text-white text-sm font-medium transition-colors"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#0d253d] hover:bg-[#f6f9fc] transition-colors"
            aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-white border-b border-[#e3e8ee] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#273951] hover:text-[#0d253d] hover:bg-[#f6f9fc]"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-[#e3e8ee] flex flex-col gap-2">
                <a
                  href={`tel:${settings.hotlineRaw || settings.hotline?.replace(/\D/g, '')}`}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-full border border-[#e3e8ee] text-sm font-medium text-[#0d253d] tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#533afd]" />
                  <span>Gọi {settings.hotline}</span>
                </a>
                <a
                  href={ctaLink}
                  onClick={(e) => handleNavClick(e, ctaLink)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#533afd] text-white text-sm font-medium"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
