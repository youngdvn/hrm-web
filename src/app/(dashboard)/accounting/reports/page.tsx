"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { Card, Typography, Row, Col, Table, Tag, Skeleton } from "antd";
import {
  RiseOutlined,
  DollarCircleOutlined,
  FallOutlined,
  PieChartOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { request } from "@/lib/api-client";
import { FinancialSummary } from "@/types/accounting.types";

const CashFlowChart = dynamic(
  () => import("@/components/accounting/CashFlowChart").then((m) => m.CashFlowChart),
  { ssr: false, loading: () => <Skeleton active paragraph={{ rows: 7 }} className="p-4" /> }
);

const ExpensePieChart = dynamic(
  () => import("@/components/accounting/ExpensePieChart").then((m) => m.ExpensePieChart),
  { ssr: false, loading: () => <Skeleton active paragraph={{ rows: 7 }} className="p-4" /> }
);

const { Title, Text } = Typography;

export default function FinancialReportsPage() {
  const { data: summary, isLoading } = useQuery<FinancialSummary>({
    queryKey: ["accounting-financial-summary"],
    queryFn: async () => {
      const res = await request.get<FinancialSummary>("accounting/summary");
      return res.data;
    },
  });

  const formatVND = (num: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num || 0);
  };

  const totalIncome = summary?.totalIncome || 0;
  const totalExpense = summary?.totalExpense || 0;
  const netProfit = summary?.netProfit || 0;
  const profitMargin = totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : "0.0";

  const breakdownData = (summary?.expenseBreakdown || []).map((b, idx) => ({
    key: idx,
    label: b.label,
    amount: b.amount,
    percentage: totalExpense > 0 ? ((b.amount / totalExpense) * 100).toFixed(1) : "0.0",
  }));

  const columns = [
    {
      title: "Khoản Mục Chi Phí",
      dataIndex: "label",
      key: "label",
      render: (val: string) => <span className="font-semibold text-slate-800">{val}</span>,
    },
    {
      title: "Tổng Số Tiền Đã Chi",
      dataIndex: "amount",
      key: "amount",
      align: "right" as const,
      render: (val: number) => (
        <span className="font-bold text-slate-900">{formatVND(val)}</span>
      ),
    },
    {
      title: "Tỷ Trọng Trong Tổng Chi",
      dataIndex: "percentage",
      key: "percentage",
      align: "right" as const,
      width: 180,
      render: (val: string) => <Tag color="blue">{val}%</Tag>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Title level={4} className="!mb-1 font-bold text-slate-800">
            Báo Cáo Tài Chính Tổng Hợp (P&L - Profit & Loss)
          </Title>
          <Text type="secondary" className="text-xs sm:text-sm">
            Bức tranh toàn cảnh kết quả hoạt động kinh doanh: Doanh thu bán hàng, Chi phí vận hành, Quỹ lương nhân sự và Lợi nhuận ròng.
          </Text>
        </div>
      </div>

      {/* Stat Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Doanh Thu Thuần</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">
              {formatVND(totalIncome)}
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Tổng Chi Phí Hoạt Động</div>
            <div className="text-xl sm:text-2xl font-bold text-rose-600 mt-1">
              {formatVND(totalExpense)}
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Lợi Nhuận Ròng (Net Profit)</div>
            <div
              className={`text-xl sm:text-2xl font-bold mt-1 ${
                netProfit >= 0 ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {formatVND(netProfit)}
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Biên Lợi Nhuận Ròng</div>
            <div className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
              {profitMargin}%
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={15}>
          <CashFlowChart data={summary?.monthlyTrend || []} />
        </Col>
        <Col xs={24} lg={9}>
          <ExpensePieChart data={summary?.expenseBreakdown || []} />
        </Col>
      </Row>

      {/* Detailed Breakdown Table */}
      <Card
        title={
          <span className="font-bold text-slate-800 text-sm">
            Chi Tiết Cơ Cấu Chi Phí Hoạt Động Doanh Nghiệp
          </span>
        }
        className="rounded-xl border border-slate-200 shadow-xs"
      >
        <Table
          rowKey="key"
          columns={columns}
          dataSource={breakdownData}
          pagination={false}
          scroll={{ y: 320 }}
          className="border border-slate-100 rounded-lg"
        />
      </Card>
    </div>
  );
}

