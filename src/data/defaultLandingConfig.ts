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
        badgeText: 'GIẢI PHÁP THIẾT KẾ WEBSITE THEO YÊU CẦU • CHUẨN SEO GOOGLE • CHUYÊN NGHIỆP',
        headlineMain: 'Thiết Kế Website',
        headlineHighlight: 'Chuyên Nghiệp & Chuẩn SEO',
        description: 'May đo giao diện độc quyền theo từng ý tưởng và ngành nghề kinh doanh, cấu trúc tối ưu chuẩn SEO On-page lên Top Google bền vững, tốc độ mở trang tức thì dưới 1 giây và bàn giao trọn gói 100% không phát sinh.',
        ctaPrimaryText: 'Khám Phá Dịch Vụ',
        ctaSecondaryText: 'Xem Kho Giao Diện',
        pillars: [
          { id: 'p1', value: '100%', title: 'Theo Yêu Cầu', desc: 'Thiết kế chuẩn nhận diện & tính năng riêng biệt' },
          { id: 'p2', value: 'Top 1', title: 'Chuẩn SEO Google', desc: 'Cấu trúc tối ưu thẻ, điểm PageSpeed 95+' },
          { id: 'p3', value: 'Bàn Giao', title: 'Mã Nguồn 100%', desc: 'Sở hữu vĩnh viễn, hướng dẫn quản trị trực quan' },
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
        title: 'KHÁCH HÀNG TIÊU BIỂU TIN TƯỞNG ĐỒNG HÀNH CÙNG HỆ THỐNG',
        statsText: '100% Khách hàng hài lòng với tốc độ tải và bàn giao mã nguồn',
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
        badge: 'Hệ Sinh Thái Toàn Diện',
        title: 'Giải Pháp Thiết Kế Website & Công Nghệ Bứt Phá',
        subtitle: 'Lựa chọn kiến trúc website may đo độc bản, tối ưu chuyển đổi kinh doanh và đồng hành kỹ thuật dài hạn.',
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
        badge: 'Cam Kết Thực Tế & Lộ Trình',
        title: '4 Cam Kết Vàng Giúp Bạn An Tâm Tuyệt Đối',
        subtitle: 'Chúng tôi hiểu bạn sợ web phức tạp, sợ bị đội chi phí và sợ đơn vị làm web bỏ rơi sau khi thu tiền.',
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
        badge: 'Mẫu Thiết Kế Mới Nhất',
        title: 'Kho Giao Diện Website Xu Hướng & Tối Ưu Trải Nghiệm',
        subtitle: 'Hơn 100+ mẫu giao diện demo thực tế sẵn sàng triển khai ngay, chuẩn SEO Google và tương thích 100% thiết bị di động.',
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
        badge: 'Chi Phí Hợp Lý',
        title: 'Bảng Giá Thiết Kế Web Trọn Gói',
        subtitle: 'Minh bạch chi phí, bàn giao mã nguồn 100%, cam kết không phát sinh bất kỳ khoản phụ phí nào trong suốt quá trình triển khai.',
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
        badge: 'Công Cụ Miễn Phí',
        title: 'Kiểm Tra Tên Miền Đẹp Cho Doanh Nghiệp',
        subtitle: 'Kiểm tra trạng thái khả dụng của tên miền .com, .vn, .net chỉ trong 1 giây trước khi đăng ký chính thức.',
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
        badge: 'Khách Hàng Nói Gì',
        title: 'Đồng Hành Cùng Sự Bứt Phá Doanh Thu Của Khách Hàng',
        subtitle: 'Những chia sẻ thực tế từ các chủ doanh nghiệp và đối tác đã tin tưởng trao trọn niềm tin cho THUYPD.SITE.',
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
        badge: 'GIẢI ĐÁP THẮC MẮC',
        title: 'Câu Hỏi Thường Gặp Khi Thiết Kế Website',
        subtitle: 'Những câu hỏi được khách hàng quan tâm nhiều nhất khi bắt đầu làm website tại THUYPD.SITE.',
        items: [
          {
            question: 'Thời gian hoàn thành một website là bao lâu?',
            answer: 'Thông thường với gói Business từ 3-5 ngày, gói Professional từ 5-10 ngày, và gói May đo độc bản từ 2-4 tuần tùy quy mô tính năng.',
          },
          {
            question: 'Chi phí trên đã bao gồm tên miền và hosting chưa?',
            answer: 'Tất cả các gói tại THUYPD.SITE đều đã tặng kèm tên miền quốc tế (.com/.net) năm đầu và hosting Cloud SSD/NVMe siêu tốc.',
          },
          {
            question: 'Tôi có thể tự quản trị và chỉnh sửa nội dung không?',
            answer: 'Hoàn toàn được! Chúng tôi cung cấp trang quản trị Admin trực quan, kèm video hướng dẫn chi tiết giúp bạn tự thay đổi hình ảnh, giá cả, bài viết.',
          },
          {
            question: 'Chính sách bảo hành và bảo trì như thế nào?',
            answer: 'Chúng tôi bảo hành kỹ thuật và hỗ trợ trọn đời cho mọi website được thiết kế, cam kết hỗ trợ xử lý sự cố trong vòng 1-2 giờ làm việc.',
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
        title: 'Sẵn Sàng Bứt Phá Doanh Số Cùng Website Đẳng Cấp?',
        subtitle: 'Để lại thông tin ngay hôm nay để nhận tư vấn miễn phí từ chuyên gia UI/UX và nhận ưu đãi giảm 10% chi phí.',
        buttonText: 'Đăng Ký Tư Vấn & Nhận Báo Giá',
        buttonLink: '#nhan-bao-gia',
        hotlineText: 'Hoặc gọi Hotline trực tiếp: 0988.123.456',
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
        badge: 'Khởi Đầu Ngay Hôm Nay',
        title: 'Đăng Ký Tư Vấn & Nhận Bản Phác Thảo Giao Diện Miễn Phí',
        subtitle: 'Điền thông tin bên dưới hoặc gọi trực tiếp Hotline để chuyên gia tư vấn giải pháp phù hợp nhất với ngân sách của bạn.',
      },
    },
  ],
};
