"use client";

import { useMemo } from "react";
import dayjs from "dayjs";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { AttendanceRecord } from "@/types/attendance.types";
import { useI18nStore } from "@/stores/i18n.store";

interface AttendanceMiniStatsProps {
  records: AttendanceRecord[];
}

export function AttendanceMiniStats({ records }: AttendanceMiniStatsProps) {
  const { t } = useI18nStore();
  const stats = useMemo(() => {
    const currentMonth = dayjs().format("YYYY-MM");
    const recordsThisMonth = records.filter(
      (r) => dayjs(r.date).format("YYYY-MM") === currentMonth
    );

    let onTimeCount = 0;
    let lateCount = 0;
    let otHoursTotal = 0;
    let totalWorkHours = 0;

    recordsThisMonth.forEach((r) => {
      if (r.status === "PRESENT") onTimeCount++;
      if (r.status === "LATE") lateCount++;
      const ot = r.overtimeHours ?? r.otHours ?? 0;
      otHoursTotal += ot;
      const hours = r.workingHours ?? r.workHours ?? 0;
      totalWorkHours += hours;
    });

    return {
      totalDays: recordsThisMonth.length,
      onTimeCount,
      lateCount,
      otHoursTotal: Math.round(otHoursTotal * 10) / 10,
      totalWorkHours: Math.round(totalWorkHours * 10) / 10,
    };
  }, [records]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 px-4">
      <div className="bg-gradient-to-br from-white to-blue-50/40 border border-blue-100/80 rounded-2xl p-3 text-center shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-center justify-center gap-1 text-[11px] text-blue-600 font-semibold mb-0.5">
          <CalendarOutlined /> {t.attendance.totalWorkDays || "Ngày công"}
        </div>
        <div className="text-xl font-black text-slate-800 tracking-tight">
          {stats.totalDays} <span className="text-xs font-normal text-slate-400">công</span>
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">
          {stats.totalWorkHours}h làm việc
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-emerald-50/40 border border-emerald-100/80 rounded-2xl p-3 text-center shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-center justify-center gap-1 text-[11px] text-emerald-600 font-semibold mb-0.5">
          <CheckCircleOutlined /> {t.attendance.onTimeBadge || "Đúng giờ"}
        </div>
        <div className="text-xl font-black text-emerald-600 tracking-tight">
          {stats.onTimeCount} <span className="text-xs font-normal text-emerald-400">ngày</span>
        </div>
        <div className="text-[10px] text-emerald-500/80 mt-0.5">
          {stats.totalDays > 0
            ? `${Math.round((stats.onTimeCount / stats.totalDays) * 100)}% đúng giờ`
            : "100%"}
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-amber-50/40 border border-amber-100/80 rounded-2xl p-3 text-center shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-center justify-center gap-1 text-[11px] text-amber-600 font-semibold mb-0.5">
          <ClockCircleOutlined /> {t.attendance.lateBadge || "Đi muộn"}
        </div>
        <div className="text-xl font-black text-amber-600 tracking-tight">
          {stats.lateCount} <span className="text-xs font-normal text-amber-400">lần</span>
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">
          {stats.lateCount === 0 ? "Không muộn" : "Cần lưu ý"}
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-purple-50/40 border border-purple-100/80 rounded-2xl p-3 text-center shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-center justify-center gap-1 text-[11px] text-purple-600 font-semibold mb-0.5">
          <ThunderboltOutlined /> {t.attendance.overtimeBadge || "Tăng ca"}
        </div>
        <div className="text-xl font-black text-purple-600 tracking-tight">
          +{stats.otHoursTotal} <span className="text-xs font-normal text-purple-400">h</span>
        </div>
        <div className="text-[10px] text-purple-500/80 mt-0.5">
          Tăng ca lũy kế
        </div>
      </div>
    </div>
  );
}

