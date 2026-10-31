"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  Table,
  Button,
  Tag,
  Typography,
  Modal,
  Input,
  DatePicker,
  Popconfirm,
  Space,
  Form,
  Row,
  Col,
  Tabs,
  Descriptions,
} from "antd";
import {
  PlusOutlined,
  CalculatorOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { usePayroll } from "@/hooks/usePayroll";
import { useAuthStore } from "@/stores/auth.store";
import { request } from "@/lib/api-client";
import {
  PayrollPeriod,
  Payslip,
  PayrollPeriodStatus,
  CreatePeriodInput,
} from "@/types/payroll.types";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const periodFormSchema = z.object({
  name: z.string().min(2, "Tên kỳ lương tối thiểu 2 ký tự"),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020).max(2100),
  dateRange: z
    .custom<[Dayjs, Dayjs]>()
    .refine((val) => val && val[0] && val[1], "Vui lòng chọn thời gian chu kỳ tính lương"),
});

type PeriodFormValues = z.infer<typeof periodFormSchema>;

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

  const { data: periodPayslips = [], isLoading: isLoadingPayslips } = useQuery<Payslip[]>({
    queryKey: ["period-payslips", detailPeriod?.id],
    queryFn: async () => {
      if (!detailPeriod) return [];
      const res = await request.get<Payslip[]>(`payroll/periods/${detailPeriod.id}/payslips`);
      return res.data || [];
    },
    enabled: !!detailPeriod && periodPayslipsModalOpen,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PeriodFormValues>({
    resolver: zodResolver(periodFormSchema),
    defaultValues: {
      name: `Kỳ lương Tháng ${dayjs().format("M/YYYY")}`,
      month: dayjs().month() + 1,
      year: dayjs().year(),
      dateRange: [dayjs().startOf("month"), dayjs().endOf("month")],
    },
  });

  const onSubmitPeriod = async (values: PeriodFormValues) => {
    const [start, end] = values.dateRange;
    const payload: CreatePeriodInput = {
      name: values.name,
      month: values.month,
      year: values.year,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };
    await createPeriod(payload);
    setCreateModalOpen(false);
    reset();
  };

  const periodStatusColorMap: Record<PayrollPeriodStatus, string> = {
    DRAFT: "blue",
    CALCULATED: "orange",
    PAID: "green",
    OPEN: "blue",
    PROCESSING: "orange",
    CLOSED: "green",
  };

  const periodStatusLabelMap: Record<PayrollPeriodStatus, string> = {
    DRAFT: "Bản nháp",
    CALCULATED: "Đã tính lương",
    PAID: "Đã chi trả (Đã chốt)",
    OPEN: "Đang mở",
    PROCESSING: "Đang tính lương",
    CLOSED: "Đã chi trả (Đã chốt)",
  };

  const periodColumns: ColumnsType<PayrollPeriod> = [
    {
      title: "Kỳ tính lương",
      dataIndex: "name",
      key: "name",
      render: (name) => <span className="font-semibold text-slate-800">{name}</span>,
    },
    {
      title: "Tháng/Năm",
      key: "monthYear",
      render: (_, r) => `Tháng ${r.month}/${r.year}`,
    },
    {
      title: "Thời gian chu kỳ",
      key: "periodRange",
      render: (_, r) =>
        `${dayjs(r.startDate).format("DD/MM/YYYY")} - ${dayjs(r.endDate).format("DD/MM/YYYY")}`,
    },
    {
      title: "Số nhân viên",
      key: "employeeCount",
      render: (_, r) => <span>{r._count?.payslips ?? 0} phiếu</span>,
    },
    {
      title: "Tổng chi trả",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amt) => (
        <span className="font-semibold text-emerald-600">
          {amt ? `${Number(amt).toLocaleString("vi-VN")} đ` : "---"}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (st: PayrollPeriodStatus) => (
        <Tag color={periodStatusColorMap[st] || "default"}>
          {periodStatusLabelMap[st] || st}
        </Tag>
      ),
    },
    ...(isHrOrAdmin
      ? [
        {
          title: "Thao tác",
          key: "actions",
          render: (_: unknown, record: PayrollPeriod) => (
            <Space>
              <Button
                size="small"
                icon={<EyeOutlined />}
                onClick={() => {
                  setDetailPeriod(record);
                  setPeriodPayslipsModalOpen(true);
                }}
              >
                Xem bảng lương
              </Button>

              {record.status !== "PAID" && record.status !== "CLOSED" && (
                <Button
                  size="small"
                  type="primary"
                  icon={<CalculatorOutlined />}
                  loading={isCalculating}
                  onClick={() => calculatePeriod({ periodId: record.id, data: { standardWorkDays: 22 } })}
                  className="!bg-amber-500 hover:!bg-amber-600"
                >
                  Tính lương
                </Button>
              )}

              {record.status !== "PAID" && record.status !== "CLOSED" && (
                <Popconfirm
                  title="Xác nhận hoàn tất chi trả và đóng kỳ lương?"
                  onConfirm={() => closePeriod(record.id)}
                  okText="Đóng kỳ lương"
                  cancelText="Hủy"
                >
                  <Button
                    size="small"
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    loading={isClosingPeriod}
                    className="!bg-emerald-600 hover:!bg-emerald-700"
                  >
                    Chốt lương
                  </Button>
                </Popconfirm>
              )}
            </Space>
          ),
        },
      ]
      : []),
  ];

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
            {r.employee?.employeeCode} • {r.employee?.department?.name || "Chưa rõ phòng"}
          </div>
        </div>
      ),
    },
    {
      title: "Lương cơ bản",
      dataIndex: "baseSalary",
      key: "baseSalary",
      render: (v) => `${Number(v).toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Phụ cấp",
      dataIndex: "allowance",
      key: "allowance",
      render: (v) => `${Number(v || 0).toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Công chuẩn / Thực",
      key: "days",
      render: (_, r) => `${r.actualWorkDays} / ${r.standardWorkDays} ngày`,
    },
    {
      title: "BHXH (10.5%)",
      dataIndex: "insuranceDeduction",
      key: "insuranceDeduction",
      render: (v) => (
        <span className="text-rose-500">
          -{Number(v || 0).toLocaleString("vi-VN")} đ
        </span>
      ),
    },
    {
      title: "Thuế TNCN",
      dataIndex: "taxDeduction",
      key: "taxDeduction",
      render: (v) => (
        <span className="text-rose-500">
          -{Number(v || 0).toLocaleString("vi-VN")} đ
        </span>
      ),
    },
    {
      title: "Thực lĩnh (NET)",
      dataIndex: "netSalary",
      key: "netSalary",
      render: (v) => (
        <span className="font-bold text-emerald-600 text-sm">
          {Number(v).toLocaleString("vi-VN")} đ
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
            onClick={() => {
              reset();
              setCreateModalOpen(true);
            }}
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
                  columns={payslipColumns.filter((c) => c.key !== "employee")}
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

      {/* Modal View Detail Payslips of Period */}
      <Modal
        open={periodPayslipsModalOpen}
        title={
          <span className="flex items-center gap-2">
            <DollarCircleOutlined className="text-emerald-500" /> Bảng lương chi tiết:{" "}
            {detailPeriod?.name}
          </span>
        }
        onCancel={() => setPeriodPayslipsModalOpen(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setPeriodPayslipsModalOpen(false)}>
            Đóng
          </Button>,
        ]}
        width={1000}
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

      {/* Modal Create Period */}
      <Modal
        open={createModalOpen}
        title="Tạo kỳ tính lương mới"
        onCancel={() => setCreateModalOpen(false)}
        onOk={handleSubmit(onSubmitPeriod)}
        confirmLoading={isCreatingPeriod}
        destroyOnClose
      >
        <Form layout="vertical" className="pt-3">
          <Form.Item
            label="Tên kỳ lương"
            required
            validateStatus={errors.name ? "error" : ""}
            help={errors.name?.message}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Kỳ lương Tháng 10/2026" />
              )}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Tháng" required>
                <Controller
                  name="month"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      min={1}
                      max={12}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  )}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Năm" required>
                <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      min={2020}
                      max={2100}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Khoảng thời gian tính công"
            required
            validateStatus={errors.dateRange ? "error" : ""}
            help={errors.dateRange?.message}
          >
            <Controller
              name="dateRange"
              control={control}
              render={({ field }) => (
                <RangePicker {...field} className="w-full" format="YYYY-MM-DD" />
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

