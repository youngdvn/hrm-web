"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, Button, Card, Typography, Popconfirm, Space } from "antd";
import { message } from "@/lib/antd-app";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { request, parseApiError } from "@/lib/api-client";
import { Department } from "@/types/employee.types";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import { RoleGuard } from "@/components/common/RoleGuard";
import type { DepartmentFormValues } from "@/schemas";

const DepartmentModal = dynamic(
  () => import("@/components/departments/DepartmentModal"),
  { ssr: false }
);

const { Title, Text } = Typography;

export default function DepartmentsPage() {
  const { t } = useI18nStore();
  const { hasRole } = useAuthStore();
  const isHrOrAdmin = hasRole(["ADMIN", "HR"]);
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);

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
      message.success(editingDept ? t.department.updateSuccess : t.department.createSuccess);
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      setModalOpen(false);
      setEditingDept(null);
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
      message.success(t.department.deleteSuccess);
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: async (err) => {
      const errMsg = await parseApiError(err);
      message.error(errMsg);
    },
  });

  const handleOpenCreate = () => {
    setEditingDept(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (dept: Department) => {
    setEditingDept(dept);
    setModalOpen(true);
  };

  const columns: ColumnsType<Department> = [
    {
      title: t.department.code,
      dataIndex: "code",
      key: "code",
      width: 140,
      render: (c) => <span className="font-semibold text-blue-600">{c}</span>,
    },
    {
      title: t.department.name,
      dataIndex: "name",
      key: "name",
      render: (n) => <span className="font-medium text-slate-800">{n}</span>,
    },
    {
      title: t.department.description,
      dataIndex: "description",
      key: "description",
      render: (d) => d || <Text type="secondary">---</Text>,
    },
    {
      title: t.department.employeeCount,
      key: "employeeCount",
      width: 140,
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
            render: (_: unknown, record: Department) => (
              <Space>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleOpenEdit(record)}
                />
                <Popconfirm
                  title={t.department.confirmDelete}
                  onConfirm={() => deleteMutation.mutate(record.id)}
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
              {t.department.title}
            </Title>
            <Text type="secondary">{t.department.subtitle}</Text>
          </div>

          {isHrOrAdmin && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={handleOpenCreate}
              className="!shadow-md !shadow-blue-500/20"
            >
              {t.department.addNew}
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

        {modalOpen && (
          <DepartmentModal
            open={modalOpen}
            department={editingDept}
            onClose={() => {
              setModalOpen(false);
              setEditingDept(null);
            }}
            onSubmit={(values) => saveMutation.mutate(values)}
            isLoading={saveMutation.isPending}
          />
        )}
      </div>
    </RoleGuard>
  );
}
