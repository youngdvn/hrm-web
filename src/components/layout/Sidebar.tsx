"use client";

import { usePathname, useRouter } from "next/navigation";
import { Layout, Menu, MenuProps } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  ApartmentOutlined,
  IdcardOutlined,
  FieldTimeOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  UserOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useI18nStore } from "@/stores/i18n.store";
import { useAuthStore } from "@/stores/auth.store";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useI18nStore();
  const { hasRole } = useAuthStore();

  const isHrOrAdmin = hasRole(["ADMIN", "HR"]);
  const isManagerOrAbove = hasRole(["ADMIN", "HR", "MANAGER"]);
  const isAdmin = hasRole(["ADMIN"]);

  const menuItems: MenuProps["items"] = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: t.common.dashboard,
    },
    {
      key: "/employees",
      icon: <TeamOutlined />,
      label: t.common.employees,
    },
    ...(isHrOrAdmin
      ? [
          {
            key: "/departments",
            icon: <ApartmentOutlined />,
            label: t.common.departments,
          },
          {
            key: "/positions",
            icon: <IdcardOutlined />,
            label: t.common.positions,
          },
        ]
      : []),
    {
      key: "/attendance",
      icon: <FieldTimeOutlined />,
      label: t.common.attendance,
    },
    {
      key: "/leaves",
      icon: <CalendarOutlined />,
      label: t.common.leaves,
    },
    ...(isManagerOrAbove
      ? [
          {
            key: "/contracts",
            icon: <FileTextOutlined />,
            label: t.common.contracts,
          },
        ]
      : []),
    {
      key: "/payroll",
      icon: <DollarCircleOutlined />,
      label: t.common.payroll,
    },
    {
      key: "/chat",
      icon: <MessageOutlined />,
      label: t.common.chat,
    },
    ...(isAdmin
      ? [
          {
            key: "/audit-logs",
            icon: <SafetyCertificateOutlined />,
            label: t.common.auditLogs,
          },
        ]
      : []),
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: t.common.profile,
    },
  ];

  // Prefetch route code on hover for instant navigation
  const enhancedMenuItems = menuItems?.map((item) => {
    if (!item || !("key" in item) || typeof item.key !== "string") return item;
    const targetKey = item.key;
    return {
      ...item,
      onMouseEnter: () => {
        router.prefetch(targetKey);
      },
    };
  });

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="lg"
      theme="light"
      className="border-r border-slate-200 shadow-sm z-10 !bg-white"
      width={240}
    >
      <div className="h-16 flex items-center px-4 border-b border-slate-100 gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20 shrink-0">
          H
        </div>
        {!collapsed && (
          <div className="truncate">
            <h1 className="font-bold text-slate-800 text-base leading-tight">HRM Web</h1>
            <p className="text-[11px] text-slate-400">Enterprise Edition</p>
          </div>
        )}
      </div>

      <div className="py-2">
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={enhancedMenuItems}
          onClick={({ key }) => router.push(key)}
          className="!border-r-0 font-medium"
        />
      </div>
    </Sider>
  );
}
