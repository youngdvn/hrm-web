"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Table, Button, Card, Typography, Popconfirm, Space } from "antd";
import { message } from "@/lib/antd-app";
import { PlusOutlined, EditOutlined, DeleteOutlined, IdcardOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePositions } from "@/hooks/usePositions";
import { Position } from "@/types/employee.types";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import { RoleGuard } from "@/components/common/RoleGuard";
import type { PositionFormValues } from "@/schemas";

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
    updatePosition,
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
      message.success(t.position.updateSuccess);
    } else {
      await createPosition(values);
      message.success(t.position.createSuccess);
    }
    setModalOpen(false);
    setEditingPosition(null);
  };

  const handleDelete = async (id: string) => {
    await deletePosition(id);
    message.success(t.position.deleteSuccess);
  };

  const columns: ColumnsType<Position> = [
    {
      title: t.position.code,
      dataIndex: "code",
      key: "code",
      width: 150,
      render: (code) => <span className="font-semibold text-blue-600">{code}</span>,
    },
    {
      title: t.position.positionTitle,
      dataIndex: "title",
      key: "title",
      render: (title) => (
        <span className="font-medium text-slate-800 flex items-center gap-1.5">
          <IdcardOutlined className="text-slate-400" /> {title}
        </span>
      ),
    },
    {
      title: t.position.description,
      dataIndex: "description",
      key: "description",
      render: (desc) => desc || <Text type="secondary">---</Text>,
    },
    {
      title: t.position.employeeCount,
      key: "employeeCount",
      width: 170,
      render: (_, r) => (
        <span>
          {r._count?.employees ?? 0} {t.common.records}
        </span>
      ),
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
                  title={t.position.confirmDelete}
                  onConfirm={() => handleDelete(record.id)}
                  okButtonProps={{ danger: true }}
                  okText={t.common.delete}
                  cancelText={t.common.cancel}
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
              {t.position.title}
            </Title>
            <Text type="secondary">{t.position.subtitle}</Text>
          </div>

          {isHrOrAdmin && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={handleOpenCreate}
              className="!shadow-md !shadow-blue-500/20"
            >
              {t.position.addNew}
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

        {modalOpen && (
          <PositionModal
            open={modalOpen}
            position={editingPosition}
            onClose={() => {
              setModalOpen(false);
              setEditingPosition(null);
            }}
            onSubmit={onSubmit}
            isLoading={false}
          />
        )}
      </div>
    </RoleGuard>
  );
}
