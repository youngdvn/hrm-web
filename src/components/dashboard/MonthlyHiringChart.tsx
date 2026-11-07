"use client";

import { Card } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { UserAddOutlined } from "@ant-design/icons";
import { MonthlyHiringItem } from "@/types/dashboard.types";
import { useI18nStore } from "@/stores/i18n.store";

interface MonthlyHiringChartProps {
  data?: MonthlyHiringItem[];
}

export function MonthlyHiringChart({ data = [] }: MonthlyHiringChartProps) {
  const { t } = useI18nStore();

  const totalHires = data.reduce((acc, cur) => acc + cur.newHires, 0);

  const chartData = data.map((d) => ({
    name: d.displayMonth,
    hires: d.newHires,
  }));

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserAddOutlined className="text-indigo-600 text-base" />
            <span className="font-semibold text-slate-800 text-sm md:text-base">
              {t.dashboard.monthlyHiringTitle}
            </span>
          </div>
          <span className="text-xs text-indigo-600 bg-indigo-50 font-medium px-2 py-0.5 rounded-full border border-indigo-100">
            +{totalHires} {t.dashboard.newHiresLabel.toLowerCase()}
          </span>
        </div>
      }
      className="shadow-xs border-slate-200 h-full"
    >
      {chartData.length > 0 ? (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 15, right: 15, left: -20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748b" }} />
              <RechartsTooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
                formatter={(val) => [`${val} nhân sự`, t.dashboard.newHiresLabel]}
              />
              <Area
                type="monotone"
                dataKey="hires"
                stroke="#6366f1"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorHires)"
                dot={{ r: 4, fill: "#6366f1", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
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

