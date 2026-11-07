"use client";

import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Tag,
  Input,
  Typography,
} from "antd";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useAttendance } from "@/hooks/useAttendance";
import { useRealtimeClock } from "@/hooks/useRealtimeClock";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useWorkTimer } from "@/hooks/useWorkTimer";
import { useI18nStore } from "@/stores/i18n.store";
import { AttendanceRecord, AttendanceStatus } from "@/types/attendance.types";
import { PunchClockButton } from "@/components/attendance/PunchClockButton";
import { AttendanceMiniStats } from "@/components/attendance/AttendanceMiniStats";
import { SHIFT_SCHEDULE } from "@/constants/attendance.constants";

const { Text } = Typography;

export function MyAttendanceTab() {
  const { t, locale } = useI18nStore();
  const [note, setNote] = useState("");

  const {
    myHistory,
    todayRecord,
    isCheckedIn,
    isCheckedOut,
    checkIn,
    checkOut,
    isCheckingIn,
    isCheckingOut,
    isLoadingMyHistory,
  } = useAttendance();

  const { time: currentTimeStr, date: currentDateStr } = useRealtimeClock(locale);
  const geo = useGeolocation();

  const checkInTime = todayRecord?.checkIn || todayRecord?.checkInTime;
  const elapsedTime = useWorkTimer(checkInTime, isCheckedIn && !isCheckedOut);

  const handlePunchCheckIn = async () => {
    await checkIn(note.trim() || undefined);
    setNote("");
  };

  const handlePunchCheckOut = async () => {
    await checkOut(note.trim() || undefined);
    setNote("");
  };

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

  const historyColumns: ColumnsType<AttendanceRecord> = [
    {
      title: t.common.date,
      dataIndex: "date",
      key: "date",
      width: 140,
      render: (val: string) => (
        <span className="font-medium text-slate-700">{dayjs(val).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: t.attendance.checkInTime,
      key: "checkIn",
      width: 130,
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
      width: 130,
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
      width: 120,
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
      width: 110,
      render: (_, record) => {
        const ot = record.overtimeHours ?? record.otHours ?? 0;
        return ot > 0 ? (
          <Tag color="volcano" className="font-semibold font-mono">
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
      render: (val: string | null) => (
        <span className="text-xs text-slate-500">{val || "-"}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6 my-4 px-4">
      {/* Top Punch Center & Clock Card */}
      <Card className="shadow-xs border-slate-200">
        <Row gutter={[24, 24]} align="middle">
          {/* Clock & Status */}
          <Col xs={24} md={10} className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-medium mb-3">
              <ClockCircleOutlined />
              <span>{currentDateStr || "--"}</span>
            </div>

            <div className="text-4xl sm:text-5xl font-mono font-bold text-slate-800 tracking-tight">
              {currentTimeStr || "--:--:--"}
            </div>

            {/* GPS Location status */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2.5">
              <EnvironmentOutlined className={geo.status === "success" ? "text-emerald-500" : "text-amber-500"} />
              <span>{geo.displayText}</span>
            </div>

            {/* Shift info badge */}
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 w-full max-w-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700">{t.attendance.fixedShift}:</span>
                <span className="font-semibold text-blue-600">
                  {SHIFT_SCHEDULE.displayLabel}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {t.attendance.after1730Ot}
              </div>
            </div>
          </Col>

          {/* Punch Button */}
          <Col xs={24} md={14} className="flex flex-col items-center justify-center">
            <PunchClockButton
              isCheckedIn={isCheckedIn}
              isCheckedOut={isCheckedOut}
              isCheckingIn={isCheckingIn}
              isCheckingOut={isCheckingOut}
              onCheckIn={handlePunchCheckIn}
              onCheckOut={handlePunchCheckOut}
              todayRecord={todayRecord}
              elapsedTime={elapsedTime}
            />

            {/* Note input */}
            {!isCheckedOut && (
              <div className="w-full max-w-sm mt-4">
                <Input
                  size="small"
                  placeholder={t.attendance.notesPlaceholder}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={100}
                  className="text-xs"
                />
              </div>
            )}
          </Col>
        </Row>
      </Card>

      {/* Mini Stats (This Month) */}
      <div className="">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 my-2.5">
          {t.attendance.todayStatus} & Thống kê tháng này
        </div>
        <AttendanceMiniStats records={myHistory} />
      </div>

      {/* My Attendance History Table */}
      <Card
        title={
          <span className="font-semibold text-slate-800 text-sm md:text-base flex items-center gap-2">
            <FieldTimeOutlined className="text-blue-500" /> {t.attendance.recentHistory}
          </span>
        }
        className="shadow-xs border-slate-200"
      >
        <Table<AttendanceRecord>
          columns={historyColumns}
          dataSource={myHistory}
          rowKey="id"
          loading={isLoadingMyHistory}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          scroll={{ x: 800, y: 400 }}
        />
      </Card>
    </div>
  );
}
