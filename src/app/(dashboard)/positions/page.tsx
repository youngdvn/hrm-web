"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Table, Button, Card, Typography, Modal, Input, Popconfirm, Space, Form } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, IdcardOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePositions, CreatePositionInput } from "@/hooks/usePositions";
import { Position } from "@/types/employee.types";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import { RoleGuard } from "@/components/common/RoleGuard";

const { Title, Text } = Typography;

const positionSchema = z.object({
  code: z
    .string()
    .min(2, "Mã chức vụ tối thiểu 2 ký tự")
    .max(20, "Mã chức vụ tối đa 20 ký tự")
    .transform((val) => val.trim().toUpperCase()),
  title: z
    .string()
    .min(2, "Tên chức vụ tối thiểu 2 ký tự")
    .max(100, "Tên chức vụ tối đa 100 ký tự")
    .transform((val) => val.trim()),
  description: z.string().max(500).optional(),
});

type PositionFormValues = z.infer<typeof positionSchema>;

export default function PositionsPage() {
  const { t } = useI18nStore();
  const { hasRole } = useAuthStore();
  const isHrOrAdmin = hasRole(["ADMIN", "HR"]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);

  const {
    positions,
    isLoading,
    createPosition,
    isCreating,
    updatePosition,
    isUpdating,
    deletePosition,
  } = usePositions();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PositionFormValues>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      code: "",
      title: "",
      description: "",
    },
  });

  const handleOpenCreate = () => {
    setEditingPosition(null);
    reset({ code: "", title: "", description: "" });
    setModalOpen(true);
  };

  const handleOpenEdit = (pos: Position) => {
    setEditingPosition(pos);
    reset({
      code: pos.code,
      title: pos.title,
      description: pos.description || "",
    });
    setModalOpen(true);
  };

  const onSubmit = async (values: PositionFormValues) => {
    if (editingPosition) {
      await updatePosition({ id: editingPosition.id, data: values });
    } else {
      await createPosition(values);
    }
    setModalOpen(false);
  };

  const columns: ColumnsType<Position> = [
    {
      title: "Mã chức vụ",
      dataIndex: "code",
      key: "code",
      width: 150,
      render: (code) => <span className="font-semibold text-blue-600">{code}</span>,
    },
    {
      title: "Tên chức vụ / Vị trí",
      dataIndex: "title",
      key: "title",
      render: (title) => <span className="font-medium text-slate-800">{title}</span>,
    },
    {
      title: "Mô tả công việc",
      dataIndex: "description",
      key: "description",
      render: (desc) => desc || <Text type="secondary">---</Text>,
    },
    ...(isHrOrAdmin
      ? [
        {
          title: t.common.actions,
          key: "actions",
          width: 120,
          render: (_: unknown, record: Position) => (
            <Space>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleOpenEdit(record)}
              />
              <Popconfirm
                title="Bạn có chắc muốn xóa chức vụ này?"
                onConfirm={() => deletePosition(record.id)}
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
            Quản lý Chức vụ
          </Title>
          <Text type="secondary">Danh mục vị trí, chức danh chuyên môn trong doanh nghiệp</Text>
        </div>

        {isHrOrAdmin && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleOpenCreate}
            className="!shadow-md !shadow-blue-500/20"
          >
            Thêm chức vụ
          </Button>
        )}
      </div>

      <Card className="shadow-xs border-slate-200">
        <Table
          columns={columns}
          dataSource={positions}
          rowKey="id"
          loading={isLoading}
          pagination={false}
        />
      </Card>

      <Modal
        open={modalOpen}
        title={editingPosition ? "Chỉnh sửa chức vụ" : "Thêm chức vụ mới"}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit(onSubmit)}
        confirmLoading={isCreating || isUpdating}
        destroyOnClose
      >
        <Form layout="vertical" className="pt-3">
          <Form.Item
            label="Mã chức vụ"
            required
            validateStatus={errors.code ? "error" : ""}
            help={errors.code?.message}
          >
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="DEV_SR, PM, HR_MGR..." disabled={!!editingPosition} />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Tên chức vụ"
            required
            validateStatus={errors.title ? "error" : ""}
            help={errors.title?.message}
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Senior Developer, Trưởng phòng..." />
              )}
            />
          </Form.Item>

          <Form.Item label="Mô tả">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input.TextArea {...field} placeholder="Nhiệm vụ, phạm vi công việc..." rows={3} />
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  </RoleGuard>
  );
}

