"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Tag,
  Tabs,
  Typography,
  Popconfirm,
  Statistic,
  Space,
} from "antd";
import {
  PlusOutlined,
  StopOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useLeaves } from "@/hooks/useLeaves";
import { useAuthStore } from "@/stores/auth.store";
import {
  LeaveRequest,
  LeaveType,
  LeaveStatus,
  CreateLeaveInput,
} from "@/types/leave.types";

const CreateLeaveModal = dynamic(
  () => import("@/components/leaves/CreateLeaveModal"),
  { ssr: false }
);

const ReviewLeaveModal = dynamic(
  () => import("@/components/leaves/ReviewLeaveModal"),
  { ssr: false }
);

const { Title, Text } = Typography;

export default function LeavesPage() {
  const { hasRole } = useAuthStore();
  const isManagerOrAdmin = hasRole(["ADMIN", "HR", "MANAGER"]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);

  const {
    myLeaves,
    isLoadingMyLeaves,
    myBalance,
    companyLeaves,
    meta,
    isLoadingCompanyLeaves,
    createLeave,
    isCreating,
    cancelLeave,
    reviewLeave,
    isReviewing,
  } = useLeaves();

  const onSubmitLeave = async (values: CreateLeaveInput) => {
    await createLeave(values);
    setCreateModalOpen(false);
  };

  const handleReviewAction = async (status: "APPROVED" | "REJECTED", rejectionReason?: string) => {
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
          onClick={() => setCreateModalOpen(true)}
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

      {/* Lazy Loaded Create Leave Modal */}
      {createModalOpen && (
        <CreateLeaveModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={onSubmitLeave}
          isCreating={isCreating}
        />
      )}

      {/* Lazy Loaded Reject Reason Modal */}
      {reviewModalOpen && (
        <ReviewLeaveModal
          open={reviewModalOpen}
          onClose={() => {
            setReviewModalOpen(false);
            setSelectedLeave(null);
          }}
          onConfirmReject={(reason) => handleReviewAction("REJECTED", reason)}
          isReviewing={isReviewing}
        />
      )}
    </div>
  );
}
