"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Badge,
  Button,
  Dropdown,
  List,
  Typography,
  Empty,
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
import { useAuthStore } from "@/stores/auth.store";
import { AppNotification, NotificationType, SendNotificationPayload } from "@/types/notification.types";

const SendNotificationModal = dynamic(
  () => import("./SendNotificationModal"),
  { ssr: false }
);

dayjs.extend(relativeTime);

const { Text } = Typography;

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

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    isMarkingAll,
    sendNotification,
    isSending,
  } = useNotifications();

  const handleNotificationClick = (item: AppNotification) => {
    if (!item.isRead) {
      markAsRead(item.id);
    }
    if (item.link) {
      router.push(item.link);
    }
  };

  const handleSendNotification = async (payload: SendNotificationPayload) => {
    await sendNotification(payload);
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
                className={`!px-3.5 !py-3 cursor-pointer transition-colors border-b border-slate-50 last:border-b-0 hover:bg-slate-50 ${
                  !item.isRead ? "bg-blue-50/30" : ""
                }`}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="mt-0.5 p-2 rounded-lg bg-slate-100 text-sm">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span
                        className={`text-xs truncate ${
                          !item.isRead
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

      {/* Send Notification Modal (Admin & HR) - Lazy loaded */}
      {sendModalOpen && (
        <SendNotificationModal
          open={sendModalOpen}
          onClose={() => setSendModalOpen(false)}
          onSend={handleSendNotification}
          isSending={isSending}
        />
      )}
    </>
  );
}
