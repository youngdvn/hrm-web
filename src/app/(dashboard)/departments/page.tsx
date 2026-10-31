"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Table, Button, Card, Typography, Modal, Input, Popconfirm, Space, Form } from "antd";
import { message } from "@/lib/antd-app";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { request, parseApiError } from "@/lib/api-client";
import { Department } from "@/types/employee.types";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import { RoleGuard } from "@/components/common/RoleGuard";

const { Title, Text } = Typography;

const departmentSchema = z.object({
  code: z
    .string()
    .min(2, "Mã phòng ban tối thiểu 2 ký tự")
    .max(10, "Mã phòng ban tối đa 10 ký tự")
    .transform((val) => val.trim().toUpperCase()),
  name: z.string().min(2, "Tên phòng ban tối thiểu 2 ký tự").transform((val) => val.trim()),
  description: z.string().optional(),
});

type DepartmentFormValues = z.infer<typeof departmentSchema>;

export default function DepartmentsPage() {
  const { t } = useI18nStore();
  const { hasRole } = useAuthStore();
  const isHrOrAdmin = hasRole(["ADMIN", "HR"]);
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
    },
  });

  const { data: departments = [], isLoading } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await request.get<Department[]>("departments");
      return res.data || [];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (values: DepartmentFormValues) => {
      if (editingDept) {
        return request.put(`departments/${editingDept.id}`, values);
      }
      return request.post("departments", values);
    },
    onSuccess: () => {
      message.success(editingDept ? "Cập nhật phòng ban thành công" : "Tạo phòng ban thành công");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      setModalOpen(false);
      reset();
    },
    onError: async (err) => {
      const errMsg = await parseApiError(err);
      message.error(errMsg);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return request.delete(`departments/${id}`);
    },
    onSuccess: () => {
      message.success("Xóa phòng ban thành công");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: async (err) => {
      const errMsg = await parseApiError(err);
      message.error(errMsg);
    },
  });

  const handleOpenCreate = () => {
    setEditingDept(null);
    reset({ code: "", name: "", description: "" });
    setModalOpen(true);
  };

  const handleOpenEdit = (dept: Department) => {
    setEditingDept(dept);
    reset({
      code: dept.code,
      name: dept.name,
      description: dept.description || "",
    });
    setModalOpen(true);
  };

  const columns: ColumnsType<Department> = [
    {
      title: "Mã phòng ban",
      dataIndex: "code",
      key: "code",
      width: 140,
      render: (c) => <span className="font-semibold text-blue-600">{c}</span>,
    },
    {
      title: "Tên phòng ban",
      dataIndex: "name",
      key: "name",
      render: (n) => <span className="font-medium text-slate-800">{n}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (d) => d || <Text type="secondary">---</Text>,
    },
    {
      title: "Số nhân viên",
      key: "employeeCount",
      width: 130,
      render: (_, r) => <span>{r._count?.employees ?? 0} nhân sự</span>,
    },
    ...(isHrOrAdmin
      ? [
          {
            title: t.common.actions,
            key: "actions",
            width: 120,
            render: (_: unknown, record: Department) => (
              <Space>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleOpenEdit(record)}
                />
                <Popconfirm
                  title="Bạn có chắc muốn xóa phòng ban này?"
                  onConfirm={() => deleteMutation.mutate(record.id)}
                  okButtonProps={{ danger: true }}
                >
                  <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            ),
          },
        ]
      : []),
  ];

  return (
    <RoleGuard allowedRoles={["ADMIN", "HR"]}>
      <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Title level={3} className="!mb-1">
            Quản lý Phòng ban
          </Title>
          <Text type="secondary">Cơ cấu tổ chức các phòng ban chuyên môn trong doanh nghiệp</Text>
        </div>

        {isHrOrAdmin && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleOpenCreate}
            className="!shadow-md !shadow-blue-500/20"
          >
            Thêm phòng ban
          </Button>
        )}
      </div>

      <Card className="shadow-xs border-slate-200">
        <Table
          columns={columns}
          dataSource={departments}
          rowKey="id"
          loading={isLoading}
          pagination={false}
        />
      </Card>

      <Modal
        open={modalOpen}
        title={editingDept ? "Chỉnh sửa phòng ban" : "Thêm phòng ban mới"}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit((values) => saveMutation.mutate(values))}
        confirmLoading={saveMutation.isPending}
        destroyOnClose
      >
        <Form layout="vertical" className="pt-3">
          <Form.Item
            label="Mã phòng ban"
            required
            validateStatus={errors.code ? "error" : ""}
            help={errors.code?.message}
          >
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="IT, HR, MKT..." disabled={!!editingDept} />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Tên phòng ban"
            required
            validateStatus={errors.name ? "error" : ""}
            help={errors.name?.message}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Phòng Công nghệ Thông tin" />
              )}
            />
          </Form.Item>

          <Form.Item label="Mô tả">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input.TextArea {...field} placeholder="Chức năng, nhiệm vụ phòng ban..." rows={3} />
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  </RoleGuard>
  );
}
