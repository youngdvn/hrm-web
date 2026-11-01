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
import { useI18nStore } from "@/stores/i18n.store";
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
  const { t } = useI18nStore();
  const { hasRole } = useAuthStore();
  const isHrOrAdmin = hasRole(["ADMIN", "HR"]);
  const isAdmin = hasRole(["ADMIN"]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);

  const {
    contracts,
    isLoading,
    createContract,
    updateContract,
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
    PROBATION: t.contract.typeProbation,
    DEFINITE_TERM: t.contract.typeDefinite,
    INDEFINITE_TERM: t.contract.typeIndefinite,
    SEASONAL: t.contract.typeSeasonal,
    INTERNSHIP: t.contract.typeInternship,
  };

  const statusColorMap: Record<ContractStatus, string> = {
    ACTIVE: "green",
    DRAFT: "gold",
    EXPIRED: "red",
    TERMINATED: "default",
  };

  const statusLabelMap: Record<ContractStatus, string> = {
    ACTIVE: t.contract.statusActive,
    DRAFT: t.contract.statusDraft,
    EXPIRED: t.contract.statusExpired,
    TERMINATED: t.contract.statusTerminated,
  };

  const columns: ColumnsType<Contract> = [
    {
      title: t.contract.contractNumber,
      dataIndex: "contractNumber",
      key: "contractNumber",
      render: (num) => (
        <span className="font-semibold text-blue-600 flex items-center gap-1.5">
          <FileTextOutlined /> {num}
        </span>
      ),
    },
    {
      title: t.employee.title,
      key: "employee",
      render: (_, r) => (
        <div>
          <div className="font-semibold text-slate-800">
            {r.employee?.lastName} {r.employee?.firstName}
          </div>
          <div className="text-xs text-slate-400">
            {r.employee?.employeeCode} • {r.employee?.department?.name || "---"}
          </div>
        </div>
      ),
    },
    {
      title: t.contract.contractType,
      dataIndex: "contractType",
      key: "contractType",
      render: (type: ContractType) => (
        <Tag color="geekblue">{contractTypeMap[type] || type}</Tag>
      ),
    },
    {
      title: t.contract.baseSalary,
      dataIndex: "baseSalary",
      key: "baseSalary",
      render: (salary) => (
        <span className="font-semibold text-slate-800">
          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(salary)}
        </span>
      ),
    },
    {
      title: t.common.date,
      key: "period",
      render: (_, r) => (
        <div className="text-xs space-y-0.5">
          <div>{t.contract.from}: {dayjs(r.startDate).format("DD/MM/YYYY")}</div>
          <div>
            {t.contract.to}:{" "}
            {r.endDate ? (
              dayjs(r.endDate).format("DD/MM/YYYY")
            ) : (
              <span className="text-slate-400">{t.contract.typeIndefinite}</span>
            )}
          </div>
        </div>
      ),
    },
    {
      title: t.contract.fileAttachment,
      key: "fileUrl",
      render: (_, record) => {
        const fileUrl = getMediaUrl(record.fileUrl);
        return (
          <Space size="small">
            {fileUrl ? (
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 transition-colors"
              >
                <FilePdfOutlined className="text-rose-500" /> PDF
              </a>
            ) : (
              <span className="text-xs text-slate-400">---</span>
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
                />
              </Upload>
            )}
          </Space>
        );
      },
    },
    {
      title: t.common.status,
      dataIndex: "status",
      key: "status",
      render: (st: ContractStatus) => (
        <Tag color={statusColorMap[st] || "default"}>{statusLabelMap[st] || st}</Tag>
      ),
    },
    ...(isHrOrAdmin
      ? [
          {
            title: t.common.actions,
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
                    title={t.common.confirmDelete}
                    onConfirm={() => deleteContract(record.id)}
                    okButtonProps={{ danger: true }}
                    okText={t.common.delete}
                    cancelText={t.common.cancel}
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
              {t.contract.title}
            </Title>
            <Text type="secondary">{t.contract.subtitle}</Text>
          </div>

          {isHrOrAdmin && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={handleOpenCreate}
              className="!shadow-md !shadow-blue-500/20"
            >
              {t.contract.createContract}
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

        {modalOpen && (
          <ContractModal
            open={modalOpen}
            contract={editingContract}
            onClose={() => {
              setModalOpen(false);
              setEditingContract(null);
            }}
            onSubmit={handleSubmit}
            isLoading={false}
          />
        )}
      </div>
    </RoleGuard>
  );
}
