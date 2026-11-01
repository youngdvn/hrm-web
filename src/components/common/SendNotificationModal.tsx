"use client";

import { useState } from "react";
import { Modal, Form, Input, Select, Radio } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useEmployees } from "@/hooks/useEmployees";
import { NotificationType, SendNotificationPayload } from "@/types/notification.types";
import { useI18nStore } from "@/stores/i18n.store";

const { Option } = Select;

interface SendNotificationModalProps {
  open: boolean;
  onClose: () => void;
  onSend: (payload: SendNotificationPayload) => Promise<void>;
  isSending: boolean;
}

export default function SendNotificationModal({
  open,
  onClose,
  onSend,
  isSending,
}: SendNotificationModalProps) {
  const { t } = useI18nStore();
  const [targetType, setTargetType] = useState<"ALL" | "SPECIFIC">("ALL");
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [messageText, setMessageText] = useState("");
  const [notifType, setNotifType] = useState<NotificationType>("GENERAL");
  const [link, setLink] = useState("");

  const { employees } = useEmployees({ limit: 100 });

  const handleSendSubmit = async () => {
    if (!title.trim() || !messageText.trim()) return;

    const payload: SendNotificationPayload = {
      targetAll: targetType === "ALL",
      userId: targetType === "SPECIFIC" ? selectedUserId : undefined,
      title: title.trim(),
      message: messageText.trim(),
      type: notifType,
      link: link.trim() || undefined,
    };

    await onSend(payload);
    onClose();
    setTitle("");
    setMessageText("");
    setLink("");
    setSelectedUserId(undefined);
    setTargetType("ALL");
  };

  return (
    <Modal
      open={open}
      title={
        <span className="flex items-center gap-2">
          <SendOutlined className="text-blue-600" /> {t.notification.sendNotification}
        </span>
      }
      onCancel={onClose}
      onOk={handleSendSubmit}
      confirmLoading={isSending}
      okText={t.notification.sendBtn}
      cancelText={t.common.cancel}
      destroyOnHidden
    >
      <Form layout="vertical" className="pt-3">
        <Form.Item label={t.notification.selectRecipient} required>
          <Radio.Group
            value={targetType}
            onChange={(e) => setTargetType(e.target.value)}
            className="mb-2"
          >
            <Radio value="ALL">{t.notification.targetAll}</Radio>
            <Radio value="SPECIFIC">{t.notification.targetSpecific}</Radio>
          </Radio.Group>

          {targetType === "SPECIFIC" && (
            <Select
              placeholder={t.notification.selectRecipient}
              value={selectedUserId}
              onChange={(val) => setSelectedUserId(val)}
              showSearch
              optionFilterProp="children"
              className="w-full mt-2"
            >
              {employees
                .filter((e) => !!e.userId)
                .map((e) => (
                  <Option key={e.userId!} value={e.userId!}>
                    {e.lastName} {e.firstName} ({e.employeeCode})
                  </Option>
                ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label={t.common.status} required>
          <Select
            value={notifType}
            onChange={(val) => setNotifType(val)}
            className="w-full"
          >
            <Option value="GENERAL">Thông báo chung</Option>
            <Option value="LEAVE_STATUS">Cập nhật Nghỉ phép</Option>
            <Option value="PAYROLL_PUBLISHED">Thông báo Bảng lương</Option>
            <Option value="CONTRACT_EXPIRING">Nhắc nhở Hợp đồng</Option>
          </Select>
        </Form.Item>

        <Form.Item label={t.notification.notificationTitle} required>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.notification.notificationTitle}
            maxLength={150}
            showCount
          />
        </Form.Item>

        <Form.Item label={t.notification.notificationMessage} required>
          <Input.TextArea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={t.notification.notificationMessage}
            rows={4}
            maxLength={1000}
            showCount
          />
        </Form.Item>

        <Form.Item label={t.notification.linkOptional}>
          <Input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="/payroll, /leaves, /attendance..."
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
