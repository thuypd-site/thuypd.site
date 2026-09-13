'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  MousePointer,
  BadgeDollarSign,
  KeyRound,
  Headset,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { SpotlightCard } from '../../common';

const iconMap: Record<string, React.ReactNode> = {
  touch_app: <MousePointer className="w-6 h-6" />,
  price_check: <BadgeDollarSign className="w-6 h-6" />,
  key: <KeyRound className="w-6 h-6" />,
  support_agent: <Headset className="w-6 h-6" />,
  speed: <Zap className="w-6 h-6" />,
  security: <ShieldCheck className="w-6 h-6" />,
};

export interface AdvantagesGridVariantProps {
  items: any[];
}

export const AdvantagesGridVariant: React.FC<AdvantagesGridVariantProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((adv, idx) => (
        <motion.div
          key={adv.id || idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: idx * 0.08 }}
          className="h-full"
        >
          <SpotlightCard
            spotlightColor="rgba(91, 184, 254, 0.15)"
            className="h-full p-6 rounded-2xl bg-white shadow-sm border border-[#dce9ff]/80 space-y-4 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#006398]/10 text-[#006398] flex items-center justify-center group-hover:bg-[#006398] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                {iconMap[adv.icon] || <CheckCircle2 className="w-6 h-6" />}
              </div>
              <h3 className="text-base font-bold text-[#0b1c30] group-hover:text-[#006398] transition-colors leading-snug">
                {adv.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                {adv.description}
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-[#006398] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Cam kết chuẩn hợp đồng</span>
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  );
};
