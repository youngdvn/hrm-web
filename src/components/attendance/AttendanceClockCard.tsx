"use client";

import { Card, Row, Col, Input, Button, Tag } from "antd";
import {
  ClockCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useI18nStore } from "@/stores/i18n.store";

interface AttendanceClockCardProps {
  currentDate: string;
  currentTime: string;
  notes: string;
  setNotes: (val: string) => void;
  isCheckedIn: boolean;
  isCheckedOut: boolean;
  isCheckingIn: boolean;
  isCheckingOut: boolean;
  onCheckIn: () => Promise<void>;
  onCheckOut: () => Promise<void>;
}

export function AttendanceClockCard({
  currentDate,
  currentTime,
  notes,
  setNotes,
  isCheckedIn,
  isCheckedOut,
  isCheckingIn,
  isCheckingOut,
  onCheckIn,
  onCheckOut,
}: AttendanceClockCardProps) {
  const { t } = useI18nStore();

  return (
    <Card className="shadow-xs border-slate-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/40">
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={10} className="text-center md:text-left">
          <div className="text-xs uppercase font-semibold text-slate-500 tracking-wider mb-1">
            {currentDate || "..."}
          </div>
          <div className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight font-mono">
            {currentTime || "--:--:--"}
          </div>
          <div className="text-xs text-slate-500 mt-2 flex items-center justify-center md:justify-start gap-1.5 flex-wrap">
            <ClockCircleOutlined /> {t.attendance.fixedShift}:{" "}
            <span className="font-semibold text-slate-700">08:30 - 17:30</span> •{" "}
            <Tag color="purple" className="!mr-0 font-medium">
              {t.attendance.after1730Ot}
            </Tag>
          </div>
        </Col>

        <Col xs={24} md={14}>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-end">
            <Input
              placeholder={t.attendance.notesPlaceholder}
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
              onClick={onCheckIn}
              className="!bg-emerald-600 hover:!bg-emerald-700 !h-12 !px-6 !font-semibold !shadow-md !shadow-emerald-600/20"
            >
              {isCheckedIn ? t.attendance.alreadyClockedIn : t.attendance.clockIn}
            </Button>

            <Button
              type="primary"
              size="large"
              icon={<LogoutOutlined />}
              loading={isCheckingOut}
              disabled={!isCheckedIn || isCheckedOut}
              onClick={onCheckOut}
              className="!h-12 !px-6 !font-semibold !shadow-md !shadow-blue-600/20"
            >
              {isCheckedOut ? t.attendance.alreadyClockedOut : t.attendance.clockOut}
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

