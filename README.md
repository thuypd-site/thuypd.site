# 🏛️ THUYPD.SITE — Decoupled 3-Tier Enterprise Architecture

Hệ thống được thiết kế và chia tách thành **3 Source Code Độc Lập Hoàn Toàn** tuân thủ chuẩn **Clean Architecture**, hiện đại, tối ưu và dễ dàng mở rộng:

---

## 🌟 Tổng Quan 3 Phân Hệ Độc Lập

```
├── 1. frontend-client/ (Thư mục gốc)
│   ├── Công nghệ: React 18/19 + Vite + Tailwind CSS + TanStack Query + Zod + Framer Motion
│   ├── Mục đích: Trang đích (Landing Page) khách hàng cao cấp, siêu mượt, tối ưu chuyển đổi
│   ├── Tính năng: Trình diễn Theme Showcase, tính giá theo yêu cầu, gửi Lead Form, kiểm tra tên miền
│   └── Độc lập: 100% Client-side, không chứa bất kỳ code hay giao diện Admin nào.
│
├── 2. backend-api/
│   ├── Công nghệ: Node.js + Express + TypeScript + Mongoose + MongoDB Atlas + JWT
│   ├── Kiến trúc: Clean Architecture (Controllers ➔ Services ➔ Repositories ➔ Models)
│   ├── Mục đích: Cung cấp RESTful API bảo mật cho cả Client và Admin CMS
│   ├── Tính năng: Xác thực JWT, quản lý Leads, kho Themes, cấu hình Site, kết nối Atlas Cloud
│   └── Triển khai: Độc lập 100% miễn phí lên Render.com / Railway / Fly.io / Docker.
│
└── 3. admin-nextjs/
    ├── Công nghệ: Next.js 14/15 (App Router) + Tailwind CSS + shadcn/ui (Radix UI) + Sonner
    ├── Kiến trúc: Next.js Server & Client Components chuẩn chỉ (@/components/ui, @/lib, app/)
    ├── Mục đích: Hệ thống điều hành CMS & Khách hàng tiềm năng chuyên nghiệp dành cho Admin
    ├── Tính năng: Dashboard KPI, Quản lý Leads, Đổi trạng thái, Xuất CSV, Thêm Theme, Atlas Monitor
    └── Triển khai: 1-Click Deploy miễn phí 100% lên Vercel / Netlify.
```

---

## 🚀 Hướng Dẫn Chạy & Triển Khai Miễn Phí Từng Source

### 1️⃣ Phân Hệ Frontend Client (`/`)
- Chạy local:
  ```bash
  npm install
  npm run dev
  ```
- Biến môi trường (`.env`):
  ```env
  VITE_API_URL="https://your-backend-api.onrender.com" # Trỏ đến backend-api
  ```
- Triển khai miễn phí: Vercel, Cloudflare Pages, GitHub Pages, Netlify.

### 2️⃣ Phân Hệ Backend REST API (`/backend-api`)
- Chạy local:
  ```bash
  cd backend-api
  npm install
  npm run dev
  ```
- Biến môi trường (`backend-api/.env`):
  ```env
  PORT=5000
  MONGODB_URI="mongodb+srv://<user>:<pass>@cluster0.abcde.mongodb.net/thuypd_site?retryWrites=true&w=majority"
  JWT_SECRET="your_secure_jwt_secret"
  CLIENT_ORIGINS="*"
  ```
- Triển khai miễn phí: [Render.com Web Service](https://render.com) (Free Tier $0/tháng).

### 3️⃣ Phân Hệ Admin CMS (`/admin-nextjs`)
- Chạy local:
  ```bash
  cd admin-nextjs
  npm install
  npm run dev
  ```
- Biến môi trường (`admin-nextjs/.env.local`):
  ```env
  NEXT_PUBLIC_API_URL="https://your-backend-api.onrender.com"
  ```
- Triển khai miễn phí: [Vercel](https://vercel.com) (Framework: Next.js, $0/tháng).
- **Tài khoản đăng nhập mặc định**:
  - Username: `admin`
  - Password: `admin123`
