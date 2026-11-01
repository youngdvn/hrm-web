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
    DRAFT: { label: "Bản nháp", color: "default" },
    OPEN: { label: "Mở kỳ lương", color: "blue" },
    PROCESSING: { label: "Đang xử lý", color: "processing" },
    CALCULATED: { label: "Đã tính toán", color: "warning" },
    PAID: { label: "Đã thanh toán", color: "cyan" },
    CLOSED: { label: "Đã chốt & Xuất bảng lương", color: "success" },
  };

  const periodColumns: ColumnsType<PayrollPeriod> = [
    {
      title: "Kỳ tính lương",
      dataIndex: "name",
      key: "name",
      render: (name, r) => (
        <div>
          <div className="font-semibold text-slate-800">{name}</div>
          <div className="text-xs text-slate-400">
            Tháng {r.month}/{r.year} ({dayjs(r.startDate).format("DD/MM")} -{" "}
            {dayjs(r.endDate).format("DD/MM/YYYY")})
          </div>
        </div>
      ),
    },
    {
      title: "Trạng thái",
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
      render: (_, r) => <span>{r._count?.payslips ?? 0} nhân viên</span>,
    },
    {
      title: "Thao tác",
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
            Chi tiết
          </Button>

          {r.status !== "CLOSED" && (
            <Popconfirm
              title="Tính toán bảng lương toàn thể nhân viên cho kỳ này?"
              onConfirm={() => calculatePeriod({ periodId: r.id })}
              okText="Tính toán"
              cancelText="Hủy"
            >
              <Button
                type="primary"
                size="small"
                icon={<CalculatorOutlined />}
                loading={isCalculating}
                className="!bg-blue-600 hover:!bg-blue-700"
              >
                Tính lương
              </Button>
            </Popconfirm>
          )}

          {r.status === "CALCULATED" && (
            <Popconfirm
              title="Chốt bảng lương? Nhân viên sẽ xem được phiếu lương của họ."
              onConfirm={() => closePeriod(r.id)}
              okText="Chốt sổ"
              cancelText="Hủy"
            >
              <Button
                size="small"
                icon={<CheckCircleOutlined />}
                loading={isClosingPeriod}
                className="!text-emerald-600 !border-emerald-600 hover:!bg-emerald-50"
              >
                Chốt kỳ lương
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const myPayslipColumns: ColumnsType<Payslip> = [
    {
      title: "Lương cơ bản",
      dataIndex: "baseSalary",
      key: "baseSalary",
      render: (v) => formatVnd(v),
    },
    {
      title: "Công chuẩn / Thực tế",
      key: "workDays",
      render: (_, r) => (
        <span className="text-xs">
          <b>{r.actualWorkDays}</b> / {r.standardWorkDays} ngày
        </span>
      ),
    },
    {
      title: "Lương thực tế",
      dataIndex: "actualSalary",
      key: "actualSalary",
      render: (v) => formatVnd(v),
    },
    {
      title: "Phụ cấp",
      dataIndex: "allowance",
      key: "allowance",
      render: (v) => formatVnd(v),
    },
    {
      title: "Trừ BH (10.5%)",
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
      title: "Trạng thái",
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
            Quản lý Kỳ lương & Tính lương
          </Title>
          <Text type="secondary">
            Tự động tổng hợp ngày công, khấu trừ bảo hiểm, tính thuế TNCN và lương NET
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
            Tạo kỳ lương mới
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
