import { ServiceItem } from '../types/service.types';

export const mockServices: ServiceItem[] = [
  {
    id: 'service-custom',
    serviceId: 'service-custom',
    icon: 'design_services',
    title: 'Thiết Kế & Phát Triển Website Theo Yêu Cầu',
    description: 'Nghiên cứu kỹ sản phẩm và dịch vụ của bạn để dựng giao diện độc quyền, tối ưu trải nghiệm người dùng và đáp ứng đúng mọi tính năng kinh doanh.',
    tag: 'Phát triển riêng 100% · Giao diện độc quyền',
  },
  {
    id: 'service-corporate',
    serviceId: 'service-corporate',
    icon: 'domain',
    title: 'Website Giới Thiệu Công Ty & Dịch Vụ',
    description: 'Khẳng định vị thế và uy tín doanh nghiệp với phong cách hiện đại, thanh lịch, giúp khách hàng và đối tác tin tưởng ngay từ lần đầu truy cập.',
    tag: 'Nâng tầm uy tín · Khẳng định vị thế',
  },
  {
    id: 'service-ecommerce',
    serviceId: 'service-ecommerce',
    icon: 'shopping_bag',
    title: 'Website Bán Hàng Trực Tuyến & Cửa Hàng',
    description: 'Quy trình đặt mua nhanh gọn, giỏ hàng trực quan, tích hợp thanh toán chuyển khoản quét mã QR và cổng thanh toán tự động tiện lợi.',
    tag: 'Tối ưu bán hàng · Dễ chốt đơn',
  },
  {
    id: 'service-landing',
    serviceId: 'service-landing',
    icon: 'rocket_launch',
    title: 'Landing Page Chạy Quảng Cáo & Dự Án',
    description: 'Bố cục dẫn dắt cảm xúc người mua, nút gọi và chat Zalo nổi bật, tốc độ mở trang tức thì giúp tối ưu tối đa chi phí quảng cáo Ads.',
    tag: 'Mở trang < 1s · Tối ưu chuyển đổi Ads',
  },
  {
    id: 'service-seo',
    serviceId: 'service-seo',
    icon: 'trending_up',
    title: 'Tối Ưu Chuẩn SEO Lên Top Google',
    description: 'Cấu trúc website thân thiện với Google, tối ưu tốc độ và thẻ tìm kiếm giúp thương hiệu của bạn tiếp cận khách hàng tiềm năng lâu dài.',
    tag: 'Chuẩn SEO Google · Tải trang tức thì',
  },
  {
    id: 'service-support',
    serviceId: 'service-support',
    icon: 'support_agent',
    title: 'Bảo Hành Trọn Đời & Hướng Dẫn Tận Tình',
    description: 'Bàn giao toàn quyền quản trị website, hướng dẫn bạn sử dụng 1-1 và đội ngũ kỹ thuật luôn túc trực hỗ trợ trong suốt quá trình kinh doanh.',
    tag: 'Sở hữu trọn vẹn · Đồng hành dài lâu',
  },
];
