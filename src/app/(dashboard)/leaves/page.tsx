"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Tag,
  Tabs,
  Typography,
  Modal,
  Input,
  Select,
  DatePicker,
  Popconfirm,
  Statistic,
  Space,
  Form,
} from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { useLeaves } from "@/hooks/useLeaves";
import { useAuthStore } from "@/stores/auth.store";
import {
  LeaveRequest,
  LeaveType,
  LeaveStatus,
  CreateLeaveInput,
} from "@/types/leave.types";

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const leaveFormSchema = z.object({
  leaveType: z.enum(["ANNUAL", "SICK", "UNPAID", "MATERNITY", "BEREAVEMENT", "OTHER"]),
  dateRange: z
    .custom<[Dayjs, Dayjs]>()
    .refine((val) => val && val[0] && val[1], "Vui lòng chọn khoảng thời gian nghỉ"),
  reason: z.string().min(5, "Lý do nghỉ phép phải có ít nhất 5 ký tự"),
});

type LeaveFormValues = z.infer<typeof leaveFormSchema>;

export default function LeavesPage() {
  const { hasRole } = useAuthStore();
  const isManagerOrAdmin = hasRole(["ADMIN", "HR", "MANAGER"]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const {
    myLeaves,
    isLoadingMyLeaves,
    myBalance,
    isLoadingMyBalance,
    companyLeaves,
    meta,
    isLoadingCompanyLeaves,
    createLeave,
    isCreating,
    cancelLeave,
    reviewLeave,
    isReviewing,
  } = useLeaves();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveFormSchema),
    defaultValues: {
      leaveType: "ANNUAL",
      dateRange: undefined,
      reason: "",
    },
  });

  const onSubmitLeave = async (values: LeaveFormValues) => {
    const [start, end] = values.dateRange;
    await createLeave({
      leaveType: values.leaveType,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      reason: values.reason,
    });
    setCreateModalOpen(false);
    reset();
  };

  const handleReviewAction = async (status: "APPROVED" | "REJECTED") => {
    if (!selectedLeave) return;
    await reviewLeave({
      id: selectedLeave.id,
      data: {
        status,
        rejectionReason: status === "REJECTED" ? rejectionReason : undefined,
      },
    });
    setReviewModalOpen(false);
    setSelectedLeave(null);
    setRejectionReason("");
  };

  const leaveTypeLabel: Record<LeaveType, string> = {
    ANNUAL: "Phép năm",
    SICK: "Nghỉ ốm",
    UNPAID: "Nghỉ không lương",
    MATERNITY: "Thai sản",
    BEREAVEMENT: "Nghỉ hiếu/hỉ",
    OTHER: "Lý do khác",
  };

  const statusColorMap: Record<LeaveStatus, string> = {
    PENDING: "orange",
    APPROVED: "green",
    REJECTED: "red",
    CANCELLED: "default",
  };

  const statusLabelMap: Record<LeaveStatus, string> = {
    PENDING: "Chờ phê duyệt",
    APPROVED: "Đã duyệt",
    REJECTED: "Từ chối",
    CANCELLED: "Đã hủy",
  };

  const myColumns: ColumnsType<LeaveRequest> = [
    {
      title: "Loại nghỉ phép",
      dataIndex: "leaveType",
      key: "leaveType",
      render: (type: LeaveType) => <Tag color="blue">{leaveTypeLabel[type] || type}</Tag>,
    },
    {
      title: "Từ ngày",
      dataIndex: "startDate",
      key: "startDate",
      render: (d) => dayjs(d).format("DD/MM/YYYY"),
    },
    {
      title: "Đến ngày",
      dataIndex: "endDate",
      key: "endDate",
      render: (d) => dayjs(d).format("DD/MM/YYYY"),
    },
    {
      title: "Số ngày",
      dataIndex: "totalDays",
      key: "totalDays",
      render: (days) => <span className="font-semibold text-slate-800">{days} ngày</span>,
    },
    {
      title: "Lý do",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (st: LeaveStatus) => (
        <Tag color={statusColorMap[st] || "default"}>{statusLabelMap[st] || st}</Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) =>
        record.status === "PENDING" && (
          <Popconfirm
            title="Hủy đơn xin nghỉ này?"
            onConfirm={() => cancelLeave(record.id)}
            okText="Hủy đơn"
            cancelText="Đóng"
          >
            <Button type="link" danger size="small" icon={<StopOutlined />}>
              Hủy
            </Button>
          </Popconfirm>
        ),
    },
  ];

  const companyColumns: ColumnsType<LeaveRequest> = [
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
    ...myColumns.filter((c) => c.key !== "actions"),
    {
      title: "Thao tác",
      key: "companyActions",
      width: 160,
      render: (_, record) =>
        record.status === "PENDING" && (
          <Space>
            <Button
              type="primary"
              size="small"
              className="!bg-emerald-600 hover:!bg-emerald-700"
              onClick={() => {
                setSelectedLeave(record);
                handleReviewAction("APPROVED");
              }}
            >
              Duyệt
            </Button>
            <Button
              danger
              size="small"
              onClick={() => {
                setSelectedLeave(record);
                setReviewModalOpen(true);
              }}
            >
              Từ chối
            </Button>
          </Space>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Title level={3} className="!mb-1">
            Quản lý Nghỉ phép
          </Title>
          <Text type="secondary">Nộp đơn xin nghỉ, tra cứu quỹ phép năm và phê duyệt đơn</Text>
        </div>

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
          Nộp đơn nghỉ phép
        </Button>
      </div>

      {/* Leave Balance Overview */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="shadow-xs border-slate-200">
            <Statistic
              title={<span className="text-xs font-semibold text-slate-500 uppercase">Tổng ngày phép năm</span>}
              value={myBalance?.totalDays ?? 12}
              suffix="ngày"
              styles={{ content: { fontWeight: 700, color: "#1e293b" } }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card className="shadow-xs border-slate-200">
            <Statistic
              title={<span className="text-xs font-semibold text-slate-500 uppercase">Đã sử dụng</span>}
              value={myBalance?.usedDays ?? 0}
              suffix="ngày"
              styles={{ content: { fontWeight: 700, color: "#d97706" } }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card className="shadow-xs border-slate-200">
            <Statistic
              title={<span className="text-xs font-semibold text-slate-500 uppercase">Ngày phép còn lại</span>}
              value={myBalance?.remainingDays ?? 12}
              suffix="ngày"
              styles={{ content: { fontWeight: 700, color: "#16a34a" } }}
            />
          </Card>
        </Col>
      </Row>

      {/* Leave Tabs */}
      <Card className="shadow-xs border-slate-200">
        <Tabs
          defaultActiveKey="my"
          items={[
            {
              key: "my",
              label: "Đơn nghỉ phép của tôi",
              children: (
                <Table
                  columns={myColumns}
                  dataSource={myLeaves}
                  rowKey="id"
                  loading={isLoadingMyLeaves}
                  pagination={{ pageSize: 10 }}
                />
              ),
            },
            ...(isManagerOrAdmin
              ? [
                {
                  key: "company",
                  label: "Duyệt đơn toàn công ty",
                  children: (
                    <Table
                      columns={companyColumns}
                      dataSource={companyLeaves}
                      rowKey="id"
                      loading={isLoadingCompanyLeaves}
                      pagination={{
                        pageSize: meta?.limit || 10,
                        total: meta?.total || 0,
                      }}
                    />
                  ),
                },
              ]
              : []),
          ]}
        />
      </Card>

      {/* Create Leave Modal */}
      <Modal
        open={createModalOpen}
        title="Nộp đơn xin nghỉ phép"
        onCancel={() => setCreateModalOpen(false)}
        onOk={handleSubmit(onSubmitLeave)}
        confirmLoading={isCreating}
        destroyOnClose
      >
        <Form layout="vertical" className="pt-3">
          <Form.Item label="Loại nghỉ phép" required>
            <Controller
              name="leaveType"
              control={control}
              render={({ field }) => (
                <Select {...field} className="w-full">
                  <Option value="ANNUAL">Phép năm (Trừ quỹ ngày phép)</Option>
                  <Option value="SICK">Nghỉ ốm đau</Option>
                  <Option value="UNPAID">Nghỉ không hưởng lương</Option>
                  <Option value="MATERNITY">Nghỉ chế độ thai sản</Option>
                  <Option value="BEREAVEMENT">Nghỉ hiếu / hỉ</Option>
                  <Option value="OTHER">Lý do khác</Option>
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item
            label="Khoảng thời gian nghỉ"
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

          <Form.Item
            label="Lý do xin nghỉ"
            required
            validateStatus={errors.reason ? "error" : ""}
            help={errors.reason?.message}
          >
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <Input.TextArea {...field} rows={3} placeholder="Mô tả lý do nghỉ phép..." />
              )}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Reject Leave Reason Modal */}
      <Modal
        open={reviewModalOpen}
        title="Từ chối đơn xin nghỉ phép"
        onCancel={() => setReviewModalOpen(false)}
        onOk={() => handleReviewAction("REJECTED")}
        confirmLoading={isReviewing}
        okButtonProps={{ danger: true }}
        okText="Xác nhận từ chối"
      >
        <div className="py-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Lý do từ chối (tùy chọn)
          </label>
          <Input.TextArea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            rows={3}
            placeholder="Nhập lý do không phê duyệt..."
          />
        </div>
      </Modal>
    </div>
  );
}

