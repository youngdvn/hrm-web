"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Tag,
  Tabs,
  Typography,
  Input,
  Select,
  DatePicker,
  Space,
} from "antd";
import {
  ClockCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  CalendarOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useAttendance } from "@/hooks/useAttendance";
import { useAuthStore } from "@/stores/auth.store";
import { AttendanceRecord, AttendanceStatus } from "@/types/attendance.types";

const { Title, Text } = Typography;
const { Option } = Select;

export default function AttendancePage() {
  const { hasRole } = useAuthStore();
  const isManagerOrAdmin = hasRole(["ADMIN", "HR", "MANAGER"]);

  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [notes, setNotes] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [statusFilter, setStatusFilter] = useState<AttendanceStatus | undefined>(undefined);

  useEffect(() => {
    const updateTime = () => {
      const now = dayjs();
      setCurrentTime(now.format("HH:mm:ss"));
      setCurrentDate(now.format("dddd, DD/MM/YYYY"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const {
    myHistory,
    isLoadingMyHistory,
    companyAttendance,
    meta,
    isLoadingCompany,
    checkIn,
    isCheckingIn,
    checkOut,
    isCheckingOut,
  } = useAttendance({
    page,
    limit,
    status: statusFilter,
  });

  const todayStr = dayjs().format("YYYY-MM-DD");
  const todayRecord = myHistory.find((r) => {
    const recordDate = dayjs(r.date).format("YYYY-MM-DD");
    const checkInDate = r.checkInTime || r.checkIn ? dayjs(r.checkInTime || r.checkIn).format("YYYY-MM-DD") : null;
    return recordDate === todayStr || checkInDate === todayStr || (r.date && r.date.startsWith(todayStr));
  });

  const isCheckedIn = !!(todayRecord?.checkInTime || todayRecord?.checkIn);
  const isCheckedOut = !!(todayRecord?.checkOutTime || todayRecord?.checkOut);

  const statusColorMap: Record<AttendanceStatus, string> = {
    PRESENT: "green",
    LATE: "orange",
    EARLY_LEAVE: "gold",
    HALF_DAY: "blue",
    ABSENT: "red",
  };

  const statusLabelMap: Record<AttendanceStatus, string> = {
    PRESENT: "Đúng giờ",
    LATE: "Đi muộn",
    EARLY_LEAVE: "Về sớm",
    HALF_DAY: "Nửa ngày",
    ABSENT: "Vắng mặt",
  };

  const columns: ColumnsType<AttendanceRecord> = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      width: 130,
      render: (date) => (
        <span className="font-medium text-slate-800">
          {dayjs(date).format("DD/MM/YYYY")}
        </span>
      ),
    },
    {
      title: "Giờ Check-in",
      key: "checkIn",
      width: 140,
      render: (_, r) => {
        const inTime = r.checkInTime || r.checkIn;
        return (
          <span className="text-emerald-600 font-semibold">
            {inTime ? dayjs(inTime).format("HH:mm:ss") : "---"}
          </span>
        );
      },
    },
    {
      title: "Giờ Check-out",
      key: "checkOut",
      width: 140,
      render: (_, r) => {
        const outTime = r.checkOutTime || r.checkOut;
        return (
          <span className="text-blue-600 font-semibold">
            {outTime ? dayjs(outTime).format("HH:mm:ss") : "---"}
          </span>
        );
      },
    },
    {
      title: "Số giờ làm",
      key: "workHours",
      width: 120,
      render: (_, r) => {
        const hours = r.workingHours ?? r.workHours;
        return hours !== null && hours !== undefined ? `${hours} giờ` : "---";
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (st: AttendanceStatus) => (
        <Tag color={statusColorMap[st] || "default"}>
          {statusLabelMap[st] || st}
        </Tag>
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "notes",
      key: "notes",
      render: (n) => n || <Text type="secondary">---</Text>,
    },
  ];

  const companyColumns: ColumnsType<AttendanceRecord> = [
    {
      title: "Nhân viên",
      key: "employee",
      render: (_, r) => (
        <div>
          <div className="font-semibold text-slate-800">
            {r.employee?.lastName} {r.employee?.firstName}
          </div>
          <div className="text-xs text-slate-400">
            {r.employee?.employeeCode} • {r.employee?.department?.name || "Chưa rõ phòng"}
          </div>
        </div>
      ),
    },
    ...columns,
  ];

  return (
    <div className="space-y-6">
      <div>
        <Title level={3} className="!mb-1">
          Chấm công & Điểm danh
        </Title>
        <Text type="secondary">
          Ghi nhận giờ làm việc hàng ngày và theo dõi lịch sử chấm công
        </Text>
      </div>

      {/* Check-In / Check-Out Widget */}
      <Card className="shadow-xs border-slate-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/40">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={10} className="text-center md:text-left">
            <div className="text-xs uppercase font-semibold text-slate-500 tracking-wider mb-1">
              {currentDate || "Đang đồng bộ..."}
            </div>
            <div className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight font-mono">
              {currentTime || "--:--:--"}
            </div>
            <div className="text-xs text-slate-400 mt-2 flex items-center justify-center md:justify-start gap-1">
              <ClockCircleOutlined /> Giờ tiêu chuẩn: 08:30 - 17:30
            </div>
          </Col>

          <Col xs={24} md={14}>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-end">
              <Input
                placeholder="Ghi chú check-in/out (tùy chọn)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="max-w-xs"
              />

              <Button
                type="primary"
                size="large"
                icon={<LoginOutlined />}
                loading={isCheckingIn}
                disabled={isCheckedIn}
                onClick={async () => {
                  await checkIn(notes);
                  setNotes("");
                }}
                className="!bg-emerald-600 hover:!bg-emerald-700 !h-12 !px-6 !font-semibold !shadow-md !shadow-emerald-600/20"
              >
                {isCheckedIn ? "Đã Check-in" : "Check-in"}
              </Button>

              <Button
                type="primary"
                size="large"
                icon={<LogoutOutlined />}
                loading={isCheckingOut}
                disabled={!isCheckedIn || isCheckedOut}
                onClick={async () => {
                  await checkOut(notes);
                  setNotes("");
                }}
                className="!h-12 !px-6 !font-semibold !shadow-md !shadow-blue-600/20"
              >
                {isCheckedOut ? "Đã Check-out" : "Check-out"}
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Attendance Tables */}
      <Card className="shadow-xs border-slate-200">
        <Tabs
          defaultActiveKey="my"
          items={[
            {
              key: "my",
              label: "Lịch sử chấm công của tôi",
              children: (
                <Table
                  columns={columns}
                  dataSource={myHistory}
                  rowKey="id"
                  loading={isLoadingMyHistory}
                  pagination={{ pageSize: 10 }}
                />
              ),
            },
            ...(isManagerOrAdmin
              ? [
                {
                  key: "company",
                  label: "Chấm công toàn công ty",
                  children: (
                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-3">
                        <Select
                          placeholder="Lọc theo trạng thái"
                          value={statusFilter}
                          onChange={(val) => {
                            setStatusFilter(val);
                            setPage(1);
                          }}
                          allowClear
                          className="w-48"
                        >
                          <Option value="PRESENT">Đúng giờ</Option>
                          <Option value="LATE">Đi muộn</Option>
                          <Option value="EARLY_LEAVE">Về sớm</Option>
                          <Option value="HALF_DAY">Nửa ngày</Option>
                          <Option value="ABSENT">Vắng mặt</Option>
                        </Select>
                      </div>

                      <Table
                        columns={companyColumns}
                        dataSource={companyAttendance}
                        rowKey="id"
                        loading={isLoadingCompany}
                        pagination={{
                          current: meta?.page || page,
                          pageSize: meta?.limit || limit,
                          total: meta?.total || 0,
                          onChange: (p, l) => {
                            setPage(p);
                            setLimit(l);
                          },
                        }}
                      />
                    </div>
                  ),
                },
              ]
              : []),
          ]}
        />
      </Card>
    </div>
  );
}

