'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Palette,
  Building2,
  MousePointerClick,
  TrendingUp,
  Server,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { SpotlightCard } from '../../common';

const iconMap: Record<string, React.ReactNode> = {
  design_services: <Palette className="w-6 h-6 sm:w-7 sm:h-7" />,
  domain: <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />,
  ads_click: <MousePointerClick className="w-6 h-6 sm:w-7 sm:h-7" />,
  query_stats: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />,
  dns: <Server className="w-6 h-6 sm:w-7 sm:h-7" />,
  build_circle: <Wrench className="w-6 h-6 sm:w-7 sm:h-7" />,
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
            spotlightColor="rgba(91, 184, 254, 0.15)"
            className="h-full p-6 rounded-2xl bg-white shadow-sm border border-[#dce9ff]/80 hover:border-[#006398]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#006398] flex items-center justify-center group-hover:bg-[#006398] group-hover:text-white group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                {iconMap[service.icon] || <Sparkles className="w-6 h-6" />}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors leading-snug">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#eff4ff] flex items-center justify-between">
              <span className="text-xs text-[#006398] font-semibold">{service.tag}</span>
              <a
                href="#nhan-bao-gia"
                className="flex items-center gap-1 text-xs font-bold text-[#006398] group-hover:translate-x-1 transition-transform"
              >
                <span>Xem chi tiết</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  );
};
