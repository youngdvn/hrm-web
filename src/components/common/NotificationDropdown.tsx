"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Dropdown,
  List,
  Typography,
  Empty,
  Modal,
  Form,
  Input,
  Select,
  Radio,
  Space,
} from "antd";
import {
  BellOutlined,
  CheckOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNotifications } from "@/hooks/useNotifications";
import { useEmployees } from "@/hooks/useEmployees";
import { useAuthStore } from "@/stores/auth.store";
import { AppNotification, NotificationType, SendNotificationPayload } from "@/types/notification.types";

dayjs.extend(relativeTime);

const { Text } = Typography;
const { Option } = Select;

const getTypeIcon = (type: NotificationType) => {
  switch (type) {
    case "LEAVE_STATUS":
      return <CalendarOutlined className="text-amber-500" />;
    case "PAYROLL_PUBLISHED":
      return <DollarCircleOutlined className="text-emerald-500" />;
    case "CONTRACT_EXPIRING":
      return <FileTextOutlined className="text-rose-500" />;
    case "GENERAL":
    default:
      return <BellOutlined className="text-blue-500" />;
  }
};

export function NotificationDropdown() {
  const router = useRouter();
  const { hasRole } = useAuthStore();
  const isHrOrAdmin = hasRole(["ADMIN", "HR"]);

  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [targetType, setTargetType] = useState<"ALL" | "SPECIFIC">("ALL");
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [messageText, setMessageText] = useState("");
  const [notifType, setNotifType] = useState<NotificationType>("GENERAL");
  const [link, setLink] = useState("");

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    isMarkingAll,
    sendNotification,
    isSending,
  } = useNotifications();

  const { employees } = useEmployees({ limit: 100 });

  const handleNotificationClick = (item: AppNotification) => {
    if (!item.isRead) {
      markAsRead(item.id);
    }
    if (item.link) {
      router.push(item.link);
    }
  };

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

    await sendNotification(payload);
    setSendModalOpen(false);
    setTitle("");
    setMessageText("");
    setLink("");
    setSelectedUserId(undefined);
    setTargetType("ALL");
  };

  const menuContent = (
    <div className="w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800 text-sm">Thông báo</span>
          {unreadCount > 0 && (
            <Badge count={unreadCount} overflowCount={99} className="!text-[11px]" />
          )}
        </div>
        <Space size="small">
          {isHrOrAdmin && (
            <Button
              type="primary"
              size="small"
              icon={<SendOutlined />}
              onClick={() => setSendModalOpen(true)}
              className="!text-xs !bg-blue-600 hover:!bg-blue-700 !h-7"
            >
              Gửi tin
            </Button>
          )}

          {unreadCount > 0 && (
            <Button
              type="link"
              size="small"
              icon={<CheckOutlined />}
              loading={isMarkingAll}
              onClick={() => markAllAsRead()}
              className="!p-0 !text-xs !text-blue-600 hover:!text-blue-700"
            >
              Đã đọc
            </Button>
          )}
        </Space>
      </div>

      <div className="max-h-[380px] overflow-y-auto">
        {notifications.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item
                onClick={() => handleNotificationClick(item)}
                className={`!px-3.5 !py-3 cursor-pointer transition-colors border-b border-slate-50 last:border-b-0 hover:bg-slate-50 ${!item.isRead ? "bg-blue-50/30" : ""
                  }`}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="mt-0.5 p-2 rounded-lg bg-slate-100 text-sm">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span
                        className={`text-xs truncate ${!item.isRead
                            ? "font-semibold text-slate-900"
                            : "font-medium text-slate-700"
                          }`}
                      >
                        {item.title}
                      </span>
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 !mb-1 leading-relaxed">
                      {item.message}
                    </p>
                    <Text type="secondary" className="text-[10px]">
                      {dayjs(item.createdAt).fromNow()}
                    </Text>
                  </div>
                </div>
              </List.Item>
            )}
          />
        ) : (
          <div className="py-8">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span className="text-xs text-slate-400">Không có thông báo mới</span>}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Dropdown popupRender={() => menuContent} trigger={["click"]} placement="bottomRight">
        <Button
          type="text"
          shape="circle"
          className="flex items-center justify-center hover:bg-slate-100 text-slate-600"
        >
          <Badge count={unreadCount} overflowCount={99} size="small" offset={[2, -2]}>
            <BellOutlined className="text-lg" />
          </Badge>
        </Button>
      </Dropdown>

      {/* Send Notification Modal (Admin & HR) */}
      <Modal
        open={sendModalOpen}
        title={
          <span className="flex items-center gap-2">
            <SendOutlined className="text-blue-600" /> Soạn thông báo nội bộ
          </span>
        }
        onCancel={() => setSendModalOpen(false)}
        onOk={handleSendSubmit}
        confirmLoading={isSending}
        okText="Gửi ngay"
        cancelText="Hủy"
        destroyOnHidden
      >
        <Form layout="vertical" className="pt-3">
          <Form.Item label="Đối tượng nhận" required>
            <Radio.Group
              value={targetType}
              onChange={(e) => setTargetType(e.target.value)}
              className="mb-2"
            >
              <Radio value="ALL">Toàn thể nhân viên (Broadcast)</Radio>
              <Radio value="SPECIFIC">Gửi cho 1 nhân viên cụ thể</Radio>
            </Radio.Group>

            {targetType === "SPECIFIC" && (
              <Select
                placeholder="Chọn nhân viên nhận thông báo"
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

          <Form.Item label="Loại thông báo" required>
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

          <Form.Item label="Tiêu đề thông báo" required>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề thông báo..."
              maxLength={150}
              showCount
            />
          </Form.Item>

          <Form.Item label="Nội dung thông báo" required>
            <Input.TextArea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Nhập nội dung chi tiết thông báo..."
              rows={4}
              maxLength={1000}
              showCount
            />
          </Form.Item>

          <Form.Item label="Đường link điều hướng (tùy chọn)">
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="/payroll, /leaves, /attendance..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
