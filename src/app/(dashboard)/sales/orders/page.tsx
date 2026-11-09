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
  Divider,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { request, parseApiError } from "@/lib/api-client";
import { message } from "@/lib/antd-app";
import { SalesOrder, OrderStatus, Product, Customer } from "@/types/sales.types";
import { Employee } from "@/types/employee.types";

const { Title, Text } = Typography;

export default function SalesOrdersPage() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch Orders
  const { data, isLoading } = useQuery({
    queryKey: ["sales-orders", search, statusFilter],
    queryFn: async () => {
      const res = await request.get<any>("sales/orders", {
        search: search || undefined,
        status: statusFilter || undefined,
        limit: 50,
      });
      const items: SalesOrder[] = Array.isArray(res.data) ? res.data : res.data?.items || [];
      const meta = res.meta || res.data?.meta || { total: items.length };
      return { items, meta };
    },
  });

  // Fetch Sales Stats
  const { data: stats } = useQuery({
    queryKey: ["sales-stats"],
    queryFn: async () => {
      const res = await request.get<any>("sales/stats");
      return res.data;
    },
  });

  // Fetch Customers for order selection
  const { data: customers = [] } = useQuery<Customer[]>({
    queryKey: ["customers-list-select"],
    queryFn: async () => {
      const res = await request.get<any>("sales/customers", { limit: 100 });
      return Array.isArray(res.data) ? res.data : res.data?.items || [];
    },
  });

  // Fetch Products for line items
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products-list-select"],
    queryFn: async () => {
      const res = await request.get<any>("sales/products");
      return Array.isArray(res.data) ? res.data : res.data?.items || [];
    },
  });

  // Fetch Employees for sales rep
  const { data: employees = [] } = useQuery<Employee[]>({
    queryKey: ["employees-select"],
    queryFn: async () => {
      const res = await request.get<any>("employees", { limit: 100 });
      return Array.isArray(res.data) ? res.data : res.data?.items || [];
    },
  });

  // Create Order Mutation
  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      return request.post("sales/orders", values);
    },
    onSuccess: () => {
      message.success("Tạo đơn hàng kinh doanh thành công");
      queryClient.invalidateQueries({ queryKey: ["sales-orders"] });
      queryClient.invalidateQueries({ queryKey: ["sales-stats"] });
      setModalOpen(false);
      form.resetFields();
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  // Status Update Mutation
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
      return request.patch(`sales/orders/${id}/status`, { status });
    },
    onSuccess: (_, vars) => {
      if (vars.status === "COMPLETED") {
        message.success("Đơn hàng đã hoàn thành! Hệ thống đã tự động xuất Hóa đơn và ghi nhận khoản Thu vào Sổ quỹ Kế toán.");
      } else {
        message.success("Cập nhật trạng thái đơn hàng thành công");
      }
      queryClient.invalidateQueries({ queryKey: ["sales-orders"] });
      queryClient.invalidateQueries({ queryKey: ["sales-stats"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const statusConfig: Record<OrderStatus, { color: string; label: string }> = {
    DRAFT: { color: "default", label: "Dự thảo (Draft)" },
    CONFIRMED: { color: "blue", label: "Đã xác nhận" },
    PROCESSING: { color: "processing", label: "Đang triển khai" },
    COMPLETED: { color: "green", label: "Hoàn tất & Đã thu" },
    CANCELLED: { color: "red", label: "Đã hủy" },
  };

  const formatVND = (num: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num || 0);
  };

  const ordersList: SalesOrder[] = Array.isArray(data) ? data : data?.items || [];

  const columns = [
    {
      title: "Mã Đơn Hàng",
      dataIndex: "orderNumber",
      key: "orderNumber",
      width: 140,
      render: (val: string) => <Tag color="blue" className="font-mono font-bold">{val}</Tag>,
    },
    {
      title: "Khách hàng",
      key: "customer",
      render: (_: any, record: SalesOrder) => (
        <div>
          <div className="font-semibold text-slate-800">{record.customer?.name || "Khách hàng"}</div>
          {record.customer?.company && (
            <div className="text-xs text-slate-500">{record.customer.company}</div>
          )}
        </div>
      ),
    },
    {
      title: "Sản phẩm / Dịch vụ",
      key: "items",
      render: (_: any, record: SalesOrder) => (
        <div className="text-xs space-y-1">
          {(record.items || []).map((it, idx) => (
            <div key={idx} className="text-slate-600">
              • <strong>{it.product?.name || "Sản phẩm"}</strong> × {it.quantity} {it.product?.unit || "Gói"}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Giá trị đơn hàng",
      key: "amount",
      width: 160,
      render: (_: any, record: SalesOrder) => (
        <div className="text-right">
          <div className="font-bold text-slate-900">{formatVND(record.finalAmount)}</div>
          {record.discount > 0 && (
            <div className="text-[11px] text-amber-600">
              Giảm giá: {formatVND(record.discount)}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Hoa hồng Sales",
      key: "commission",
      width: 140,
      render: (_: any, record: SalesOrder) => (
        <div>
          <div className="text-xs font-semibold text-emerald-600">
            {formatVND(record.commissionAmount)}
          </div>
          <div className="text-[11px] text-slate-400">
            {record.salesRep ? `${record.salesRep.firstName} ${record.salesRep.lastName}` : "Chưa gán"} ({record.commissionRate}%)
          </div>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 180,
      render: (status: OrderStatus, record: SalesOrder) => {
        const conf = statusConfig[status] || { color: "default", label: status };
        return (
          <Select
            size="small"
            value={status}
            onChange={(newStatus) => statusMutation.mutate({ id: record.id, status: newStatus })}
            className="w-full text-xs font-medium"
            options={[
              { value: "DRAFT", label: "Dự thảo (Draft)" },
              { value: "CONFIRMED", label: "Xác nhận" },
              { value: "PROCESSING", label: "Đang triển khai" },
              { value: "COMPLETED", label: "Hoàn tất (Thu tiền)" },
              { value: "CANCELLED", label: "Đã hủy" },
            ]}
          />
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 110,
      render: (val: string) => (
        <span className="text-xs text-slate-500 font-mono">
          {new Date(val).toLocaleDateString("vi-VN")}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Title level={4} className="!mb-1 font-bold text-slate-800">
            Quản Lý Đơn Hàng & Doanh Số Bán Hàng
          </Title>
          <Text type="secondary" className="text-xs sm:text-sm">
            Tạo đơn hàng, theo dõi vòng đời ký kết, hoa hồng nhân viên và tự động đồng bộ hóa đơn sang Kế toán.
          </Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            form.setFieldsValue({
              commissionRate: 5,
              discount: 0,
              items: [{ quantity: 1 }],
            });
            setModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 font-medium h-9 px-4 rounded-lg self-start sm:self-auto"
        >
          Tạo Đơn Hàng Mới
        </Button>
      </div>

      {/* Stat Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Doanh Thu Đã Thu</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">
              {formatVND(stats?.totalRevenue || 0)}
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Tổng Đơn Hàng</div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {stats?.totalOrders || ordersList.length} đơn
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Đang Triển Khai</div>
            <div className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
              {stats?.processingOrders || 0} đơn
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Quỹ Hoa Hồng Sales</div>
            <div className="text-xl sm:text-2xl font-bold text-amber-600 mt-1">
              {formatVND(stats?.totalCommission || 0)}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Filter and Table Container */}
      <Card className="rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <Input
            placeholder="Tìm theo mã đơn, tên khách hàng, tên công ty..."
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
              { value: "DRAFT", label: "Dự thảo (Draft)" },
              { value: "CONFIRMED", label: "Đã xác nhận" },
              { value: "PROCESSING", label: "Đang triển khai" },
              { value: "COMPLETED", label: "Hoàn tất (Đã thu)" },
              { value: "CANCELLED", label: "Đã hủy" },
            ]}
          />
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={ordersList}
          loading={isLoading}
          pagination={{ pageSize: 10, showTotal: (t) => `Tổng cộng ${t} đơn hàng` }}
          scroll={{ y: 520, x: 1000 }}
          className="border border-slate-100 rounded-lg"
        />
      </Card>

      {/* Create Order Modal */}
      <Modal
        title={<span className="font-bold text-slate-800">Tạo Đơn Hàng Bán Hàng Mới</span>}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        confirmLoading={createMutation.isPending}
        width={720}
        okText="Tạo Đơn Hàng"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={(vals) => createMutation.mutate(vals)} className="mt-4">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Khách Hàng"
                name="customerId"
                rules={[{ required: true, message: "Vui lòng chọn khách hàng" }]}
              >
                <Select
                  placeholder="Chọn khách hàng"
                  showSearch
                  optionFilterProp="label"
                  options={customers.map((c) => ({
                    value: c.id,
                    label: `${c.code} - ${c.name} ${c.company ? `(${c.company})` : ""}`,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Nhân Viên Sales Phụ Trách"
                name="salesRepId"
                rules={[{ required: true, message: "Vui lòng chọn nhân viên kinh doanh" }]}
              >
                <Select
                  placeholder="Chọn nhân viên kinh doanh"
                  showSearch
                  optionFilterProp="label"
                  options={employees.map((e) => ({
                    value: e.id,
                    label: `${e.employeeCode} - ${e.firstName} ${e.lastName}`,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider my-3 pb-1 border-b border-slate-100">
            DANH SÁCH SẢN PHẨM & DỊCH VỤ
          </div>

          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div className="space-y-3">
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={12} align="middle">
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "productId"]}
                        rules={[{ required: true, message: "Chọn sản phẩm" }]}
                        className="!mb-0"
                      >
                        <Select
                          placeholder="Chọn sản phẩm / dịch vụ"
                          options={products.map((p) => ({
                            value: p.id,
                            label: `${p.name} (${formatVND(p.unitPrice)} / ${p.unit})`,
                          }))}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item
                        {...restField}
                        name={[name, "quantity"]}
                        rules={[{ required: true, message: "Số lượng" }]}
                        className="!mb-0"
                      >
                        <InputNumber min={1} placeholder="Số lượng" className="w-full" />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item
                        {...restField}
                        name={[name, "unitPrice"]}
                        className="!mb-0"
                        tooltip="Để trống để lấy giá mặc định"
                      >
                        <InputNumber
                          min={0}
                          placeholder="Đơn giá (tùy chỉnh)"
                          className="w-full"
                          formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      {fields.length > 1 && (
                        <Button
                          type="text"
                          danger
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                        />
                      )}
                    </Col>
                  </Row>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  className="mt-2 text-xs"
                >
                  Thêm Mặt Hàng
                </Button>
              </div>
            )}
          </Form.List>

          <Divider className="!my-3" />

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Chiết Khấu / Giảm Giá (VNĐ)" name="discount" initialValue={0}>
                <InputNumber
                  min={0}
                  className="w-full"
                  formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tỷ Lệ Hoa Hồng Sales (%)" name="commissionRate" initialValue={5}>
                <InputNumber min={0} max={100} className="w-full" addonAfter="%" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Ghi Chú Đơn Hàng" name="notes">
            <Input.TextArea rows={2} placeholder="Điều khoản bàn giao, thanh toán..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
