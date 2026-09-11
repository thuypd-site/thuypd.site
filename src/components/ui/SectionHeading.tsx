import React from 'react';
import { cn } from '../../core/utils/cn';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
  titleClassName?: string;
  isLight?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  isLight = false,
}) => {
  return (
    <div
      className={cn(
        'max-w-3xl mb-12 sm:mb-16',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            'inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border',
            isLight
              ? 'bg-white/10 text-cyan-300 border-white/20 backdrop-blur-md'
              : 'bg-[#006398]/10 text-[#006398] border-[#006398]/20'
          )}
        >
          {badge}
        </div>
      )}
      <h2
        className={cn(
          'text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight',
          isLight ? 'text-white' : 'text-[#0b1c30]',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-3.5 text-sm sm:text-base leading-relaxed',
            isLight ? 'text-slate-300' : 'text-[#45464d]'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
