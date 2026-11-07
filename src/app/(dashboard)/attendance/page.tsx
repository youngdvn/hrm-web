"use client";

import { useState } from "react";
import {
  Card,
  Table,
  Button,
  Tag,
  Select,
  DatePicker,
  Row,
  Col,
  Statistic,
  Avatar,
  Typography,
  Tabs,
} from "antd";
import {
  DownloadOutlined,
  ReloadOutlined,
  FieldTimeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useAttendance } from "@/hooks/useAttendance";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import { RoleGuard } from "@/components/common/RoleGuard";
import { AttendanceRecord, AttendanceStatus } from "@/types/attendance.types";
import { message } from "@/lib/antd-app";
import { MyAttendanceTab } from "@/components/attendance/MyAttendanceTab";

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

export default function AttendancePage() {
  const { t } = useI18nStore();
  const { hasRole } = useAuthStore();
  const isManagerOrAbove = hasRole(["ADMIN", "HR", "MANAGER"]);

  const [activeTab, setActiveTab] = useState<string>("my-attendance");

  // Filter states for company timesheet
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);
  const [statusFilter, setStatusFilter] = useState<AttendanceStatus | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const queryParams = {
    page,
    limit: pageSize,
    startDate: dateRange[0]?.format("YYYY-MM-DD"),
    endDate: dateRange[1]?.format("YYYY-MM-DD"),
    status: statusFilter !== "ALL" ? statusFilter : undefined,
  };

  const { companyAttendance, totalCount, isLoadingCompany, refetchCompany } =
    useAttendance(queryParams);

  // Status tag mapper
  const renderStatusTag = (status: AttendanceStatus) => {
    switch (status) {
      case "PRESENT":
        return <Tag color="success">{t.attendance.statusOnTime}</Tag>;
      case "LATE":
        return <Tag color="warning">{t.attendance.statusLate}</Tag>;
      case "HALF_DAY":
        return <Tag color="purple">{t.attendance.statusHalfDay}</Tag>;
      case "EARLY_LEAVE":
        return <Tag color="processing">{t.attendance.statusEarlyLeave}</Tag>;
      case "ABSENT":
        return <Tag color="error">{t.attendance.statusAbsent}</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // Quick stats summary
  const presentCount = companyAttendance.filter((r) => r.status === "PRESENT").length;
  const lateCount = companyAttendance.filter((r) => r.status === "LATE").length;
  const halfDayCount = companyAttendance.filter((r) => r.status === "HALF_DAY").length;
  const totalHours = companyAttendance
    .reduce((acc, cur) => acc + (cur.workHours || cur.workingHours || 0), 0)
    .toFixed(1);

  // Export to CSV with UTF-8 BOM for Microsoft Excel
  const handleExportExcel = () => {
    if (companyAttendance.length === 0) {
      message.warning(t.attendance.noRecords);
      return;
    }

    const headers = [
      "Mã NV",
      "Họ và tên",
      "Phòng ban",
      "Ngày",
      "Giờ vào",
      "Giờ ra",
      "Giờ làm việc (h)",
      "Tăng ca (h)",
      "Trạng thái",
      "Ghi chú",
    ];

    const rows = companyAttendance.map((r) => {
      const empName = r.employee
        ? `${r.employee.lastName} ${r.employee.firstName}`
        : "N/A";
      const empCode = r.employee?.employeeCode || "N/A";
      const deptName = r.employee?.department?.name || "N/A";
      const dateStr = dayjs(r.date).format("DD/MM/YYYY");
      const inTime = r.checkIn || r.checkInTime ? dayjs(r.checkIn || r.checkInTime).format("HH:mm:ss") : "--:--";
      const outTime = r.checkOut || r.checkOutTime ? dayjs(r.checkOut || r.checkOutTime).format("HH:mm:ss") : "--:--";
      const hours = r.workHours ?? r.workingHours ?? 0;
      const ot = r.overtimeHours ?? r.otHours ?? 0;
      const statusText =
        r.status === "PRESENT"
          ? "Đúng giờ"
          : r.status === "LATE"
          ? "Đi muộn"
          : r.status === "HALF_DAY"
          ? "Nửa ngày"
          : r.status === "EARLY_LEAVE"
          ? "Về sớm"
          : "Vắng mặt";
      const notes = (r.notes || "").replace(/"/g, '""');

      return [
        `"${empCode}"`,
        `"${empName}"`,
        `"${deptName}"`,
        `"${dateStr}"`,
        `"${inTime}"`,
        `"${outTime}"`,
        `"${hours}"`,
        `"${ot}"`,
        `"${statusText}"`,
        `"${notes}"`,
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Bang_Cham_Cong_${dayjs().format("YYYYMMDD_HHmmss")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    message.success(t.attendance.exportSuccess);
  };

  const columns: ColumnsType<AttendanceRecord> = [
    {
      title: t.common.employees,
      key: "employee",
      width: 240,
      render: (_, record) => {
        const empName = record.employee
          ? `${record.employee.lastName} ${record.employee.firstName}`
          : t.common.unassigned;
        const empInitial = record.employee?.firstName?.[0] || "U";
        return (
          <div className="flex items-center gap-3">
            <Avatar
              size={36}
              className="bg-blue-600 text-white font-semibold shrink-0"
              icon={<UserOutlined />}
            >
              {empInitial}
            </Avatar>
            <div className="min-w-0">
              <div className="font-semibold text-slate-800 text-sm">{empName}</div>
              <div className="text-xs text-slate-400">
                {record.employee?.employeeCode} • {record.employee?.department?.name || t.common.unassigned}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: t.common.date,
      dataIndex: "date",
      key: "date",
      width: 120,
      render: (val: string) => (
        <span className="font-medium text-slate-700">{dayjs(val).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: t.attendance.checkInTime,
      key: "checkIn",
      width: 110,
      render: (_, record) => {
        const time = record.checkIn || record.checkInTime;
        return time ? (
          <span className="font-mono text-slate-800 font-medium">
            {dayjs(time).format("HH:mm:ss")}
          </span>
        ) : (
          <span className="text-slate-400">--:--</span>
        );
      },
    },
    {
      title: t.attendance.checkOutTime,
      key: "checkOut",
      width: 110,
      render: (_, record) => {
        const time = record.checkOut || record.checkOutTime;
        return time ? (
          <span className="font-mono text-slate-800 font-medium">
            {dayjs(time).format("HH:mm:ss")}
          </span>
        ) : (
          <span className="text-slate-400">--:--</span>
        );
      },
    },
    {
      title: t.attendance.workHours,
      key: "workHours",
      width: 110,
      render: (_, record) => {
        const hours = record.workHours ?? record.workingHours;
        return hours !== null && hours !== undefined ? (
          <span className="font-semibold text-slate-800">{hours}h</span>
        ) : (
          <span className="text-slate-400">0h</span>
        );
      },
    },
    {
      title: t.attendance.overtime,
      key: "overtimeHours",
      width: 100,
      render: (_, record) => {
        const ot = record.overtimeHours ?? record.otHours ?? 0;
        return ot > 0 ? (
          <Tag color="volcano" className="font-medium font-mono">
            +{ot}h
          </Tag>
        ) : (
          <span className="text-slate-400 text-xs">-</span>
        );
      },
    },
    {
      title: t.common.status,
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status: AttendanceStatus) => renderStatusTag(status),
    },
    {
      title: t.common.notes,
      dataIndex: "notes",
      key: "notes",
      ellipsis: true,
      render: (notes: string | null) => (
        <span className="text-xs text-slate-500">{notes || "-"}</span>
      ),
    },
  ];

  const tabItems = [
    {
      key: "my-attendance",
      label: (
        <span className="flex items-center gap-2">
          <FieldTimeOutlined /> {t.attendance.myHistoryTab}
        </span>
      ),
      children: <MyAttendanceTab />,
    },
    ...(isManagerOrAbove
      ? [
          {
            key: "company-attendance",
            label: (
              <span className="flex items-center gap-2">
                <CalendarOutlined /> {t.attendance.companyAttendanceTab}
              </span>
            ),
            children: (
              <div className="space-y-6 pt-2">
                {/* Header & Export Action */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 mb-0.5">
                      {t.attendance.companyAttendanceManagement}
                    </h2>
                    <p className="text-xs text-slate-500">{t.attendance.companyAttendanceDesc}</p>
                  </div>

                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={handleExportExcel}
                    className="!bg-emerald-600 hover:!bg-emerald-500 font-medium self-start sm:self-center"
                  >
                    {t.attendance.exportExcel}
                  </Button>
                </div>

                {/* KPI Mini-cards */}
                <Row gutter={[16, 16]}>
                  <Col xs={12} sm={6}>
                    <Card className="shadow-xs border-slate-200">
                      <Statistic
                        title={<span className="text-xs uppercase text-slate-500 font-medium">Lượt chấm công</span>}
                        value={companyAttendance.length}
                        prefix={<FieldTimeOutlined className="text-blue-500 mr-2" />}
                        styles={{ content: { fontWeight: 700, color: "#1e293b" } }}
                      />
                    </Card>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Card className="shadow-xs border-slate-200">
                      <Statistic
                        title={<span className="text-xs uppercase text-slate-500 font-medium">{t.dashboard.presentOnTime}</span>}
                        value={presentCount}
                        prefix={<CheckCircleOutlined className="text-emerald-500 mr-2" />}
                        styles={{ content: { fontWeight: 700, color: "#059669" } }}
                      />
                    </Card>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Card className="shadow-xs border-slate-200">
                      <Statistic
                        title={<span className="text-xs uppercase text-slate-500 font-medium">{t.dashboard.lateArrival}</span>}
                        value={lateCount}
                        prefix={<ClockCircleOutlined className="text-amber-500 mr-2" />}
                        styles={{ content: { fontWeight: 700, color: "#d97706" } }}
                      />
                    </Card>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Card className="shadow-xs border-slate-200">
                      <Statistic
                        title={<span className="text-xs uppercase text-slate-500 font-medium">Tổng giờ công ghi nhận</span>}
                        value={`${totalHours}h`}
                        prefix={<DashboardOutlined className="text-indigo-500 mr-2" />}
                        styles={{ content: { fontWeight: 700, color: "#4f46e5" } }}
                      />
                    </Card>
                  </Col>
                </Row>

                {/* Filter bar */}
                <Card className="shadow-xs border-slate-200">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <RangePicker
                        value={dateRange}
                        onChange={(dates) => {
                          if (dates && dates[0] && dates[1]) {
                            setDateRange([dates[0], dates[1]]);
                            setPage(1);
                          }
                        }}
                        format="DD/MM/YYYY"
                        allowClear={false}
                        className="w-64"
                      />

                      <Select
                        value={statusFilter}
                        onChange={(val) => {
                          setStatusFilter(val);
                          setPage(1);
                        }}
                        className="w-48"
                        options={[
                          { label: t.attendance.filterAllStatuses, value: "ALL" },
                          { label: t.attendance.statusOnTime, value: "PRESENT" },
                          { label: t.attendance.statusLate, value: "LATE" },
                          { label: t.attendance.statusHalfDay, value: "HALF_DAY" },
                          { label: t.attendance.statusEarlyLeave, value: "EARLY_LEAVE" },
                          { label: t.attendance.statusAbsent, value: "ABSENT" },
                        ]}
                      />
                    </div>

                    <Button
                      icon={<ReloadOutlined />}
                      onClick={() => refetchCompany()}
                      loading={isLoadingCompany}
                    >
                      {t.common.reset}
                    </Button>
                  </div>
                </Card>

                {/* Data Table */}
                <Card className="shadow-xs border-slate-200">
                  <Table<AttendanceRecord>
                    columns={columns}
                    dataSource={companyAttendance}
                    rowKey="id"
                    loading={isLoadingCompany}
                    pagination={{
                      current: page,
                      pageSize: pageSize,
                      total: totalCount || companyAttendance.length,
                      showSizeChanger: true,
                      pageSizeOptions: ["10", "15", "25", "50"],
                      onChange: (p, ps) => {
                        setPage(p);
                        setPageSize(ps);
                      },
                    }}
                    scroll={{ x: 900, y: 480 }}
                  />
                </Card>
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <RoleGuard allowedRoles={["ADMIN", "HR", "MANAGER", "EMPLOYEE"]}>
      <div className="space-y-6">
        <div>
          <Title level={3} className="!mb-1">
            {t.attendance.title}
          </Title>
          <Text type="secondary">{t.attendance.subtitle}</Text>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          type="card"
          className="bg-white rounded-xl p-4 shadow-xs border border-slate-200"
        />
      </div>
    </RoleGuard>
  );
}
