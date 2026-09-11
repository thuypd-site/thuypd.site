/**
 * Navigation Configuration
 * Defines primary menu items, quick links, and footer links.
 */
export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const primaryNavItems: NavItem[] = [
  { id: 'home', label: 'Trang chủ', href: '#' },
  { id: 'dich-vu', label: 'Dịch vụ', href: '#dich-vu' },
  { id: 'kho-giao-dien', label: 'Kho giao diện', href: '#kho-giao-dien' },
  { id: 'bang-gia', label: 'Bảng giá', href: '#bang-gia' },
  { id: 'danh-gia', label: 'Đánh giá', href: '#danh-gia' },
];

export const footerServiceLinks: NavItem[] = [
  { id: 'srv-custom', label: 'Thiết Kế Web Theo Yêu Cầu Riêng', href: '#dich-vu' },
  { id: 'srv-corp', label: 'Website Giới Thiệu Doanh Nghiệp', href: '#dich-vu' },
  { id: 'srv-ecom', label: 'Website Bán Hàng & E-Commerce', href: '#dich-vu' },
  { id: 'srv-landing', label: 'Landing Page Chạy Ads Tối Ưu Tỉ Lệ Chuyển Đổi', href: '#dich-vu' },
  { id: 'srv-seo', label: 'Tối Ưu SEO Google On-page 98+', href: '#dich-vu' },
];

export const footerQuickLinks: NavItem[] = [
  { id: 'ql-home', label: 'Về THUYPD.SITE', href: '#' },
  { id: 'ql-themes', label: 'Xem Thư Viện Mẫu Website', href: '#kho-giao-dien' },
  { id: 'ql-pricing', label: 'Bảng Giá Chi Tiết & Khuyến Mãi', href: '#bang-gia' },
  { id: 'ql-domain', label: 'Tra Cứu Tên Miền Độc Quyền', href: '#tra-cuu-ten-mien' },
  { id: 'ql-quote', label: 'Đăng Ký Nhận Báo Giá Dự Án', href: '#nhan-bao-gia' },
];
