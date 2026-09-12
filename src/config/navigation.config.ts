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
  { id: 'srv-custom', label: 'Thiết Kế & Phát Triển Theo Yêu Cầu', href: '#dich-vu' },
  { id: 'srv-corp', label: 'Website Giới Thiệu Doanh Nghiệp', href: '#dich-vu' },
  { id: 'srv-ecom', label: 'Website Bán Hàng & Thương Mại Điện Tử', href: '#dich-vu' },
  { id: 'srv-landing', label: 'Landing Page Tối Ưu Tỉ Lệ Chuyển Đổi', href: '#dich-vu' },
  { id: 'srv-seo', label: 'Tối Ưu Chuẩn SEO Google & Tốc Độ < 1s', href: '#dich-vu' },
];

export const footerQuickLinks: NavItem[] = [
  { id: 'ql-home', label: 'Về THUYPD.SITE Studio', href: '#' },
  { id: 'ql-pricing', label: 'Bảng Giá Dịch Vụ Trọn Gói', href: '#bang-gia' },
  { id: 'ql-themes', label: 'Kho Giao Diện Mẫu (Demo)', href: '#kho-giao-dien' },
  { id: 'ql-commit', label: '4 Cam Kết Chất Lượng Vàng', href: '#loi-ich' },
  { id: 'ql-domain', label: 'Công Cụ Tra Cứu Tên Miền', href: '#tra-cuu-ten-mien' },
  { id: 'ql-faq', label: 'Câu Hỏi Thường Gặp (FAQ)', href: '#faq' },
];
