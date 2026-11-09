import React from "react";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SafetyCertificateOutlined,
  CrownOutlined,
  ApartmentOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { DemoAccount, HrmFeatureItem, RoleExperience, RoleKey } from "./types";

export function getDemoAccounts(isVi: boolean): DemoAccount[] {
  return [
    {
      role: isVi ? "Quản trị viên (Admin)" : "Administrator (Admin)",
      email: "admin@hrm.local",
      pass: "Admin@123456",
      desc: isVi
        ? "Toàn quyền quản trị hệ thống, phòng ban, phân quyền & audit log"
        : "Full administrative access, department config, RBAC & audit logs",
      badge: "Full Access",
      color: "red",
    },
    {
      role: isVi ? "Chuyên viên HR" : "HR Specialist",
      email: "hr@hrm.local",
      pass: "Admin@123456",
      desc: isVi
        ? "Quản lý nhân viên, hợp đồng lao động, chấm công & lập bảng lương"
        : "Employee profiles, labor contracts, attendance & payroll calculation",
      badge: "HR Operations",
      color: "blue",
    },
    {
      role: isVi ? "Trưởng phòng (Manager)" : "Department Manager",
      email: "manager@hrm.local",
      pass: "Admin@123456",
      desc: isVi
        ? "Giám sát chấm công nhóm, phê duyệt nhanh các đơn nghỉ phép & OT"
        : "Team attendance monitoring, 1-click leave & OT approval",
      badge: "Approver",
      color: "green",
    },
    {
      role: isVi ? "Nhân viên (Employee)" : "Staff Member (Employee)",
      email: "employee@hrm.local",
      pass: "Admin@123456",
      desc: isVi
        ? "Chấm công GPS, theo dõi giờ làm việc, gửi đơn xin nghỉ & xem phiếu lương"
        : "GPS punch-in/out, attendance timesheet, leave requests & payslips",
      badge: "Self-Service",
      color: "orange",
    },
  ];
}

export function getHrmFeatures(isVi: boolean): HrmFeatureItem[] {
  return [
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
}

export function getRoleExperiences(isVi: boolean): Record<RoleKey, RoleExperience> {
  return {
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
}

