"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Button,
  Tag,
  Avatar,
  Popconfirm,
  Modal,
  Input,
  Tooltip,
  Skeleton,
  Empty,
  Space,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useLeaves } from "@/hooks/useLeaves";
import { LeaveRequest, LeaveType } from "@/types/leave.types";
import { useI18nStore } from "@/stores/i18n.store";

export function QuickApprovalWidget() {
  const router = useRouter();
  const { t } = useI18nStore();

  const { companyLeaves, isLoadingCompanyLeaves, reviewLeave, isReviewing } = useLeaves({
    status: "PENDING",
    limit: 5,
  });

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const pendingLeaves = companyLeaves.filter((l) => l.status === "PENDING").slice(0, 5);

  const getLeaveTypeTag = (type: LeaveType) => {
    switch (type) {
      case "ANNUAL":
        return <Tag color="blue">{t.leave.typeAnnual}</Tag>;
      case "SICK":
        return <Tag color="orange">{t.leave.typeSick}</Tag>;
      case "UNPAID":
        return <Tag color="default">{t.leave.typeUnpaid}</Tag>;
      case "MATERNITY":
        return <Tag color="purple">{t.leave.typeMaternity}</Tag>;
      case "BEREAVEMENT":
        return <Tag color="red">{t.leave.typeBereavement}</Tag>;
      default:
        return <Tag color="cyan">{t.leave.typeOther}</Tag>;
    }
  };

  const handleApprove = async (leave: LeaveRequest) => {
    await reviewLeave({
      id: leave.id,
      data: { status: "APPROVED" },
    });
  };

  const handleOpenReject = (leave: LeaveRequest) => {
    setSelectedLeave(leave);
    setRejectionReason("");
    setRejectModalOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!selectedLeave) return;
    await reviewLeave({
      id: selectedLeave.id,
      data: {
        status: "REJECTED",
        rejectionReason: rejectionReason.trim() || undefined,
      },
    });
    setRejectModalOpen(false);
    setSelectedLeave(null);
  };

  return (
    <Card
      className="shadow-xs border-slate-200 hover:shadow-sm transition-shadow h-full flex flex-col"
      bodyStyle={{ flex: 1, display: "flex", flexDirection: "column" }}
      title={
        <div className="flex items-center justify-between flex-wrap gap-2 py-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-base">
              <CalendarOutlined />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800 text-sm md:text-base">
                {t.dashboard.quickApproval}
              </span>
              {pendingLeaves.length > 0 && (
                <Tag color="warning" className="!mr-0 font-medium">
                  {pendingLeaves.length} {t.dashboard.pendingRequests.toLowerCase()}
                </Tag>
              )}
            </div>
          </div>

          <Button
            type="link"
            size="small"
            className="!px-0 text-blue-600 hover:text-blue-700 font-medium text-xs flex items-center gap-1"
            onClick={() => router.push("/leaves")}
          >
            {t.dashboard.viewAllLeaves} <ArrowRightOutlined className="text-[11px]" />
          </Button>
        </div>
      }
    >
      {isLoadingCompanyLeaves ? (
        <Skeleton active paragraph={{ rows: 4 }} className="p-2" />
      ) : pendingLeaves.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-2xl mb-2.5">
            <CheckCircleOutlined />
          </div>
          <p className="font-medium text-slate-700 text-sm">{t.dashboard.noPendingLeaves}</p>
          <p className="text-xs text-slate-400 max-w-xs mt-1">{t.dashboard.noPendingLeavesDesc}</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 flex-1 max-h-[290px] overflow-y-auto pr-1">
          {pendingLeaves.map((leave) => {
            const empName = leave.employee
              ? `${leave.employee.lastName} ${leave.employee.firstName}`
              : t.common.unassigned;
            const empInitial = leave.employee?.firstName?.[0] || "U";
            const deptName = leave.employee?.department?.name;
            const startStr = dayjs(leave.startDate).format("DD/MM");
            const endStr = dayjs(leave.endDate).format("DD/MM/YYYY");

            return (
              <div
                key={leave.id}
                className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 p-2 rounded-lg transition-colors"
              >
                {/* Employee & Leave info */}
                <div className="flex items-start gap-3 min-w-0">
                  <Avatar
                    size={40}
                    className="bg-blue-600 text-white font-semibold shrink-0 shadow-xs"
                    icon={<UserOutlined />}
                  >
                    {empInitial}
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-800 text-sm">{empName}</span>
                      {leave.employee?.employeeCode && (
                        <span className="text-xs text-slate-400">
                          ({leave.employee.employeeCode})
                        </span>
                      )}
                      {getLeaveTypeTag(leave.leaveType)}
                    </div>

                    <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                      {deptName && <span className="text-slate-600 font-medium">{deptName}</span>}
                      <span>•</span>
                      <span className="font-medium text-blue-600">
                        {startStr} - {endStr} ({leave.totalDays} {t.leave.daysUnit})
                      </span>
                    </div>

                    {leave.reason && (
                      <Tooltip title={leave.reason}>
                        <p className="text-xs text-slate-500 italic mt-1 line-clamp-1 truncate max-w-sm">
                          &quot;{leave.reason}&quot;
                        </p>
                      </Tooltip>
                    )}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <Popconfirm
                    title={`${t.dashboard.confirmApprove} ${empName}?`}
                    onConfirm={() => handleApprove(leave)}
                    okText={t.leave.approve}
                    cancelText={t.common.cancel}
                    okButtonProps={{ loading: isReviewing }}
                  >
                    <Button
                      type="primary"
                      size="small"
                      icon={<CheckOutlined />}
                      className="!bg-emerald-600 hover:!bg-emerald-500 text-xs font-medium"
                      loading={isReviewing}
                    >
                      {t.dashboard.quickApprove}
                    </Button>
                  </Popconfirm>

                  <Button
                    size="small"
                    danger
                    icon={<CloseOutlined />}
                    className="text-xs font-medium"
                    onClick={() => handleOpenReject(leave)}
                    disabled={isReviewing}
                  >
                    {t.dashboard.quickReject}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reject Modal */}
      <Modal
        open={rejectModalOpen}
        title={
          <span className="text-rose-600 font-semibold flex items-center gap-2">
            <CloseOutlined /> {t.leave.reject}
          </span>
        }
        onCancel={() => {
          setRejectModalOpen(false);
          setSelectedLeave(null);
        }}
        onOk={handleConfirmReject}
        confirmLoading={isReviewing}
        okButtonProps={{ danger: true }}
        okText={t.leave.reject}
        cancelText={t.common.cancel}
        destroyOnClose
      >
        <div className="py-2 space-y-3">
          <p className="text-xs text-slate-600">
            Từ chối đơn xin nghỉ phép của{" "}
            <strong>
              {selectedLeave?.employee?.lastName} {selectedLeave?.employee?.firstName}
            </strong>
            .
          </p>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.leave.rejectReason} (tùy chọn):
            </label>
            <Input.TextArea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={3}
              placeholder="Nhập lý do từ chối để nhân viên nắm được thông tin..."
            />
          </div>
        </div>
      </Modal>
    </Card>
  );
}

