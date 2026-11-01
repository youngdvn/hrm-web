# HRM Web - Cổng Quản lý Nhân sự Doanh nghiệp (Enterprise HRM Portal)

Giao diện Web hiện đại dành cho Hệ thống Quản lý Nhân sự Doanh nghiệp (HRM), được xây dựng trên nền tảng **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Ant Design 6**, **Tailwind CSS v4** và **Socket.io**. Hệ thống cung cấp trải nghiệm phân quyền đa vai trò (RBAC), giao diện song ngữ Tiếng Việt & Tiếng Anh, giao tiếp thời gian thực và quản lý toàn diện quy trình nhân sự.

---

## 🌟 Tính năng nổi bật

### 1. Phân quyền Người dùng Đa cấp (RBAC) & Bảo mật
* Hỗ trợ 4 vai trò độc lập:
  * **ADMIN**: Toàn quyền cấu hình hệ thống, quản trị danh mục, giám sát nhật ký kiểm toán (Audit Trail) và tài khoản.
  * **HR (Nhân sự)**: Quản lý hồ sơ nhân viên, phòng ban, chức vụ, hợp đồng, chấm công, duyệt phép và tính lương.
  * **MANAGER (Quản lý bộ phận)**: Giám sát chấm công, duyệt đơn nghỉ phép của nhân sự cấp dưới, theo dõi hợp đồng và kỳ lương.
  * **EMPLOYEE (Nhân viên)**: Chấm công thời gian thực (Check-in/Check-out), nộp đơn xin nghỉ phép, tra cứu phiếu lương cá nhân và trò chuyện nội bộ.
* **Menu điều hướng động**: Tự động lọc và hiển thị danh mục theo đúng quyền hạn của người dùng.
* **Bảo vệ tuyến đường (`RoleGuard`)**: Chặn truy cập trái phép bằng logic xác thực client-side an toàn.
* **Đăng nhập nhanh (Quick Demo Login)**: Nút điền sẵn tài khoản 1 chạm cho cả 4 vai trò ngay tại trang đăng nhập.
* **Cơ chế Token an toàn**: Tự động đính kèm Bearer JWT và tự động làm mới Access Token (Silent Refresh 401 Interceptor) mà không làm gián đoạn trải nghiệm người dùng.

### 2. Thiết kế Giao diện & Typography Chuẩn mực
* **Font chữ chuẩn**: Sử dụng phông chữ thương hiệu **Be Vietnam Pro** đồng bộ trên toàn bộ Ant Design Token và CSS Layout.
* **Đa ngôn ngữ (i18n)**: Hỗ trợ chuyển đổi tức thì giữa Tiếng Việt và Tiếng Anh, lưu trạng thái vào LocalStorage và chống lỗi Hydration Mismatch.
* **Ant Design Dynamic Context Bridge**: Giải quyết triệt để cảnh báo `[antd: message] Static function can not consume context` bằng bridge provider chuẩn Ant Design `App`.

### 3. Bảng điều khiển Thông minh theo Vai trò (Dashboard)
* **Dành cho Quản trị & Nhân sự (Admin, HR, Manager)**:
  * Thẻ chỉ số tổng quan (Tổng nhân sự, Đang hoạt động, Thử việc, Số phòng ban).
  * Biểu đồ phân bổ nhân sự theo phòng ban dạng cột tương tác (`Recharts BarChart`).
  * Biểu đồ tròn cơ cấu trạng thái làm việc (`Recharts PieChart`).
  * Danh sách cảnh báo hợp đồng sắp hết hạn trong vòng 30 ngày.
* **Dành cho Nhân viên (Employee Workspace)**:
  * Lời chào cá nhân hóa và thông tin phòng ban, chức vụ.
  * Trạng thái chấm công hôm nay (Giờ check-in, check-out, số giờ làm).
  * Thống kê quỹ ngày phép năm còn lại.
  * Thẻ tóm tắt phiếu lương tháng gần nhất kèm nút thao tác nhanh.

### 4. Quản lý Hồ sơ Nhân sự (Employee Directory)
* Bảng danh bạ nhân viên với bộ lọc nâng cao (Phòng ban, Chức vụ, Trạng thái, Tìm kiếm theo mã NV/Họ tên/Email).
* Drawer thêm mới và cập nhật thông tin nhân viên với xác thực Form chặt chẽ (`React Hook Form` + `Zod`).
* **Tải lên ảnh đại diện thực tế**: Tích hợp trực tiếp tải ảnh chân dung nhân viên (JPG, PNG, WEBP tối đa 3MB).
* Modal xem chi tiết hồ sơ cá nhân đầy đủ (thông tin liên hệ, chức vụ, quản lý trực tiếp, ngày ký HĐ).

### 5. Quản lý Phòng ban & Chức vụ (Departments & Positions)
* Quản lý danh mục cơ cấu tổ chức doanh nghiệp.
* Thêm mới, chỉnh sửa thông tin phòng ban, mã code, mô tả và chức danh.

### 6. Chấm công & Điểm danh Thời gian thực (Attendance)
* Widget đồng hồ số thời gian thực chuẩn công ty (Ca làm việc 08:30 - 17:30).
* Nút bấm **Check-in / Check-out** thông minh:
  * Ghi nhận giờ giấc chính xác theo máy chủ.
  * Tự động phát hiện đi muộn (`LATE`), về sớm (`EARLY_LEAVE`) hoặc làm nửa ngày (`HALF_DAY`).
  * Tự động tính số giờ làm việc thực tế sau khi check-out.
* Bảng lịch sử chấm công cá nhân và bảng giám sát chấm công toàn công ty dành cho cấp quản lý.

### 7. Quản lý Nghỉ phép (Leave Management)
* Thống kê trực quan hạn mức ngày phép năm (Tổng phép, Đã dùng, Còn lại).
* Modal nộp đơn xin nghỉ phép (Nghỉ phép năm, Nghỉ ốm, Nghỉ không lương, Thai sản, ...) tự động tính số ngày xin nghỉ.
* Bảng lịch sử đơn nghỉ phép cá nhân.
* Bảng duyệt / từ chối đơn nghỉ phép dành cho Manager & HR kèm ghi chú phản hồi.

### 8. Quản lý Hợp đồng Lao động (Contracts)
* Quản lý hợp đồng thử việc, xác định thời hạn, không thời hạn, thời vụ, thực tập.
* Quản lý mức lương cơ bản và phụ cấp định dạng tiền tệ VND chuẩn Việt Nam.
* Cột đính kèm file hợp đồng: Cho phép tải lên và xem trực tiếp tệp PDF/ảnh hợp đồng trong tab mới của trình duyệt.

### 9. Quản lý Kỳ lương & Tính lương Tự động (Payroll)
* Khởi tạo kỳ tính lương theo tháng/năm và chu kỳ ngày.
* **Tính lương tự động**:
  * Tự động tổng hợp ngày công thực tế từ Chấm công và ngày nghỉ phép hưởng lương (Annual Leave).
  * Tính lương Gross, khấu trừ Bảo hiểm Xã hội (10.5%), giảm trừ gia cảnh (11.000.000 VNĐ), thuế TNCN (5%) và lương Net thực lĩnh.
* Xem chi tiết bảng phân bổ lương của từng nhân viên trong kỳ.
* Chốt và khóa kỳ lương chuyển trạng thái Đã chi trả (`PAID`).
* Trang tra cứu phiếu lương cá nhân bảo mật cho từng nhân sự.

### 10. Trò chuyện Nội bộ Thời gian thực (Realtime Chat - Socket.io)
* Giao diện 2 cột chuẩn trải nghiệm Slack / Microsoft Teams.
* **Giao tiếp WebSocket hai chiều**: Nhắn tin tức thì (độ trễ 0ms) mà không cần tải lại trang.
* **Chấm xanh trực tuyến (Online presence)**: Hiển thị trạng thái hoạt động của đồng nghiệp theo thời gian thực.
* **Chỉ báo đang soạn tin nhắn (Typing Indicator)**: Hiệu ứng 3 chấm nhảy động khi đối tác đang gõ phím kèm cơ chế Debounce tự tắt.
* Trạng thái tin nhắn đã gửi (`CheckOutlined`) và đã xem (`CheckCircleFilled`).
* Khung soạn thảo hỗ trợ phím tắt **Enter để gửi** và **Shift + Enter xuống dòng**.

### 11. Thông báo Nội bộ & Nhật ký Kiểm toán (Notifications & Audit Logs)
* Chuông thông báo trên Header kèm badge đỏ số tin chưa đọc, tự động đồng bộ ngầm.
* Modal phát thông báo toàn công ty hoặc gửi thông điệp riêng đến một nhân sự cụ thể (Admin & HR).
* Trang **Nhật ký kiểm toán (Audit Trail Logs)** theo dõi toàn bộ lịch sử thao tác hệ thống (Ai làm gì, vào thời điểm nào, địa chỉ IP và payload dữ liệu JSON).

---

## 🛠 Công nghệ sử dụng

| Công nghệ | Phiên bản | Mục đích sử dụng |
| :--- | :--- | :--- |
| **Next.js** | 16.4.2 (App Router) | React Framework hỗ trợ SSR, Client Components, Fast Refresh |
| **React** | 19.3.0 | Thư viện xây dựng giao diện người dùng |
| **TypeScript** | 5.x | Kiểm soát kiểu dữ liệu tĩnh và nâng cao độ an toàn mã nguồn |
| **Ant Design** | 6.6.8 | Thư viện UI Component doanh nghiệp hiện đại |
| **Tailwind CSS** | 4.x (`@tailwindcss/postcss`) | Tiện ích CSS phong cách Utility-first |
| **TanStack React Query** | 5.105.0 | Quản lý Server State, caching, revalidation và background sync |
| **Zustand** | 5.0.16 | Quản lý Client State (Auth, i18n) với LocalStorage persistence |
| **Socket.io-client** | 4.8.4 | Kết nối WebSocket thời gian thực cho tính năng Chat |
| **Ky** | 2.2.0 | HTTP Client siêu nhẹ dựa trên Fetch API, tích hợp Interceptors |
| **React Hook Form + Zod** | 7.x + 4.x | Xử lý biểu mẫu và kiểm tra hợp lệ dữ liệu (Form validation) |
| **Recharts** | 3.10.1 | Vẽ biểu đồ thống kê trực quan |
| **Day.js** | 1.11.x | Xử lý, định dạng và tính toán ngày giờ |

---

## 📁 Cấu trúc thư mục dự án

```
hrm-web/
├── public/                    # Tài nguyên tĩnh (Favicon, Logo, Images)
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/
│   │   │   └── login/         # Trang đăng nhập & chọn tài khoản demo
│   │   ├── (dashboard)/       # Layout chung cho khu vực người dùng đã đăng nhập
│   │   │   ├── attendance/    # Trang chấm công & điểm danh
│   │   │   ├── audit-logs/    # Trang nhật ký kiểm toán hệ thống
│   │   │   ├── chat/          # Trang trò chuyện nội bộ Realtime (Socket.io)
│   │   │   ├── contracts/     # Trang quản lý hợp đồng lao động & tệp PDF
│   │   │   ├── dashboard/     # Trang tổng quan KPI & biểu đồ theo vai trò
│   │   │   ├── departments/   # Trang quản lý phòng ban
│   │   │   ├── employees/     # Trang quản lý danh bạ nhân sự
│   │   │   ├── leaves/        # Trang quản lý & duyệt nghỉ phép
│   │   │   ├── payroll/       # Trang tính lương & phiếu lương
│   │   │   ├── positions/     # Trang quản lý chức vụ
│   │   │   ├── profile/       # Trang hồ sơ cá nhân, đổi mật khẩu & đổi avatar
│   │   │   └── layout.tsx     # Dashboard Layout (Sidebar + Header + Content)
│   │   ├── globals.css        # Cấu hình CSS toàn cục & Tailwind v4
│   │   ├── layout.tsx         # Root Layout, nạp Font Be Vietnam Pro
│   │   └── page.tsx           # Route chuyển hướng (Redirect về /dashboard)
│   ├── components/
│   │   ├── common/            # Components dùng chung (LanguageSwitcher, NotificationDropdown, RoleGuard)
│   │   ├── dashboard/         # Components giao diện Dashboard (StatCards, Charts, EmployeeDashboard)
│   │   ├── employees/         # Drawer tạo/sửa nhân viên, Modal xem chi tiết
│   │   └── layout/            # Sidebar menu động, Header thanh điều hướng
│   ├── hooks/                 # Custom React Query Hooks (useAuth, useEmployees, useAttendance, useChat, ...)
│   ├── lib/                   # Cấu hình thư viện (api-client, antd-app bridge, socket)
│   ├── providers/             # React Context Providers (AntdProvider, QueryProvider)
│   ├── stores/                # Zustand State Stores (auth.store, i18n.store)
│   ├── types/                 # Định nghĩa TypeScript Interfaces toàn hệ thống
│   └── utils/                 # Từ điển dịch song ngữ (i18n-dictionary) & Helper format
├── .env.example               # Mẫu cấu hình biến môi trường
├── .env.local                 # Biến môi trường cục bộ
├── package.json               # Danh sách dependencies & script khởi chạy
├── postcss.config.mjs         # Cấu hình Tailwind PostCSS
└── tsconfig.json              # Cấu hình TypeScript
```

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy

### 1. Yêu cầu hệ thống
* **Node.js**: Phiên bản 18.18 trở lên (Khuyên dùng Node 20 LTS).
* **Package Manager**: Khuyên dùng `pnpm` (hoặc `npm` / `yarn`).
* **Backend API**: Máy chủ `hrm-api` đang chạy tại cổng `8000`.

### 2. Cài đặt Dependencies
```bash
cd hrm-web
pnpm install
```

### 3. Cấu hình Biến môi trường
Tạo file `.env.local` tại thư mục gốc của `hrm-web`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000
PORT=3000
```

### 4. Khởi chạy ở Môi trường Phát triển (Development)
```bash
pnpm dev
```
Truy cập ứng dụng tại: [http://localhost:3000](http://localhost:3000)

### 5. Kiểm tra Kiểu dữ liệu & Đóng gói Production (Build)
```bash
# Kiểm tra toàn bộ mã nguồn không còn lỗi TypeScript
pnpm exec tsc --noEmit

# Đóng gói ứng dụng cho môi trường Production
pnpm build

# Khởi chạy bản đóng gói
pnpm start
```

---

## 👥 Danh sách Tài khoản Dùng thử (Demo Accounts)

Hệ thống đã có sẵn 4 tài khoản mẫu tương ứng với từng cấp bậc để kiểm thử:

| Vai trò | Email đăng nhập | Mật khẩu mặc định | Quyền hạn tiêu biểu |
| :--- | :--- | :--- | :--- |
| **ADMIN** | `admin@hrm.local` | `Admin@123` | Quản trị toàn hệ thống, phòng ban, chức vụ, audit log, thông báo |
| **HR** | `hr@hrm.local` | `Hr@123` | Quản lý nhân viên, hợp đồng, chấm công, duyệt phép, tính lương |
| **MANAGER** | `manager@hrm.local` | `Manager@123` | Xem nhân viên, duyệt phép, chấm công bộ phận, theo dõi hợp đồng |
| **EMPLOYEE** | `employee@hrm.local` | `Employee@123` | Bảng điều khiển cá nhân, tự chấm công, nộp đơn phép, chat nội bộ |

> 💡 **Mẹo**: Tại màn hình Đăng nhập ([`/login`](http://localhost:3000/login)), bạn có thể nhấn trực tiếp vào các nút bấm màu sắc bên dưới mục **"Đăng nhập nhanh để trải nghiệm"** để tự động điền tài khoản và đăng nhập ngay.

---

## 🤝 Tích hợp cùng Backend (`hrm-api`)

Dự án này hoạt động kết hợp cùng backend [`hrm-api`](../hrm-api):
- **Cổng Backend**: `http://localhost:8000`
- **Swagger Documentation**: `http://localhost:8000/api-docs`
- **WebSocket Gateway**: `ws://localhost:8000` (Socket.io)
