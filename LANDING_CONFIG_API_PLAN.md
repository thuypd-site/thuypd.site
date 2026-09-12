# KẾ HOẠCH TRIỂN KHAI CHUẨN HÓA API LANDING CONFIG & ADMIN CMS
**Dự Án**: THUYPD.SITE  
**Mục Tiêu**: Chuẩn hóa 100% dữ liệu API Landing Page để FE Client tiêu thụ dữ liệu trực tiếp từ Backend, tiến tới **loại bỏ hoàn toàn fallback dữ liệu mặc định (Zero-Fallback / Pure API-Driven Mode)**.

---

## 1. TỔNG QUAN VẤN ĐỀ & CHIẾN LƯỢC

### 1.1. Hiện Trạng
- **Domain Routing**: Endpoint `/api/landing-config` tại Client trả về `404 Not Found` (do frontend chưa cấu hình route proxy `/api/*`), trong khi Backend API trả về `200 OK`.
- **Lệch Tên Trường (Field Mismatches)**:
  - Trạng thái ẩn/hiện: API trả về `isVisible`, FE client dùng `enabled`.
  - Layout hiển thị: API trả về `variant`, FE client dùng `displayStyle`.
  - Khối Hero: API trả về `title`, `badge`, `subtitle`, FE dùng `headlineMain`, `badgeText`, `description` và có thêm `pillars` (3 chỉ số cam kết).
  - Khối Đánh giá (`testimonials`): API trả về `name`, `comment`, `avatar`, FE dùng `author`, `quote`, `avatarUrl`.
  - Khối Tên miền: Chưa có trong API.
- **Cơ chế Fallback hiện tại**: FE đang phải dùng bộ adapter kết hợp dữ liệu server với `defaultLandingConfig.ts` để bù đắp các trường bị thiếu hoặc lệch.

### 1.2. Mục Tiêu Sau Khi Cập Nhật
1. Backend cung cấp đầy đủ các trường theo đúng chuẩn chuẩn hóa dưới đây (có hỗ trợ field aliases để tương thích ngược).
2. Admin CMS cung cấp đầy đủ giao diện quản trị cho 10 khối giao diện.
3. Khi API đã ổn định, FE chuyển sang chế độ **Pure API-Driven**: 
   - Lấy 100% dữ liệu từ API.
   - Không tự động bù đắp dữ liệu mặc định (`no fallback`).
   - Nếu API lỗi hoặc chưa có mạng, hiển thị giao diện thông báo lỗi/thử lại chuẩn mực của hệ thống.

---

## 2. CẤU HÌNH DOMAIN & ROUTING

### 2.1. Cấu hình Vercel Rewrite (Frontend Repo)
Trong file `vercel.json` ở project Frontend domain `thuypd.site`, thêm quy tắc rewrite để mọi request tới `/api/*` tự động forward tới backend:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://localhost:5000/api/:path*"
    }
  ]
}
```

### 2.2. CORS Configuration (Backend Repo)
Đảm bảo Backend API cho phép các origin cấu hình trong `.env` gửi request:
- `http://localhost:3000` (dành cho môi trường dev/preview)

---

## 3. CHUẨN HÓA SCHEMA JSON RESPONSE CHO `GET /api/landing-config`

### 3.1. Envelope Chuẩn
```json
{
  "success": true,
  "statusCode": 200,
  "timestamp": "2026-09-09T08:00:00.000Z",
  "message": "Lấy cấu hình landing page thành công.",
  "data": {
    "version": 1,
    "lastUpdated": "2026-09-09T08:00:00.000Z",
    "pageTitle": "THUYPD.SITE — Thiết Kế Website Chuyên Nghiệp & lập trình theo yêu cầu Độc Bản",
    "metaDescription": "Dịch vụ thiết kế website chuẩn SEO, tối ưu tốc độ 99+ PageSpeed, giao diện độc bản và công nghệ hiện đại.",
    "ogImage": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "theme": {
      "primaryColor": "#006398",
      "accentColor": "#5bb8fe",
      "fontFamily": "Plus Jakarta Sans"
    },
    "sections": [
      /* Mảng danh sách 10 khối chi tiết bên dưới */
    ]
  }
}
```

### 3.2. Cấu Trúc Chung Của Mỗi Section Trong Mảng `sections`
Mỗi phần tử trong `sections` **bắt buộc** có các thuộc tính nền tảng sau:

```typescript
interface BaseSection {
  id: string;             // Định danh khối: 'hero' | 'logobar' | 'services' | 'advantages' | 'themes' | 'pricing' | 'domain' | 'testimonials' | 'faq' | 'cta' | 'contact'
  sectionKey: string;      // Alias đồng bộ với id (ví dụ: 'hero')
  name: string;            // Tên tiếng Việt hiển thị trên Admin (ví dụ: "Khối Hero Banner")
  order: number;           // Thứ tự hiển thị (1, 2, 3, ...)
  enabled: boolean;        // Trạng thái hiển thị (Khuyên dùng)
  isVisible: boolean;      // Alias của enabled (để đảm bảo tương thích ngược)
  displayStyle: string;    // Kiểu bố cục (Khuyên dùng: ví dụ 'hero-c', 'services-b')
  variant: string;         // Alias của displayStyle (ví dụ 'hero-c')
  availableStyles: {       // Danh sách tùy chọn layout hiển thị trên Admin
    value: string;
    label: string;
    description: string;
  }[];
  content: object;         // Dữ liệu nội dung chi tiết theo từng khối
}
```

---

## 4. SCHEMA NỘI DUNG CHI TIẾT CỦA TỪNG KHỐI (`content`)

---

### Khối 1: `hero` (Banner Mở Đầu)
- **`id`**: `"hero"`
- **`displayStyle` / `variant`**: 
  - `"hero-c"` (Mặc định - SaaS Glow & Công cụ chẩn đoán tương tác)
  - `"hero-b"` (Centered Minimalist)
  - `"hero-a"` (Classic Split Grid)
- **`content` Schema**:
```json
{
  "badge": "✨ Giải Pháp Thiết Kế Web lập trình theo yêu cầu 2026",
  "badgeText": "✨ Giải Pháp Thiết Kế Web lập trình theo yêu cầu 2026",
  "title": "Thiết Kế Website",
  "headlineMain": "Thiết Kế Website",
  "titleHighlight": "Chuyên Nghiệp & Chuẩn SEO",
  "headlineHighlight": "Chuyên Nghiệp & Chuẩn SEO",
  "subtitle": "lập trình theo yêu cầu giao diện độc quyền theo từng ý tưởng và ngành nghề kinh doanh, cấu trúc tối ưu chuẩn SEO On-page lên Top Google bền vững, tốc độ mở trang tức thì dưới 1 giây và bàn giao trọn gói 100% không phát sinh.",
  "description": "lập trình theo yêu cầu giao diện độc quyền theo từng ý tưởng và ngành nghề kinh doanh, cấu trúc tối ưu chuẩn SEO On-page lên Top Google bền vững, tốc độ mở trang tức thì dưới 1 giây và bàn giao trọn gói 100% không phát sinh.",
  "ctaPrimaryText": "Nhận Tư Vấn Miễn Phí",
  "ctaPrimaryLink": "#nhan-bao-gia",
  "ctaSecondaryText": "Xem Kho Giao Diện",
  "ctaSecondaryLink": "#kho-giao-dien",
  "ratingBadgeText": "⭐ 4.9/5 từ 150+ doanh nghiệp tin cậy",
  "heroImageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  "pillars": [
    {
      "id": "p1",
      "value": "100%",
      "title": "Theo Yêu Cầu",
      "desc": "lập trình theo yêu cầu chuẩn nhận diện & tính năng riêng biệt"
    },
    {
      "id": "p2",
      "value": "Top 1",
      "title": "Chuẩn SEO Google",
      "desc": "Cấu trúc tối ưu thẻ, điểm PageSpeed 95+"
    },
    {
      "id": "p3",
      "value": "Bàn Giao",
      "title": "Chuyên Nghiệp",
      "desc": "Full mã nguồn, bảo hành & đồng hành trọn đời"
    }
  ]
}
```

---

### Khối 2: `logobar` / `stats` (Khách Hàng Tiêu Biểu & Thống Kê)
- **`id`**: `"logobar"` (hoặc alias `"stats"`)
- **`displayStyle` / `variant`**: `"standard"` | `"compact"`
- **`content` Schema**:
```json
{
  "title": "Khách Hàng Tiêu Biểu Tin Tưởng Đồng Hành Cùng Hệ Thống",
  "statsText": "150+ dự án hoàn thành • 99.8% hài lòng • 100% đúng hạn",
  "items": [
    { "number": "150+", "label": "Dự án đã bàn giao", "suffix": "dự án" },
    { "number": "99.8%", "label": "Khách hàng hài lòng tuyệt đối", "suffix": "%" },
    { "number": "3 - 5", "label": "Ngày hoàn thành trung bình", "suffix": "ngày" },
    { "number": "100%", "label": "Chuẩn SEO Onpage & Mobile", "suffix": "%" }
  ]
}
```

---

### Khối 3: `services` (Hệ Sinh Thái Dịch Vụ)
- **`id`**: `"services"`
- **`displayStyle` / `variant`**: 
  - `"services-b"` (Bento Grid Hiện Đại)
  - `"services-a"` (Classic 3-Column Grid)
- **`content` Schema**:
```json
{
  "badge": "HỆ SINH THÁI TOÀN DIỆN",
  "title": "Giải Pháp Thiết Kế Website & Công Nghệ Bứt Phá",
  "subtitle": "Lựa chọn kiến trúc website lập trình theo yêu cầu độc bản, tối ưu chuyển đổi kinh doanh và đồng hành kỹ thuật dài hạn.",
  "items": [
    {
      "id": "service-custom",
      "icon": "design_services",
      "title": "Thiết Kế Web Theo Yêu Cầu (lập trình theo yêu cầu Riêng)",
      "description": "Nghiên cứu bản sắc thương hiệu, thiết kế UI/UX độc quyền, không sử dụng mẫu có sẵn.",
      "tag": "lập trình theo yêu cầu 100% · Độc bản"
    },
    {
      "id": "service-ecommerce",
      "icon": "ads_click",
      "title": "Website Bán Hàng & Thương Mại Điện Tử",
      "description": "Tích hợp giỏ hàng tiện lợi, cổng thanh toán trực tuyến, quản lý kho hàng và đồng bộ đơn Zalo tự động.",
      "tag": "Tối ưu tỷ lệ chốt đơn"
    },
    {
      "id": "service-seo",
      "icon": "query_stats",
      "title": "Tối Ưu SEO & Tốc Độ Tải Trang Siêu Tốc",
      "description": "Cấu trúc On-Page chuẩn Google, cam kết điểm xanh PageSpeed 95+, đẩy từ khóa lên Top bền vững.",
      "tag": "Top Google bền vững"
    },
    {
      "id": "service-hosting",
      "icon": "dns",
      "title": "Hạ Tầng Cloud Hosting & Tên Miền",
      "description": "Hạ tầng máy chủ NVMe bảo mật cao cấp, chứng chỉ SSL miễn phí, backup tự động hàng ngày.",
      "tag": "Ổn định 99.99%"
    }
  ]
}
```

---

### Khối 4: `advantages` / `process` (Cam Kết Vàng & Lộ Trình Triển Khai)
- **`id`**: `"advantages"` (hoặc alias `"process"`)
- **`displayStyle` / `variant`**: 
  - `"commits-b"` (Wavy Roadmap 4 Bước)
  - `"commits-a"` (Grid 4 Thẻ Cam Kết)
- **`content` Schema**:
```json
{
  "badge": "CAM KẾT THỰC TẾ & LỘ TRÌNH",
  "title": "4 Cam Kết Vàng Giúp Bạn An Tâm Tuyệt Đối",
  "subtitle": "Chúng tôi hiểu bạn sợ web phức tạp, sợ bị đội chi phí và sợ đơn vị làm web bỏ rơi sau khi thu tiền.",
  "items": [
    {
      "id": "adv-1",
      "icon": "touch_app",
      "title": "Dễ Dùng Như Lướt Facebook",
      "description": "Hệ thống quản trị 100% tiếng Việt, thao tác đăng bài thay ảnh đơn giản chỉ mất 2 phút trên điện thoại.",
      "highlight": "Không cần biết lập trình"
    },
    {
      "id": "adv-2",
      "icon": "price_check",
      "title": "Trọn Gói 100% Không Phát Sinh",
      "description": "Báo giá một lần duy nhất, minh bạch từng hạng mục. Tặng miễn phí tên miền và hosting năm đầu.",
      "highlight": "Hợp đồng rõ ràng"
    },
    {
      "id": "adv-3",
      "icon": "key",
      "title": "Bàn Giao Toàn Quyền Sở Hữu",
      "description": "Bạn nắm 100% mã nguồn và tài khoản gốc, không bị phụ thuộc hay giữ mã nguồn như các bên khác.",
      "highlight": "Sở hữu vĩnh viễn"
    },
    {
      "id": "adv-4",
      "icon": "support_agent",
      "title": "Hỗ Trợ Kỹ Thuật 24/7 Trọn Đời",
      "description": "Đội ngũ kỹ thuật túc trực, phản hồi xử lý vấn đề trong 15 phút qua Zalo riêng của từng khách hàng.",
      "highlight": "Đồng hành trọn đời"
    }
  ],
  "steps": [
    {
      "step": "01",
      "days": "Ngày 1 - 2",
      "title": "Khảo Sát & Lên Khung",
      "desc": "Lắng nghe yêu cầu, định hình cấu trúc sitemap, chọn phong cách màu sắc và lên demo Wireframe 1-1."
    },
    {
      "step": "02",
      "days": "Ngày 3 - 5",
      "title": "Thiết Kế UI/UX Bản Thảo",
      "desc": "Phác thảo bố cục, phối màu theo nhận diện thương hiệu và gửi khách hàng duyệt trước."
    },
    {
      "step": "03",
      "days": "Ngày 6 - 8",
      "title": "Lập Trình & Tích Hợp",
      "desc": "Lập trình giao diện responsive 100%, tích hợp nút hotline, Zalo và form liên hệ tự động."
    },
    {
      "step": "04",
      "days": "Ngày 9 - 10",
      "title": "Kiểm Thử & Bàn Giao",
      "desc": "Đo lường tốc độ tải trang, bàn giao quyền quản trị và hướng dẫn vận hành trọn đời."
    }
  ]
}
```

---

### Khối 5: `themes` (Kho Giao Diện Mẫu Theo Ngành)
- **`id`**: `"themes"`
- **`displayStyle` / `variant`**: `"standard"`
- **`content` Schema**:
```json
{
  "badge": "BỘ SƯU TẬP MẪU",
  "title": "Kho Giao Diện Đẳng Cấp Theo Từng Ngành",
  "subtitle": "Hàng trăm mẫu giao diện web phân loại chi tiết theo từng lĩnh vực có sẵn, thiết kế tỉ mỉ chuẩn di động và sẵn sàng hoạt động ngay.",
  "filterEnabled": true,
  "categories": [
    { "key": "all", "label": "Tất cả mẫu" },
    { "key": "ecommerce", "label": "Bán Hàng - TMĐT" },
    { "key": "corporate", "label": "Doanh Nghiệp" },
    { "key": "realestate", "label": "Bất Động Sản" },
    { "key": "spa", "label": "Thẩm Mỹ & Spa" },
    { "key": "furniture", "label": "Nội Thất" }
  ],
  "ctaText": "Xem Tất Cả Giao Diện Mẫu"
}
```

---

### Khối 6: `pricing` (Bảng Giá Thiết Kế Web Trọn Gói)
- **`id`**: `"pricing"`
- **`displayStyle` / `variant`**: 
  - `"price-b"` (Bảng Ma Trận Tính Năng Chi Tiết - Feature Matrix)
  - `"price-a"` (Thẻ Giá Nổi Bật - Card Grid)
- **`content` Schema**:
```json
{
  "badge": "BẢNG GIÁ MINH BẠCH",
  "title": "Bảng Giá Thiết Kế Web Trọn Gói",
  "subtitle": "Minh bạch chi phí, bàn giao mã nguồn 100%, cam kết không phát sinh bất kỳ khoản phụ phí nào trong suốt quá trình triển khai.",
  "highlightPlanId": "plan-professional",
  "footerNote": "💡 Cần tính năng đặc biệt hoặc lập trình theo yêu cầu phức tạp? Hãy liên hệ để nhận báo giá riêng.",
  "plans": [
    {
      "id": "plan-business",
      "name": "Gói Business",
      "targetAudience": "Cá nhân khởi nghiệp, cửa hàng nhỏ cần hiện diện thương hiệu",
      "price": 5500000,
      "originalPrice": 7000000,
      "period": "trọn gói",
      "isPopular": false,
      "features": [
        "Tặng 01 tên miền quốc tế (.com / .net) năm đầu",
        "Hosting Cloud SSD 3GB siêu tốc độ cao",
        "Giao diện chuẩn Responsive di động & máy tính",
        "Bảo hành & bảo trì kỹ thuật 12 tháng"
      ]
    },
    {
      "id": "plan-professional",
      "name": "Gói Professional",
      "targetAudience": "Doanh nghiệp vừa và nhỏ, bán hàng online chuyên nghiệp",
      "price": 7990000,
      "originalPrice": 10500000,
      "period": "trọn gói",
      "isPopular": true,
      "features": [
        "Tặng tên miền quốc tế + Hosting Cloud NVMe 8GB",
        "Thiết kế lập trình theo yêu cầu giao diện độc quyền theo nhận diện",
        "Chuẩn SEO On-page Google đạt điểm 95+ PageSpeed",
        "Tích hợp nút Gọi, Zalo chat, Form tư vấn tự động",
        "Bảo hành & hỗ trợ kỹ thuật trọn đời"
      ]
    },
    {
      "id": "plan-custom",
      "name": "Gói lập trình theo yêu cầu Cao Cấp",
      "targetAudience": "Tập đoàn, dự án lớn có luồng nghiệp vụ riêng biệt",
      "price": 15000000,
      "originalPrice": 20000000,
      "period": "khởi điểm",
      "isPopular": false,
      "features": [
        "Lập trình tính năng riêng biệt theo Brief 100%",
        "Hạ tầng Dedicated Cloud Server chịu tải cao",
        "Bàn giao toàn bộ File thiết kế Figma & Full Source Code",
        "Hỗ trợ kỹ thuật VIP 24/7 phản hồi tức thì"
      ]
    }
  ]
}
```

---

### Khối 7: `domain` (Công Cụ Tra Cứu Tên Miền)
- **`id`**: `"domain"`
- **`displayStyle` / `variant`**: `"standard"`
- **`content` Schema**:
```json
{
  "badge": "Tra Cứu Trực Tuyến",
  "title": "Kiểm Tra Tên Miền Đẹp Cho Doanh Nghiệp",
  "subtitle": "Tra cứu tức thì trạng thái khả dụng của tên miền .vn, .com, .net và giữ chỗ thương hiệu của bạn ngay hôm nay."
}
```

---

### Khối 8: `testimonials` (Đánh Giá Từ Khách Hàng)
- **`id`**: `"testimonials"`
- **`displayStyle` / `variant`**: `"cards"` | `"compact"`
- **`content` Schema**:
```json
{
  "badge": "KHÁCH HÀNG CHIA SẺ",
  "title": "Đánh Giá Thực Tế Từ Đối Tác",
  "subtitle": "Hơn 150+ doanh nghiệp đã gia tăng doanh số và tối ưu thời gian bán hàng với nền tảng website của chúng tôi.",
  "items": [
    {
      "id": "testi-1",
      "name": "Nguyễn Văn Minh",
      "author": "Nguyễn Văn Minh",
      "role": "Giám Đốc Điều Hành",
      "company": "VietGroup Real Estate",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      "comment": "Website bàn giao rất đúng hạn, giao diện sang trọng vượt ngoài kỳ vọng. Đội ngũ hỗ trợ nhiệt tình 24/7.",
      "quote": "Website bàn giao rất đúng hạn, giao diện sang trọng vượt ngoài kỳ vọng. Đội ngũ hỗ trợ nhiệt tình 24/7.",
      "rating": 5
    },
    {
      "id": "testi-2",
      "name": "Trần Thị Thu Hà",
      "author": "Trần Thị Thu Hà",
      "role": "Chủ Sáng Lập",
      "company": "Marose Fashion & Beauty",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      "comment": "Trang web tải cực nhanh, khách hàng đặt qua Zalo tiện lợi. Doanh thu của shop tăng hơn 40% sau 2 tháng đổi web mới.",
      "quote": "Trang web tải cực nhanh, khách hàng đặt qua Zalo tiện lợi. Doanh thu của shop tăng hơn 40% sau 2 tháng đổi web mới.",
      "rating": 5
    }
  ]
}
```

---

### Khối 9: `faq` (Câu Hỏi Thường Gặp)
- **`id`**: `"faq"`
- **`displayStyle` / `variant`**: `"accordion"`
- **`content` Schema**:
```json
{
  "badge": "GIẢI ĐÁP THẮC MẮC",
  "title": "Câu Hỏi Thường Gặp Khi Thiết Kế Website",
  "subtitle": "Những câu hỏi được khách hàng quan tâm nhiều nhất khi bắt đầu làm website tại THUYPD.SITE.",
  "items": [
    {
      "question": "Thời gian hoàn thành một website là bao lâu?",
      "answer": "Thông thường với gói Business từ 3-5 ngày, gói Professional từ 5-10 ngày, và gói lập trình theo yêu cầu độc bản từ 2-4 tuần tùy quy mô tính năng."
    },
    {
      "question": "Chi phí trên đã bao gồm tên miền và hosting chưa?",
      "answer": "Tất cả các gói tại THUYPD.SITE đều đã tặng kèm tên miền quốc tế (.com/.net) năm đầu và hosting Cloud SSD/NVMe siêu tốc."
    },
    {
      "question": "Tôi có thể tự quản trị và chỉnh sửa nội dung không?",
      "answer": "Hoàn toàn được! Chúng tôi cung cấp trang quản trị Admin trực quan, kèm video hướng dẫn chi tiết giúp bạn tự thay đổi hình ảnh, giá cả, bài viết."
    },
    {
      "question": "Chính sách bảo hành và bảo trì như thế nào?",
      "answer": "Chúng tôi bảo hành kỹ thuật và hỗ trợ trọn đời cho mọi website được thiết kế, cam kết hỗ trợ xử lý sự cố trong vòng 1-2 giờ làm việc."
    }
  ]
}
```

---

### Khối 10: `cta` (Banner Kêu Gọi Hành Động)
- **`id`**: `"cta"`
- **`displayStyle` / `variant`**: `"banner_boxed"`
- **`content` Schema**:
```json
{
  "title": "Sẵn Sàng Bứt Phá Doanh Số Cùng Website Đẳng Cấp?",
  "subtitle": "Để lại thông tin ngay hôm nay để nhận tư vấn miễn phí từ chuyên gia UI/UX và nhận ưu đãi giảm 10% chi phí.",
  "buttonText": "Đăng Ký Tư Vấn & Nhận Báo Giá",
  "buttonLink": "#nhan-bao-gia",
  "hotlineText": "Hoặc gọi Hotline trực tiếp: 0988.123.456"
}
```

---

### Khối 11: `contact` (Form Liên Hệ & Nhận Báo Giá)
- **`id`**: `"contact"`
- **`displayStyle` / `variant`**: `"form_split"`
- **`content` Schema**:
```json
{
  "badge": "LIÊN HỆ TRỰC TIẾP",
  "title": "Nhận Báo Giá Thiết Kế Web Trong 15 Phút",
  "subtitle": "Điền thông tin vào form dưới đây, chuyên viên giải pháp của THUYPD.SITE sẽ liên hệ và tư vấn phương án tối ưu nhất.",
  "commitments": [
    "Bảo mật thông tin khách hàng tuyệt đối",
    "Tư vấn đúng nhu cầu, không ép gói chi phí cao",
    "Khảo sát và phác thảo giao diện demo miễn phí"
  ]
}
```

---

## 5. DANH SÁCH API ENDPOINTS PHÍA BACKEND CHO ADMIN CMS

| Phương Thức | Endpoint | Mục Đích | Body / Tham Số |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/landing-config` | Lấy toàn bộ cấu hình hiển thị trang chủ | Không có |
| `PUT` | `/api/landing-config` | Admin cập nhật toàn bộ cấu hình mới | `{ "version": 1, "sections": [...] }` |
| `PATCH` | `/api/landing-config/section/:id/visibility` | Bật/tắt nhanh 1 khối giao diện | `{ "enabled": true }` (hoặc `isVisible`) |
| `PATCH` | `/api/landing-config/section/:id/style` | Đổi nhanh layout của 1 khối | `{ "displayStyle": "hero-c" }` (hoặc `variant`) |
| `POST` | `/api/landing-config/reorder` | Sắp xếp lại thứ tự xuất hiện các khối | `{ "orderedIds": ["hero", "logobar", "services", ...] }` |
| `POST` | `/api/landing-config/reset` | Đưa toàn bộ về cấu hình mặc định ban đầu | `{}` |

---

## 6. LỘ TRÌNH CHUYỂN ĐỔI SANG 100% PURE API-DRIVEN (ZERO FALLBACK)

```
┌─────────────────────────────────────────────────────────────────────────┐
│              LỘ TRÌNH 4 BƯỚC LOẠI BỎ HOÀN TOÀN FALLBACK                 │
├───────────────────┬────────────────────────────┬────────────────────────┤
│ Bước 1 (Backend): │ Cập nhật API Schema        │ Bổ sung field aliases, │
│                   │ chuẩn theo tài liệu này    │ fix Vercel rewrite     │
├───────────────────┼────────────────────────────┼────────────────────────┤
│ Bước 2 (Admin):   │ Kiểm tra Admin Dashboard   │ Đảm bảo lưu dữ liệu    │
│                   │ chỉnh sửa đủ 10 khối       │ thành công vào DB      │
├───────────────────┼────────────────────────────┼────────────────────────┤
│ Bước 3 (Frontend):│ Bật STRICT_API_MODE        │ Tắt cơ chế merge       │
│                   │                            │ defaultLandingConfig   │
├───────────────────┼────────────────────────────┼────────────────────────┤
│ Bước 4 (Test & GO)│ Kiểm thử tải trang         │ Verify 100% data live  │
└───────────────────┴────────────────────────────┴────────────────────────┘
```

### Chi Tiết Bước 3: Cấu Hình Ở Frontend Khi Bật Pure API-Driven
Trong `LandingConfigContext.tsx`:
- Khi `STRICT_API_MODE = true`:
  1. FE gọi `fetchLandingConfigApi()`.
  2. Nếu API thành công: Sử dụng trực tiếp `response.config.sections`, **không gọi deep-merge với `defaultLandingConfig.ts`**.
  3. Nếu API thất bại (mạng đứt hoặc 500): Hiển thị trạng thái lỗi mạng kèm nút "Tải lại trang" (thay vì âm thầm hiển thị dữ liệu giả/mặc định).
  4. Nếu section nào bị tắt (`enabled: false` hoặc `isVisible: false`): Không render trên DOM.

---

## 7. CHECKLIST NGHIỆM THU

- [ ] Cấu hình reverse proxy để `/api/landing-config` trả về status 200 (không còn lỗi 404).
- [ ] API trả về đầy đủ 10-11 khối với định danh chuẩn (`hero`, `logobar`, `services`, `advantages`, `themes`, `pricing`, `domain`, `testimonials`, `faq`, `cta`, `contact`).
- [ ] Khối `testimonials` có đủ `name` / `author` và `comment` / `quote` (không bị `undefined`).
- [ ] Khối `hero` có đủ `headlineMain`, `headlineHighlight`, `badgeText`, `description` và `pillars`.
- [ ] Khối `domain` tồn tại trong danh sách sections của API.
- [ ] Thử bật/tắt một khối bất kỳ trên Admin -> Kiểm tra trên trang chủ khối đó lập tức ẩn/hiện tương ứng.
- [ ] Thử đổi `displayStyle` (ví dụ từ `services-b` sang `services-a`) -> Kiểm tra giao diện tự đổi layout mà không cần build lại code FE.

---

## 8. KIẾN TRÚC SERVER-SIDE RENDERING (SSR) & TỐI ƯU SEO TOÀN DIỆN

Để đạt điểm số tối đa trên Google Search và tối ưu hóa trải nghiệm chia sẻ mạng xã hội (Facebook, Zalo, Twitter/X), **FE Client gọi API cấu hình ở tầng Server** trước khi trả HTML về cho trình duyệt.

```
┌────────────────────────────────────────────────────────────────────────┐
│               LUỒNG SERVER-SIDE RENDERING (SSR) & SEO                  │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  [Trình duyệt / Googlebot]                                             │
│            │  1. Request GET /                                         │
│            ▼                                                           │
│  [Node.js / Express / Next.js Server]                                  │
│            │  2. Server fetch: GET ${BACKEND_API_URL}/api/...         │
│            ▼     (Kèm bộ đệm Stale-While-Revalidate TTL 60s)           │
│  [Backend Database / API]                                              │
│            │  3. Trả về landing-config JSON                            │
│            ▼                                                           │
│  [Server HTML Generation & SEO Injection]                              │
│    • Đổi <title>, <meta description>, og:title, og:image               │
│    • Sinh Structured Data: JSON-LD (WebSite, Org, FAQPage)             │
│    • Nhúng window.__INITIAL_LANDING_CONFIG__ = {...}                   │
│            │  4. Trả về HTML đã Render đầy đủ dữ liệu (SSR)            │
│            ▼                                                           │
│  [Browser Hydration] (Client đọc ngay window.__INITIAL_LANDING_CONFIG__ │
│                       với độ trễ 0ms, không cần fetch lại lần 2)       │
└────────────────────────────────────────────────────────────────────────┘
```

### 8.1. Các Thẻ Meta SEO Server Cần Sinh Động
Từ dữ liệu `pageTitle`, `metaDescription`, `ogImage` và khối `hero`:
```html
<!-- Tiêu đề và Mô tả chuẩn Google Search -->
<title>THUYPD.SITE — Thiết Kế Website Chuyên Nghiệp & lập trình theo yêu cầu Độc Bản</title>
<meta name="description" content="Dịch vụ thiết kế website chuẩn SEO Google, tối ưu tốc độ 99+ PageSpeed, giao diện độc bản và công nghệ hiện đại." />
<link rel="canonical" href="/" />

<!-- Open Graph cho Zalo, Facebook, LinkedIn -->
<meta property="og:type" content="website" />
<meta property="og:url" content="/" />
<meta property="og:title" content="THUYPD.SITE — Thiết Kế Website Chuyên Nghiệp & lập trình theo yêu cầu Độc Bản" />
<meta property="og:description" content="Dịch vụ thiết kế website chuẩn SEO Google, tối ưu tốc độ 99+ PageSpeed, giao diện độc bản và công nghệ hiện đại." />
<meta property="og:image" content="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="THUYPD.SITE — Thiết Kế Website Chuyên Nghiệp" />
<meta name="twitter:description" content="Dịch vụ thiết kế website chuẩn SEO, tối ưu tốc độ 99+ PageSpeed." />
<meta name="twitter:image" content="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" />
```

### 8.2. Cấu Trúc Dữ Liệu Có Cấu Trúc (JSON-LD Schema.org)
Server tự động tạo schema chuẩn để Google bot hiển thị Rich Snippets (sao đánh giá, câu hỏi FAQ, thông tin doanh nghiệp):
```html
<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "THUYPD.SITE",
    "url": "${NEXT_PUBLIC_SITE_URL}",
    "logo": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-988-123-456",
      "contactType": "customer service",
      "areaServed": "VN",
      "availableLanguage": ["Vietnamese", "English"]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "THUYPD.SITE",
    "url": "${NEXT_PUBLIC_SITE_URL}",
    "description": "Dịch vụ thiết kế website chuẩn SEO Google, tối ưu tốc độ 99+ PageSpeed."
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Thời gian hoàn thành một website là bao lâu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Thông thường với gói Business từ 3-5 ngày, gói Professional từ 5-10 ngày, và gói lập trình theo yêu cầu độc bản từ 2-4 tuần."
        }
      },
      {
        "@type": "Question",
        "name": "Chi phí trên đã bao gồm tên miền và hosting chưa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tất cả các gói tại THUYPD.SITE đều đã tặng kèm tên miền quốc tế và hosting Cloud SSD/NVMe siêu tốc năm đầu."
        }
      }
    ]
  }
]
</script>
```

### 8.3. Cầu Nối Dữ Liệu Hydration (Zero-Delay Hydration Bridge)
Để trình duyệt client sau khi tải về không phải thực hiện thêm 1 request API thừa thãi, Server nhúng trực tiếp dữ liệu vào thẻ script:
```html
<script>
  window.__INITIAL_LANDING_CONFIG__ = /* JSON từ API */;
</script>
```
Ở Client, React hook `useLandingConfig` / `LandingConfigProvider` sẽ đọc ngay `window.__INITIAL_LANDING_CONFIG__`:
- **Độ trễ render (FCP)**: 0ms.
- **Hiện tượng giật layout (CLS)**: Bằng 0 vì không có trạng thái loading trống rỗng ban đầu.
- **Tiêu thụ tài nguyên**: Giảm 50% số lượng request tới API Backend.

### 8.4. Chiến Lược Cache Tầng Server (Server Caching & Stale-While-Revalidate)
Để thời gian phản hồi (TTFB) của Server luôn dưới **30ms**:
- Server lưu bộ đệm (In-Memory Cache hoặc Redis) cho kết quả API `/api/landing-config` với thời gian sống **TTL = 60 - 120 giây**.
- Áp dụng cơ chế **Stale-While-Revalidate**:
  - Khi có request, Server trả ngay bản cache hiện tại (siêu tốc).
  - Nếu bản cache đã quá TTL, một tiến trình ngầm (background worker) sẽ âm thầm gọi API để cập nhật cache cho các request kế tiếp.
  - Trường hợp Backend API bị gián đoạn bảo trì, Server SSR vẫn phục vụ người dùng bằng bản cache an toàn, website không bao giờ bị sập hoặc trắng trang.

---

### 8.5. Code Mẫu Triển Khai Cho Từng Framework

#### A. Triển Khai Với Next.js (App Router - Khuyên Dùng)
```typescript
// app/page.tsx
import { Metadata } from 'next';
import { LandingPageRenderer } from '@/components/landing/LandingPageRenderer';

// Tự động revalidate sau mỗi 60 giây (ISR)
export const revalidate = 60;

async function getLandingConfig() {
  const apiUrl = process.env.BACKEND_API_URL || '';
  const res = await fetch(`${apiUrl}/api/landing-config`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error('Failed to fetch config');
  const payload = await res.json();
  return payload.data || payload.config;
}

// 1. Sinh Meta Tags Động Chuẩn SEO
export async function generateMetadata(): Promise<Metadata> {
  const config = await getLandingConfig();
  return {
    title: config.pageTitle || 'THUYPD.SITE - Thiết Kế Web Chuyên Nghiệp',
    description: config.metaDescription,
    openGraph: {
      title: config.pageTitle,
      description: config.metaDescription,
      images: [config.ogImage || '/og-image.jpg'],
    },
  };
}

// 2. Render HTML Trực Tiếp Tại Server
export default async function HomePage() {
  const config = await getLandingConfig();
  return (
    <main>
      <LandingPageRenderer initialConfig={config} />
    </main>
  );
}
```

#### B. Triển Khai Với Express + Node.js (Full-Stack Hiện Tại)
Server Express trước đây trong `server.ts` đã được tích hợp hàm `getSSRInjectedHtml()` tự động tải từ `${BACKEND_API_URL}/api/landing-config`, gắn toàn bộ thẻ SEO `<title>`, `<meta>`, schema JSON-LD và biến `window.__INITIAL_LANDING_CONFIG__` trước khi trả về cho trình duyệt.

