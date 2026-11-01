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
  Tabs,
} from "antd";
import {
  PlusOutlined,
  CalculatorOutlined,
  CheckCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { usePayroll } from "@/hooks/usePayroll";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import {
  PayrollPeriod,
  Payslip,
  PayrollPeriodStatus,
  CreatePeriodInput,
} from "@/types/payroll.types";

const CreatePeriodModal = dynamic(
  () => import("@/components/payroll/CreatePeriodModal"),
  { ssr: false }
);

const PeriodPayslipsModal = dynamic(
  () => import("@/components/payroll/PeriodPayslipsModal"),
  { ssr: false }
);

const { Title, Text } = Typography;

const formatVnd = (val: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);

export default function PayrollPage() {
  const { t } = useI18nStore();
  const { hasRole } = useAuthStore();
  const isHrOrAdmin = hasRole(["ADMIN", "HR"]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailPeriod, setDetailPeriod] = useState<PayrollPeriod | null>(null);
  const [periodPayslipsModalOpen, setPeriodPayslipsModalOpen] = useState(false);

  const {
    periods,
    isLoadingPeriods,
    myPayslips,
    isLoadingMyPayslips,
    createPeriod,
    isCreatingPeriod,
    calculatePeriod,
    isCalculating,
    closePeriod,
    isClosingPeriod,
  } = usePayroll();

  const handleCreatePeriod = async (values: CreatePeriodInput) => {
    await createPeriod(values);
    setCreateModalOpen(false);
  };

  const periodStatusMap: Record<PayrollPeriodStatus, { label: string; color: string }> = {
    DRAFT: { label: t.payroll.statusDraft, color: "default" },
    OPEN: { label: t.payroll.statusOpen, color: "blue" },
    PROCESSING: { label: t.payroll.statusProcessing, color: "processing" },
    CALCULATED: { label: "Đã tính toán", color: "warning" },
    PAID: { label: "Đã thanh toán", color: "cyan" },
    CLOSED: { label: t.payroll.statusClosed, color: "success" },
  };

  const periodColumns: ColumnsType<PayrollPeriod> = [
    {
      title: t.payroll.periodName,
      dataIndex: "name",
      key: "name",
      render: (name, r) => (
        <div>
          <div className="font-semibold text-slate-800">{name}</div>
          <div className="text-xs text-slate-400">
            {t.payroll.month} {r.month}/{r.year} ({dayjs(r.startDate).format("DD/MM")} -{" "}
            {dayjs(r.endDate).format("DD/MM/YYYY")})
          </div>
        </div>
      ),
    },
    {
      title: t.common.status,
      dataIndex: "status",
      key: "status",
      render: (st: PayrollPeriodStatus) => {
        const item = periodStatusMap[st] || { label: st, color: "default" };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
    {
      title: "Số phiếu lương",
      key: "count",
      render: (_, r) => (
        <span>
          {r._count?.payslips ?? 0} {t.common.records}
        </span>
      ),
    },
    {
      title: t.common.actions,
      key: "actions",
      render: (_, r) => (
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setDetailPeriod(r);
              setPeriodPayslipsModalOpen(true);
            }}
          >
            {t.common.viewDetails}
          </Button>

          {r.status !== "CLOSED" && (
            <Popconfirm
              title="Tính toán bảng lương toàn thể nhân viên cho kỳ này?"
              onConfirm={() => calculatePeriod({ periodId: r.id })}
              okText={t.payroll.calculate}
              cancelText={t.common.cancel}
            >
              <Button
                size="small"
                type="primary"
                icon={<CalculatorOutlined />}
                loading={isCalculating}
                className="!bg-amber-600 hover:!bg-amber-700"
              >
                {t.payroll.calculate}
              </Button>
            </Popconfirm>
          )}

          {r.status === "CALCULATED" && (
            <Popconfirm
              title="Chốt kỳ lương và gửi phiếu lương cho toàn thể nhân viên?"
              onConfirm={() => closePeriod(r.id)}
              okText={t.payroll.closePeriod}
              cancelText={t.common.cancel}
            >
              <Button
                size="small"
                type="primary"
                icon={<CheckCircleOutlined />}
                loading={isClosingPeriod}
                className="!bg-emerald-600 hover:!bg-emerald-700"
              >
                {t.payroll.closePeriod}
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const myPayslipColumns: ColumnsType<Payslip> = [
    {
      title: t.payroll.periodName,
      key: "periodName",
      render: (_, r) => (
        <div>
          <div className="font-semibold text-slate-800">{r.payrollPeriod?.name}</div>
          <div className="text-xs text-slate-400">
            {t.payroll.month} {r.payrollPeriod?.month}/{r.payrollPeriod?.year}
          </div>
        </div>
      ),
    },
    {
      title: "Lương chuẩn",
      dataIndex: "standardSalary",
      key: "standardSalary",
      render: (v) => formatVnd(v),
    },
    {
      title: "Lương thực tế",
      dataIndex: "actualSalary",
      key: "actualSalary",
      render: (v) => formatVnd(v),
    },
    {
      title: t.attendance.overtime,
      dataIndex: "overtimePay",
      key: "overtimePay",
      render: (v) => (v > 0 ? <span className="text-emerald-600">+{formatVnd(v)}</span> : "---"),
    },
    {
      title: "Bảo hiểm",
      dataIndex: "insuranceDeduction",
      key: "insuranceDeduction",
      render: (v) => <span className="text-rose-600">-{formatVnd(v)}</span>,
    },
    {
      title: "Thuế TNCN",
      dataIndex: "taxDeduction",
      key: "taxDeduction",
      render: (v) => <span className="text-rose-600">-{formatVnd(v)}</span>,
    },
    {
      title: "Lương NET",
      dataIndex: "netSalary",
      key: "netSalary",
      render: (v) => (
        <span className="font-bold text-emerald-600 text-sm">
          {formatVnd(v)}
        </span>
      ),
    },
    {
      title: t.common.status,
      dataIndex: "status",
      key: "status",
      render: (st) => (
        <Tag color={st === "PAID" ? "green" : "blue"}>{st}</Tag>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Title level={3} className="!mb-1">
            {t.payroll.title}
          </Title>
          <Text type="secondary">
            {t.payroll.subtitle}
          </Text>
        </div>

        {isHrOrAdmin && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setCreateModalOpen(true)}
            className="!shadow-md !shadow-blue-500/20"
          >
            {t.payroll.createPeriod}
          </Button>
        )}
      </div>

      <Card className="shadow-xs border-slate-200">
        <Tabs
          defaultActiveKey={isHrOrAdmin ? "periods" : "my"}
          items={[
            ...(isHrOrAdmin
              ? [
                {
                  key: "periods",
                  label: "Danh sách các kỳ tính lương",
                  children: (
                    <Table
                      columns={periodColumns}
                      dataSource={periods}
                      rowKey="id"
                      loading={isLoadingPeriods}
                      pagination={{ pageSize: 10 }}
                    />
                  ),
                },
              ]
              : []),
            {
              key: "my",
              label: "Phiếu lương của tôi",
              children: (
                <Table
                  columns={myPayslipColumns}
                  dataSource={myPayslips}
                  rowKey="id"
                  loading={isLoadingMyPayslips}
                  pagination={{ pageSize: 10 }}
                />
              ),
            },
          ]}
        />
      </Card>

      {/* Lazy Loaded Modal View Detail Payslips of Period */}
      {periodPayslipsModalOpen && (
        <PeriodPayslipsModal
          open={periodPayslipsModalOpen}
          period={detailPeriod}
          onClose={() => {
            setPeriodPayslipsModalOpen(false);
            setDetailPeriod(null);
          }}
        />
      )}

      {/* Lazy Loaded Modal Create Period */}
      {createModalOpen && (
        <CreatePeriodModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreatePeriod}
          isCreating={isCreatingPeriod}
        />
      )}
    </div>
  );
}
