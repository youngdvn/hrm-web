"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Tag,
  Tabs,
  Typography,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useAttendance } from "@/hooks/useAttendance";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import { AttendanceRecord, AttendanceStatus } from "@/types/attendance.types";
import { AttendanceClockCard } from "@/components/attendance/AttendanceClockCard";

const { Title, Text } = Typography;
const { Option } = Select;

export default function AttendancePage() {
  const { t, locale } = useI18nStore();
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
      const now = dayjs().locale(locale);
      setCurrentTime(now.format("HH:mm:ss"));
      const rawDate = now.format("dddd, DD/MM/YYYY");
      setCurrentDate(rawDate.charAt(0).toUpperCase() + rawDate.slice(1));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [locale]);

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
    PRESENT: t.attendance.statusOnTime,
    LATE: t.attendance.statusLate,
    EARLY_LEAVE: t.attendance.statusEarlyLeave,
    HALF_DAY: t.attendance.statusHalfDay,
    ABSENT: t.attendance.statusAbsent,
  };

  const columns: ColumnsType<AttendanceRecord> = [
    {
      title: t.common.date,
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
      title: t.attendance.checkInTime,
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
      title: t.attendance.checkOutTime,
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
      title: t.attendance.workHours,
      key: "workHours",
      width: 120,
      render: (_, r) => {
        const hours = r.workingHours ?? r.workHours;
        return hours !== null && hours !== undefined ? `${hours} ${t.attendance.hoursUnit}` : "---";
      },
    },
    {
      title: t.attendance.overtime,
      key: "overtime",
      width: 125,
      render: (_, r) => {
        const ot = r.overtimeHours ?? r.otHours;
        return ot && ot > 0 ? (
          <Tag color="purple" className="font-semibold !px-2 !py-0.5">
            +{ot}h {t.attendance.overtime}
          </Tag>
        ) : (
          <span className="text-slate-400">---</span>
        );
      },
    },
    {
      title: t.common.status,
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
      title: t.common.notes,
      dataIndex: "notes",
      key: "notes",
      render: (n) => n || <Text type="secondary">---</Text>,
    },
  ];

  const companyColumns: ColumnsType<AttendanceRecord> = [
    {
      title: t.employee.title,
      key: "employee",
      render: (_, r) => (
        <div>
          <div className="font-semibold text-slate-800">
            {r.employee?.lastName} {r.employee?.firstName}
          </div>
          <div className="text-xs text-slate-400">
            {r.employee?.employeeCode} • {r.employee?.department?.name || "---"}
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
          {t.attendance.title}
        </Title>
        <Text type="secondary">{t.attendance.subtitle}</Text>
      </div>

      <AttendanceClockCard
        currentDate={currentDate}
        currentTime={currentTime}
        notes={notes}
        setNotes={setNotes}
        isCheckedIn={isCheckedIn}
        isCheckedOut={isCheckedOut}
        isCheckingIn={isCheckingIn}
        isCheckingOut={isCheckingOut}
        onCheckIn={async () => {
          await checkIn(notes);
          setNotes("");
        }}
        onCheckOut={async () => {
          await checkOut(notes);
          setNotes("");
        }}
      />

      <Card className="shadow-xs border-slate-200">
        <Tabs
          defaultActiveKey="my"
          items={[
            {
              key: "my",
              label: t.attendance.myHistoryTab,
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
                  label: t.attendance.companyAttendanceTab,
                  children: (
                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-3">
                        <Select
                          placeholder={t.attendance.filterByStatus}
                          value={statusFilter}
                          onChange={(val) => {
                            setStatusFilter(val);
                            setPage(1);
                          }}
                          allowClear
                          className="w-48"
                        >
                          <Option value="PRESENT">{t.attendance.statusOnTime}</Option>
                          <Option value="LATE">{t.attendance.statusLate}</Option>
                          <Option value="EARLY_LEAVE">{t.attendance.statusEarlyLeave}</Option>
                          <Option value="HALF_DAY">{t.attendance.statusHalfDay}</Option>
                          <Option value="ABSENT">{t.attendance.statusAbsent}</Option>
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
