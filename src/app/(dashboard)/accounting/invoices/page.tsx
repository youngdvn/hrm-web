"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  Button,
  Card,
  Typography,
  Tag,
  Space,
  Input,
  Select,
  Row,
  Col,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  CheckCircleOutlined,
  FileDoneOutlined,
  AlertOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { request, parseApiError } from "@/lib/api-client";
import { message } from "@/lib/antd-app";
import { Invoice, InvoiceStatus } from "@/types/accounting.types";

const { Title, Text } = Typography;

export default function InvoicesPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  // Fetch Invoices
  const { data, isLoading } = useQuery({
    queryKey: ["accounting-invoices", search, statusFilter],
    queryFn: async () => {
      const res = await request.get<any>(
        "accounting/invoices",
        {
          search: search || undefined,
          status: statusFilter || undefined,
          limit: 50,
        }
      );
      const items: Invoice[] = Array.isArray(res.data) ? res.data : res.data?.items || [];
      const meta = res.meta || res.data?.meta || { total: items.length };
      return { items, meta };
    },
  });

  // Fetch Summary for top stat cards
  const { data: summary } = useQuery({
    queryKey: ["accounting-summary"],
    queryFn: async () => {
      const res = await request.get<any>("accounting/summary");
      return res.data;
    },
  });

  // Mark Paid Mutation
  const payMutation = useMutation({
    mutationFn: async (id: string) => {
      return request.patch(`accounting/invoices/${id}/pay`, { paymentMethod: "BANK_TRANSFER" });
    },
    onSuccess: () => {
      message.success("Xác nhận thanh toán hóa đơn thành công! Đã tự động tạo phiếu Thu vào Sổ quỹ.");
      queryClient.invalidateQueries({ queryKey: ["accounting-invoices"] });
      queryClient.invalidateQueries({ queryKey: ["accounting-summary"] });
      queryClient.invalidateQueries({ queryKey: ["accounting-transactions"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const statusConfig: Record<InvoiceStatus, { color: string; label: string }> = {
    PAID: { color: "green", label: "Đã thanh toán 100%" },
    PARTIAL: { color: "blue", label: "Thanh toán 1 phần" },
    UNPAID: { color: "orange", label: "Chưa thanh toán" },
    OVERDUE: { color: "red", label: "Quá hạn thanh toán" },
    CANCELLED: { color: "default", label: "Đã hủy" },
  };

  const formatVND = (num: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num || 0);
  };

  const invoicesList: Invoice[] = Array.isArray(data) ? data : data?.items || [];
  const totalReceivables = summary?.totalReceivables || 0;
  const overdueCount = summary?.overdueCount || invoicesList.filter((i) => i.status === "OVERDUE").length;
  const unpaidCount = summary?.unpaidCount || invoicesList.filter((i) => i.status === "UNPAID" || i.status === "PARTIAL").length;
  const paidCount = invoicesList.filter((i) => i.status === "PAID").length;

  const columns = [
    {
      title: "Số Hóa Đơn",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      width: 170,
      render: (val: string) => <Tag color="blue" className="font-mono font-bold">{val}</Tag>,
    },
    {
      title: "Khách hàng",
      key: "customer",
      render: (_: any, record: Invoice) => (
        <div>
          <div className="font-semibold text-slate-800">{record.customer?.name || "Khách lẻ"}</div>
          {record.customer?.company && (
            <div className="text-xs text-slate-500">{record.customer.company}</div>
          )}
        </div>
      ),
    },
    {
      title: "Mã Đơn Hàng",
      key: "order",
      width: 140,
      render: (_: any, record: Invoice) => (
        <span className="text-xs font-mono text-slate-600">
          {record.order?.orderNumber || "—"}
        </span>
      ),
    },
    {
      title: "Số Tiền Hóa Đơn",
      dataIndex: "amount",
      key: "amount",
      width: 160,
      align: "right" as const,
      render: (val: number) => (
        <span className="font-bold text-slate-900">{formatVND(val)}</span>
      ),
    },
    {
      title: "Đã Thu",
      dataIndex: "paidAmount",
      key: "paidAmount",
      width: 150,
      align: "right" as const,
      render: (val: number, record: Invoice) => (
        <div className="text-right">
          <span className="text-xs font-semibold text-emerald-600">{formatVND(val || 0)}</span>
          {record.amount - (val || 0) > 0 && (
            <div className="text-[11px] text-rose-500">
              Còn nợ: {formatVND(record.amount - (val || 0))}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 160,
      render: (status: InvoiceStatus) => {
        const conf = statusConfig[status] || { color: "default", label: status };
        return <Tag color={conf.color}>{conf.label}</Tag>;
      },
    },
    {
      title: "Hạn thanh toán",
      dataIndex: "dueDate",
      key: "dueDate",
      width: 120,
      render: (val: string) => (
        <span className="text-xs text-slate-500 font-mono">
          {val ? new Date(val).toLocaleDateString("vi-VN") : "—"}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      width: 140,
      render: (_: any, record: Invoice) => (
        <Space size="small">
          {record.status !== "PAID" ? (
            <Popconfirm
              title="Xác nhận thanh toán"
              description="Khách hàng đã thanh toán đủ hóa đơn này? Hệ thống sẽ tự động hạch toán vào Sổ quỹ."
              onConfirm={() => payMutation.mutate(record.id)}
              okText="Đã thanh toán"
              cancelText="Hủy"
            >
              <Button
                type="primary"
                size="small"
                icon={<CheckCircleOutlined />}
                loading={payMutation.isPending}
                className="bg-emerald-600 hover:bg-emerald-700 text-xs"
              >
                Thu Tiền
              </Button>
            </Popconfirm>
          ) : (
            <span className="text-xs text-emerald-600 font-medium">✓ Đã tất toán</span>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Title level={4} className="!mb-1 font-bold text-slate-800">
            Quản Lý Hóa Đơn & Công Nợ Khách Hàng (AR)
          </Title>
          <Text type="secondary" className="text-xs sm:text-sm">
            Theo dõi hóa đơn bán hàng, tiến độ thu hồi công nợ và tự động hạch toán sổ quỹ khi thanh toán.
          </Text>
        </div>
      </div>

      {/* Stat Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Công Nợ Phải Thu</div>
            <div className="text-xl sm:text-2xl font-bold text-amber-600 mt-1">
              {formatVND(totalReceivables)}
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Hóa Đơn Quá Hạn</div>
            <div className="text-xl sm:text-2xl font-bold text-rose-600 mt-1">
              {overdueCount} hóa đơn
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Chưa Thu / Thu 1 Phần</div>
            <div className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
              {unpaidCount} hóa đơn
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Đã Thu Đủ 100%</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">
              {paidCount} hóa đơn
            </div>
          </Card>
        </Col>
      </Row>

      {/* Filter and Table Container */}
      <Card className="rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <Input
            placeholder="Tìm theo số hóa đơn, tên khách hàng, tên công ty..."
            prefix={<SearchOutlined className="text-slate-400" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-md rounded-lg"
            allowClear
          />
          <Select
            placeholder="Tất cả trạng thái"
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-full sm:w-56"
            allowClear
            options={[
              { value: "UNPAID", label: "Chưa thanh toán" },
              { value: "PARTIAL", label: "Thanh toán 1 phần" },
              { value: "PAID", label: "Đã thanh toán 100%" },
              { value: "OVERDUE", label: "Quá hạn thanh toán" },
            ]}
          />
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={invoicesList}
          loading={isLoading}
          pagination={{ pageSize: 10, showTotal: (t) => `Tổng cộng ${t} hóa đơn` }}
          scroll={{ y: 520, x: 950 }}
          className="border border-slate-100 rounded-lg"
        />
      </Card>
    </div>
  );
}

