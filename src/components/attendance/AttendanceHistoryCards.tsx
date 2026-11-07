"use client";

import { useState, useMemo } from "react";
import { Tag, Empty, Spin, Segmented } from "antd";
import { HistoryOutlined, ThunderboltOutlined, ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { AttendanceRecord } from "@/types/attendance.types";
import { useI18nStore } from "@/stores/i18n.store";
import {
  ATTENDANCE_STATUS_COLORS,
  getAttendanceStatusLabel,
} from "@/constants/attendance.constants";

interface AttendanceHistoryCardsProps {
  records: AttendanceRecord[];
  isLoading: boolean;
  maxDisplay?: number;
}

export function AttendanceHistoryCards({
  records,
  isLoading,
  maxDisplay = 10,
}: AttendanceHistoryCardsProps) {
  const { t } = useI18nStore();
  const [filterType, setFilterType] = useState<"all" | "late" | "ot">("all");

  const filteredRecords = useMemo(() => {
    if (filterType === "late") {
      return records.filter((r) => r.status === "LATE");
    }
    if (filterType === "ot") {
      return records.filter((r) => {
        const ot = r.overtimeHours ?? r.otHours ?? 0;
        return ot > 0;
      });
    }
    return records;
  }, [records, filterType]);

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5 pb-2.5 border-b border-slate-100">
        <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <HistoryOutlined className="text-xs" />
          </div>
          <span>{t.attendance.recentHistory || "Lịch sử chấm công gần đây"}</span>
          <span className="text-[11px] font-normal text-slate-400">
            ({filteredRecords.length}/{records.length})
          </span>
        </div>

        <Segmented
          size="small"
          value={filterType}
          onChange={(v) => setFilterType(v as "all" | "late" | "ot")}
          options={[
            { label: t.common.all || "Tất cả", value: "all" },
            {
              label: (
                <span className="flex items-center gap-1 text-[11px]">
                  <ClockCircleOutlined className="text-amber-500" /> Muộn
                </span>
              ),
              value: "late",
            },
            {
              label: (
                <span className="flex items-center gap-1 text-[11px]">
                  <ThunderboltOutlined className="text-purple-500" /> OT
                </span>
              ),
              value: "ot",
            },
          ]}
          className="!bg-slate-100 text-xs self-start sm:self-auto"
        />
      </div>

      {isLoading ? (
        <div className="py-8 text-center">
          <Spin size="small" />
        </div>
      ) : filteredRecords.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            filterType === "late"
              ? "Tuyệt vời! Không có ngày nào đi muộn."
              : filterType === "ot"
              ? "Không có bản ghi tăng ca (OT)."
              : t.common.noData || "Chưa có dữ liệu chấm công"
          }
          className="my-4"
        />
      ) : (
        <div className="space-y-2.5">
          {filteredRecords.slice(0, maxDisplay).map((record) => {
            const inTime = record.checkInTime || record.checkIn;
            const outTime = record.checkOutTime || record.checkOut;
            const hours = record.workingHours ?? record.workHours;
            const ot = record.overtimeHours ?? record.otHours;

            return (
              <div
                key={record.id}
                className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between transition-colors hover:bg-slate-50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs sm:text-sm text-slate-800">
                      {dayjs(record.date).format("dddd, DD/MM/YYYY")}
                    </span>
                    <Tag
                      color={ATTENDANCE_STATUS_COLORS[record.status] || "default"}
                      className="!mr-0 text-[10px] !px-1.5 !py-0 font-medium"
                    >
                      {getAttendanceStatusLabel(record.status, t)}
                    </Tag>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span>
                      {t.attendance.checkInShort || "Vào"}:{" "}
                      <strong className="text-emerald-600 font-semibold">
                        {inTime ? dayjs(inTime).format("HH:mm:ss") : "--:--"}
                      </strong>
                    </span>
                    <span>
                      {t.attendance.checkOutShort || "Ra"}:{" "}
                      <strong className="text-blue-600 font-semibold">
                        {outTime ? dayjs(outTime).format("HH:mm:ss") : "--:--"}
                      </strong>
                    </span>
                    {hours !== null && hours !== undefined && (
                      <span className="text-slate-600">
                        • <strong>{hours}h làm việc</strong>
                      </span>
                    )}
                  </div>

                  {record.notes && (
                    <div className="text-[11px] text-slate-400 italic line-clamp-1">
                      📝 {record.notes}
                    </div>
                  )}
                </div>

                {ot && ot > 0 ? (
                  <Tag color="purple" className="!mr-0 text-[10px] font-bold shrink-0">
                    +{ot}h {t.attendance.overtime || "OT"}
                  </Tag>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

