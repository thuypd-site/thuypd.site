'use client';

import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * 1. IconWebDesign: Thiết Kế Website Độc Bản & UI/UX Chuyên Nghiệp
 */
export const IconWebDesign: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="2.5" y="3.5" width="19" height="15" rx="2.5" />
    <path d="M2.5 8h19" />
    <circle cx="5.5" cy="5.75" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="8" cy="5.75" r="0.75" fill="currentColor" stroke="none" />
    <path d="M6 12h5" />
    <path d="M6 15h3" />
    <rect x="14" y="11" width="4.5" height="4.5" rx="1" strokeWidth="1.5" />
    <path d="M8 18.5v2" />
    <path d="M16 18.5v2" />
    <path d="M5 20.5h14" />
  </svg>
);

/**
 * 2. IconEcommerce: Website Bán Hàng & Chốt Đơn Tối Ưu
 */
export const IconEcommerce: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M6 3h12l1.5 5H4.5L6 3z" />
    <path d="M4 8l1.5 12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2L20 8" />
    <path d="M9 12a3 3 0 0 0 6 0" />
    <circle cx="12" cy="16.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * 3. IconCorporate: Website Doanh Nghiệp & Hồ Sơ Năng Lực
 */
export const IconCorporate: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M3 21h18" />
    <path d="M5 21V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15" />
    <path d="M15 10h4a2 2 0 0 1 2 2v9" />
    <path d="M8.5 8h1" />
    <path d="M11.5 8h1" />
    <path d="M8.5 12h1" />
    <path d="M11.5 12h1" />
    <path d="M8.5 16h1" />
    <path d="M11.5 16h1" />
    <path d="M17.5 14h1" />
    <path d="M17.5 17h1" />
  </svg>
);

/**
 * 4. IconSEO: Chuẩn SEO Google & Tăng Trưởng Bền Vững
 */
export const IconSEO: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5l5 5" />
    <path d="M7.5 12l2-2.5 2 1.5 3-3.5" />
    <path d="M12.5 7.5h2v2" />
  </svg>
);

/**
 * 5. IconSpeed: Tốc Độ Tải Trang Siêu Tốc < 1 Giây
 */
export const IconSpeed: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 4a9 9 0 0 0-9 9c0 3.1 1.6 5.8 4 7.4" />
    <path d="M17 20.4c2.4-1.6 4-4.3 4-7.4a9 9 0 0 0-9-9" />
    <circle cx="12" cy="13" r="2" />
    <path d="M13.5 11.5L16.5 7" />
    <path d="M12 21v-2" />
    <path d="M6 13H4" />
    <path d="M20 13h-2" />
  </svg>
);

/**
 * 6. IconCloudServer: Máy Chủ Tốc Độ Cao & Nâng Cấp Hệ Thống
 */
export const IconCloudServer: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="3" y="4" width="18" height="6" rx="2" />
    <rect x="3" y="14" width="18" height="6" rx="2" />
    <circle cx="6.5" cy="7" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="9.5" cy="7" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="6.5" cy="17" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="9.5" cy="17" r="0.8" fill="currentColor" stroke="none" />
    <path d="M16.5 7h1" />
    <path d="M16.5 17h1" />
  </svg>
);

/**
 * 7. IconShieldSecurity: Toàn Quyền Sở Hữu & Bảo Mật Chuẩn Chỉ
 */
export const IconShieldSecurity: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 3l7 3.5v5.5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6.5L12 3z" />
    <path d="M9.5 12l1.75 1.75L15 9.5" />
  </svg>
);

/**
 * 8. IconResponsive: Chuẩn Hiển Thị Điện Thoại & Máy Tính
 */
export const IconResponsive: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="2" y="4" width="14" height="11" rx="2" />
    <path d="M6 18h6" />
    <path d="M9 15v3" />
    <rect x="15" y="9" width="7" height="12" rx="1.5" />
    <circle cx="18.5" cy="18.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * 9. IconConsult: Bước 1 - Lắng Nghe & Lên Khung Sườn Web
 */
export const IconConsult: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M8 12h5" />
    <path d="M8 16h8" />
    <circle cx="16" cy="12" r="2.5" />
    <path d="M17.8 13.8L20 16" />
  </svg>
);

/**
 * 10. IconPrototype: Bước 2 - Thiết Kế Giao Diện Chi Tiết
 */
export const IconPrototype: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="2.5" />
    <circle cx="8" cy="8" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
    <path d="M14 14l3 3" />
  </svg>
);

/**
 * 11. IconDevelopment: Bước 3 - Xây Dựng & Tối Ưu Hệ Thống
 */
export const IconDevelopment: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M8 8L3.5 12 8 16" />
    <path d="M16 8l4.5 4-4.5 4" />
    <path d="M13 5l-2 14" />
  </svg>
);

/**
 * 12. IconHandover: Bước 4 - Bàn Giao & Hướng Dẫn Tận Tình
 */
export const IconHandover: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="3" y="8" width="18" height="13" rx="2" />
    <path d="M12 8v13" />
    <path d="M3 12h18" />
    <path d="M8 4a2 2 0 0 1 4 0c0 1.5-2 3.5-2 4" />
    <path d="M16 4a2 2 0 0 0-4 0c0 1.5 2 3.5 2 4" />
  </svg>
);

/**
 * 13. IconCheckCircle: Dấu Tích Mềm Mại Xác Nhận Hạng Mục
 */
export const IconCheckCircle: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="10" cy="10" r="8" />
    <path d="M7 10.2l2.1 2.1 4.2-4.5" />
  </svg>
);

/**
 * 14. IconClock: Thời Gian Hoàn Thành
 */
export const IconClock: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

/**
 * 15. IconSparkle: Điểm Nhấn Tinh Tế & Thanh Lịch
 */
export const IconSparkle: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2L12 2z" />
  </svg>
);

/**
 * 16. IconArrowRight: Mũi Tên Chuyển Động Thanh Thoát
 */
export const IconArrowRight: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

/**
 * 17. IconPhoneCall: Hotline & Tư Vấn Nhanh
 */
export const IconPhoneCall: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

/**
 * 18. IconSearch: Tìm Kiếm & Tra Cứu Tên Miền
 */
export const IconSearch: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

/**
 * 19. IconBadge: Khung Chứa Icon Chuẩn Hài Hòa Trung Tính
 */
export interface IconBadgeProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const IconBadge: React.FC<IconBadgeProps> = ({ children, className = '', size = 'md' }) => {
  const sizeClass = {
    sm: 'w-9 h-9 rounded-lg',
    md: 'w-11 h-11 rounded-lg',
    lg: 'w-12 h-12 rounded-xl',
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center bg-[#eef2ff] border border-[#e3e8ee] text-[#533afd] transition-colors duration-200 group-hover:bg-[#533afd] group-hover:text-white group-hover:border-[#533afd] ${sizeClass} ${className}`}
    >
      {children}
    </div>
  );
};
