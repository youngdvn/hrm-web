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
import { FileProtectOutlined } from "@ant-design/icons";
import { ContractTypeStat } from "@/types/dashboard.types";
import { useI18nStore } from "@/stores/i18n.store";

const TYPE_COLORS: Record<string, string> = {
  DEFINITE_TERM: "#3b82f6",
  INDEFINITE_TERM: "#10b981",
  PROBATION: "#f59e0b",
  INTERNSHIP: "#8b5cf6",
  SEASONAL: "#06b6d4",
};

interface ContractTypeChartProps {
  data?: ContractTypeStat[];
}

export function ContractTypeChart({ data = [] }: ContractTypeChartProps) {
  const { t } = useI18nStore();

  const totalContracts = data.reduce((acc, cur) => acc + cur.count, 0);

  const getContractTypeName = (type: string) => {
    switch (type) {
      case "DEFINITE_TERM":
        return t.contract.typeDefinite;
      case "INDEFINITE_TERM":
        return t.contract.typeIndefinite;
      case "PROBATION":
        return t.contract.typeProbation;
      case "INTERNSHIP":
        return t.contract.typeInternship;
      case "SEASONAL":
        return t.contract.typeSeasonal;
      default:
        return type;
    }
  };

  const chartData = data.map((item) => ({
    name: getContractTypeName(item.contractType),
    value: item.count,
    type: item.contractType,
    percentage: totalContracts > 0 ? Math.round((item.count / totalContracts) * 100) : 0,
  }));

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileProtectOutlined className="text-blue-600 text-base" />
            <span className="font-semibold text-slate-800 text-sm md:text-base">
              {t.dashboard.contractTypesTitle}
            </span>
          </div>
          <span className="text-xs text-slate-400 font-normal">
            {totalContracts} hợp đồng
          </span>
        </div>
      }
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
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((entry) => (
                  <Cell
                    key={`type-${entry.type}`}
                    fill={TYPE_COLORS[entry.type] || "#94a3b8"}
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
                  `${val} hợp đồng (${item.payload.percentage}%)`,
                  name,
                ]}
              />
              <Legend verticalAlign="bottom" height={32} iconType="circle" />
            </PieChart>
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

