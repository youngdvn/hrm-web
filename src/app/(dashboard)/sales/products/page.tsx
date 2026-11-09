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
  Modal,
  Form,
  Popconfirm,
  Row,
  Col,
  InputNumber,
  Select,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { request, parseApiError } from "@/lib/api-client";
import { message } from "@/lib/antd-app";
import { Product } from "@/types/sales.types";

const { Title, Text } = Typography;

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch Products
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["sales-products"],
    queryFn: async () => {
      const res = await request.get<any>("sales/products");
      return Array.isArray(res.data) ? res.data : res.data?.items || [];
    },
  });

  // Create / Update Mutation
  const saveMutation = useMutation({
    mutationFn: async (values: any) => {
      if (editingProduct) {
        return request.put(`sales/products/${editingProduct.id}`, values);
      }
      return request.post("sales/products", values);
    },
    onSuccess: () => {
      message.success(editingProduct ? "Cập nhật sản phẩm thành công" : "Thêm sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["sales-products"] });
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
      return request.delete(`sales/products/${id}`);
    },
    onSuccess: () => {
      message.success("Xóa sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["sales-products"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      form.setFieldsValue({
        code: product.code,
        name: product.name,
        category: product.category,
        unit: product.unit,
        unitPrice: product.unitPrice,
        costPrice: product.costPrice,
        description: product.description,
        isActive: product.isActive,
      });
    } else {
      setEditingProduct(null);
      form.resetFields();
      form.setFieldsValue({
        category: "Phần mềm",
        unit: "Gói",
        unitPrice: 10000000,
        costPrice: 2000000,
        isActive: true,
      });
    }
    setModalOpen(true);
  };

  const formatVND = (num: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num || 0);
  };

  const rawList: Product[] = Array.isArray(products) ? products : (products as any)?.items || [];
  const filteredProducts = rawList.filter((p) => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    return (
      p.code.toLowerCase().includes(s) ||
      p.name.toLowerCase().includes(s) ||
      p.category.toLowerCase().includes(s)
    );
  });

  const columns = [
    {
      title: "Mã Sản Phẩm",
      dataIndex: "code",
      key: "code",
      width: 140,
      render: (val: string) => <Tag color="geekblue" className="font-mono font-bold">{val}</Tag>,
    },
    {
      title: "Tên Sản Phẩm / Dịch Vụ",
      key: "name",
      render: (_: any, record: Product) => (
        <div>
          <div className="font-semibold text-slate-800">{record.name}</div>
          {record.description && (
            <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{record.description}</div>
          )}
        </div>
      ),
    },
    {
      title: "Phân loại",
      dataIndex: "category",
      key: "category",
      width: 130,
      render: (val: string) => <Tag color="purple">{val}</Tag>,
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unit",
      key: "unit",
      width: 100,
      align: "center" as const,
      render: (val: string) => <span className="text-xs text-slate-600">{val}</span>,
    },
    {
      title: "Giá Bán (VNĐ)",
      dataIndex: "unitPrice",
      key: "unitPrice",
      width: 160,
      align: "right" as const,
      render: (val: number) => (
        <span className="font-bold text-slate-900">{formatVND(val)}</span>
      ),
    },
    {
      title: "Giá Vốn (VNĐ)",
      dataIndex: "costPrice",
      key: "costPrice",
      width: 150,
      align: "right" as const,
      render: (val: number) => (
        <span className="text-xs text-slate-500">{formatVND(val || 0)}</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      width: 130,
      render: (active: boolean) => (
        <Tag color={active ? "green" : "default"}>
          {active ? "Đang kinh doanh" : "Tạm ngưng"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      width: 110,
      render: (_: any, record: Product) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenModal(record)}
          />
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc chắn muốn xóa sản phẩm này?"
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
            Danh Mục Sản Phẩm & Dịch Vụ
          </Title>
          <Text type="secondary" className="text-xs sm:text-sm">
            Quản lý bảng giá phần mềm, thiết bị phần cứng chấm công và các gói dịch vụ triển khai.
          </Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 font-medium h-9 px-4 rounded-lg self-start sm:self-auto"
        >
          Thêm Sản Phẩm
        </Button>
      </div>

      {/* Table Container */}
      <Card className="rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <Input
            placeholder="Tìm theo mã sản phẩm, tên hoặc danh mục..."
            prefix={<SearchOutlined className="text-slate-400" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-md rounded-lg"
            allowClear
          />
        </div>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredProducts}
          loading={isLoading}
          pagination={{ pageSize: 10, showTotal: (t) => `Tổng cộng ${t} sản phẩm` }}
          scroll={{ y: 520, x: 900 }}
          className="border border-slate-100 rounded-lg"
        />
      </Card>

      {/* Modal Create/Edit */}
      <Modal
        title={
          <span className="font-bold text-slate-800">
            {editingProduct ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}
          </span>
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        confirmLoading={saveMutation.isPending}
        width={600}
        okText={editingProduct ? "Cập Nhật" : "Thêm Mới"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={(vals) => saveMutation.mutate(vals)} className="mt-4">
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                label="Mã Sản Phẩm"
                name="code"
                rules={[{ required: true, message: "Vui lòng nhập mã sản phẩm" }]}
              >
                <Input placeholder="PRD-HRM-01" disabled={!!editingProduct} />
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                label="Tên Sản Phẩm / Dịch Vụ"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
              >
                <Input placeholder="Gói Bản Quyền Enterprise..." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Danh Mục" name="category" initialValue="Phần mềm">
                <Select
                  options={[
                    { value: "Phần mềm", label: "Phần mềm" },
                    { value: "Thiết bị", label: "Thiết bị phần cứng" },
                    { value: "Dịch vụ", label: "Dịch vụ triển khai & Đào tạo" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Đơn Vị Tính" name="unit" initialValue="Gói">
                <Input placeholder="Gói, Module, Máy, Năm..." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Giá Bán Tiêu Chuẩn (VNĐ)"
                name="unitPrice"
                rules={[{ required: true, message: "Nhập giá bán" }]}
              >
                <InputNumber
                  min={0}
                  className="w-full"
                  formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giá Vốn Ước Tính (VNĐ)" name="costPrice">
                <InputNumber
                  min={0}
                  className="w-full"
                  formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Mô Tả Sản Phẩm" name="description">
            <Input.TextArea rows={2} placeholder="Chi tiết tính năng, quyền lợi kèm theo..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

