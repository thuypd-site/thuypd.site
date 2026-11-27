'use client';

import React from 'react';

export interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  iconOnly?: boolean;
}

const SIZE_MAP = {
  sm: { icon: 30, text: 'text-[15px]', badge: 'text-[10px] px-1.5 py-0.5', sub: 'text-[9px]' },
  md: { icon: 34, text: 'text-[17px]', badge: 'text-[10px] px-1.5 py-0.5', sub: 'text-[9.5px]' },
  lg: { icon: 40, text: 'text-xl', badge: 'text-[11px] px-2 py-0.5', sub: 'text-[10px]' },
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'auto',
  size = 'md',
  showText = true,
  className = '',
  iconOnly = false,
}) => {
  const cfg = SIZE_MAP[size];
  const isDark = variant === 'dark';

  const iconElement = (
    <svg
      viewBox="0 0 36 36"
      width={cfg.icon}
      height={cfg.icon}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <rect width="36" height="36" rx="9" fill="#533afd" />
      <path
        d="M9.5 12.5C9.5 11.3954 10.3954 10.5 11.5 10.5H24.5C25.6046 10.5 26.5 11.3954 26.5 12.5C26.5 13.6046 25.6046 14.5 24.5 14.5H11.5C10.3954 14.5 9.5 13.6046 9.5 12.5Z"
        fill="#ffffff"
      />
      <rect x="16" y="14.5" width="4" height="12.5" rx="2" fill="#ffffff" />
      <circle cx="24.5" cy="24.5" r="2.2" fill="#a5b4fc" />
    </svg>
  );

  if (iconOnly || !showText) {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {iconElement}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {iconElement}
      <div className="flex flex-col justify-center text-left leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-bold tracking-tight ${cfg.text} ${
              isDark ? 'text-white' : 'text-[#0d253d]'
            }`}
          >
            THUYPD
          </span>
          <span
            className={`font-mono font-semibold rounded border leading-none ${cfg.badge} ${
              isDark
                ? 'bg-[#533afd]/20 text-indigo-300 border-[#533afd]/40'
                : 'bg-[#eef2ff] text-[#4434d4] border-[#c7d2fe]'
            }`}
          >
            .SITE
          </span>
        </div>
        <span
          className={`font-medium tracking-wide mt-0.5 ${cfg.sub} ${
            isDark ? 'text-slate-400' : 'text-[#64748d]'
          }`}
        >
          Thiết Kế Website Chuyên Nghiệp
        </span>
      </div>
    </div>
  );
};
