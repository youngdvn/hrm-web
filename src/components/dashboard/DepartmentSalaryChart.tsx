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
import { DollarOutlined } from "@ant-design/icons";
import { DepartmentSalaryStat } from "@/types/dashboard.types";
import { useI18nStore } from "@/stores/i18n.store";

interface DepartmentSalaryChartProps {
  data?: DepartmentSalaryStat[];
}

export function DepartmentSalaryChart({ data = [] }: DepartmentSalaryChartProps) {
  const { t } = useI18nStore();

  const totalBudget = data.reduce((acc, cur) => acc + cur.totalSalary, 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const chartData = data.map((d) => ({
    name: d.departmentName,
    totalSalary: d.totalSalary,
    avgSalary: d.avgSalary,
    contracts: d.contractCount,
    salaryInMillions: Math.round(d.totalSalary / 1000000),
  }));

  return (
    <Card
      title={
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <DollarOutlined className="text-emerald-600 text-base" />
            <span className="font-semibold text-slate-800 text-sm md:text-base">
              {t.dashboard.departmentSalaryTitle}
            </span>
          </div>
          <div className="text-xs text-slate-500">
            {t.dashboard.totalMonthlySalary}:{" "}
            <span className="font-bold text-emerald-600">
              {formatCurrency(totalBudget)}
            </span>
          </div>
        </div>
      }
      className="shadow-xs border-slate-200 h-full"
    >
      {chartData.length > 0 ? (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 15, right: 15, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickFormatter={(val) => `${Math.round(val / 1000000)}Tr`}
              />
              <RechartsTooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
                formatter={(val, name, item) => [
                  <div>
                    <div className="font-semibold text-emerald-600">
                      {formatCurrency(Number(val))}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {t.dashboard.avgSalaryLabel}: {formatCurrency(item.payload.avgSalary)} / người ({item.payload.contracts} HĐ)
                    </div>
                  </div>,
                  "Quỹ lương",
                ]}
              />
              <Bar
                dataKey="totalSalary"
                fill="#059669"
                radius={[6, 6, 0, 0]}
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

