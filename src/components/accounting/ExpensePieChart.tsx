"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, Typography } from "antd";

const { Text } = Typography;

interface ExpensePieChartProps {
  data: {
    category: string;
    label: string;
    amount: number;
  }[];
}

const COLORS = ["#f43f5e", "#f59e0b", "#3b82f6", "#8b5cf6", "#10b981", "#64748b"];

const formatVND = (num: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num || 0);
};

export function ExpensePieChart({ data }: ExpensePieChartProps) {
  const chartData = data && data.length > 0 ? data : [{ category: "NONE", label: "Chưa có chi phí", amount: 1 }];

  return (
    <Card className="rounded-xl border border-slate-200 shadow-xs h-full">
      <div className="mb-4">
        <h4 className="text-base font-bold text-slate-800">Cơ Cấu Chi Phí Doanh Nghiệp</h4>
        <Text type="secondary" className="text-xs">
          Tỷ trọng các nhóm chi phí chính (Quỹ lương HRM, Thuê văn phòng, Thiết bị, Marketing...)
        </Text>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="amount"
              nameKey="label"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: any) => [formatVND(Number(val) || 0), "Số tiền"]}
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                fontSize: "12px",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
              formatter={(val) => <span className="text-slate-600">{val}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

