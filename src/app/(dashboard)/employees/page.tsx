"use client";

import { useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Tag,
  Space,
  Card,
  Popconfirm,
  Typography,
  Avatar,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useEmployees } from "@/hooks/useEmployees";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import { Employee, EmployeeStatus, CreateEmployeeInput } from "@/types/employee.types";
import { EmployeeDrawer } from "@/components/employees/EmployeeDrawer";
import { EmployeeDetailModal } from "@/components/employees/EmployeeDetailModal";
import { getMediaUrl } from "@/lib/api-client";

const { Title, Text } = Typography;
const { Option } = Select;

export default function EmployeesPage() {
  const { t } = useI18nStore();
  const { hasRole } = useAuthStore();
  const isHrOrAdmin = hasRole(["ADMIN", "HR"]);
  const isAdmin = hasRole(["ADMIN"]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [departmentId, setDepartmentId] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<EmployeeStatus | undefined>(undefined);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);

  const {
    employees,
    meta,
    isLoading,
    isFetching,
    departments,
    positions,
    createEmployee,
    isCreating,
    updateEmployee,
    isUpdating,
    deleteEmployee,
    refetch,
  } = useEmployees({
    page,
    limit,
    search: search || undefined,
    departmentId,
    status,
  });

  const handleOpenCreate = () => {
    setEditingEmployee(null);
    setDrawerOpen(true);
  };

  const handleOpenEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setDrawerOpen(true);
  };

  const handleOpenDetail = (emp: Employee) => {
    setViewingEmployee(emp);
    setDetailModalOpen(true);
  };

  const handleDrawerSubmit = async (formData: CreateEmployeeInput) => {
    if (editingEmployee) {
      await updateEmployee({ id: editingEmployee.id, data: formData });
    } else {
      await createEmployee(formData);
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setDepartmentId(undefined);
    setStatus(undefined);
    setPage(1);
  };

  const statusColorMap: Record<string, string> = {
    ACTIVE: "green",
    PROBATION: "blue",
    ON_LEAVE: "orange",
    TERMINATED: "red",
  };

  const statusLabelMap: Record<string, string> = {
    ACTIVE: t.employee.statusActive,
    PROBATION: t.employee.statusProbation,
    ON_LEAVE: t.employee.statusOnLeave,
    TERMINATED: t.employee.statusTerminated,
  };

  const columns: ColumnsType<Employee> = [
    {
      title: t.employee.employeeCode,
      dataIndex: "employeeCode",
      key: "employeeCode",
      width: 120,
      render: (code) => <span className="font-semibold text-blue-600">{code}</span>,
    },
    {
      title: t.employee.fullName,
      key: "fullName",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={getMediaUrl(record.avatarUrl)}
            icon={!record.avatarUrl && <UserOutlined />}
            className="!bg-blue-600 shrink-0 font-medium"
          >
            {record.firstName?.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium text-slate-800">
              {record.lastName} {record.firstName}
            </div>
            <div className="text-xs text-slate-400">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: t.employee.department,
      key: "department",
      render: (_, record) => record.department?.name || <Text type="secondary">---</Text>,
    },
    {
      title: t.employee.position,
      key: "position",
      render: (_, record) => record.position?.title || <Text type="secondary">---</Text>,
    },
    {
      title: t.employee.phone,
      dataIndex: "phone",
      key: "phone",
      render: (phone) => phone || <Text type="secondary">---</Text>,
    },
    {
      title: t.employee.status,
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (st: EmployeeStatus) => (
        <Tag color={statusColorMap[st] || "default"}>{statusLabelMap[st] || st}</Tag>
      ),
    },
    {
      title: t.common.actions,
      key: "actions",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space orientation="horizontal" size="small">
          <Tooltip title={t.common.viewDetails}>
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleOpenDetail(record)}
              className="text-slate-500 hover:text-blue-600"
            />
          </Tooltip>

          {isHrOrAdmin && (
            <Tooltip title={t.common.edit}>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleOpenEdit(record)}
                className="text-slate-500 hover:text-amber-600"
              />
            </Tooltip>
          )}

          {isAdmin && (
            <Tooltip title={t.common.delete}>
              <Popconfirm
                title={t.common.confirmDelete}
                onConfirm={() => deleteEmployee(record.id)}
                okText={t.common.delete}
                cancelText={t.common.cancel}
                okButtonProps={{ danger: true }}
              >
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  className="hover:text-rose-600"
                />
              </Popconfirm>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Title level={3} className="!mb-1">
            {t.employee.title}
          </Title>
          <Text type="secondary">{t.employee.subtitle}</Text>
        </div>

        {isHrOrAdmin && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleOpenCreate}
            className="!shadow-md !shadow-blue-500/20"
          >
            {t.employee.addNew}
          </Button>
        )}
      </div>

      <Card className="shadow-xs border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <Input
            placeholder={t.employee.searchPlaceholder}
            prefix={<SearchOutlined className="text-slate-400" />}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            allowClear
          />

          <Select
            placeholder={t.employee.selectDepartment}
            value={departmentId}
            onChange={(val) => {
              setDepartmentId(val);
              setPage(1);
            }}
            allowClear
            className="w-full"
          >
            {departments.map((d) => (
              <Option key={d.id} value={d.id}>
                {d.name}
              </Option>
            ))}
          </Select>

          <Select
            placeholder={t.employee.selectStatus}
            value={status}
            onChange={(val) => {
              setStatus(val);
              setPage(1);
            }}
            allowClear
            className="w-full"
          >
            <Option value="ACTIVE">{t.employee.statusActive}</Option>
            <Option value="PROBATION">{t.employee.statusProbation}</Option>
            <Option value="ON_LEAVE">{t.employee.statusOnLeave}</Option>
            <Option value="TERMINATED">{t.employee.statusTerminated}</Option>
          </Select>

          <div className="flex gap-2">
            <Button
              icon={<ReloadOutlined />}
              onClick={handleResetFilters}
              className="flex-1"
            >
              {t.common.reset}
            </Button>
            <Button
              icon={<ReloadOutlined spin={isFetching} />}
              onClick={() => refetch()}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={employees}
          rowKey="id"
          loading={isLoading}
          scroll={{ x: 900 }}
          pagination={{
            current: meta?.page || page,
            pageSize: meta?.limit || limit,
            total: meta?.total || 0,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            onChange: (p, l) => {
              setPage(p);
              setLimit(l);
            },
            showTotal: (total) => `${t.common.all}: ${total}`,
          }}
        />
      </Card>

      <EmployeeDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleDrawerSubmit}
        loading={isCreating || isUpdating}
        initialData={editingEmployee}
        departments={departments}
        positions={positions}
      />

      <EmployeeDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        employee={viewingEmployee}
      />
    </div>
  );
}

