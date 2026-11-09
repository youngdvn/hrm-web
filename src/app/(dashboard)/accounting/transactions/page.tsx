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
  Modal,
  Form,
  Popconfirm,
  Row,
  Col,
  InputNumber,
  DatePicker,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarCircleOutlined,
  BankOutlined,
  WalletOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { request, parseApiError } from "@/lib/api-client";
import { message } from "@/lib/antd-app";
import {
  Transaction,
  TransactionType,
  TransactionCategory,
  PaymentMethod,
} from "@/types/accounting.types";

const { Title, Text } = Typography;

export default function TransactionsPage() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | undefined>();
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch Transactions
  const { data, isLoading } = useQuery({
    queryKey: ["accounting-transactions", search, typeFilter, categoryFilter],
    queryFn: async () => {
      const res = await request.get<any>(
        "accounting/transactions",
        {
          search: search || undefined,
          type: typeFilter || undefined,
          category: categoryFilter || undefined,
          limit: 50,
        }
      );
      const items: Transaction[] = Array.isArray(res.data) ? res.data : res.data?.items || [];
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

  // Create Transaction Mutation
  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      return request.post("accounting/transactions", values);
    },
    onSuccess: () => {
      message.success("Ghi nhận phiếu thu/chi thành công");
      queryClient.invalidateQueries({ queryKey: ["accounting-transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounting-summary"] });
      setModalOpen(false);
      form.resetFields();
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return request.delete(`accounting/transactions/${id}`);
    },
    onSuccess: () => {
      message.success("Xóa phiếu giao dịch thành công");
      queryClient.invalidateQueries({ queryKey: ["accounting-transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounting-summary"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const categoryNames: Record<TransactionCategory, string> = {
    SALES_REVENUE: "Doanh thu bán hàng",
    PAYROLL: "Chi phí lương & Thưởng",
    OFFICE_EXPENSE: "Chi phí thuê & Vận hành",
    EQUIPMENT: "Mua sắm thiết bị máy tính",
    MARKETING: "Quảng cáo & Tiếp thị",
    OTHER: "Chi phí khác",
  };

  const formatVND = (num: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num || 0);
  };

  const transactionsList: Transaction[] = Array.isArray(data) ? data : data?.items || [];

  const columns = [
    {
      title: "Mã Phiếu",
      dataIndex: "transactionNumber",
      key: "transactionNumber",
      width: 130,
      render: (val: string, record: Transaction) => (
        <Tag color={record.type === "INCOME" ? "green" : "volcano"} className="font-mono font-bold">
          {val}
        </Tag>
      ),
    },
    {
      title: "Loại GD",
      dataIndex: "type",
      key: "type",
      width: 110,
      render: (type: TransactionType) => (
        <Tag color={type === "INCOME" ? "green" : "red"} className="font-medium">
          {type === "INCOME" ? (
            <span>
              <ArrowUpOutlined className="mr-1" />
              Thu tiền
            </span>
          ) : (
            <span>
              <ArrowDownOutlined className="mr-1" />
              Chi tiền
            </span>
          )}
        </Tag>
      ),
    },
    {
      title: "Hạng mục",
      dataIndex: "category",
      key: "category",
      width: 180,
      render: (cat: TransactionCategory) => (
        <span className="font-medium text-slate-800 text-xs">
          {categoryNames[cat] || cat}
        </span>
      ),
    },
    {
      title: "Số Tiền (VNĐ)",
      dataIndex: "amount",
      key: "amount",
      width: 160,
      align: "right" as const,
      render: (val: number, record: Transaction) => (
        <span
          className={`font-bold ${
            record.type === "INCOME" ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {record.type === "INCOME" ? "+" : "-"}
          {formatVND(val)}
        </span>
      ),
    },
    {
      title: "Hình thức",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 140,
      render: (method: PaymentMethod) => (
        <Tag color="blue" className="text-xs">
          {method === "BANK_TRANSFER" ? (
            <span>
              <BankOutlined className="mr-1" />
              Chuyển khoản
            </span>
          ) : (
            <span>
              <WalletOutlined className="mr-1" />
              Tiền mặt
            </span>
          )}
        </Tag>
      ),
    },
    {
      title: "Diễn giải & Tham chiếu",
      key: "notes",
      render: (_: any, record: Transaction) => (
        <div className="text-xs">
          <div className="text-slate-700">{record.notes || "—"}</div>
          {record.referenceCode && (
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              Ref: {record.referenceCode}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Ngày giao dịch",
      dataIndex: "transactionDate",
      key: "transactionDate",
      width: 120,
      render: (val: string) => (
        <span className="text-xs text-slate-500 font-mono">
          {new Date(val).toLocaleDateString("vi-VN")}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      width: 80,
      align: "center" as const,
      render: (_: any, record: Transaction) => (
        <Popconfirm
          title="Xác nhận xóa"
          description="Bạn có chắc chắn muốn xóa phiếu giao dịch này?"
          onConfirm={() => deleteMutation.mutate(record.id)}
          okText="Xóa"
          cancelText="Hủy"
          okButtonProps={{ danger: true }}
        >
          <Button type="text" size="small" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Title level={4} className="!mb-1 font-bold text-slate-800">
            Sổ Quỹ Thu - Chi (Tiền Mặt & Ngân Hàng)
          </Title>
          <Text type="secondary" className="text-xs sm:text-sm">
            Quản lý dòng tiền vào/ra, hạch toán doanh thu bán hàng và chi phí quỹ lương từ HRM.
          </Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            form.setFieldsValue({
              type: "INCOME",
              category: "SALES_REVENUE",
              paymentMethod: "BANK_TRANSFER",
            });
            setModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 font-medium h-9 px-4 rounded-lg self-start sm:self-auto"
        >
          Lập Phiếu Thu / Chi
        </Button>
      </div>

      {/* Stat Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Tổng Thu (Dòng Tiền Vào)</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">
              +{formatVND(summary?.totalIncome || 0)}
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Tổng Chi (Dòng Tiền Ra)</div>
            <div className="text-xl sm:text-2xl font-bold text-rose-600 mt-1">
              -{formatVND(summary?.totalExpense || 0)}
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Số Dư Quỹ Ngân Hàng</div>
            <div className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
              {formatVND(summary?.bankBalance || 0)}
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Lợi Nhuận Ròng (Thu - Chi)</div>
            <div
              className={`text-xl sm:text-2xl font-bold mt-1 ${
                (summary?.netProfit || 0) >= 0 ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {formatVND(summary?.netProfit || 0)}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Filter and Table Container */}
      <Card className="rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <Input
            placeholder="Tìm theo mã phiếu, mã tham chiếu, nội dung..."
            prefix={<SearchOutlined className="text-slate-400" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-md rounded-lg"
            allowClear
          />
          <Select
            placeholder="Tất cả loại giao dịch"
            value={typeFilter}
            onChange={setTypeFilter}
            className="w-full sm:w-44"
            allowClear
            options={[
              { value: "INCOME", label: "Phiếu Thu (+)" },
              { value: "EXPENSE", label: "Phiếu Chi (-)" },
            ]}
          />
          <Select
            placeholder="Hạng mục chi phí"
            value={categoryFilter}
            onChange={setCategoryFilter}
            className="w-full sm:w-56"
            allowClear
            options={[
              { value: "SALES_REVENUE", label: "Doanh thu bán hàng" },
              { value: "PAYROLL", label: "Chi phí lương & Thưởng" },
              { value: "OFFICE_EXPENSE", label: "Thuê & Vận hành" },
              { value: "EQUIPMENT", label: "Mua sắm thiết bị" },
              { value: "MARKETING", label: "Quảng cáo tiếp thị" },
              { value: "OTHER", label: "Chi phí khác" },
            ]}
          />
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={transactionsList}
          loading={isLoading}
          pagination={{ pageSize: 10, showTotal: (t) => `Tổng cộng ${t} phiếu giao dịch` }}
          scroll={{ y: 520, x: 950 }}
          className="border border-slate-100 rounded-lg"
        />
      </Card>

      {/* Create Transaction Modal */}
      <Modal
        title={<span className="font-bold text-slate-800">Lập Phiếu Thu / Phiếu Chi</span>}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        confirmLoading={createMutation.isPending}
        width={560}
        okText="Ghi Nhận Sổ Quỹ"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={(vals) => createMutation.mutate(vals)} className="mt-4">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Loại Giao Dịch" name="type" initialValue="INCOME">
                <Select
                  options={[
                    { value: "INCOME", label: "Phiếu Thu (+)" },
                    { value: "EXPENSE", label: "Phiếu Chi (-)" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Hạng Mục Giao Dịch" name="category" initialValue="SALES_REVENUE">
                <Select
                  options={[
                    { value: "SALES_REVENUE", label: "Doanh thu bán hàng" },
                    { value: "PAYROLL", label: "Chi trả lương nhân sự" },
                    { value: "OFFICE_EXPENSE", label: "Thuê & Vận hành văn phòng" },
                    { value: "EQUIPMENT", label: "Mua sắm thiết bị & Phần mềm" },
                    { value: "MARKETING", label: "Chi phí tiếp thị marketing" },
                    { value: "OTHER", label: "Khoản thu/chi khác" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Số Tiền Giao Dịch (VNĐ)"
                name="amount"
                rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
              >
                <InputNumber
                  min={1}
                  className="w-full"
                  formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phương Thức Thanh Toán" name="paymentMethod" initialValue="BANK_TRANSFER">
                <Select
                  options={[
                    { value: "BANK_TRANSFER", label: "Chuyển khoản ngân hàng" },
                    { value: "CASH", label: "Tiền mặt tại quỹ" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Mã Tham Chiếu (Hợp đồng / Đơn hàng / Bảng lương)" name="referenceCode">
            <Input placeholder="DH-2610-01 hoặc PAYROLL-10-2026..." />
          </Form.Item>

          <Form.Item label="Nội Dung Diễn Giải" name="notes">
            <Input.TextArea rows={2} placeholder="Mô tả lý do thu tiền hoặc chi tiền..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

