"use client";

import { Card } from "antd";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";
import { GenderDistributionCount } from "@/types/dashboard.types";
import { useI18nStore } from "@/stores/i18n.store";

const GENDER_COLORS = {
  MALE: "#3b82f6",
  FEMALE: "#ec4899",
  OTHER: "#f59e0b",
};

interface GenderDistributionChartProps {
  genderCounts?: GenderDistributionCount[];
}

export function GenderDistributionChart({ genderCounts = [] }: GenderDistributionChartProps) {
  const { t } = useI18nStore();

  const total = genderCounts.reduce((acc, cur) => acc + cur.count, 0);

  const chartData = genderCounts.map((g) => ({
    name:
      g.gender === "MALE"
        ? t.employee.male
        : g.gender === "FEMALE"
        ? t.employee.female
        : t.employee.other,
    value: g.count,
    gender: g.gender,
    percentage: total > 0 ? Math.round((g.count / total) * 100) : 0,
  }));

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-800 text-sm md:text-base">
            {t.dashboard.genderRatioTitle}
          </span>
          <span className="text-xs text-slate-400 font-normal">
            {total} {t.dashboard.totalEmployees.toLowerCase()}
          </span>
        </div>
      }
      className="shadow-xs border-slate-200 h-full flex flex-col"
    >
      {chartData.length > 0 ? (
        <div className="space-y-3">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={82}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={`gender-${entry.gender}`}
                      fill={GENDER_COLORS[entry.gender] || "#94a3b8"}
                    />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    fontSize: 12,
                  }}
                  formatter={(val, name, item) => [
                    `${val} nhân sự (${item.payload.percentage}%)`,
                    name,
                  ]}
                />
                <Legend verticalAlign="bottom" height={28} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Quick ratio pill bars */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
            {chartData.map((item) => (
              <div
                key={item.gender}
                className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <span className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: GENDER_COLORS[item.gender] }}
                  />
                  {item.name}
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {item.value}{" "}
                  <span className="text-[10px] text-slate-400 font-normal">
                    ({item.percentage}%)
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-72 flex items-center justify-center text-slate-400">
          {t.common.noData || "Chưa có dữ liệu"}
        </div>
      )}
    </Card>
  );
}

