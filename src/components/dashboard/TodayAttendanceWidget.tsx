"use client";

import { useRouter } from "next/navigation";
import { Card, Progress, Row, Col, Button, Tooltip } from "antd";
import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  FieldTimeOutlined,
  ArrowRightOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { AttendanceTodayStats } from "@/types/dashboard.types";
import { useI18nStore } from "@/stores/i18n.store";

interface TodayAttendanceWidgetProps {
  stats?: AttendanceTodayStats;
}

export function TodayAttendanceWidget({ stats }: TodayAttendanceWidgetProps) {
  const router = useRouter();
  const { t } = useI18nStore();

  const total = stats?.total ?? 0;
  const checkedIn = stats?.checkedIn ?? 0;
  const onTime = stats?.onTime ?? 0;
  const late = stats?.late ?? 0;
  const halfDay = stats?.halfDay ?? 0;
  const absent = stats?.absent ?? 0;

  const attendanceRate = total > 0 ? Math.round((checkedIn / total) * 100) : 0;
  const todayFormatted = dayjs().format("DD/MM/YYYY");

  return (
    <Card
      className="shadow-xs border-slate-200 hover:shadow-sm transition-shadow"
      title={
        <div className="flex items-center justify-between flex-wrap gap-2 py-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-base">
              <FieldTimeOutlined />
            </div>
            <div>
              <div className="font-semibold text-slate-800 text-sm md:text-base flex items-center gap-2">
                <span>{t.dashboard.todayAttendance}</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Real-time
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                {todayFormatted} • {total} {t.dashboard.totalEmployees.toLowerCase()}
              </p>
            </div>
          </div>

          <Button
            type="link"
            size="small"
            className="!px-0 text-blue-600 hover:text-blue-700 font-medium text-xs flex items-center gap-1"
            onClick={() => router.push("/attendance")}
          >
            {t.dashboard.viewTimesheet} <ArrowRightOutlined className="text-[11px]" />
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Progress Bar & Rate Header */}
        <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              {t.dashboard.attendanceRate}
            </span>
            <div className="text-right">
              <span className="text-lg font-bold text-slate-800">{attendanceRate}%</span>
              <span className="text-xs text-slate-500 ml-1.5">
                ({checkedIn}/{total})
              </span>
            </div>
          </div>
          <Progress
            percent={attendanceRate}
            showInfo={false}
            strokeColor={{
              "0%": "#3b82f6",
              "100%": "#10b981",
            }}
            trailColor="#e2e8f0"
            size={["100%", 10]}
          />
        </div>

        {/* 4 Detail Metrics */}
        <Row gutter={[12, 12]}>
          {/* Đúng giờ */}
          <Col xs={12} sm={6}>
            <div className="rounded-xl p-3 bg-emerald-50/60 border border-emerald-100 hover:border-emerald-200 transition-all">
              <div className="flex items-center justify-between text-emerald-600 mb-1">
                <span className="text-xs font-medium">{t.dashboard.presentOnTime}</span>
                <CheckCircleFilled className="text-base" />
              </div>
              <div className="text-xl font-bold text-emerald-700">{onTime}</div>
              <div className="text-[11px] text-emerald-600/80 mt-0.5">
                {total > 0 ? Math.round((onTime / total) * 100) : 0}% tổng nhân sự
              </div>
            </div>
          </Col>

          {/* Đi muộn */}
          <Col xs={12} sm={6}>
            <div className="rounded-xl p-3 bg-amber-50/60 border border-amber-100 hover:border-amber-200 transition-all">
              <div className="flex items-center justify-between text-amber-600 mb-1">
                <span className="text-xs font-medium">{t.dashboard.lateArrival}</span>
                <ClockCircleFilled className="text-base" />
              </div>
              <div className="text-xl font-bold text-amber-700">{late}</div>
              <div className="text-[11px] text-amber-600/80 mt-0.5">
                {total > 0 ? Math.round((late / total) * 100) : 0}% tổng nhân sự
              </div>
            </div>
          </Col>

          {/* Nửa ngày */}
          <Col xs={12} sm={6}>
            <div className="rounded-xl p-3 bg-purple-50/60 border border-purple-100 hover:border-purple-200 transition-all">
              <div className="flex items-center justify-between text-purple-600 mb-1">
                <span className="text-xs font-medium">{t.dashboard.halfDay}</span>
                <DashboardOutlined className="text-base" />
              </div>
              <div className="text-xl font-bold text-purple-700">{halfDay}</div>
              <div className="text-[11px] text-purple-600/80 mt-0.5">Ca 0.5 ngày</div>
            </div>
          </Col>

          {/* Chưa đến / Vắng */}
          <Col xs={12} sm={6}>
            <div className="rounded-xl p-3 bg-rose-50/60 border border-rose-100 hover:border-rose-200 transition-all">
              <div className="flex items-center justify-between text-rose-600 mb-1">
                <span className="text-xs font-medium">{t.dashboard.notArrived}</span>
                <CloseCircleFilled className="text-base" />
              </div>
              <div className="text-xl font-bold text-rose-700">{absent}</div>
              <div className="text-[11px] text-rose-600/80 mt-0.5">
                {total > 0 ? Math.round((absent / total) * 100) : 0}% chưa check-in
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
}

