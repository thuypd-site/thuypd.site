import { LandingPageConfig, SectionConfig } from '../types/landingConfig.types';
import { mockServices } from './mockServices';
import { mockAdvantages } from './mockAdvantages';
import { mockPricingPlans } from './mockPricing';
import { mockTestimonials } from './mockTestimonials';

export const defaultLandingConfig: LandingPageConfig = {
  version: 2,
  lastUpdated: new Date().toISOString(),
  sections: [
    {
      id: 'hero',
      name: 'Hero Banner & Giới thiệu chính',
      enabled: true,
      displayStyle: 'hero-c',
      availableStyles: [
        { value: 'hero-c', label: 'SaaS Glow (Modern Dark) ⚡', description: 'Giao diện Dark Mode tương phản cao, bảng đối chiếu rủi ro vs cam kết & công cụ chẩn đoán nhu cầu tương tác' },
        { value: 'hero-b', label: 'Center Focus (Linear)', description: 'Căn giữa hiện đại với 3 thẻ bảo chứng chuyển đổi (Core Web Vitals, Độc Bản, Full Code)' },
        { value: 'hero-a', label: 'Split Cột (Classic)', description: '2 Cột: Nội dung bên trái + Bảng chỉ số trải nghiệm thời gian thực bên phải' },
      ],
      content: {
        badgeText: 'Thiết Kế Website Theo Yêu Cầu • Chuẩn SEO Google • Bàn Giao Trọn Gói',
        headlineMain: 'Thiết Kế Website Chuyên Nghiệp,',
        headlineHighlight: 'Đúng Ý & Tối Ưu Chuyển Đổi',
        description: 'Chúng tôi thiết kế và phát triển website độc bản theo nhận diện thương hiệu của bạn, tối ưu tốc độ mở trang dưới 1 giây, chuẩn SEO Google và bàn giao 100% quyền quản trị. Dễ dàng tự cập nhật nội dung, không lo phát sinh chi phí ngầm.',
        ctaPrimaryText: 'Xem Báo Giá Trọn Gói',
        ctaSecondaryText: 'Tư Vấn Miễn Phí',
        pillars: [
          { id: 'p1', value: '100%', title: 'Đúng Ý & Chuẩn Gu', desc: 'Thiết kế riêng biệt theo nhận diện thương hiệu bạn' },
          { id: 'p2', value: '< 1s', title: 'Tải Trang Siêu Tốc', desc: 'Đạt 98-100 điểm Google, giữ chân khách hàng tối đa' },
          { id: 'p3', value: 'Trọn Đời', title: 'Toàn Quyền Sở Hữu', desc: 'Bàn giao trọn bộ mã nguồn, bảo hành chu đáo lâu dài' },
        ],
      },
    },
    {
      id: 'logobar',
      name: 'Thanh Đối tác & Số liệu tin cậy',
      enabled: true,
      displayStyle: 'standard',
      availableStyles: [
        { value: 'standard', label: 'Tiêu chuẩn (Grid thẻ logo & chỉ số)', description: 'Hiển thị các chỉ số cam kết tốc độ, uptime và đối tác công nghệ' },
        { value: 'compact', label: 'Gọn nhẹ (Dải ngang tối giản)', description: 'Thu gọn thanh chỉ số thành 1 hàng mảnh' },
      ],
      content: {
        title: 'Thương Hiệu & Khách Hàng Tin Tưởng Đồng Hành',
        statsText: '100% Khách hàng hài lòng với chất lượng bàn giao và hỗ trợ sau nghiệm thu',
      },
    },
    {
      id: 'services',
      name: 'Dịch vụ nổi bật',
      enabled: true,
      displayStyle: 'services-b',
      availableStyles: [
        { value: 'services-b', label: 'Bento Grid (Stripe)', description: 'Bố cục Bento hiện đại với khối Flagship Service nổi bật và các vệ tinh dịch vụ' },
        { value: 'services-a', label: 'Grid 6 Ô Đối Xứng', description: 'Hiển thị 6 dịch vụ cân xứng chuẩn nhận diện, biểu tượng tương tác' },
      ],
      content: {
        badge: 'Dịch Vụ Trọng Tâm',
        title: 'Giải Pháp Thiết Kế & Phát Triển Website Toàn Diện',
        subtitle: 'Lựa chọn kiến trúc website phù hợp nhất với mô hình kinh doanh của bạn, tối ưu chuyển đổi và đồng hành kỹ thuật bền lâu.',
        items: [...mockServices],
      },
    },
    {
      id: 'advantages',
      name: 'Ưu điểm & Cam kết vàng',
      enabled: true,
      displayStyle: 'commits-b',
      availableStyles: [
        { value: 'commits-b', label: 'Wavy Roadmap 🌊', description: 'Lộ trình thực thi lượn sóng 4 bước với đường dẫn SVG tương tác và mốc nghiệm thu rõ ràng' },
        { value: 'commits-a', label: '4 Cột Đứng', description: '4 Thẻ cam kết chất lượng song song, trực quan và dễ theo dõi' },
      ],
      content: {
        badge: 'Cam Kết Rõ Ràng & Lộ Trình',
        title: '4 Cam Kết Vàng Giúp Bạn An Tâm Tuyệt Đối',
        subtitle: 'Xóa tan nỗi lo web chạy chậm, chi phí phát sinh bất ngờ hay bị bỏ rơi sau khi hoàn tất thanh toán.',
        items: [...mockAdvantages],
      },
    },
    {
      id: 'themes',
      name: 'Kho giao diện mẫu (Theme Showcase)',
      enabled: true,
      displayStyle: 'standard',
      availableStyles: [
        { value: 'standard', label: 'Lưới 3 cột + Bộ lọc đa ngành', description: 'Bộ lọc danh mục mượt mà cùng nút xem trước đa thiết bị' },
        { value: 'compact', label: 'Lưới 4 cột thu gọn', description: 'Hiển thị nhiều mẫu giao diện hơn trên một khung nhìn' },
      ],
      content: {
        badge: 'Mẫu Giao Diện Chọn Lọc',
        title: 'Kho Giao Diện Website Xu Hướng & Tối Ưu Chuyển Đổi',
        subtitle: 'Hơn 100+ mẫu demo thực tế sẵn sàng triển khai nhanh chóng, chuẩn SEO Google và hiển thị đẹp mắt trên mọi thiết bị.',
      },
    },
    {
      id: 'pricing',
      name: 'Bảng giá dịch vụ trọn gói',
      enabled: true,
      displayStyle: 'price-b',
      availableStyles: [
        { value: 'price-b', label: 'Bảng Chi Tiết Tính Năng (Feature Matrix)', description: 'Bảng so sánh chi tiết từng tính năng kỹ thuật, lưu trữ và bảo hành' },
        { value: 'price-a', label: 'Dạng Thẻ So Sánh', description: '3 Thẻ gói giá trực quan với gói Professional nổi bật khuyên dùng' },
      ],
      content: {
        badge: 'Chi Phí Rõ Ràng',
        title: 'Bảng Giá Thiết Kế Website Trọn Gói',
        subtitle: 'Minh bạch từng hạng mục, bàn giao 100% quyền sở hữu mã nguồn, cam kết không phát sinh chi phí ngầm trong suốt quá trình thực hiện.',
        plans: [...mockPricingPlans],
      },
    },
    {
      id: 'domain',
      name: 'Công cụ tra cứu tên miền',
      enabled: true,
      displayStyle: 'standard',
      availableStyles: [
        { value: 'standard', label: 'Thẻ trung tâm', description: 'Khung tìm kiếm nổi bật ở chính giữa với các đuôi tên miền phổ biến' },
        { value: 'minimal', label: 'Thanh tìm kiếm gọn', description: 'Thu nhỏ khoảng cách padding và viền tối giản' },
      ],
      content: {
        badge: 'Tra Cứu Nhanh',
        title: 'Kiểm Tra Tên Miền Cho Thương Hiệu Của Bạn',
        subtitle: 'Kiểm tra nhanh xem tên miền .com, .vn hay .net bạn muốn đã có ai đăng ký chưa chỉ với 1 cú nhấp chuột.',
      },
    },
    {
      id: 'testimonials',
      name: 'Đánh giá từ khách hàng',
      enabled: true,
      displayStyle: 'cards',
      availableStyles: [
        { value: 'cards', label: '3 Thẻ phản hồi trực quan', description: 'Thẻ nhận xét chân thực từ các CEO và doanh nghiệp đối tác' },
        { value: 'compact', label: 'Dạng trích dẫn gọn', description: 'Bố cục trích dẫn súc tích với ngôi sao đánh giá' },
      ],
      content: {
        badge: 'Cảm Nhận Thực Tế',
        title: 'Đồng Hành Cùng Sự Tăng Trưởng Của Khách Hàng',
        subtitle: 'Những chia sẻ chân thật từ các chủ cửa hàng và doanh nghiệp sau khi đưa website vào hoạt động thực tế.',
        items: [...mockTestimonials],
      },
    },
    {
      id: 'faq',
      name: 'Khối Câu hỏi thường gặp (FAQ)',
      enabled: true,
      displayStyle: 'accordion',
      availableStyles: [
        { value: 'accordion', label: 'Accordion thu gọn', description: 'Danh sách câu hỏi mở rộng đóng lại mượt mà' },
      ],
      content: {
        badge: 'Giải Đáp Thắc Mắc',
        title: 'Những Câu Hỏi Thường Gặp Khi Làm Website',
        subtitle: 'Các giải đáp rõ ràng cho những băn khoăn phổ biến nhất trước khi bạn quyết định làm web.',
        items: [
          {
            question: 'Thời gian hoàn thiện một website là bao lâu?',
            answer: 'Tùy theo nhu cầu: Gói cơ bản từ 2 - 3 ngày, gói chuyên nghiệp từ 5 - 7 ngày, và gói thiết kế & phát triển theo yêu cầu từ 2 - 3 tuần. Chúng tôi luôn cam kết bàn giao đúng tiến độ cam kết.',
          },
          {
            question: 'Chi phí trên đã bao gồm tên miền và máy chủ (hosting) chưa?',
            answer: 'Tất cả các gói tại THUYPD.SITE đều đã bao gồm trọn gói năm đầu tiên cho tên miền quốc tế (.com / .net) và máy chủ lưu trữ (hosting) tốc độ cao. Bạn không cần chi thêm khoản nào khác để vận hành web.',
          },
          {
            question: 'Tôi không rành về máy tính thì có tự quản lý website được không?',
            answer: 'Hoàn toàn được! Giao diện quản trị được làm bằng tiếng Việt rất trực quan, kèm video hướng dẫn từng bước. Bạn có thể tự thay đổi hình ảnh, giá bán, bài viết ngay trên điện thoại dễ như dùng mạng xã hội.',
          },
          {
            question: 'Sau khi bàn giao, website gặp sự cố thì ai hỗ trợ?',
            answer: 'Chúng tôi bảo hành kỹ thuật và đồng hành trọn đời cùng bạn. Bất cứ khi nào cần trợ giúp, bạn chỉ cần nhắn Zalo hoặc gọi hotline là kỹ thuật sẽ kiểm tra xử lý ngay.',
          },
        ],
      },
    },
    {
      id: 'cta',
      name: 'Khối Kêu gọi hành động (CTA Banner)',
      enabled: true,
      displayStyle: 'banner_boxed',
      availableStyles: [
        { value: 'banner_boxed', label: 'Boxed Banner Gradient', description: 'Khối hộp bo góc nổi bật với gradient chuyển màu nhẹ' },
      ],
      content: {
        title: 'Sẵn Sàng Xây Dựng Website Đẹp Mắt & Hiệu Quả?',
        subtitle: 'Để lại thông tin ngay hôm nay để nhận tư vấn giải pháp sát với thực tế ngành nghề và nhận báo giá trọn gói không phát sinh.',
        buttonText: 'Nhận Tư Vấn & Báo Giá Nhanh',
        buttonLink: '#nhan-bao-gia',
        hotlineText: 'Hoặc gọi Hotline trực tiếp: 1900 888 999',
      },
    },
    {
      id: 'contact',
      name: 'Form liên hệ & Nhận báo giá',
      enabled: true,
      displayStyle: 'standard',
      availableStyles: [
        { value: 'standard', label: 'Tiêu chuẩn (2 Cột Thông tin + Form)', description: 'Bố cục kinh điển với hotline/email bên trái và form nhập liệu bên phải' },
        { value: 'centered', label: 'Form tập trung (Căn giữa)', description: 'Thu hẹp khung form vào giữa màn hình, tăng tỷ lệ hoàn tất form' },
      ],
      content: {
        badge: 'Tư Vấn Miễn Phí',
        title: 'Đăng Ký Nhận Tư Vấn & Phác Thảo Giao Diện',
        subtitle: 'Điền thông tin bên dưới hoặc liên hệ trực tiếp qua Zalo/Hotline, chúng tôi sẽ phản hồi và tư vấn chu đáo trong 15 phút.',
      },
    },
  ],
};
