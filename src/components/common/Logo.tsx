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
  sm: { icon: 32, text: 'text-base', badge: 'text-[9.5px] px-1.5 py-0.5', sub: 'text-[8.5px]' },
  md: { icon: 38, text: 'text-lg', badge: 'text-[10px] px-2 py-0.5', sub: 'text-[9.5px]' },
  lg: { icon: 44, text: 'text-xl', badge: 'text-[11px] px-2.5 py-0.5', sub: 'text-[10px]' },
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
      viewBox="0 0 40 40"
      width={cfg.icon}
      height={cfg.icon}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      <defs>
        <linearGradient id={`landing-brand-grad-${variant}-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#5bb8fe' : '#006398'} />
          <stop offset="60%" stopColor="#2292d4" />
          <stop offset="100%" stopColor={isDark ? '#006398' : '#5bb8fe'} />
        </linearGradient>

        <linearGradient id={`accent-stem-grad-${variant}-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#5bb8fe' : '#006398'} />
          <stop offset="100%" stopColor={isDark ? '#004f7c' : '#38bdf8'} />
        </linearGradient>

        <linearGradient id={`icon-bg-grad-${variant}-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#172239' : '#ffffff'} />
          <stop offset="100%" stopColor={isDark ? '#0f172a' : '#eff8ff'} />
        </linearGradient>
      </defs>

      {/* Nền bo góc mềm mại, nhẹ nhàng, hòa hợp tuyệt đối với nền website */}
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11"
        fill={`url(#icon-bg-grad-${variant}-${size})`}
        stroke={isDark ? '#233554' : '#dce9ff'}
        strokeWidth="1.2"
      />

      {/* Monogram T thanh thoát, đường nét hài hòa */}
      <g>
        {/* Nét ngang trên bo góc mượt mà */}
        <path
          d="M8.5 13.5C8.5 11.567 10.067 10 12 10H28C29.933 10 31.5 11.567 31.5 13.5C31.5 15.433 29.933 17 28 17H12C10.067 17 8.5 15.433 8.5 13.5Z"
          fill={`url(#landing-brand-grad-${variant}-${size})`}
        />

        {/* Trụ đứng uốn lượn bo cong đáy */}
        <path
          d="M17 15.5H22V26.5C22 29.2614 19.7614 31.5 17 31.5C16.4477 31.5 16 31.0523 16 30.5V16.5C16 15.9477 16.4477 15.5 17 15.5Z"
          fill={`url(#accent-stem-grad-${variant}-${size})`}
        />

        {/* Cánh phụ khí động học tạo nhịp chuyển đổi mềm mại */}
        <path
          d="M22 15.5H25C26.6569 15.5 28 16.8431 28 18.5V20.5C28 21.6046 27.1046 22.5 26 22.5C24.8954 22.5 24 21.6046 24 20.5V18C24 17.4477 23.5523 17 23 17H22V15.5Z"
          fill="#5bb8fe"
          opacity={isDark ? 0.95 : 0.85}
        />

        {/* Điểm sáng điểm xuyết tinh tế */}
        <circle cx="28" cy="13.5" r="1.5" fill="#ffffff" />
      </g>
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
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {iconElement}

      {/* Typography: Khớp màu và font chữ của landing */}
      <div className="flex flex-col justify-center text-left leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-extrabold tracking-tight font-sans ${cfg.text} ${
              isDark ? 'text-white' : 'text-[#0b1c30]'
            }`}
          >
            THUYPD
          </span>
          <span
            className={`font-mono font-bold tracking-wide rounded-md border leading-none shadow-2xs ${cfg.badge} ${
              isDark
                ? 'bg-[#5bb8fe]/15 text-[#5bb8fe] border-[#5bb8fe]/30'
                : 'bg-[#eff8ff] text-[#006398] border-[#dbeafe]'
            }`}
          >
            .SITE
          </span>
        </div>
        <span
          className={`font-semibold tracking-wider uppercase mt-0.5 ${cfg.sub} ${
            isDark ? 'text-slate-400' : 'text-[#5a6068]'
          }`}
        >
          Thiết Kế Website Theo Yêu Cầu
        </span>
      </div>
    </div>
  );
};
