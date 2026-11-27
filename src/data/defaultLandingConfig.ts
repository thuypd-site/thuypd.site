import { LandingPageConfig } from '../types/landingConfig.types';

export const defaultLandingConfig: LandingPageConfig = {
  version: 1,
  lastUpdated: '2026-11-27T00:00:00.000Z',
  pageTitle: 'THUYPD.SITE — Thiết Kế Website Chuyên Nghiệp, Chuẩn SEO & Tối Ưu Chuyển Đổi',
  metaDescription:
    'Dịch vụ thiết kế website chuyên nghiệp theo yêu cầu, tối ưu tốc độ dưới 1s, chuẩn SEO Google, bàn giao toàn quyền quản trị website và bảo hành chu đáo.',
  ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  theme: {
    primaryColor: '#533afd',
    accentColor: '#4434d4',
    fontFamily: 'Be Vietnam Pro',
  },
  sections: [
    {
      id: 'header',
      name: 'Thanh Điều Hướng (Header)',
      enabled: true,
      displayStyle: 'default',
      content: {
        ctaText: 'Nhận Báo Giá',
        ctaLink: '#nhan-bao-gia',
        navItems: [
          { id: 'nav-services', name: 'Dịch Vụ', href: '#dich-vu' },
          { id: 'nav-themes', name: 'Kho Giao Diện', href: '#kho-giao-dien' },
          { id: 'nav-pricing', name: 'Bảng Giá', href: '#bang-gia' },
          { id: 'nav-process', name: 'Quy Trình', href: '#quy-trinh' },
          { id: 'nav-faq', name: 'Hỏi Đáp', href: '#faq' },
        ],
      },
    },
    {
      id: 'hero',
      name: 'Hero Đầu Trang',
      enabled: true,
      displayStyle: 'default',
      content: {
        badgeText: 'Thiết kế website theo yêu cầu · Chuẩn SEO Google · Bàn giao 100%',
        headlineMain: 'Thiết Kế Website Chuyên Nghiệp,',
        headlineHighlight: 'Tối Ưu Tốc Độ & Chuyển Đổi',
        description:
          'Xây dựng website độc bản theo nhận diện thương hiệu của bạn, tải trang dưới 1 giây, chuẩn SEO Google và bàn giao toàn quyền quản trị không chi phí ẩn.',
        ctaPrimaryText: 'Xem Bảng Giá Trọn Gói',
        ctaPrimaryLink: '#bang-gia',
        ctaSecondaryText: 'Khám Phá Kho Mẫu',
        ctaSecondaryLink: '#kho-giao-dien',
        pillars: [
          {
            id: 'p1',
            value: '150+',
            title: 'Dự án bàn giao',
            desc: 'Đa dạng ngành nghề doanh nghiệp & bán lẻ',
          },
          {
            id: 'p2',
            value: '< 0.8s',
            title: 'Tốc độ tải trang',
            desc: 'Tối ưu Core Web Vitals & SEO Google 99/100',
          },
          {
            id: 'p3',
            value: '100%',
            title: 'Toàn quyền sở hữu',
            desc: 'Bàn giao mã nguồn, tên miền & bảo hành dài hạn',
          },
        ],
      },
    },
    {
      id: 'logobar',
      name: 'Số Liệu Năng Lực',
      enabled: true,
      displayStyle: 'default',
      content: {
        title: 'Con Số Minh Chứng Năng Lực Triển Khai',
        statsText: 'Cam kết minh bạch tiến độ và chất lượng vận hành sau bàn giao',
        items: [
          { number: '150+', label: 'Website đã hoàn thiện', suffix: '' },
          { number: '99.8%', label: 'Khách hàng hài lòng', suffix: '' },
          { number: '3 - 5', label: 'Ngày bàn giao trung bình', suffix: 'ngày' },
          { number: '24/7', label: 'Hỗ trợ kỹ thuật trực tiếp', suffix: '' },
        ],
      },
    },
    {
      id: 'services',
      name: 'Dịch Vụ Trọng Tâm',
      enabled: true,
      displayStyle: 'default',
      content: {
        badge: 'Giải Pháp Toàn Diện',
        title: 'Dịch Vụ Thiết Kế & Phát Triển Website',
        subtitle:
          'Kiến trúc gọn nhẹ, dễ mở rộng và tối ưu trải nghiệm người dùng theo đúng mục tiêu kinh doanh của bạn.',
        items: [
          {
            id: 'service-custom',
            icon: 'design_services',
            title: 'Website Doanh Nghiệp Theo Yêu Cầu',
            description:
              'Thiết kế giao diện riêng biệt theo bộ nhận diện thương hiệu, trình bày hồ sơ năng lực chuyên nghiệp.',
            tag: 'Độc bản 100%',
          },
          {
            id: 'service-ecommerce',
            icon: 'ads_click',
            title: 'Website Bán Hàng & Thương Mại Điện Tử',
            description:
              'Quản lý sản phẩm, giỏ hàng, thanh toán QR/VNPay và thông báo đơn hàng tức thì về Zalo.',
            tag: 'Tối ưu chốt đơn',
          },
          {
            id: 'service-landing',
            icon: 'rocket_launch',
            title: 'Landing Page Quảng Cáo & Thu Lead',
            description:
              'Tập trung tỷ lệ chuyển đổi cho chiến dịch Google Ads, Facebook Ads với tốc độ tải siêu nhanh.',
            tag: 'Tăng chuyển đổi',
          },
          {
            id: 'service-seo',
            icon: 'query_stats',
            title: 'Tối Ưu Tốc Độ & Chuẩn SEO Google',
            description:
              'Cấu trúc dữ liệu Schema chuẩn mực, URL thân thiện và tối ưu điểm hiệu năng Core Web Vitals.',
            tag: 'Chuẩn SEO 99+',
          },
          {
            id: 'service-cms',
            icon: 'dashboard',
            title: 'Hệ Thống Quản Trị Tiếng Việt Trực Quan',
            description:
              'Tự cập nhật bài viết, bảng giá, hình ảnh dễ dàng trên điện thoại và máy tính không cần code.',
            tag: 'Dễ sử dụng',
          },
          {
            id: 'service-hosting',
            icon: 'dns',
            title: 'Hạ Tầng Cloud, SSL & Bảo Hành Trọn Đời',
            description:
              'Sao lưu dữ liệu định kỳ, chứng chỉ bảo mật SSL miễn phí và đồng hành kỹ thuật suốt quá trình vận hành.',
            tag: 'Uptime 99.9%',
          },
        ],
      },
    },
    {
      id: 'themes',
      name: 'Kho Giao Diện Mẫu',
      enabled: true,
      displayStyle: 'default',
      content: {
        badge: 'Kho Mẫu Chọn Lọc',
        title: 'Khám Phá Giao Diện Thực Tế Theo Ngành Nghề',
        subtitle:
          'Xem trước trực quan và chọn phong cách phù hợp để rút ngắn thời gian lên ý tưởng cho dự án của bạn.',
      },
    },
    {
      id: 'pricing',
      name: 'Bảng Giá Trọn Gói',
      enabled: true,
      displayStyle: 'default',
      content: {
        badge: 'Chi Phí Minh Bạch',
        title: 'Bảng Giá Thiết Kế Website Trọn Gói',
        subtitle:
          'Thanh toán rõ ràng theo từng hạng mục, tặng kèm tên miền & hosting năm đầu, cam kết không phát sinh.',
        highlightPlanId: 'plan-professional',
        plans: [
          {
            id: 'plan-basic',
            planId: 'plan-basic',
            name: 'Gói Khởi Nghiệp',
            tierSubtitle: 'Khởi đầu nhanh gọn',
            description: 'Phù hợp cá nhân, cửa hàng nhỏ cần trang giới thiệu & thu khách hàng nhanh.',
            price: 4990000,
            formattedPrice: '4.990.000',
            originalPrice: 6500000,
            completionDays: '2 - 3 ngày',
            period: 'trọn gói',
            isPopular: false,
            features: [
              'Hoàn thiện nhanh trong 2 - 3 ngày',
              'Giao diện chuẩn mobile & máy tính',
              'Tặng tên miền quốc tế (.com / .net) 1 năm',
              'Tặng hosting SSD tốc độ cao 3GB năm đầu',
              'Cài đặt chứng chỉ bảo mật SSL miễn phí',
              'Tối ưu chuẩn SEO cơ bản & Google Analytics',
              'Bảo hành kỹ thuật 12 tháng',
            ],
          },
          {
            id: 'plan-professional',
            planId: 'plan-professional',
            name: 'Gói Chuyên Nghiệp',
            tierSubtitle: 'Phổ biến nhất',
            description: 'Dành cho doanh nghiệp cần website đa trang, CMS quản trị và chuẩn thương hiệu.',
            price: 7990000,
            formattedPrice: '7.990.000',
            originalPrice: 10500000,
            completionDays: '5 - 7 ngày',
            period: 'trọn gói',
            isPopular: true,
            features: [
              'Hoàn thiện trong 5 - 7 ngày làm việc',
              'Thiết kế độc quyền theo nhận diện thương hiệu',
              'Trang quản trị CMS tiếng Việt dễ cập nhật',
              'Tặng tên miền + hosting tốc độ cao 8GB năm đầu',
              'Tốc độ tải trang < 0.8s, chuẩn SEO chuyên sâu',
              'Tích hợp nút gọi, Zalo & form báo giá tự động',
              'Bảo hành và hỗ trợ kỹ thuật trọn đời',
            ],
          },
          {
            id: 'plan-advanced',
            planId: 'plan-advanced',
            name: 'Gói Theo Yêu Cầu',
            tierSubtitle: 'Tùy biến chuyên sâu',
            description: 'Website thương mại điện tử hoặc hệ thống nghiệp vụ thiết kế riêng.',
            price: 12990000,
            formattedPrice: '12.990.000+',
            originalPrice: 16000000,
            completionDays: '10 - 15 ngày',
            period: 'khởi điểm',
            isPopular: false,
            features: [
              'Kiến trúc Next.js & API thiết kế riêng 100%',
              'Quản lý sản phẩm, giỏ hàng & đơn hàng chi tiết',
              'Tích hợp cổng thanh toán QR / VNPay / MoMo',
              'Thông báo đơn hàng tự động về Zalo / Telegram',
              'Hạ tầng chịu tải cao, sao lưu tự động hàng ngày',
              'Bàn giao toàn bộ mã nguồn & tài liệu vận hành',
              'Hỗ trợ kỹ thuật ưu tiên 24/7',
            ],
          },
        ],
      },
    },
    {
      id: 'advantages',
      name: 'Quy Trình & Cam Kết',
      enabled: true,
      displayStyle: 'default',
      content: {
        badge: 'Quy Trình Minh Bạch',
        title: '4 Bước Triển Khai Rõ Ràng Từ Ý Tưởng Đến Bàn Giao',
        subtitle:
          'Mọi giai đoạn đều có đầu mối trao đổi trực tiếp, duyệt giao diện trước khi lập trình và bàn giao toàn quyền sở hữu.',
        steps: [
          {
            step: '01',
            days: 'Ngày 1 - 2',
            title: 'Tiếp Nhận & Lên Khung',
            desc: 'Trao đổi mục tiêu kinh doanh, thống nhất cấu trúc nội dung và phương án triển khai phù hợp ngân sách.',
          },
          {
            step: '02',
            days: 'Ngày 3 - 5',
            title: 'Thiết Kế Giao Diện',
            desc: 'Hoàn thiện bản thiết kế theo đúng màu sắc và phong cách thương hiệu để bạn xem và góp ý trực tiếp.',
          },
          {
            step: '03',
            days: 'Ngày 6 - 8',
            title: 'Lập Trình & Tối Ưu',
            desc: 'Xây dựng hệ thống, kiểm thử hiển thị trên mọi thiết bị, tối ưu tốc độ tải trang và cấu hình SEO.',
          },
          {
            step: '04',
            days: 'Ngày 9 - 10',
            title: 'Nghiệm Thu & Bảo Hành',
            desc: 'Bàn giao toàn bộ tài khoản quản trị, hướng dẫn sử dụng chi tiết 1-1 và kích hoạt bảo hành kỹ thuật.',
          },
        ],
      },
    },
    {
      id: 'domain',
      name: 'Tra Cứu Tên Miền',
      enabled: true,
      displayStyle: 'default',
      content: {
        badge: 'Kiểm Tra Tên Miền',
        title: 'Tra Cứu Tên Miền Cho Thương Hiệu',
        subtitle:
          'Nhập tên thương hiệu để kiểm tra nhanh tình trạng .com, .vn, .net theo thời gian thực.',
        pricing: [
          { tld: '.com', price: '299.000 ₫/năm', popular: true },
          { tld: '.vn', price: '650.000 ₫/năm', popular: true },
          { tld: '.com.vn', price: '550.000 ₫/năm' },
          { tld: '.net', price: '320.000 ₫/năm' },
          { tld: '.site', price: '199.000 ₫/năm' },
          { tld: '.xyz', price: '150.000 ₫/năm' },
        ],
      },
    },
    {
      id: 'testimonials',
      name: 'Đánh Giá Khách Hàng',
      enabled: true,
      displayStyle: 'default',
      content: {
        badge: 'Khách Hàng Chia Sẻ',
        title: 'Được Tin Tưởng Bởi Doanh Nghiệp & Chủ Cửa Hàng',
        subtitle: 'Trải nghiệm thực tế về tốc độ, thẩm mỹ và dịch vụ hỗ trợ sau bàn giao.',
        items: [
          {
            id: 'testi-1',
            author: 'Anh Trần Minh Tuấn',
            role: 'Giám Đốc Điều Hành',
            company: 'TechNova Solutions',
            avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            quote:
              'Website tải rất nhanh, giao diện gọn gàng chuyên nghiệp. Khách hàng tìm thấy qua Google tăng rõ rệt sau 2 tháng vận hành.',
            rating: 5,
          },
          {
            id: 'testi-2',
            author: 'Chị Nguyễn Mai Phương',
            role: 'Founder',
            company: 'Thảo My Spa & Clinic',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            quote:
              'Tính năng đặt lịch và báo tin về Zalo hoạt động ổn định, nhân viên dễ tự cập nhật bảng giá dịch vụ mà không cần nhờ kỹ thuật.',
            rating: 5,
          },
          {
            id: 'testi-3',
            author: 'Anh Lê Quốc Bảo',
            role: 'Quản Lý Kinh Doanh',
            company: 'Nội Thất An Gia',
            avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
            quote:
              'Quy trình làm việc rõ ràng, đúng hẹn từng mốc thiết kế và bàn giao. Chi phí minh bạch đúng như báo giá ban đầu.',
            rating: 5,
          },
        ],
      },
    },
    {
      id: 'faq',
      name: 'Câu Hỏi Thường Gặp',
      enabled: true,
      displayStyle: 'default',
      content: {
        badge: 'Câu Hỏi Thường Gặp',
        title: 'Giải Đáp Nhanh Trước Khi Bắt Đầu',
        subtitle: 'Thông tin rõ ràng về tiến độ, chi phí, quyền sở hữu và chính sách bảo hành.',
        items: [
          {
            question: 'Thời gian hoàn thiện một website là bao lâu?',
            answer:
              'Gói Khởi Nghiệp từ 2 - 3 ngày, Gói Chuyên Nghiệp từ 5 - 7 ngày và Gói Theo Yêu Cầu từ 10 - 15 ngày tùy phạm vi tính năng.',
          },
          {
            question: 'Chi phí báo giá đã bao gồm tên miền và hosting chưa?',
            answer:
              'Tất cả các gói trọn gói đều đã bao gồm tên miền quốc tế (.com / .net) và hosting SSD tốc độ cao cho năm đầu tiên.',
          },
          {
            question: 'Không rành kỹ thuật có tự quản lý nội dung được không?',
            answer:
              'Hệ thống quản trị thiết kế hoàn toàn bằng tiếng Việt, kèm hướng dẫn sử dụng chi tiết giúp bạn tự thay ảnh, giá và bài viết trong vài phút.',
          },
          {
            question: 'Sau khi bàn giao, tôi có toàn quyền sở hữu website không?',
            answer:
              'Có. Bạn nhận đầy đủ tài khoản quản trị, mã nguồn và cơ sở dữ liệu, kèm chính sách bảo hành kỹ thuật đồng hành dài hạn.',
          },
        ],
      },
    },
    {
      id: 'cta',
      name: 'Banner Chuyển Đổi',
      enabled: false,
      displayStyle: 'default',
      content: {
        title: 'Sẵn Sàng Nâng Cấp Website Cho Doanh Nghiệp?',
        subtitle:
          'Nhận tư vấn giải pháp và bản phác thảo bố cục phù hợp với ngành nghề của bạn trong 15 phút.',
        buttonText: 'Nhận Báo Giá Ngay',
        buttonLink: '#nhan-bao-gia',
      },
    },
    {
      id: 'contact',
      name: 'Liên Hệ & Nhận Báo Giá',
      enabled: true,
      displayStyle: 'default',
      content: {
        badge: 'Liên Hệ Tư Vấn',
        title: 'Nhận Tư Vấn & Báo Giá Chi Tiết Trong 15 Phút',
        subtitle:
          'Để lại thông tin hoặc nhắn trực tiếp qua Zalo, chúng tôi sẽ đề xuất phương án phù hợp nhất với ngân sách của bạn.',
        commitments: [
          'Tư vấn đúng nhu cầu thực tế, không phát sinh chi phí ẩn',
          'Báo giá rõ ràng từng hạng mục & tiến độ bàn giao',
          'Bảo mật tuyệt đối thông tin liên hệ của bạn',
        ],
      },
    },
    {
      id: 'footer',
      name: 'Chân Trang (Footer)',
      enabled: true,
      displayStyle: 'default',
      content: {
        brandDescription:
          'Dịch vụ thiết kế & phát triển website chuyên nghiệp theo yêu cầu — tốc độ tải nhanh, chuẩn SEO Google và bàn giao toàn quyền sở hữu.',
        servicesTitle: 'Dịch Vụ',
        quickLinksTitle: 'Điều Hướng',
        contactTitle: 'Liên Hệ',
        copyrightText: '© 2026 THUYPD.SITE. Bảo lưu mọi quyền.',
      },
    },
  ],
};
