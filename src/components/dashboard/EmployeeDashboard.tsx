"use client";

import { Card, Row, Col, Typography, Button, Tag, Statistic, Avatar } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  DollarCircleOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useAuthStore } from "@/stores/auth.store";
import { useAttendance } from "@/hooks/useAttendance";
import { useLeaves } from "@/hooks/useLeaves";
import { usePayroll } from "@/hooks/usePayroll";

const { Title, Text } = Typography;


export function EmployeeDashboard() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { myHistory } = useAttendance();
  const { myBalance } = useLeaves();
  const { myPayslips } = usePayroll();

  const todayStr = dayjs().format("YYYY-MM-DD");
  const todayRecord = myHistory.find((r) => {
    const recordDate = dayjs(r.date).format("YYYY-MM-DD");
    const checkInDate = r.checkInTime || r.checkIn ? dayjs(r.checkInTime || r.checkIn).format("YYYY-MM-DD") : null;
    return recordDate === todayStr || checkInDate === todayStr || (r.date && r.date.startsWith(todayStr));
  });

  const checkInTime = todayRecord?.checkInTime || todayRecord?.checkIn;
  const checkOutTime = todayRecord?.checkOutTime || todayRecord?.checkOut;
  const hours = todayRecord?.workingHours ?? todayRecord?.workHours;

  const latestPayslip = myPayslips?.[0];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="shadow-xs border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar size={56} className="!bg-white !text-blue-600 font-bold text-xl">
              {user?.fullName?.charAt(0) || "E"}
            </Avatar>
            <div>
              <div className="text-xl font-bold">{user?.fullName}</div>
              <div className="text-blue-100 text-xs mt-0.5">
                Mã NV: {user?.employee?.employeeCode || "---"} •{" "}
                {user?.employee?.department?.name || "Chưa phân bổ"}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
              onClick={() => router.push("/attendance")}
            >
              Chấm công ngay
            </Button>
            <Button
              className="!bg-white !text-blue-600 !border-white hover:!bg-blue-50 font-semibold"
              onClick={() => router.push("/leaves")}
            >
              Nộp đơn nghỉ phép
            </Button>
          </div>
        </div>
      </Card>

      {/* KPI Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="shadow-xs border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Chấm công hôm nay</span>
              <FieldTimeOutlined className="text-blue-500 text-lg" />
            </div>
            {checkInTime ? (
              <div>
                <Tag color="green" className="mb-1">
                  Đã Check-in: {dayjs(checkInTime).format("HH:mm")}
                </Tag>
                {checkOutTime ? (
                  <div className="text-xs text-slate-500">
                    Check-out: {dayjs(checkOutTime).format("HH:mm")} (
                    {hours}h)
                  </div>
                ) : (
                  <div className="text-xs text-slate-400">Chưa check-out</div>
                )}
              </div>
            ) : (
              <div>
                <Tag color="orange" className="mb-1">
                  Chưa Check-in
                </Tag>
                <div className="text-xs text-slate-400">Ca làm việc bắt đầu 08:30</div>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card className="shadow-xs border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Ngày phép năm còn lại</span>
              <CalendarOutlined className="text-emerald-500 text-lg" />
            </div>
            <div className="text-2xl font-bold text-emerald-600">
              {myBalance?.remainingDays ?? 12}{" "}
              <span className="text-xs font-normal text-slate-400">/ {myBalance?.totalDays ?? 12} ngày</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Đã nghỉ: {myBalance?.usedDays ?? 0} ngày
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card className="shadow-xs border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Phiếu lương gần nhất</span>
              <DollarCircleOutlined className="text-amber-500 text-lg" />
            </div>
            {latestPayslip ? (
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  {Number(latestPayslip.netSalary).toLocaleString("vi-VN")} đ
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {latestPayslip.payrollPeriod?.name || "Kỳ lương gần nhất"}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-base font-semibold text-slate-400">Chưa có phiếu lương</div>
                <div className="text-xs text-slate-400 mt-1">Kỳ lương đầu tiên đang tính</div>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Quick Action Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title={<span className="font-semibold text-slate-700">Lịch sử Chấm công gần đây</span>}
            extra={
              <Button type="link" size="small" onClick={() => router.push("/attendance")}>
                Xem tất cả <ArrowRightOutlined />
              </Button>
            }
            className="shadow-xs border-slate-200"
          >
            <div className="space-y-2">
              {myHistory.slice(0, 5).map((rec) => (
                <div
                  key={rec.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs"
                >
                  <span className="font-medium text-slate-700">
                    {dayjs(rec.date).format("DD/MM/YYYY")}
                  </span>
                  <span className="text-slate-500">
                    Vào: {rec.checkIn ? dayjs(rec.checkIn).format("HH:mm") : "---"} • Ra:{" "}
                    {rec.checkOut ? dayjs(rec.checkOut).format("HH:mm") : "---"}
                  </span>
                  <Tag color={rec.status === "PRESENT" ? "green" : "orange"}>
                    {rec.status === "PRESENT" ? "Đúng giờ" : "Đi muộn"}
                  </Tag>
                </div>
              ))}
              {myHistory.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-400">Chưa có dữ liệu chấm công</div>
              )}
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={<span className="font-semibold text-slate-700">Danh bạ & Tiện ích nội bộ</span>}
            className="shadow-xs border-slate-200"
          >
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => router.push("/employees")}
                className="p-3 border border-slate-200 rounded-xl text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
              >
                <div className="text-base mb-1">👥</div>
                <div className="font-semibold text-slate-700 text-xs">Danh bạ nhân sự</div>
                <div className="text-[11px] text-slate-400">Tra cứu thông tin đồng nghiệp</div>
              </button>

              <button
                type="button"
                onClick={() => router.push("/leaves")}
                className="p-3 border border-slate-200 rounded-xl text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
              >
                <div className="text-base mb-1">📝</div>
                <div className="font-semibold text-slate-700 text-xs">Đơn xin nghỉ phép</div>
                <div className="text-[11px] text-slate-400">Nộp và theo dõi trạng thái duyệt</div>
              </button>

              <button
                type="button"
                onClick={() => router.push("/payroll")}
                className="p-3 border border-slate-200 rounded-xl text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
              >
                <div className="text-base mb-1">💵</div>
                <div className="font-semibold text-slate-700 text-xs">Phiếu lương của tôi</div>
                <div className="text-[11px] text-slate-400">Tra cứu chi tiết thu nhập</div>
              </button>

              <button
                type="button"
                onClick={() => router.push("/profile")}
                className="p-3 border border-slate-200 rounded-xl text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
              >
                <div className="text-base mb-1">🔒</div>
                <div className="font-semibold text-slate-700 text-xs">Hồ sơ & Bảo mật</div>
                <div className="text-[11px] text-slate-400">Đổi mật khẩu, xem hồ sơ</div>
              </button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

