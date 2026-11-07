"use client";

import { Spin } from "antd";
import { LoginOutlined, LogoutOutlined, CheckCircleFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { AttendanceRecord } from "@/types/attendance.types";
import { useI18nStore } from "@/stores/i18n.store";

interface PunchClockButtonProps {
  isCheckedIn: boolean;
  isCheckedOut: boolean;
  isCheckingIn: boolean;
  isCheckingOut: boolean;
  onCheckIn: () => Promise<void>;
  onCheckOut: () => Promise<void>;
  todayRecord?: AttendanceRecord;
  elapsedTime?: string;
}

export function PunchClockButton({
  isCheckedIn,
  isCheckedOut,
  isCheckingIn,
  isCheckingOut,
  onCheckIn,
  onCheckOut,
  todayRecord,
  elapsedTime,
}: PunchClockButtonProps) {
  const { t } = useI18nStore();

  const handleVibrate = () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(50);
      } catch (_) {}
    }
  };

  if (!isCheckedIn) {
    return (
      <div className="relative flex flex-col items-center">
        <div className="absolute -inset-2 rounded-full bg-emerald-500/20 blur-md animate-pulse pointer-events-none" />
        <button
          onClick={() => {
            handleVibrate();
            onCheckIn();
          }}
          disabled={isCheckingIn}
          className="group relative w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 text-white shadow-2xl shadow-emerald-600/35 flex flex-col items-center justify-center transition-all duration-300 active:scale-95 hover:scale-[1.02] focus:outline-none ring-8 ring-emerald-100 hover:ring-emerald-200 cursor-pointer disabled:opacity-75 z-10"
          aria-label={t.attendance.clockIn}
        >
          {isCheckingIn ? (
            <div className="flex flex-col items-center gap-2">
              <Spin size="large" className="!text-white" />
              <span className="text-xs font-semibold">{t.common.loading}...</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                <LoginOutlined className="text-2xl" />
              </div>
              <span className="font-black text-base tracking-wide uppercase">
                {t.attendance.punchIn || "VÀO CA"}
              </span>
              <span className="text-[11px] opacity-90 font-medium mt-0.5">
                {t.attendance.punchInSub || "Chạm để chấm công"}
              </span>
            </>
          )}
        </button>
      </div>
    );
  }

  if (!isCheckedOut) {
    const inTime = todayRecord?.checkInTime || todayRecord?.checkIn;
    return (
      <div className="relative flex flex-col items-center">
        <div className="absolute -inset-2 rounded-full bg-blue-500/20 blur-md animate-pulse pointer-events-none" />
        <button
          onClick={() => {
            handleVibrate();
            onCheckOut();
          }}
          disabled={isCheckingOut}
          className="group relative w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white shadow-2xl shadow-blue-600/35 flex flex-col items-center justify-center transition-all duration-300 active:scale-95 hover:scale-[1.02] focus:outline-none ring-8 ring-blue-100 hover:ring-blue-200 cursor-pointer disabled:opacity-75 z-10"
          aria-label={t.attendance.clockOut}
        >
          {isCheckingOut ? (
            <div className="flex flex-col items-center gap-2">
              <Spin size="large" className="!text-white" />
              <span className="text-xs font-semibold">{t.common.loading}...</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                <LogoutOutlined className="text-2xl" />
              </div>
              <span className="font-black text-base tracking-wide uppercase">
                {t.attendance.punchOut || "TAN CA"}
              </span>
              <span className="text-[11px] opacity-90 font-medium mt-0.5">
                {t.attendance.punchOutSub || "Chạm để kết thúc ca"}
              </span>
            </>
          )}
        </button>

        <div className="mt-4 text-xs text-slate-700 flex items-center gap-2 bg-blue-50/90 px-3.5 py-1.5 rounded-full border border-blue-200/80 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping shrink-0" />
          <span>
            {t.attendance.clockedInAt || "Đã vào ca lúc"}{" "}
            <strong className="text-blue-700">
              {inTime ? dayjs(inTime).format("HH:mm") : "--:--"}
            </strong>
          </span>
          {elapsedTime && (
            <span className="text-slate-500">
              • <strong className="text-slate-800">{elapsedTime}</strong>
            </span>
          )}
        </div>
      </div>
    );
  }

  const hoursWorked = todayRecord?.workingHours ?? todayRecord?.workHours ?? 8;
  const otHours = todayRecord?.overtimeHours ?? todayRecord?.otHours ?? 0;

  return (
    <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-gradient-to-b from-white to-emerald-50/70 border-4 border-emerald-400/40 shadow-lg shadow-emerald-500/10 flex flex-col items-center justify-center text-center p-3 relative">
      <CheckCircleFilled className="text-4xl text-emerald-500 mb-1" />
      <span className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
        {t.attendance.punchCompleted || "ĐÃ XONG CA"}
      </span>
      <span className="text-[10px] text-slate-500 font-medium mt-0.5">
        {t.attendance.todayShiftFinished || "Đã hoàn thành ca làm"}
      </span>
      <div className="mt-2 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
        {hoursWorked}h {t.attendance.workHoursCompleted || "công"}
      </div>
      {otHours > 0 && (
        <span className="text-[10px] font-semibold text-purple-600 mt-1">
          +{otHours}h OT
        </span>
      )}
    </div>
  );
}

