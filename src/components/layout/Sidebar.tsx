"use client";

import { useState, useEffect } from "react";
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
  ShoppingCartOutlined,
  ShopOutlined,
  AppstoreOutlined,
  AccountBookOutlined,
  FileDoneOutlined,
  RiseOutlined,
  SettingOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { useI18nStore } from "@/stores/i18n.store";
import { useAuthStore } from "@/stores/auth.store";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const getSubmenuKeyFromPath = (path: string): string[] => {
  if (path === "/employees" || path === "/departments" || path === "/positions" || path === "/contracts") {
    return ["sub-hrm"];
  }
  if (path === "/attendance" || path === "/leaves" || path === "/payroll") {
    return ["sub-time"];
  }
  if (path.startsWith("/sales")) {
    return ["sub-sales"];
  }
  if (path.startsWith("/accounting")) {
    return ["sub-accounting"];
  }
  if (path === "/chat" || path === "/audit-logs" || path === "/profile" || path === "/settings") {
    return ["sub-system"];
  }
  return [];
};

export function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { t, locale } = useI18nStore();
  const { hasRole } = useAuthStore();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const isVi = locale === "vi";
  const isHrOrAdmin = hasRole(["ADMIN", "HR"]);
  const isManagerOrAbove = hasRole(["ADMIN", "HR", "MANAGER"]);
  const isAdmin = hasRole(["ADMIN"]);

  useEffect(() => {
    const keys = getSubmenuKeyFromPath(pathname);
    setOpenKeys((prev) => Array.from(new Set([...prev, ...keys])));
  }, [pathname]);

  const menuItems: MenuProps["items"] = [
    // 1. Dashboard (Direct Link)
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: t.common.dashboard,
    },

    // 2. Submenu: Quản trị Nhân sự (HRM)
    {
      key: "sub-hrm",
      icon: <TeamOutlined />,
      label: isVi ? "Quản trị Nhân sự" : "Human Resources",
      children: [
        {
          key: "/employees",
          icon: <UserOutlined />,
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
        ...(isManagerOrAbove
          ? [
              {
                key: "/contracts",
                icon: <FileTextOutlined />,
                label: t.common.contracts,
              },
            ]
          : []),
      ],
    },

    // 3. Submenu: Chấm công & Lương
    {
      key: "sub-time",
      icon: <FieldTimeOutlined />,
      label: isVi ? "Chấm công & Lương" : "Time & Payroll",
      children: [
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
        {
          key: "/payroll",
          icon: <DollarCircleOutlined />,
          label: t.common.payroll,
        },
      ],
    },

    // 4. Submenu: Kinh doanh & Bán hàng (Sales & CRM)
    {
      key: "sub-sales",
      icon: <ShopOutlined />,
      label: isVi ? "Kinh doanh & Bán hàng" : "Sales & CRM",
      children: [
        {
          key: "/sales/customers",
          icon: <ContactsOutlined />,
          label: t.common.customers,
        },
        {
          key: "/sales/orders",
          icon: <ShoppingCartOutlined />,
          label: t.common.salesOrders,
        },
        {
          key: "/sales/products",
          icon: <AppstoreOutlined />,
          label: t.common.products,
        },
      ],
    },

    // 5. Submenu: Tài chính & Kế toán
    {
      key: "sub-accounting",
      icon: <AccountBookOutlined />,
      label: isVi ? "Tài chính & Kế toán" : "Finance & Accounting",
      children: [
        {
          key: "/accounting/transactions",
          icon: <AccountBookOutlined />,
          label: t.common.transactions,
        },
        {
          key: "/accounting/invoices",
          icon: <FileDoneOutlined />,
          label: t.common.invoices,
        },
        {
          key: "/accounting/reports",
          icon: <RiseOutlined />,
          label: t.common.financialReports,
        },
      ],
    },

    // 6. Submenu: Hệ thống & Cấu hình
    {
      key: "sub-system",
      icon: <SettingOutlined />,
      label: isVi ? "Hệ thống & Cấu hình" : "System & Settings",
      children: [
        {
          key: "/settings",
          icon: <SettingOutlined />,
          label: t.common.settings,
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
      ],
    },
  ];

  // Prefetch route code on hover for instant navigation
  const enhancedMenuItems = menuItems?.map((item) => {
    if (!item) return item;
    if ("children" in item && Array.isArray(item.children)) {
      return {
        ...item,
        children: item.children.map((child: any) => {
          if (!child || typeof child.key !== "string") return child;
          const targetKey = child.key;
          return {
            ...child,
            onMouseEnter: () => router.prefetch(targetKey),
          };
        }),
      };
    }
    if ("key" in item && typeof item.key === "string") {
      const targetKey = item.key;
      return {
        ...item,
        onMouseEnter: () => router.prefetch(targetKey),
      };
    }
    return item;
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
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20 shrink-0">
          H
        </div>
        {!collapsed && (
          <div className="truncate">
            <h1 className="font-bold text-slate-800 text-base leading-tight">HRM & ERP</h1>
            <p className="text-[11px] text-slate-400">Enterprise Edition</p>
          </div>
        )}
      </div>

      <div className="py-2 overflow-y-auto max-h-[calc(100vh-64px)] scrollbar-thin">
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          openKeys={collapsed ? [] : openKeys}
          onOpenChange={(keys) => setOpenKeys(keys as string[])}
          items={enhancedMenuItems as any}
          onClick={({ key }) => {
            if (key.startsWith("/")) {
              router.push(key);
            }
          }}
          className="!border-r-0 font-medium text-xs sm:text-sm"
        />
      </div>
    </Sider>
  );
}
