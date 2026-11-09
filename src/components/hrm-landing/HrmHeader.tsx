"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Tag, Dropdown, Avatar } from "antd";
import type { MenuProps } from "antd";
import {
  TeamOutlined,
  RocketOutlined,
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useAuthStore } from "@/stores/auth.store";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { message } from "@/lib/antd-app";
import { LoginModal } from "@/components/landing/LoginModal";

interface HrmHeaderProps {
  isVi: boolean;
  mounted: boolean;
  onOpenDemo: () => void;
  onOpenMobileDrawer: () => void;
  onOpenLogin?: () => void;
}

export function HrmHeader({
  isVi,
  mounted,
  onOpenDemo,
  onOpenMobileDrawer,
  onOpenLogin,
}: HrmHeaderProps) {
  const router = useRouter();
  const { isAuthenticated, user, logout, hasRole } = useAuthStore();
  const [internalLoginOpen, setInternalLoginOpen] = useState(false);

  const primaryRole = user?.roles?.[0] || "EMPLOYEE";
  const canAccessAdmin = hasRole(["ADMIN", "HR", "MANAGER", "ACCOUNTANT", "SALES"]);
  const isAdmin = hasRole(["ADMIN"]);

  const roleColorMap: Record<string, string> = {
    ADMIN: "red",
    HR: "blue",
    MANAGER: "green",
    ACCOUNTANT: "gold",
    SALES: "cyan",
    EMPLOYEE: "purple",
  };

  const roleLabelMapVi: Record<string, string> = {
    ADMIN: "Quản trị viên",
    HR: "Quản lý Nhân sự",
    MANAGER: "Quản lý phòng ban",
    ACCOUNTANT: "Kế toán viên",
    SALES: "Kinh doanh / CRM",
    EMPLOYEE: "Nhân viên",
  };

  const roleLabelMapEn: Record<string, string> = {
    ADMIN: "Administrator",
    HR: "HR Manager",
    MANAGER: "Department Manager",
    ACCOUNTANT: "Accountant",
    SALES: "Sales Representative",
    EMPLOYEE: "Employee",
  };

  const userProfileMenuItems: MenuProps["items"] = [
    {
      key: "user-card",
      disabled: true,
      label: (
        <div className="py-1 px-1 min-w-[210px]">
          <div className="font-semibold text-slate-900 text-sm">{user?.fullName || "Người dùng"}</div>
          <div className="text-xs text-slate-400 truncate mb-1.5">{user?.email || ""}</div>
          <Tag color={roleColorMap[primaryRole] || "default"} className="text-[11px] font-medium m-0">
            {isVi ? roleLabelMapVi[primaryRole] || primaryRole : roleLabelMapEn[primaryRole] || primaryRole}
          </Tag>
        </div>
      ),
    },
    { type: "divider" },
    ...(canAccessAdmin
      ? [
          {
            key: "admin-entry",
            icon: <DashboardOutlined className="text-blue-600" />,
            label: (
              <div className="flex items-center justify-between gap-3 font-semibold text-blue-600 py-0.5">
                <span>{isVi ? "Vào trang quản trị" : "Admin Dashboard"}</span>
                <Tag color="blue" className="text-[10px] m-0 font-normal">
                  {isAdmin ? "Admin" : "Portal"}
                </Tag>
              </div>
            ),
            onClick: () => router.push("/dashboard"),
          },
          ...(isAdmin
            ? [
                {
                  key: "admin-settings",
                  icon: <SettingOutlined className="text-slate-600" />,
                  label: (
                    <span className="text-slate-700 py-0.5">
                      {isVi ? "Cấu hình hệ thống" : "System Settings"}
                    </span>
                  ),
                  onClick: () => router.push("/settings"),
                },
              ]
            : []),
          { type: "divider" as const },
        ]
      : []),
    {
      key: "user-profile",
      icon: <UserOutlined className="text-slate-600" />,
      label: <span className="text-slate-700 py-0.5">{isVi ? "Hồ sơ của tôi" : "My Profile"}</span>,
      onClick: () => router.push("/profile"),
    },
    { type: "divider" },
    {
      key: "logout-entry",
      icon: <LogoutOutlined className="text-rose-600" />,
      label: (
        <span className="text-rose-600 font-medium py-0.5">
          {isVi ? "Đăng xuất" : "Sign Out"}
        </span>
      ),
      onClick: () => {
        logout();
        message.success(isVi ? "Đã đăng xuất thành công" : "Successfully signed out");
      },
    },
  ];

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <TeamOutlined className="text-xl" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-slate-900 font-sans">
                HRM Portal
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                Enterprise
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              {isVi ? "Hệ thống Quản trị Nhân sự Số" : "Workforce Management Platform"}
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition-colors py-2">
            {isVi ? "Tính năng" : "Features"}
          </a>
          <a href="#preview" className="hover:text-blue-600 transition-colors py-2">
            {isVi ? "Giao diện" : "Interface"}
          </a>
          <a href="#metrics" className="hover:text-blue-600 transition-colors py-2">
            {isVi ? "Hiệu quả" : "Impact"}
          </a>
          <a href="#roles" className="hover:text-blue-600 transition-colors py-2">
            {isVi ? "Phân quyền" : "Roles"}
          </a>
          <a href="#workflow" className="hover:text-blue-600 transition-colors py-2">
            {isVi ? "Quy trình" : "Workflow"}
          </a>
          <a href="#security" className="hover:text-blue-600 transition-colors py-2">
            {isVi ? "Bảo mật" : "Security"}
          </a>
        </nav>

        {/* Action Area */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:inline-flex">
            <LanguageSwitcher />
          </div>

          <Button
            type="text"
            onClick={onOpenDemo}
            className="hidden md:inline-flex items-center text-slate-600 hover:text-blue-600 font-medium text-xs border border-slate-200 hover:border-blue-400 rounded-lg px-2.5 h-9"
          >
            <RocketOutlined className="mr-1 text-blue-500" />
            {isVi ? "Tài khoản Demo" : "Demo Accounts"}
          </Button>

          {mounted && isAuthenticated && user ? (
            <Dropdown
              menu={{ items: userProfileMenuItems }}
              trigger={["click", "hover"]}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
            >
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group">
                <Avatar
                  size={28}
                  className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-semibold text-xs flex items-center justify-center shadow-xs"
                >
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : <UserOutlined />}
                </Avatar>
                <div className="hidden md:flex flex-col text-left leading-tight pr-1">
                  <span className="text-xs font-semibold text-slate-800 max-w-[110px] truncate">
                    {user.fullName}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate">
                    {isVi ? roleLabelMapVi[primaryRole] || primaryRole : roleLabelMapEn[primaryRole] || primaryRole}
                  </span>
                </div>
                <DownOutlined className="text-[10px] text-slate-400 group-hover:text-blue-600 ml-0.5 transition-transform" />
              </div>
            </Dropdown>
          ) : null}

          {/* Mobile Menu Hamburger Toggle */}
          <Button
            type="text"
            icon={<MenuOutlined className="text-lg" />}
            onClick={onOpenMobileDrawer}
            className="!flex lg:!hidden items-center justify-center w-9 h-9 text-slate-700 hover:text-blue-600"
          />
        </div>

        {/* Internal Login Modal on Header */}
        <LoginModal
          open={internalLoginOpen}
          onClose={() => setInternalLoginOpen(false)}
          isVi={isVi}
        />
      </div>
    </motion.header>
  );
}

