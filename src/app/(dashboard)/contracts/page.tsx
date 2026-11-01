"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  Table,
  Button,
  Tag,
  Typography,
  Popconfirm,
  Space,
  Upload,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useContracts } from "@/hooks/useContracts";
import { useAuthStore } from "@/stores/auth.store";
import { RoleGuard } from "@/components/common/RoleGuard";
import { getMediaUrl } from "@/lib/api-client";
import {
  Contract,
  ContractType,
  ContractStatus,
  CreateContractInput,
} from "@/types/contract.types";

const ContractModal = dynamic(
  () => import("@/components/contracts/ContractModal"),
  { ssr: false }
);

const { Title, Text } = Typography;

export default function ContractsPage() {
  const { hasRole } = useAuthStore();
  const isHrOrAdmin = hasRole(["ADMIN", "HR"]);
  const isAdmin = hasRole(["ADMIN"]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);

  const {
    contracts,
    isLoading,
    createContract,
    isCreating,
    updateContract,
    isUpdating,
    deleteContract,
    uploadContractFile,
  } = useContracts();

  const handleOpenCreate = () => {
    setEditingContract(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (contract: Contract) => {
    setEditingContract(contract);
    setModalOpen(true);
  };

  const handleSubmit = async (values: CreateContractInput) => {
    if (editingContract) {
      await updateContract({ id: editingContract.id, data: values });
    } else {
      await createContract(values);
    }
    setModalOpen(false);
    setEditingContract(null);
  };

  const contractTypeMap: Record<ContractType, string> = {
    PROBATION: "Thử việc",
    DEFINITE_TERM: "Xác định thời hạn",
    INDEFINITE_TERM: "Không xác định thời hạn",
    SEASONAL: "Thời vụ",
    INTERNSHIP: "Thực tập",
  };

  const statusColorMap: Record<ContractStatus, string> = {
    ACTIVE: "green",
    DRAFT: "gold",
    EXPIRED: "red",
    TERMINATED: "default",
  };

  const statusLabelMap: Record<ContractStatus, string> = {
    ACTIVE: "Đang hiệu lực",
    DRAFT: "Bản nháp",
    EXPIRED: "Hết hiệu lực",
    TERMINATED: "Chấm dứt trước hạn",
  };

  const columns: ColumnsType<Contract> = [
    {
      title: "Mã HĐ",
      dataIndex: "contractNumber",
      key: "contractNumber",
      render: (num) => (
        <span className="font-semibold text-blue-600 flex items-center gap-1.5">
          <FileTextOutlined /> {num}
        </span>
      ),
    },
    {
      title: "Nhân viên",
      key: "employee",
      render: (_, r) => (
        <div>
          <div className="font-semibold text-slate-800">
            {r.employee?.lastName} {r.employee?.firstName}
          </div>
          <div className="text-xs text-slate-400">
            {r.employee?.employeeCode} • {r.employee?.department?.name || "Chưa phân phòng"}
          </div>
        </div>
      ),
    },
    {
      title: "Loại hợp đồng",
      dataIndex: "contractType",
      key: "contractType",
      render: (t: ContractType) => <Tag color="geekblue">{contractTypeMap[t] || t}</Tag>,
    },
    {
      title: "Lương cơ bản",
      dataIndex: "baseSalary",
      key: "baseSalary",
      render: (salary) => (
        <span className="font-semibold text-slate-800">
          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(salary)}
        </span>
      ),
    },
    {
      title: "Thời hạn",
      key: "period",
      render: (_, r) => (
        <div className="text-xs space-y-0.5">
          <div>Từ: {dayjs(r.startDate).format("DD/MM/YYYY")}</div>
          <div>
            Đến:{" "}
            {r.endDate ? (
              dayjs(r.endDate).format("DD/MM/YYYY")
            ) : (
              <span className="text-slate-400">Vô thời hạn</span>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Tệp đính kèm",
      key: "fileUrl",
      render: (_, record) => {
        const fileUrl = getMediaUrl(record.fileUrl);
        return (
          <Space orientation="horizontal" size="small">
            {fileUrl ? (
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 transition-colors"
              >
                <FilePdfOutlined className="text-rose-500" /> Xem tệp
              </a>
            ) : (
              <span className="text-xs text-slate-400">Chưa có tệp</span>
            )}

            {isHrOrAdmin && (
              <Upload
                showUploadList={false}
                beforeUpload={async (file) => {
                  await uploadContractFile({ contractId: record.id, file });
                  return false;
                }}
              >
                <Button
                  size="small"
                  type="text"
                  icon={<UploadOutlined className="text-slate-500" />}
                  className="hover:text-blue-600"
                  title="Tải lên tệp hợp đồng mới (PDF, DOCX)"
                />
              </Upload>
            )}
          </Space>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (st: ContractStatus) => (
        <Tag color={statusColorMap[st] || "default"}>{statusLabelMap[st] || st}</Tag>
      ),
    },
    ...(isHrOrAdmin
      ? [
          {
            title: "Thao tác",
            key: "actions",
            render: (_: unknown, record: Contract) => (
              <Space>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleOpenEdit(record)}
                />
                {isAdmin && (
                  <Popconfirm
                    title="Xóa hợp đồng lao động này?"
                    onConfirm={() => deleteContract(record.id)}
                    okButtonProps={{ danger: true }}
                  >
                    <Button type="text" danger icon={<DeleteOutlined />} />
                  </Popconfirm>
                )}
              </Space>
            ),
          },
        ]
      : []),
  ];

  return (
    <RoleGuard allowedRoles={["ADMIN", "HR", "MANAGER"]}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Title level={3} className="!mb-1">
              Quản lý Hợp đồng Lao động
            </Title>
            <Text type="secondary">Theo dõi các loại hợp đồng, mức lương và thời hạn hiệu lực</Text>
          </div>

          {isHrOrAdmin && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={handleOpenCreate}
              className="!shadow-md !shadow-blue-500/20"
            >
              Tạo hợp đồng mới
            </Button>
          )}
        </div>

        <Card className="shadow-xs border-slate-200">
          <Table
            columns={columns}
            dataSource={contracts}
            rowKey="id"
            loading={isLoading}
            pagination={{ pageSize: 10 }}
          />
        </Card>

        {/* Lazy Loaded Contract Modal Form */}
        {modalOpen && (
          <ContractModal
            open={modalOpen}
            contract={editingContract}
            onClose={() => {
              setModalOpen(false);
              setEditingContract(null);
            }}
            onSubmit={handleSubmit}
            isLoading={isCreating || isUpdating}
          />
        )}
      </div>
    </RoleGuard>
  );
}
