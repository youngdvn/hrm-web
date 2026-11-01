"use client";

import { useQuery } from "@tanstack/react-query";
import { Modal, Table, Button, Tag } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { request } from "@/lib/api-client";
import { PayrollPeriod, Payslip } from "@/types/payroll.types";
import { useI18nStore } from "@/stores/i18n.store";

interface PeriodPayslipsModalProps {
  open: boolean;
  period: PayrollPeriod | null;
  onClose: () => void;
}

const formatVnd = (val: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);

export default function PeriodPayslipsModal({
  open,
  period,
  onClose,
}: PeriodPayslipsModalProps) {
  const { t } = useI18nStore();
  const { data: periodPayslips = [], isLoading: isLoadingPayslips } = useQuery<Payslip[]>({
    queryKey: ["period-payslips", period?.id],
    queryFn: async () => {
      if (!period) return [];
      const res = await request.get<Payslip[]>(`payroll/periods/${period.id}/payslips`);
      return res.data || [];
    },
    enabled: !!period && open,
  });

  const payslipColumns: ColumnsType<Payslip> = [
    {
      title: "Nhân viên",
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
    <Modal
      open={open}
      title={
        <span className="flex items-center gap-2">
          <DollarCircleOutlined className="text-emerald-500" /> Bảng lương chi tiết:{" "}
          {period?.name}
        </span>
      }
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          {t.common.close}
        </Button>,
      ]}
      width={1000}
      destroyOnClose
    >
      <div className="py-2">
        <Table
          columns={payslipColumns}
          dataSource={periodPayslips}
          rowKey="id"
          loading={isLoadingPayslips}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 850 }}
        />
      </div>
    </Modal>
  );
}

