"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Typography } from "antd";

const { Text } = Typography;

interface CashFlowChartProps {
  data: {
    month: string;
    income: number;
    expense: number;
    profit: number;
  }[];
}

const formatMillion = (val: number) => {
  return `${(val / 1000000).toFixed(1)}M`;
};

const formatVND = (num: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num || 0);
};

export function CashFlowChart({ data }: CashFlowChartProps) {
  return (
    <Card className="rounded-xl border border-slate-200 shadow-xs h-full">
      <div className="mb-4">
        <h4 className="text-base font-bold text-slate-800">
          Xu Hướng Dòng Tiền & Lợi Nhuận (6 Tháng Qua)
        </h4>
        <Text type="secondary" className="text-xs">
          So sánh tương quan giữa Doanh thu bán hàng và Tổng chi phí vận hành (bao gồm quỹ lương)
        </Text>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
            <YAxis
              tickFormatter={formatMillion}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 11 }}
            />
            <Tooltip
              formatter={(value: any, name: any) => [
                formatVND(Number(value) || 0),
                name === "income" ? "Doanh thu" : name === "expense" ? "Chi phí" : "Lợi nhuận ròng",
              ]}
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                border: "1px solid #e2e8f0",
                fontSize: "12px",
              }}
            />
            <Legend
              formatter={(val) =>
                val === "income" ? "Doanh thu" : val === "expense" ? "Chi phí" : "Lợi nhuận ròng"
              }
              wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            />
            <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={30} />
            <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={30} />
            <Bar dataKey="profit" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

