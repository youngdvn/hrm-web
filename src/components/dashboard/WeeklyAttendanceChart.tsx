"use client";

import { Card } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { WeeklyAttendanceItem } from "@/types/dashboard.types";
import { useI18nStore } from "@/stores/i18n.store";

interface WeeklyAttendanceChartProps {
  data?: WeeklyAttendanceItem[];
}

export function WeeklyAttendanceChart({ data = [] }: WeeklyAttendanceChartProps) {
  const { t } = useI18nStore();

  const chartData = data.map((item) => ({
    name: `${item.dayOfWeek} ${item.displayDate}`,
    present: item.present,
    late: item.late,
    halfDay: item.halfDay,
    absent: item.absent,
    total: item.total,
  }));

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-800 text-sm md:text-base">
            {t.dashboard.weeklyAttendanceTitle}
          </span>
          <span className="text-xs text-slate-400 font-normal">7 ngày qua</span>
        </div>
      }
      className="shadow-xs border-slate-200 h-full"
    >
      {chartData.length > 0 ? (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748b" }} />
              <RechartsTooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  fontSize: 12,
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={32}
                iconType="circle"
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              />
              <Bar
                dataKey="present"
                name={t.dashboard.presentOnTime}
                fill="#10b981"
                stackId="attendance"
              />
              <Bar
                dataKey="late"
                name={t.dashboard.lateArrival}
                fill="#f59e0b"
                stackId="attendance"
              />
              <Bar
                dataKey="halfDay"
                name={t.dashboard.halfDay}
                fill="#8b5cf6"
                stackId="attendance"
              />
              <Bar
                dataKey="absent"
                name={t.dashboard.notArrived}
                fill="#f43f5e"
                stackId="attendance"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-72 flex items-center justify-center text-slate-400">
          {t.common.noData || "Chưa có dữ liệu"}
        </div>
      )}
    </Card>
  );
}

