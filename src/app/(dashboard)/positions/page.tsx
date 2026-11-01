"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Table, Button, Card, Typography, Popconfirm, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, IdcardOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePositions } from "@/hooks/usePositions";
import { Position } from "@/types/employee.types";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import { RoleGuard } from "@/components/common/RoleGuard";
import type { PositionFormValues } from "@/components/positions/PositionModal";

const PositionModal = dynamic(
  () => import("@/components/positions/PositionModal"),
  { ssr: false }
);

const { Title, Text } = Typography;

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

  const handleOpenCreate = () => {
    setEditingPosition(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (pos: Position) => {
    setEditingPosition(pos);
    setModalOpen(true);
  };

  const onSubmit = async (values: PositionFormValues) => {
    if (editingPosition) {
      await updatePosition({ id: editingPosition.id, data: values });
    } else {
      await createPosition(values);
    }
    setModalOpen(false);
    setEditingPosition(null);
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
      render: (title) => (
        <span className="font-medium text-slate-800 flex items-center gap-1.5">
          <IdcardOutlined className="text-slate-400" /> {title}
        </span>
      ),
    },
    {
      title: "Mô tả công việc",
      dataIndex: "description",
      key: "description",
      render: (desc) => desc || <Text type="secondary">---</Text>,
    },
    {
      title: "Số nhân sự đảm nhiệm",
      key: "employeeCount",
      width: 170,
      render: (_, r) => <span>{r._count?.employees ?? 0} nhân sự</span>,
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
              Quản lý Chức vụ / Vị trí
            </Title>
            <Text type="secondary">Danh mục vị trí chuyên môn và hệ thống chức danh doanh nghiệp</Text>
          </div>

          {isHrOrAdmin && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={handleOpenCreate}
              className="!shadow-md !shadow-blue-500/20"
            >
              Thêm chức vụ mới
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

        {/* Lazy Loaded Position Modal */}
        {modalOpen && (
          <PositionModal
            open={modalOpen}
            position={editingPosition}
            onClose={() => {
              setModalOpen(false);
              setEditingPosition(null);
            }}
            onSubmit={onSubmit}
            isLoading={isCreating || isUpdating}
          />
        )}
      </div>
    </RoleGuard>
  );
}
