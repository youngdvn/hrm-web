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
import { useI18nStore } from "@/stores/i18n.store";
import { useAttendance } from "@/hooks/useAttendance";
import { useLeaves } from "@/hooks/useLeaves";
import { usePayroll } from "@/hooks/usePayroll";

const { Title, Text } = Typography;


export function EmployeeDashboard() {
  const router = useRouter();
  const { t } = useI18nStore();
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
                {t.employee.employeeCode}: {user?.employee?.employeeCode || "---"} •{" "}
                {user?.employee?.department?.name || t.common.unassigned}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
              onClick={() => router.push("/attendance")}
            >
              {t.attendance.clockIn}
            </Button>
            <Button
              className="!bg-white !text-blue-600 !border-white hover:!bg-blue-50 font-semibold"
              onClick={() => router.push("/leaves")}
            >
              {t.leave.createRequest}
            </Button>
          </div>
        </div>
      </Card>

      {/* KPI Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="shadow-xs border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">{t.attendance.todayStatus}</span>
              <FieldTimeOutlined className="text-blue-500 text-lg" />
            </div>
            {checkInTime ? (
              <div>
                <Tag color="green" className="mb-1">
                  {t.attendance.checkedIn}: {dayjs(checkInTime).format("HH:mm")}
                </Tag>
                {checkOutTime ? (
                  <div className="text-xs text-slate-500 space-y-1">
                    <div>
                      {t.attendance.checkOutTime}: {dayjs(checkOutTime).format("HH:mm")} ({hours} {t.attendance.hoursUnit})
                    </div>
                    {todayRecord?.overtimeHours && todayRecord.overtimeHours > 0 ? (
                      <Tag color="purple" className="!mr-0 font-semibold">
                        +{todayRecord.overtimeHours}h {t.attendance.overtime}
                      </Tag>
                    ) : null}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400">{t.attendance.notCheckedOut}</div>
                )}
              </div>
            ) : (
              <div>
                <Tag color="orange" className="mb-1">
                  {t.attendance.notCheckedIn}
                </Tag>
                <div className="text-xs text-slate-400">{t.attendance.shiftStartAt}</div>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card className="shadow-xs border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">{t.leave.remainingDays}</span>
              <CalendarOutlined className="text-emerald-500 text-lg" />
            </div>
            <div className="text-2xl font-bold text-emerald-600">
              {myBalance?.remainingDays ?? 12}{" "}
              <span className="text-xs font-normal text-slate-400">/ {myBalance?.totalDays ?? 12} {t.leave.daysUnit}</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {t.leave.usedDays}: {myBalance?.usedDays ?? 0} {t.leave.daysUnit}
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card className="shadow-xs border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">{t.payroll.latestPayslip}</span>
              <DollarCircleOutlined className="text-amber-500 text-lg" />
            </div>
            {latestPayslip ? (
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  {Number(latestPayslip.netSalary).toLocaleString("vi-VN")} đ
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {latestPayslip.payrollPeriod?.name || t.payroll.latestPeriod}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-base font-semibold text-slate-400">{t.payroll.noPayslips}</div>
                <div className="text-xs text-slate-400 mt-1">{t.payroll.calculatingFirstPeriod}</div>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Quick Action Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title={<span className="font-semibold text-slate-700">{t.attendance.recentHistory}</span>}
            extra={
              <Button type="link" size="small" onClick={() => router.push("/attendance")}>
                {t.common.viewAll} <ArrowRightOutlined />
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
                    {t.attendance.checkInTime}: {rec.checkIn ? dayjs(rec.checkIn).format("HH:mm") : "---"} • {t.attendance.checkOutTime}:{" "}
                    {rec.checkOut ? dayjs(rec.checkOut).format("HH:mm") : "---"}
                  </span>
                  <Tag color={rec.status === "PRESENT" ? "green" : "orange"}>
                    {rec.status === "PRESENT" ? t.attendance.statusOnTime : t.attendance.statusLate}
                  </Tag>
                </div>
              ))}
              {myHistory.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-400">{t.attendance.noRecords}</div>
              )}
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={<span className="font-semibold text-slate-700">{t.dashboard.internalDirectory}</span>}
            className="shadow-xs border-slate-200"
          >
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => router.push("/employees")}
                className="p-3 border border-slate-200 rounded-xl text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
              >
                <div className="text-base mb-1">👥</div>
                <div className="font-semibold text-slate-700 text-xs">{t.dashboard.employeeDirectory}</div>
                <div className="text-[11px] text-slate-400">{t.dashboard.employeeDirectoryDesc}</div>
              </button>

              <button
                type="button"
                onClick={() => router.push("/leaves")}
                className="p-3 border border-slate-200 rounded-xl text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
              >
                <div className="text-base mb-1">📝</div>
                <div className="font-semibold text-slate-700 text-xs">{t.dashboard.leaveRequest}</div>
                <div className="text-[11px] text-slate-400">{t.dashboard.leaveRequestDesc}</div>
              </button>

              <button
                type="button"
                onClick={() => router.push("/payroll")}
                className="p-3 border border-slate-200 rounded-xl text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
              >
                <div className="text-base mb-1">💵</div>
                <div className="font-semibold text-slate-700 text-xs">{t.dashboard.myPayslips}</div>
                <div className="text-[11px] text-slate-400">{t.dashboard.myPayslipsDesc}</div>
              </button>

              <button
                type="button"
                onClick={() => router.push("/profile")}
                className="p-3 border border-slate-200 rounded-xl text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
              >
                <div className="text-base mb-1">🔒</div>
                <div className="font-semibold text-slate-700 text-xs">{t.dashboard.profileSecurity}</div>
                <div className="text-[11px] text-slate-400">{t.dashboard.profileSecurityDesc}</div>
              </button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

