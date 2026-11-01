"use client";

import { Layout, Button, Avatar, Dropdown, MenuProps, Tag, Space, Badge, Tooltip } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/hooks/useAuth";
import { useI18nStore } from "@/stores/i18n.store";
import { useChat } from "@/hooks/useChat";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { NotificationDropdown } from "@/components/common/NotificationDropdown";
import { useRouter } from "next/navigation";
import { getMediaUrl } from "@/lib/api-client";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Header({ collapsed, onToggle }: HeaderProps) {
  const { user, logout } = useAuth();
  const { t } = useI18nStore();
  const { unreadCount: chatUnreadCount } = useChat();
  const router = useRouter();

  const userRole = user?.roles?.[0] || "EMPLOYEE";
  const roleColorMap: Record<string, string> = {
    ADMIN: "red",
    HR: "blue",
    MANAGER: "green",
    EMPLOYEE: "purple",
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "user-info",
      disabled: true,
      label: (
        <div className="py-1">
          <div className="font-semibold text-slate-800">{user?.fullName || t.common.user}</div>
          <div className="text-xs text-slate-400">{user?.email}</div>
        </div>
      ),
    },
    { type: "divider" },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: t.common.profile,
      onClick: () => router.push("/profile"),
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      danger: true,
      label: t.common.logout,
      onClick: () => logout(),
    },
  ];

  return (
    <AntHeader className="!bg-white !px-4 h-16 border-b border-slate-200 flex items-center justify-between shadow-xs sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          className="text-base"
        />
      </div>

      <div className="flex items-center gap-3">
        <Tooltip title={t.common.chat}>
          <Badge count={chatUnreadCount} overflowCount={99} size="small" offset={[-2, 4]}>
            <Button
              type="text"
              shape="circle"
              icon={<MessageOutlined className="text-lg text-slate-600" />}
              onClick={() => router.push("/chat")}
              className="hover:!bg-slate-100 flex items-center justify-center w-9 h-9"
            />
          </Badge>
        </Tooltip>

        <NotificationDropdown />

        <LanguageSwitcher />

        <div className="h-4 w-px bg-slate-200" />

        <Dropdown menu={{ items: userMenuItems }} trigger={["click"]} placement="bottomRight">
          <div className="flex items-center gap-2 cursor-pointer rounded-lg">
            <Avatar
              src={getMediaUrl(user?.employee?.avatarUrl)}
              className="!bg-blue-600 font-semibold shrink-0"
              size={34}
            >
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-slate-700 leading-tight">
                {user?.fullName || "User"}
              </div>
            </div>
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
}

