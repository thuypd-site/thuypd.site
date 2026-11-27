export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const primaryNavItems: NavItem[] = [
  { id: 'dich-vu', label: 'Dịch Vụ', href: '#dich-vu' },
  { id: 'kho-giao-dien', label: 'Kho Giao Diện', href: '#kho-giao-dien' },
  { id: 'bang-gia', label: 'Bảng Giá', href: '#bang-gia' },
  { id: 'quy-trinh', label: 'Quy Trình', href: '#quy-trinh' },
  { id: 'faq', label: 'Hỏi Đáp', href: '#faq' },
];

export const footerServiceLinks: NavItem[] = [
  { id: 'srv-custom', label: 'Website Doanh Nghiệp Theo Yêu Cầu', href: '#dich-vu' },
  { id: 'srv-ecom', label: 'Website Bán Hàng & TMĐT', href: '#dich-vu' },
  { id: 'srv-landing', label: 'Landing Page Tối Ưu Chuyển Đổi', href: '#dich-vu' },
  { id: 'srv-seo', label: 'Tối Ưu Chuẩn SEO Google & Tốc Độ', href: '#dich-vu' },
];

export const footerQuickLinks: NavItem[] = [
  { id: 'ql-pricing', label: 'Bảng Giá Trọn Gói', href: '#bang-gia' },
  { id: 'ql-themes', label: 'Kho Giao Diện Mẫu', href: '#kho-giao-dien' },
  { id: 'ql-process', label: 'Quy Trình Triển Khai', href: '#quy-trinh' },
  { id: 'ql-domain', label: 'Tra Cứu Tên Miền', href: '#ten-mien' },
  { id: 'ql-faq', label: 'Câu Hỏi Thường Gặp', href: '#faq' },
];
