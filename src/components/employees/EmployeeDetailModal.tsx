"use client";

import { Modal, Descriptions, Tag, Avatar, Divider, Button } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Employee } from "@/types/employee.types";
import { useI18nStore } from "@/stores/i18n.store";
import { getMediaUrl } from "@/lib/api-client";

interface EmployeeDetailModalProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export function EmployeeDetailModal({ open, onClose, employee }: EmployeeDetailModalProps) {
  const { t } = useI18nStore();

  if (!employee) return null;

  const statusColorMap: Record<string, string> = {
    ACTIVE: "success",
    PROBATION: "processing",
    ON_LEAVE: "warning",
    TERMINATED: "error",
  };

  const statusLabelMap: Record<string, string> = {
    ACTIVE: t.employee.statusActive,
    PROBATION: t.employee.statusProbation,
    ON_LEAVE: t.employee.statusOnLeave,
    TERMINATED: t.employee.statusTerminated,
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          {t.common.cancel}
        </Button>,
      ]}
      width={700}
      title={
        <div className="flex items-center gap-3">
          <Avatar
            size={48}
            src={getMediaUrl(employee.avatarUrl)}
            icon={!employee.avatarUrl && <UserOutlined />}
            className="!bg-blue-600 font-bold"
          >
            {employee.firstName.charAt(0)}
          </Avatar>
          <div>
            <div className="text-base font-bold text-slate-800">
              {employee.lastName} {employee.firstName}
            </div>
            <div className="text-xs text-slate-400">
              {employee.employeeCode} • {employee.position?.title || "Chưa có chức vụ"}
            </div>
          </div>
        </div>
      }
    >
      <div className="py-4">
        <Descriptions bordered column={{ xs: 1, sm: 2 }} size="small">
          <Descriptions.Item label={t.employee.employeeCode}>
            <span className="font-semibold">{employee.employeeCode}</span>
          </Descriptions.Item>
          <Descriptions.Item label={t.employee.status}>
            <Tag color={statusColorMap[employee.status] || "default"}>
              {statusLabelMap[employee.status] || employee.status}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label={t.employee.email}>
            <span className="flex items-center gap-1.5">
              <MailOutlined className="text-slate-400" /> {employee.email}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label={t.employee.phone}>
            <span className="flex items-center gap-1.5">
              <PhoneOutlined className="text-slate-400" /> {employee.phone || "---"}
            </span>
          </Descriptions.Item>

          <Descriptions.Item label={t.employee.department}>
            {employee.department?.name || "Chưa phân bổ"}
          </Descriptions.Item>
          <Descriptions.Item label={t.employee.position}>
            {employee.position?.title || "Chưa phân bổ"}
          </Descriptions.Item>

          <Descriptions.Item label={t.employee.gender}>
            {employee.gender === "MALE"
              ? t.employee.male
              : employee.gender === "FEMALE"
                ? t.employee.female
                : t.employee.other}
          </Descriptions.Item>
          <Descriptions.Item label={t.employee.dateOfBirth}>
            {employee.dateOfBirth ? dayjs(employee.dateOfBirth).format("DD/MM/YYYY") : "---"}
          </Descriptions.Item>

          <Descriptions.Item label={t.employee.hireDate}>
            {employee.hireDate ? dayjs(employee.hireDate).format("DD/MM/YYYY") : "---"}
          </Descriptions.Item>
          <Descriptions.Item label={t.employee.manager}>
            {employee.manager
              ? `${employee.manager.lastName} ${employee.manager.firstName}`
              : "Không có"}
          </Descriptions.Item>

          <Descriptions.Item label={t.employee.address} span={2}>
            <span className="flex items-center gap-1.5">
              <HomeOutlined className="text-slate-400" /> {employee.address || "---"}
            </span>
          </Descriptions.Item>

          <Descriptions.Item label="Tài khoản hệ thống" span={2}>
            {employee.userId || employee.user ? (
              <div className="flex items-center gap-2">
                <Tag color="green">Đã kích hoạt</Tag>
                <span className="text-xs text-slate-600">Đăng nhập bằng email: <b>{employee.email}</b></span>
              </div>
            ) : (
              <Tag color="default">Chưa liên kết tài khoản</Tag>
            )}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
}

