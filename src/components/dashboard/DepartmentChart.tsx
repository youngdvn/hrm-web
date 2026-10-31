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
} from "recharts";
import { DepartmentHeadcountStat } from "@/types/dashboard.types";
import { useI18nStore } from "@/stores/i18n.store";

interface DepartmentChartProps {
  departments: DepartmentHeadcountStat[];
}

export function DepartmentChart({ departments }: DepartmentChartProps) {
  const { t } = useI18nStore();

  const chartData = departments.map((d) => ({
    name: d.name,
    count: d.employeeCount,
  }));

  return (
    <Card
      title={<span className="font-semibold text-slate-700">{t.dashboard.employeeDistribution}</span>}
      className="shadow-xs border-slate-200 h-full"
    >
      {chartData.length > 0 ? (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <RechartsTooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }}
                formatter={(val) => [`${val} nhân sự`, "Số lượng"]}
              />
              <Bar dataKey="count" fill="#1677ff" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-72 flex items-center justify-center text-slate-400">
          Chưa có dữ liệu phòng ban
        </div>
      )}
    </Card>
  );
}

