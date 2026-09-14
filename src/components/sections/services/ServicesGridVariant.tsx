'use client';

import React from 'react';
import { motion } from 'motion/react';
import { SpotlightCard } from '../../common';
import {
  IconWebDesign,
  IconCorporate,
  IconEcommerce,
  IconSEO,
  IconCloudServer,
  IconShieldSecurity,
  IconSpeed,
  IconArrowRight,
  IconBadge,
} from '../../icons';

const getServiceIcon = (iconKey?: string, index: number = 0) => {
  const iconProps = { size: 24, className: 'transition-transform duration-300 group-hover:scale-110' };
  switch (iconKey) {
    case 'design_services':
      return <IconWebDesign {...iconProps} />;
    case 'domain':
      return <IconCorporate {...iconProps} />;
    case 'ads_click':
      return <IconEcommerce {...iconProps} />;
    case 'query_stats':
      return <IconSEO {...iconProps} />;
    case 'dns':
      return <IconCloudServer {...iconProps} />;
    case 'build_circle':
      return <IconSpeed {...iconProps} />;
    default: {
      const fallbackIcons = [
        <IconWebDesign {...iconProps} key="0" />,
        <IconEcommerce {...iconProps} key="1" />,
        <IconCorporate {...iconProps} key="2" />,
        <IconSEO {...iconProps} key="3" />,
        <IconCloudServer {...iconProps} key="4" />,
        <IconShieldSecurity {...iconProps} key="5" />,
      ];
      return fallbackIcons[index % fallbackIcons.length];
    }
  }
};

export interface ServicesGridVariantProps {
  services: any[];
}

export const ServicesGridVariant: React.FC<ServicesGridVariantProps> = ({ services }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {services.map((service, index) => (
        <motion.div
          key={service.id || service.serviceId || index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.06 }}
          className="h-full"
        >
          <SpotlightCard
            spotlightColor="rgba(0, 99, 152, 0.08)"
            className="h-full p-6 sm:p-7 rounded-2xl bg-white shadow-2xs border border-slate-200/80 hover:border-[#006398]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <IconBadge size="md">
                {getServiceIcon(service.icon, index)}
              </IconBadge>

              <h3 className="text-base sm:text-lg font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors leading-snug">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold group-hover:text-[#006398] transition-colors">
                {service.tag}
              </span>
              <a
                href="#nhan-bao-gia"
                className="flex items-center gap-1 text-xs font-bold text-[#006398] group-hover:translate-x-1 transition-transform"
              >
                <span>Xem chi tiết</span>
                <IconArrowRight size={15} />
              </a>
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  );
};
