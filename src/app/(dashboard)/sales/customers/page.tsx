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
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ShopOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { request, parseApiError } from "@/lib/api-client";
import { message } from "@/lib/antd-app";
import { Customer, CustomerStatus } from "@/types/sales.types";
import { Employee } from "@/types/employee.types";

const { Title, Text } = Typography;

export default function CustomersPage() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Fetch Customers
  const { data, isLoading } = useQuery({
    queryKey: ["customers", search, statusFilter],
    queryFn: async () => {
      const res = await request.get<any>("sales/customers", {
        search: search || undefined,
        status: statusFilter || undefined,
        limit: 50,
      });
      const items: Customer[] = Array.isArray(res.data) ? res.data : res.data?.items || [];
      const meta = res.meta || res.data?.meta || { total: items.length };
      return { items, meta };
    },
  });

  // Fetch Employees for Sales Rep assignment
  const { data: employees = [] } = useQuery<Employee[]>({
    queryKey: ["employees-select"],
    queryFn: async () => {
      const res = await request.get<any>("employees", { limit: 100 });
      return Array.isArray(res.data) ? res.data : res.data?.items || [];
    },
  });

  // Create / Update Mutation
  const saveMutation = useMutation({
    mutationFn: async (values: any) => {
      if (editingCustomer) {
        return request.put(`sales/customers/${editingCustomer.id}`, values);
      }
      return request.post("sales/customers", values);
    },
    onSuccess: () => {
      message.success(editingCustomer ? "Cập nhật khách hàng thành công" : "Thêm khách hàng thành công");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
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
      return request.delete(`sales/customers/${id}`);
    },
    onSuccess: () => {
      message.success("Xóa khách hàng thành công");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const handleOpenModal = (customer?: Customer) => {
    if (customer) {
      setEditingCustomer(customer);
      form.setFieldsValue({
        code: customer.code,
        name: customer.name,
        company: customer.company,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        status: customer.status,
        salesRepId: customer.salesRepId,
        notes: customer.notes,
      });
    } else {
      setEditingCustomer(null);
      form.resetFields();
      form.setFieldsValue({ status: "LEAD" });
    }
    setModalOpen(true);
  };

  const statusConfig: Record<CustomerStatus, { color: string; label: string }> = {
    LEAD: { color: "default", label: "Tiềm năng mới (Lead)" },
    PROSPECT: { color: "blue", label: "Đang liên hệ (Prospect)" },
    ACTIVE: { color: "green", label: "Khách hàng chính thức" },
    INACTIVE: { color: "orange", label: "Tạm dừng" },
  };

  const customersList: Customer[] = Array.isArray(data) ? data : data?.items || [];
  const totalCustomers = data?.meta?.total || customersList.length;
  const activeCount = customersList.filter((c) => c.status === "ACTIVE").length;
  const prospectCount = customersList.filter((c) => c.status === "PROSPECT").length;
  const leadCount = customersList.filter((c) => c.status === "LEAD").length;

  const columns = [
    {
      title: "Mã KH",
      dataIndex: "code",
      key: "code",
      width: 110,
      render: (val: string) => <Tag color="geekblue" className="font-mono font-semibold">{val}</Tag>,
    },
    {
      title: "Khách hàng / Doanh nghiệp",
      key: "name",
      render: (_: any, record: Customer) => (
        <div>
          <div className="font-semibold text-slate-800">{record.name}</div>
          {record.company && (
            <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <ShopOutlined className="text-slate-400" />
              <span>{record.company}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Thông tin liên hệ",
      key: "contact",
      render: (_: any, record: Customer) => (
        <div className="text-xs space-y-0.5 text-slate-600">
          {record.phone && (
            <div className="flex items-center gap-1">
              <PhoneOutlined className="text-slate-400" />
              <span>{record.phone}</span>
            </div>
          )}
          {record.email && (
            <div className="flex items-center gap-1">
              <MailOutlined className="text-slate-400" />
              <span>{record.email}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Nhân viên Sales phụ trách",
      key: "salesRep",
      render: (_: any, record: Customer) => (
        <div className="text-xs text-slate-700 flex items-center gap-1.5">
          <UserOutlined className="text-blue-500" />
          <span>
            {record.salesRep
              ? `${record.salesRep.firstName} ${record.salesRep.lastName}`
              : "Chưa phân công"}
          </span>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 170,
      render: (status: CustomerStatus) => {
        const conf = statusConfig[status] || { color: "default", label: status };
        return <Tag color={conf.color}>{conf.label}</Tag>;
      },
    },
    {
      title: "Đơn hàng",
      key: "orders",
      width: 100,
      align: "center" as const,
      render: (_: any, record: Customer) => (
        <Tag color="cyan">{record._count?.salesOrders || 0} đơn</Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      width: 120,
      render: (_: any, record: Customer) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenModal(record)}
          />
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc chắn muốn xóa khách hàng này không?"
            onConfirm={() => deleteMutation.mutate(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button type="text" size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
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
            Quản Lý Khách Hàng & CRM
          </Title>
          <Text type="secondary" className="text-xs sm:text-sm">
            Theo dõi danh sách khách hàng tiềm năng, doanh nghiệp đối tác và phân công phụ trách kinh doanh.
          </Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 font-medium h-9 px-4 rounded-lg self-start sm:self-auto"
        >
          Thêm Khách Hàng
        </Button>
      </div>

      {/* Stat Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Tổng Khách Hàng</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{totalCustomers}</div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Khách Hàng Chính Thức</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">{activeCount}</div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Đang Chăm Sóc (Prospect)</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">{prospectCount}</div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Tiềm Năng Mới (Lead)</div>
            <div className="text-2xl font-bold text-amber-600 mt-1">{leadCount}</div>
          </Card>
        </Col>
      </Row>

      {/* Filter and Table Container */}
      <Card className="rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <Input
            placeholder="Tìm theo mã, tên khách hàng, công ty, email, SĐT..."
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
              { value: "LEAD", label: "Tiềm năng mới (Lead)" },
              { value: "PROSPECT", label: "Đang liên hệ (Prospect)" },
              { value: "ACTIVE", label: "Khách hàng chính thức" },
              { value: "INACTIVE", label: "Tạm dừng" },
            ]}
          />
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={customersList}
          loading={isLoading}
          pagination={{ pageSize: 10, showTotal: (t) => `Tổng cộng ${t} khách hàng` }}
          scroll={{ y: 520, x: 900 }}
          className="border border-slate-100 rounded-lg"
        />
      </Card>

      {/* Modal Create/Edit */}
      <Modal
        title={
          <span className="font-bold text-slate-800">
            {editingCustomer ? "Chỉnh Sửa Khách Hàng" : "Thêm Khách Hàng Mới"}
          </span>
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        confirmLoading={saveMutation.isPending}
        width={600}
        okText={editingCustomer ? "Cập Nhật" : "Thêm Mới"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={(vals) => saveMutation.mutate(vals)} className="mt-4">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Mã Khách Hàng" name="code" tooltip="Để trống để hệ thống tự động sinh">
                <Input placeholder="Tự sinh nếu để trống" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tên Người Liên Hệ / Khách Hàng"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}
              >
                <Input placeholder="Nguyễn Văn A" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Tên Công Ty / Doanh Nghiệp" name="company">
            <Input placeholder="Công ty CP..." />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Số Điện Thoại" name="phone">
                <Input placeholder="0901234567" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input placeholder="contact@company.com" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Địa Chỉ Trụ Sở" name="address">
            <Input placeholder="Tầng 5, Tòa nhà..." />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Trạng Thái Khách Hàng" name="status" initialValue="LEAD">
                <Select
                  options={[
                    { value: "LEAD", label: "Tiềm năng mới (Lead)" },
                    { value: "PROSPECT", label: "Đang liên hệ (Prospect)" },
                    { value: "ACTIVE", label: "Khách hàng chính thức" },
                    { value: "INACTIVE", label: "Tạm dừng" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Sales Phụ Trách" name="salesRepId">
                <Select
                  placeholder="Chọn nhân viên kinh doanh"
                  allowClear
                  options={employees.map((e) => ({
                    value: e.id,
                    label: `${e.employeeCode} - ${e.firstName} ${e.lastName}`,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Ghi Chú Nhu Cầu" name="notes">
            <Input.TextArea rows={2} placeholder="Nhu cầu phần mềm, số lượng nhân sự, ngân sách..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

