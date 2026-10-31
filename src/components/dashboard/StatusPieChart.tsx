"use client";

import { Card } from "antd";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from "recharts";
import { EmployeeStatusCount } from "@/types/dashboard.types";
import { useI18nStore } from "@/stores/i18n.store";

const CHART_COLORS = ["#1677ff", "#52c41a", "#faad14", "#f5222d", "#722ed1"];

interface StatusPieChartProps {
  statusCounts: EmployeeStatusCount[];
}

export function StatusPieChart({ statusCounts }: StatusPieChartProps) {
  const { t } = useI18nStore();

  const chartData = statusCounts.map((s) => ({
    name:
      s.status === "ACTIVE"
        ? t.employee.statusActive
        : s.status === "PROBATION"
          ? t.employee.statusProbation
          : s.status === "ON_LEAVE"
            ? t.employee.statusOnLeave
            : t.employee.statusTerminated,
    value: s.count,
  }));

  return (
    <Card
      title={<span className="font-semibold text-slate-700">{t.dashboard.workStatusRatio}</span>}
      className="shadow-xs border-slate-200 h-full"
    >
      {chartData.length > 0 ? (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip formatter={(val) => [`${val} người`, "Số lượng"]} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-72 flex items-center justify-center text-slate-400">
          Chưa có dữ liệu trạng thái
        </div>
      )}
    </Card>
  );
}

