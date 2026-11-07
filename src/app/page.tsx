"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Tag,
  Card,
  Typography,
  Space,
  Divider,
  Modal,
  Tooltip,
} from "antd";
import {
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SafetyCertificateOutlined,
  ArrowRightOutlined,
  GlobalOutlined,
  LoginOutlined,
  DashboardOutlined,
  AuditOutlined,
  ApartmentOutlined,
  RiseOutlined,
  EnvironmentOutlined,
  CheckOutlined,
  StarFilled,
  RightOutlined,
  UserOutlined,
  CrownOutlined,
  ThunderboltOutlined,
  RocketOutlined,
  LockOutlined,
  CopyOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";

const { Title, Paragraph, Text } = Typography;

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { locale } = useI18nStore();
  const [mounted, setMounted] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [activeRoleTab, setActiveRoleTab] = useState<"admin" | "manager" | "hr" | "employee">("admin");
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isVi = locale === "vi";

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const demoAccounts = [
    {
      role: isVi ? "Quản trị viên (Admin)" : "Administrator (Admin)",
      email: "admin@hrm.local",
      pass: "Admin@123456",
      desc: isVi ? "Toàn quyền quản trị hệ thống, phòng ban, phân quyền & audit log" : "Full administrative access, department config, RBAC & audit logs",
      badge: "Full Access",
      color: "red",
    },
    {
      role: isVi ? "Chuyên viên HR" : "HR Specialist",
      email: "hr@hrm.local",
      pass: "Admin@123456",
      desc: isVi ? "Quản lý nhân viên, hợp đồng lao động, chấm công & lập bảng lương" : "Employee profiles, labor contracts, attendance & payroll calculation",
      badge: "HR Operations",
      color: "blue",
    },
    {
      role: isVi ? "Trưởng phòng (Manager)" : "Department Manager",
      email: "manager@hrm.local",
      pass: "Admin@123456",
      desc: isVi ? "Giám sát chấm công nhóm, phê duyệt nhanh các đơn nghỉ phép & OT" : "Team attendance monitoring, 1-click leave & OT approval",
      badge: "Approver",
      color: "green",
    },
    {
      role: isVi ? "Nhân viên (Employee)" : "Staff Member (Employee)",
      email: "employee@hrm.local",
      pass: "Admin@123456",
      desc: isVi ? "Chấm công GPS, theo dõi giờ làm việc, gửi đơn xin nghỉ & xem phiếu lương" : "GPS punch-in/out, attendance timesheet, leave requests & payslips",
      badge: "Self-Service",
      color: "orange",
    },
  ];

  const features = [
    {
      icon: <ClockCircleOutlined className="text-2xl text-blue-600" />,
      bg: "bg-blue-50 text-blue-600",
      title: isVi ? "Chấm Công GPS 1-Chạm" : "1-Touch GPS Attendance",
      subtitle: isVi ? "Định vị vị trí thực & Chống gian lận" : "Geofencing & Anti-Tampering",
      desc: isVi
        ? "Tự động xác thực tọa độ GPS theo bán kính công ty. Tính toán tức thì thời gian làm việc, đi trễ, về sớm và hệ số làm thêm giờ (OT x1.5, x2.0)."
        : "Automated GPS geofencing radius validation. Real-time work timer, tardiness tracking, and automated overtime multipliers.",
    },
    {
      icon: <CheckCircleOutlined className="text-2xl text-emerald-600" />,
      bg: "bg-emerald-50 text-emerald-600",
      title: isVi ? "Trung Tâm Duyệt Nhanh 1-Chạm" : "1-Click Quick Approval Center",
      subtitle: isVi ? "Không giấy tờ, phê duyệt tức thời" : "Paperless, Instant Workflows",
      desc: isVi
        ? "Phê duyệt đơn nghỉ phép, làm bù, làm thêm giờ theo phân cấp thẩm quyền (Manager → HR → Admin) chỉ với 1 cú click trên bảng điều khiển tập trung."
        : "Review and approve leave requests, overtime, and shift changes in seconds with tiered hierarchy permissions on a central widget.",
    },
    {
      icon: <DollarCircleOutlined className="text-2xl text-amber-600" />,
      bg: "bg-amber-50 text-amber-600",
      title: isVi ? "Tự Động Hóa Bảng Lương & Thuế" : "Automated Payroll & Tax Engine",
      subtitle: isVi ? "Chính xác, linh hoạt, xuất Excel UTF-8" : "Accurate, Compliant, Excel Export",
      desc: isVi
        ? "Tự động khóa kỳ lương từ bảng công thực tế, tính toán phụ cấp, khấu trừ BHXH, thuế TNCN và xuất file Excel tiếng Việt chuẩn kế toán không lỗi font."
        : "Seamlessly lock payroll periods from verified timesheets, calculate benefits, social insurance, PIT, and export UTF-8 formatted Excel spreadsheets.",
    },
    {
      icon: <FileTextOutlined className="text-2xl text-indigo-600" />,
      bg: "bg-indigo-50 text-indigo-600",
      title: isVi ? "Quản Lý Hợp Đồng & Cảnh Báo" : "Digital Contracts & Expiry Alerts",
      subtitle: isVi ? "Tránh rủi ro quá hạn hợp đồng" : "Automated Legal Compliance",
      desc: isVi
        ? "Quản trị toàn bộ vòng đời hợp đồng: Thử việc, Có thời hạn, Vô thời hạn. Hệ thống chủ động kích hoạt cảnh báo hợp đồng sắp hết hạn trước 30-60 ngày."
        : "Track probationary, fixed-term, and indefinite labor contracts. Automated visual badges and notifications 30-60 days prior to expiration.",
    },
    {
      icon: <BarChartOutlined className="text-2xl text-purple-600" />,
      bg: "bg-purple-50 text-purple-600",
      title: isVi ? "Phân Tích Dữ Liệu Nhân Sự (HR Analytics)" : "Advanced HR Analytics Suite",
      subtitle: isVi ? "7 mô hình biểu đồ trực quan hóa" : "7 Real-Time Analytical Charts",
      desc: isVi
        ? "Trực quan hóa xu hướng chấm công 7 ngày, biểu đồ tuyển dụng 6 tháng, cơ cấu giới tính, tỷ trọng hợp đồng và phân bổ ngân sách lương các phòng ban."
        : "Actionable dashboards: 7-day attendance trends, 6-month hiring velocity, gender distribution, contract types, and department payroll allocation.",
    },
    {
      icon: <SafetyCertificateOutlined className="text-2xl text-rose-600" />,
      bg: "bg-rose-50 text-rose-600",
      title: isVi ? "Bảo Mật RBAC & Nhật Ký Kiểm Toán" : "RBAC Security & Audit Trail",
      subtitle: isVi ? "Ghi vết mọi hành động nhạy cảm" : "Granular Roles & Event Logging",
      desc: isVi
        ? "Phân quyền chặt chẽ 4 cấp độ (Admin, Manager, HR, Employee). Hệ thống Audit Log ghi nhận chi tiết mọi hành vi thêm, sửa, xóa với địa chỉ IP và timestamp."
        : "Strict 4-tier Role-Based Access Control. Comprehensive Audit Trail records every modification with timestamps, action diffs, and client IP addresses.",
    },
  ];

  const roleExperiences = {
    admin: {
      title: isVi ? "Dành Cho Lãnh Đạo & Quản Trị Viên (Admin)" : "For Executives & Administrators",
      desc: isVi
        ? "Nắm bắt bức tranh nhân sự toàn cảnh, tỷ lệ chuyên cần, biến động quỹ lương và toàn quyền cấu hình phòng ban, vị trí công tác."
        : "Gain 360-degree visibility over company-wide workforce, attendance ratios, payroll budgets, and full organizational structure controls.",
      points: isVi
        ? [
            "Bảng điều khiển tổng quan (Executive Dashboard) cập nhật theo thời gian thực",
            "Giám sát biến động quỹ lương và chi phí nhân sự giữa các phòng ban",
            "Nhật ký kiểm toán (Audit Trail) chống rò rỉ dữ liệu và kiểm soát tuân thủ",
            "Quản lý cấu trúc tổ chức: 7+ Phòng ban, 20+ Vị trí công tác linh hoạt",
          ]
        : [
            "Real-time Executive Dashboard summarizing workforce health",
            "Cross-department payroll budget and cost allocation monitoring",
            "Full Audit Trail for regulatory compliance and tamper detection",
            "Dynamic organizational setup: 7+ Departments, 20+ Job positions",
          ],
      icon: <CrownOutlined className="text-2xl text-amber-500" />,
      tag: "Executive View",
    },
    manager: {
      title: isVi ? "Dành Cho Trưởng Phòng & Quản Lý Đội Ngũ (Manager)" : "For Team Leads & Department Managers",
      desc: isVi
        ? "Tinh gọn tối đa việc quản trị ca kíp, giám sát trạng thái có mặt của nhân viên và phê duyệt các yêu cầu nghỉ phép chỉ trong vài giây."
        : "Streamline shift operations, monitor live team attendance, and process leave and overtime requests in seconds.",
      points: isVi
        ? [
            "Trung tâm duyệt nhanh (Quick Approval Widget) xử lý đơn từ tập trung",
            "Theo dõi trực tiếp tỷ lệ đi muộn, về sớm của thành viên trong phòng ban",
            "Kiểm soát giờ làm thêm (OT) tránh vượt định mức cho phép",
            "Tra cứu nhanh hồ sơ nhân viên trong phạm vi quản lý",
          ]
        : [
            "Quick Approval Center for batch processing pending leaves & overtime",
            "Real-time team attendance and tardiness tracking",
            "Overtime budget control and threshold notifications",
            "Instant access to managed team member profiles",
          ],
      icon: <ApartmentOutlined className="text-2xl text-emerald-500" />,
      tag: "Management View",
    },
    hr: {
      title: isVi ? "Dành Cho Bộ Phận Nhân Sự (HR Specialist)" : "For Human Resources Professionals",
      desc: isVi
        ? "Giải phóng 80% gánh nặng hành chính giấy tờ, số hóa hoàn toàn hồ sơ nhân sự, vòng đời hợp đồng lao động và quy trình chốt lương."
        : "Automate 80% of administrative paperwork, digitize full employee lifecycles, contract renewals, and payroll closing.",
      points: isVi
        ? [
            "Quản lý hồ sơ nhân viên toàn diện: thông tin cá nhân, liên hệ, tài khoản ngân hàng",
            "Quản trị hợp đồng lao động và cảnh báo hợp đồng sắp hết hạn",
            "Chốt kỳ tính lương tự động, xuất báo cáo Excel UTF-8 không lỗi font",
            "Báo cáo thống kê tuyển dụng, biến động nhân sự qua các tháng",
          ]
        : [
            "360-degree employee database: personal, contact, and banking details",
            "Labor contract lifecycle management with 30/60-day expiry alerts",
            "One-click monthly payroll generation and UTF-8 Excel export",
            "Hiring velocity and workforce turnover analytics",
          ],
      icon: <TeamOutlined className="text-2xl text-blue-500" />,
      tag: "HR Operations",
    },
    employee: {
      title: isVi ? "Dành Cho Cán Bộ Nhân Viên (Employee Self-Service)" : "For Employees (Self-Service Portal)",
      desc: isVi
        ? "Trải nghiệm chấm công hiện đại, minh bạch giờ làm việc, gửi đơn xin phép thuận tiện và tra cứu phiếu lương điện tử bất cứ lúc nào."
        : "Modern, transparent workplace experience with GPS punch clock, easy leave applications, and instant digital payslip lookup.",
      points: isVi
        ? [
            "Chấm công GPS 1 chạm với định vị thông minh và đồng hồ đếm giờ làm việc",
            "Gửi đơn xin nghỉ phép, làm việc tại nhà, làm ngoài giờ với lý do cụ thể",
            "Tra cứu lịch sử vào/ra và tổng số giờ công tích lũy trong tháng",
            "Xem chi tiết phiếu lương hàng tháng rõ ràng từng khoản mục thu nhập",
          ]
        : [
            "1-touch GPS check-in/out with live work duration counter",
            "Submit leave, remote work, and overtime requests with instant status tracking",
            "Personal timesheet logs and accumulated work hours tracking",
            "Transparent digital payslip breakdown accessible anytime",
          ],
      icon: <UserOutlined className="text-2xl text-purple-500" />,
      tag: "Self-Service",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <TeamOutlined className="text-xl" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900 font-sans">
                  HRM Portal
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                  Enterprise
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                {isVi ? "Hệ thống Quản trị Nhân sự Số" : "Workforce Management Platform"}
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">
              {isVi ? "Tính năng" : "Features"}
            </a>
            <a href="#preview" className="hover:text-blue-600 transition-colors">
              {isVi ? "Giao diện" : "Interface"}
            </a>
            <a href="#metrics" className="hover:text-blue-600 transition-colors">
              {isVi ? "Hiệu quả" : "Impact"}
            </a>
            <a href="#roles" className="hover:text-blue-600 transition-colors">
              {isVi ? "Phân vai" : "Roles"}
            </a>
            <a href="#workflow" className="hover:text-blue-600 transition-colors">
              {isVi ? "Quy trình" : "Workflow"}
            </a>
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <Button
              type="text"
              onClick={() => setDemoModalOpen(true)}
              className="hidden lg:inline-flex items-center text-slate-600 hover:text-blue-600 font-medium text-xs border border-slate-200 hover:border-blue-400 rounded-lg px-2.5"
            >
              <RocketOutlined className="mr-1 text-blue-500" />
              {isVi ? "Tài khoản Demo" : "Demo Accounts"}
            </Button>

            {mounted && isAuthenticated ? (
              <Button
                type="primary"
                onClick={() => router.push("/dashboard")}
                icon={<DashboardOutlined />}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 border-none font-semibold shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 h-9 px-4 rounded-lg flex items-center"
              >
                <span>{isVi ? "Vào Dashboard" : "Go to Dashboard"}</span>
                <ArrowRightOutlined className="text-xs ml-1" />
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => router.push("/login")}
                  icon={<LoginOutlined />}
                  className="font-medium h-9 px-3.5 rounded-lg border-slate-300 text-slate-700 hover:text-blue-600 hover:border-blue-600"
                >
                  {isVi ? "Đăng nhập" : "Sign In"}
                </Button>
                <Button
                  type="primary"
                  onClick={() => router.push("/login")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 border-none font-medium h-9 px-4 rounded-lg shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700"
                >
                  {isVi ? "Trải nghiệm" : "Get Started"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-white via-slate-50 to-slate-100">
        {/* Glow backdrop decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-200/40 via-indigo-200/30 to-sky-200/40 blur-3xl -z-10 pointer-events-none" />
        <div className="absolute -top-10 right-10 w-72 h-72 bg-blue-300/20 rounded-full blur-2xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Announcement Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-medium mb-6 shadow-xs animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>
              {isVi
                ? "✨ HRM Enterprise v2.5 • Chuẩn hóa số hóa nhân sự theo tiêu chuẩn 4.0"
                : "✨ HRM Enterprise v2.5 • Next-Gen Digital Workforce Architecture"}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight sm:leading-tight">
            {isVi ? (
              <>
                Tối Ưu Hóa Nhân Lực. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                  Nâng Tầm Năng Suất Doanh Nghiệp.
                </span>
              </>
            ) : (
              <>
                Optimize Your Workforce. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                  Elevate Enterprise Productivity.
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {isVi
              ? "Hệ sinh thái chuyển đổi số quản trị nhân sự toàn diện: từ chấm công GPS thời gian thực, phê duyệt nghỉ phép 1-chạm, tự động hóa tính lương đa quy chế đến 7 mô hình phân tích số liệu nhân sự chuyên sâu."
              : "An all-in-one cloud platform empowering modern enterprises with real-time GPS attendance, 1-click approvals, automated multi-tier payroll, and deep workforce intelligence."}
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {mounted && isAuthenticated ? (
              <Button
                type="primary"
                size="large"
                onClick={() => router.push("/dashboard")}
                icon={<DashboardOutlined />}
                className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border-none font-semibold text-base shadow-lg shadow-blue-500/30 hover:scale-[1.02] transition-transform"
              >
                {isVi ? "Truy Cập Bảng Điều Khiển Ngay" : "Access Your Dashboard"}
                <ArrowRightOutlined className="ml-2" />
              </Button>
            ) : (
              <>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => router.push("/login")}
                  icon={<RocketOutlined />}
                  className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border-none font-semibold text-base shadow-lg shadow-blue-500/30 hover:scale-[1.02] transition-transform"
                >
                  {isVi ? "Trải Nghiệm Hệ Thống Ngay" : "Launch System Demo"}
                  <ArrowRightOutlined className="ml-2" />
                </Button>
                <Button
                  size="large"
                  onClick={() => setDemoModalOpen(true)}
                  className="w-full sm:w-auto h-12 px-6 rounded-xl border-slate-300 font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-500 bg-white shadow-xs"
                >
                  <LockOutlined className="mr-1 text-slate-400" />
                  {isVi ? "Xem Danh Sách Tài Khoản Demo" : "View Demo Credentials"}
                </Button>
              </>
            )}
          </div>

          {/* Trust points */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-slate-500 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <CheckOutlined className="text-emerald-500 font-bold" />
              {isVi ? "Chấm công GPS chuẩn xác 100%" : "100% Precise GPS Geofence"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckOutlined className="text-emerald-500 font-bold" />
              {isVi ? "Tự động tính lương & xuất Excel UTF-8" : "Automated Payroll & UTF-8 Excel"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckOutlined className="text-emerald-500 font-bold" />
              {isVi ? "Phân quyền RBAC 4 vai trò an toàn" : "4-Tier RBAC & Audit Trail"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckOutlined className="text-emerald-500 font-bold" />
              {isVi ? "Cảnh báo hạn hợp đồng tự động" : "Smart Contract Renewal Alerts"}
            </span>
          </div>

          {/* Interactive Mockup Container */}
          <div id="preview" className="mt-14 max-w-5xl mx-auto rounded-2xl border border-slate-200/80 bg-white p-2 sm:p-3 shadow-2xl shadow-slate-300/40 text-left">
            {/* Window title bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 bg-slate-50/70 rounded-t-xl mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                  https://hrm-portal.enterprise/dashboard
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Tag color="green" className="text-[10px] m-0 font-medium">
                  ● Live Data Connected
                </Tag>
              </div>
            </div>

            {/* Mock Dashboard Body */}
            <div className="p-3 sm:p-5 bg-slate-50/60 rounded-b-xl space-y-4">
              {/* Stat Cards row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">
                    {isVi ? "Tổng nhân viên" : "Total Employees"}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">36</div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">
                    ↑ +8% {isVi ? "tháng này" : "this month"}
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">
                    {isVi ? "Tỷ lệ đúng giờ" : "On-Time Rate"}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">98.2%</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">
                    {isVi ? "35/36 Đã check-in" : "35/36 Checked-in"}
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">
                    {isVi ? "Đơn chờ duyệt" : "Pending Requests"}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-amber-600 mt-1">6</div>
                  <div className="text-[11px] text-amber-600 font-medium mt-1">
                    ⚡ {isVi ? "Cần xử lý gấp" : "Needs review"}
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">
                    {isVi ? "Kỳ lương hiện tại" : "Current Payroll"}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">485.5M ₫</div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">
                    ✓ {isVi ? "100% Đã quyết toán" : "100% Settled"}
                  </div>
                </div>
              </div>

              {/* Main Preview Split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {/* Visual Chart Mock */}
                <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                      <BarChartOutlined className="text-blue-500" />
                      {isVi ? "Xu Hướng Chuyên Cần 7 Ngày Qua" : "7-Day Attendance Trend"}
                    </span>
                    <Tag color="blue" className="text-[10px] m-0">
                      Real-time
                    </Tag>
                  </div>
                  {/* CSS Simulated Bar Chart */}
                  <div className="h-36 sm:h-44 flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-100">
                    {[
                      { day: "T2", onTime: 95, late: 5 },
                      { day: "T3", onTime: 98, late: 2 },
                      { day: "T4", onTime: 92, late: 8 },
                      { day: "T5", onTime: 100, late: 0 },
                      { day: "T6", onTime: 97, late: 3 },
                      { day: "T7", onTime: 85, late: 15 },
                      { day: "CN", onTime: 40, late: 5 },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div className="w-full max-w-[28px] flex flex-col gap-0.5 justify-end h-full">
                          <div
                            style={{ height: `${bar.late * 1.5}%` }}
                            className="w-full bg-amber-400 rounded-t-xs"
                          />
                          <div
                            style={{ height: `${bar.onTime * 0.8}%` }}
                            className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-xs"
                          />
                        </div>
                        <span className="text-[10px] font-medium text-slate-500 mt-1">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                      {isVi ? "Đúng giờ (On-time)" : "On-time"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                      {isVi ? "Đi trễ (Late)" : "Late / Tardiness"}
                    </span>
                  </div>
                </div>

                {/* Quick Approval Widget Mock */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                        <CheckCircleOutlined className="text-emerald-500" />
                        {isVi ? "Phê Duyệt Nhanh" : "Quick Approvals"}
                      </span>
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        6 chờ
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                        <div className="flex justify-between font-semibold text-slate-800">
                          <span>Lê Thị Mai (Kế toán)</span>
                          <span className="text-amber-600 font-normal">Nghỉ phép</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">2 ngày • Lý do cá nhân</div>
                        <div className="flex gap-1.5 mt-2">
                          <button className="flex-1 py-1 rounded bg-emerald-600 text-white text-[10px] font-medium hover:bg-emerald-700">
                            ✓ {isVi ? "Duyệt" : "Approve"}
                          </button>
                          <button className="flex-1 py-1 rounded bg-slate-200 text-slate-700 text-[10px] font-medium hover:bg-slate-300">
                            ✕ {isVi ? "Từ chối" : "Reject"}
                          </button>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                        <div className="flex justify-between font-semibold text-slate-800">
                          <span>Trần Văn Hùng (Kỹ thuật)</span>
                          <span className="text-blue-600 font-normal">Làm ngoài giờ</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">3.5 giờ OT • Triển khai server</div>
                        <div className="flex gap-1.5 mt-2">
                          <button className="flex-1 py-1 rounded bg-emerald-600 text-white text-[10px] font-medium hover:bg-emerald-700">
                            ✓ {isVi ? "Duyệt" : "Approve"}
                          </button>
                          <button className="flex-1 py-1 rounded bg-slate-200 text-slate-700 text-[10px] font-medium hover:bg-slate-300">
                            ✕ {isVi ? "Từ chối" : "Reject"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-center">
                    <span className="text-[11px] text-blue-600 font-medium cursor-pointer hover:underline">
                      {isVi ? "Xem tất cả 6 đơn chờ xử lý →" : "View all 6 pending requests →"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Counter Section */}
      <section id="metrics" className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {isVi
                ? "Nền Tảng Được Thiết Kế Cho Năng Suất & Độ Chính Xác Tuyệt Đối"
                : "Engineered for Enterprise Reliability & Operational Precision"}
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              {isVi
                ? "Dữ liệu được chuẩn hóa, loại bỏ hoàn toàn sai sót thủ công và giảm tải 75% thời gian quản lý cho ban nhân sự."
                : "Eliminate manual errors and slash operational latency by up to 75% with automated business rules."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl backdrop-blur-xs text-center">
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text">
                36+
              </div>
              <div className="mt-2 text-base font-semibold text-slate-200">
                {isVi ? "Nhân Sự Chính Thức" : "Active Personnel"}
              </div>
              <div className="mt-1 text-xs text-slate-400">
                {isVi ? "Mở rộng không giới hạn quy mô doanh nghiệp" : "Scalable to unlimited enterprise scale"}
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl backdrop-blur-xs text-center">
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text">
                7
              </div>
              <div className="mt-2 text-base font-semibold text-slate-200">
                {isVi ? "Khối Phòng Ban Liên Kết" : "Interconnected Departments"}
              </div>
              <div className="mt-1 text-xs text-slate-400">
                {isVi ? "Kỹ thuật, Kinh doanh, Nhân sự, Tài chính..." : "Engineering, Sales, HR, Finance..."}
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl backdrop-blur-xs text-center">
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text">
                99.8%
              </div>
              <div className="mt-2 text-base font-semibold text-slate-200">
                {isVi ? "Chính Xác Chấm Công GPS" : "GPS Punch Accuracy"}
              </div>
              <div className="mt-1 text-xs text-slate-400">
                {isVi ? "Giảm 100% tình trạng chấm công hộ gian lận" : "Zero buddy-punching via real geofence"}
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl backdrop-blur-xs text-center">
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text">
                75%
              </div>
              <div className="mt-2 text-base font-semibold text-slate-200">
                {isVi ? "Tiết Kiệm Thời Gian Hành Chính" : "Admin Time Saved"}
              </div>
              <div className="mt-1 text-xs text-slate-400">
                {isVi ? "Tự động chốt bảng lương & phê duyệt đơn từ" : "Automated payroll & paperless workflows"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Bento Grid */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              {isVi ? "Tính Năng Cốt Lõi" : "Core Capabilities"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
              {isVi
                ? "Bộ Công Cụ Toàn Diện Cho Quản Trị Nhân Sự Hiện Đại"
                : "A Complete Suite For Next-Generation People Operations"}
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              {isVi
                ? "Tích hợp mọi khâu quản lý nhân sự trong một cổng thông tin duy nhất, bảo mật và thân thiện."
                : "Unifying recruitment, attendance, approvals, payroll, and compliance in one unified portal."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feat.bg}`}>
                    {feat.icon}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    {feat.subtitle}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>{isVi ? "Tìm hiểu thêm" : "Learn more"}</span>
                  <RightOutlined className="ml-1 text-[10px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Experience Showcase */}
      <section id="roles" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              {isVi ? "Trải Nghiệm Đa Phân Vai" : "Role-Based Experiences"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
              {isVi
                ? "Thiết Kế Chuyên Biệt Cho Mọi Vị Trí Trong Tổ Chức"
                : "Tailored Workspaces For Every Role Across Your Organization"}
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              {isVi
                ? "Mỗi người dùng chỉ thấy chính xác những công cụ và dữ liệu phù hợp với thẩm quyền của mình."
                : "Clear separation of duties ensuring maximum security and a clutter-free user experience."}
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="flex justify-center mb-10 overflow-x-auto pb-2">
            <div className="inline-flex p-1.5 bg-slate-100 rounded-xl border border-slate-200">
              {(["admin", "manager", "hr", "employee"] as const).map((roleKey) => (
                <button
                  key={roleKey}
                  onClick={() => setActiveRoleTab(roleKey)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 capitalize flex items-center gap-2 ${
                    activeRoleTab === roleKey
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {roleKey === "admin" && <CrownOutlined />}
                  {roleKey === "manager" && <ApartmentOutlined />}
                  {roleKey === "hr" && <TeamOutlined />}
                  {roleKey === "employee" && <UserOutlined />}
                  <span>{roleKey.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Role Card Presentation */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50/40 p-6 sm:p-10 rounded-3xl border border-blue-100 shadow-md">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center">
                  {roleExperiences[activeRoleTab].icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {roleExperiences[activeRoleTab].title}
                  </h3>
                  <Tag color="blue" className="mt-0.5 text-xs font-semibold">
                    {roleExperiences[activeRoleTab].tag}
                  </Tag>
                </div>
              </div>
              <Button
                type="primary"
                onClick={() => router.push("/login")}
                className="bg-blue-600 hover:bg-blue-700 font-medium rounded-lg"
              >
                {isVi ? "Thử nghiệm vai trò này →" : "Try this role →"}
              </Button>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              {roleExperiences[activeRoleTab].desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-slate-200/80">
              {roleExperiences[activeRoleTab].points.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
                  <CheckCircleOutlined className="text-emerald-500 mt-0.5 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Implementation Workflow */}
      <section id="workflow" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {isVi ? "Đơn Giản & Hiệu Quả" : "Simple 3-Step Setup"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
              {isVi ? "Vận Hành Dễ Dàng Chỉ Với 3 Bước" : "Get Up And Running In 3 Simple Steps"}
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              {isVi
                ? "Không cần cài đặt phức tạp, sẵn sàng đưa vào áp dụng ngay trong toàn doanh nghiệp."
                : "Zero complex setup required. Intuitive onboarding for admins, managers, and staff."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm relative">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isVi ? "Khai Báo & Thiết Lập" : "Structure Setup"}
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                {isVi
                  ? "Khai báo sơ đồ phòng ban, chức vụ, mức lương cơ bản và tạo tài khoản nhân sự với phân quyền tương ứng."
                  : "Establish company departments, job positions, base compensation, and issue user credentials with designated roles."}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm relative">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-md shadow-indigo-500/20">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isVi ? "Vận Hành Hàng Ngày" : "Daily Operations"}
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                {isVi
                  ? "Nhân viên chấm công GPS và gửi đơn phép trực tuyến. Quản lý nhận thông báo và phê duyệt tức thì trên widget trung tâm."
                  : "Employees clock in with GPS validation and file leave requests. Managers approve or decline instantly from their dashboard."}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center mb-6 shadow-md shadow-emerald-500/20">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isVi ? "Chốt Lương & Phân Tích" : "Payroll & Insights"}
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                {isVi
                  ? "Hệ thống tự động tổng hợp bảng công, áp dụng quy chế tính lương, xuất file Excel tiếng Việt và hiển thị báo cáo phân tích số liệu."
                  : "Automated timesheet consolidation, instant gross-to-net payroll computation, UTF-8 Excel export, and executive analytics."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Audit Highlight */}
      <section id="security" className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-4">
                <SecurityScanOutlined />
                <span>{isVi ? "An Toàn & Bảo Mật Chuẩn Doanh Nghiệp" : "Enterprise-Grade Security Standards"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {isVi
                  ? "Bảo Vệ Dữ Liệu Nhân Sự & Nhật Ký Kiểm Toán Toàn Vẹn"
                  : "Immutable Audit Trails & Strict Data Protection"}
              </h3>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                {isVi
                  ? "Mọi hành động nhạy cảm (cập nhật bảng lương, sửa đổi hợp đồng, cấp quyền tài khoản) đều được hệ thống ghi nhận vết (Audit Logs) kèm địa chỉ IP và dấu thời gian, ngăn ngừa rủi ro thất thoát dữ liệu."
                  : "Every critical modification is permanently timestamped in the Audit Log alongside client IP addresses, before-and-after snapshots, ensuring zero undetected tampering."}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckOutlined className="text-emerald-400" /> JWT Authentication & Refresh Tokens
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckOutlined className="text-emerald-400" /> PostgreSQL Neon Cloud Isolation
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckOutlined className="text-emerald-400" /> Password Hashing (Argon2 / BCrypt)
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
              <Button
                type="primary"
                size="large"
                onClick={() => router.push("/login")}
                icon={<ArrowRightOutlined />}
                className="bg-blue-600 hover:bg-blue-500 font-semibold h-12 px-8 rounded-xl shadow-lg shadow-blue-500/40"
              >
                {isVi ? "Đăng Nhập Khám Phá" : "Sign In & Explore"}
              </Button>
              <Button
                size="large"
                onClick={() => setDemoModalOpen(true)}
                className="border-slate-700 bg-slate-800/80 text-slate-200 hover:text-white hover:border-slate-500 font-medium h-12 px-6 rounded-xl"
              >
                {isVi ? "Danh Sách Tài Khoản Thử" : "Demo Accounts"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* High-Impact Bottom CTA Banner */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white text-2xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/25 mb-6">
            <ThunderboltOutlined />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {isVi
              ? "Sẵn Sàng Chuyển Đổi Số Nhân Sự Cho Doanh Nghiệp?"
              : "Ready To Transform Your People Operations Today?"}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            {isVi
              ? "Bắt đầu trải nghiệm ngay hệ thống quản trị nhân lực thông minh, chính xác và trực quan nhất."
              : "Experience the ultimate combination of speed, clarity, and automation for your workforce."}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              type="primary"
              size="large"
              onClick={() => router.push(mounted && isAuthenticated ? "/dashboard" : "/login")}
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border-none font-bold text-base shadow-lg shadow-blue-500/30 hover:scale-[1.02] transition-transform"
            >
              {mounted && isAuthenticated
                ? isVi
                  ? "Vào Dashboard Ngay →"
                  : "Enter Dashboard Now →"
                : isVi
                ? "Bắt Đầu Trải Nghiệm Miễn Phí"
                : "Start Free Trial"}
            </Button>
            <Button
              size="large"
              onClick={() => setDemoModalOpen(true)}
              className="w-full sm:w-auto h-12 px-6 rounded-xl border-slate-300 font-semibold text-slate-700 hover:text-blue-600 bg-white"
            >
              {isVi ? "Xem Tài Khoản Đăng Nhập" : "View Test Logins"}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <TeamOutlined />
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                HRM Portal Enterprise
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
              <a href="#features" className="hover:text-white transition-colors">
                {isVi ? "Tính năng" : "Features"}
              </a>
              <a href="#preview" className="hover:text-white transition-colors">
                {isVi ? "Trực quan hóa" : "Interface"}
              </a>
              <a href="#roles" className="hover:text-white transition-colors">
                {isVi ? "Phân quyền" : "Permissions"}
              </a>
              <a href="#security" className="hover:text-white transition-colors">
                {isVi ? "Bảo mật" : "Security"}
              </a>
              <Link href="/login" className="hover:text-white transition-colors">
                {isVi ? "Đăng nhập" : "Sign In"}
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} HRM Enterprise Portal. {isVi ? "Bản quyền thuộc về doanh nghiệp." : "All rights reserved."}
            </div>
            <div className="flex items-center gap-4">
              <span>Next.js 16 • Tailwind CSS v4 • Ant Design 6 • Neon PostgreSQL</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Credentials Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <RocketOutlined className="text-blue-600" />
            <span className="font-bold text-slate-900">
              {isVi ? "Tài Khoản Dùng Thử Hệ Thống (Demo Accounts)" : "Pre-Configured Demo Accounts"}
            </span>
          </div>
        }
        open={demoModalOpen}
        onCancel={() => setDemoModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setDemoModalOpen(false)}>
            {isVi ? "Đóng" : "Close"}
          </Button>,
          <Button
            key="login"
            type="primary"
            onClick={() => {
              setDemoModalOpen(false);
              router.push("/login");
            }}
            className="bg-blue-600"
          >
            {isVi ? "Đến Trang Đăng Nhập →" : "Proceed to Login →"}
          </Button>,
        ]}
        width={680}
      >
        <p className="text-xs text-slate-600 mb-4">
          {isVi
            ? "Bạn có thể sử dụng các tài khoản mẫu dưới đây để kiểm tra các quyền và giao diện khác nhau:"
            : "Use any of the seed accounts below to inspect role-specific views and features:"}
        </p>

        <div className="space-y-3">
          {demoAccounts.map((acc, index) => (
            <div
              key={index}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-white hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 text-sm">{acc.role}</span>
                  <Tag color={acc.color} className="text-[10px] m-0">
                    {acc.badge}
                  </Tag>
                </div>
                <div className="text-xs text-slate-500 mt-1">{acc.desc}</div>
                <div className="mt-2 flex items-center gap-4 text-xs font-mono">
                  <span className="text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded">
                    Email: <strong>{acc.email}</strong>
                  </span>
                  <span className="text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded">
                    Mật khẩu: <strong>{acc.pass}</strong>
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <Button
                  size="small"
                  icon={<CopyOutlined />}
                  onClick={() => handleCopy(`${acc.email}\n${acc.pass}`, acc.email)}
                  className="text-xs"
                >
                  {copiedAccount === acc.email
                    ? isVi
                      ? "Đã sao chép!"
                      : "Copied!"
                    : isVi
                    ? "Sao chép"
                    : "Copy"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
