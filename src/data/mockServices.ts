import { ServiceItem } from '../types/service.types';

export const mockServices: ServiceItem[] = [
  {
    id: 'service-custom',
    serviceId: 'service-custom',
    icon: 'design_services',
    title: 'Thiết Kế Web Theo Yêu Cầu Riêng',
    description: 'Nghiên cứu bản sắc doanh nghiệp, lập trình giao diện độc bản, tối ưu trải nghiệm UI/UX sắc nét và đáp ứng chuẩn xác mọi tính năng kinh doanh.',
    tag: 'Theo yêu cầu 100% · Nhận diện độc quyền',
  },
  {
    id: 'service-corporate',
    serviceId: 'service-corporate',
    icon: 'domain',
    title: 'Website Giới Thiệu Doanh Nghiệp & Dịch Vụ',
    description: 'Xây dựng uy tín thương hiệu, nâng tầm vị thế công ty, giúp khách hàng tin tưởng và an tâm hợp tác ngay từ lần truy cập đầu tiên.',
    tag: 'Nâng tầm uy tín · Khẳng định thương hiệu',
  },
  {
    id: 'service-ecommerce',
    serviceId: 'service-ecommerce',
    icon: 'shopping_bag',
    title: 'Website Bán Hàng / Cửa Hàng Trực Tuyến TMĐT',
    description: 'Quy trình đặt mua 1 chạm, giỏ hàng mượt mà, tích hợp cổng thanh toán trực tuyến (VNPAY, MoMo) và hệ thống đồng bộ kho vận chuyên nghiệp.',
    tag: 'Tối ưu chuyển đổi · Tự động hóa bán hàng',
  },
  {
    id: 'service-landing',
    serviceId: 'service-landing',
    icon: 'rocket_launch',
    title: 'Landing Page Chạy Ads & Giới Thiệu Dự Án',
    description: 'Bố cục chuẩn tâm lý học hành vi khách hàng, call-to-action mạnh mẽ, tốc độ tải trang cực nhanh, tối đa hóa tỉ lệ chuyển đổi đơn hàng.',
    tag: 'Tốc độ < 1s · Tối đa ROI quảng cáo',
  },
  {
    id: 'service-seo',
    serviceId: 'service-seo',
    icon: 'trending_up',
    title: 'Tối Ưu SEO Google On-page 98+',
    description: 'Cấu trúc schema chuẩn Rich Snippets, sitemap tự động, thẻ meta linh hoạt giúp từ khóa lên top bền vững trên công cụ tìm kiếm Google.',
    tag: 'Chuẩn SEO Google · Core Web Vitals 98+',
  },
  {
    id: 'service-support',
    serviceId: 'service-support',
    icon: 'support_agent',
    title: 'Bảo Hành Trọn Đời & Bàn Giao Mã Nguồn',
    description: 'Bàn giao 100% mã nguồn sạch độc quyền, hướng dẫn quản trị trực quan 1-1 qua video và đội ngũ kỹ thuật trực hỗ trợ 24/7/365.',
    tag: 'Sở hữu vĩnh viễn · Hỗ trợ trọn đời',
  },
];
