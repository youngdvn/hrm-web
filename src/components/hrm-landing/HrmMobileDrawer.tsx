"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Drawer, Button, Tag, Divider, Avatar } from "antd";
import {
  TeamOutlined,
  RocketOutlined,
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "@/stores/auth.store";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { message } from "@/lib/antd-app";

interface HrmMobileDrawerProps {
  open: boolean;
  onClose: () => void;
  isVi: boolean;
  mounted: boolean;
  onOpenDemo: () => void;
  onOpenLogin: () => void;
}

export function HrmMobileDrawer({
  open,
  onClose,
  isVi,
  mounted,
  onOpenDemo,
  onOpenLogin,
}: HrmMobileDrawerProps) {
  const router = useRouter();
  const { isAuthenticated, user, logout, hasRole } = useAuthStore();

  const primaryRole = user?.roles?.[0] || "EMPLOYEE";
  const canAccessAdmin = hasRole(["ADMIN", "HR", "MANAGER", "ACCOUNTANT", "SALES"]);
  const isAdmin = hasRole(["ADMIN"]);

  const navLinks = [
    { href: "#features", label: isVi ? "Tính Năng Cốt Lõi" : "Core Features" },
    { href: "#preview", label: isVi ? "Giao Diện Hệ Thống" : "Interface Preview" },
    { href: "#metrics", label: isVi ? "Hiệu Quả Vận Hành" : "Operational Impact" },
    { href: "#roles", label: isVi ? "Trải Nghiệm Phân Vai" : "Role Experiences" },
    { href: "#workflow", label: isVi ? "Quy Trình 3 Bước" : "3-Step Setup" },
    { href: "#security", label: isVi ? "An Toàn & Bảo Mật" : "Security & Audit" },
  ];

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
            <TeamOutlined />
          </div>
          <span className="font-bold text-slate-900">HRM Portal Enterprise</span>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={320}
    >
      <div className="flex flex-col h-full justify-between pb-4">
        <div className="space-y-4">
          {/* User profile card in drawer if logged in */}
          {mounted && isAuthenticated && user ? (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <Avatar
                  size={36}
                  className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-semibold text-sm"
                >
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : <UserOutlined />}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-800 text-sm truncate">
                    {user.fullName}
                  </div>
                  <div className="text-xs text-slate-400 truncate">{user.email}</div>
                  <Tag color="blue" className="text-[10px] m-0 mt-1">
                    {primaryRole}
                  </Tag>
                </div>
              </div>

              {canAccessAdmin && (
                <Button
                  type="primary"
                  block
                  icon={<DashboardOutlined />}
                  onClick={() => {
                    onClose();
                    router.push("/dashboard");
                  }}
                  className="mt-3 bg-blue-600 text-xs font-medium h-8"
                >
                  {isVi ? "Vào trang quản trị" : "Admin Dashboard"}
                </Button>
              )}

              {isAdmin && (
                <Button
                  block
                  icon={<SettingOutlined />}
                  onClick={() => {
                    onClose();
                    router.push("/settings");
                  }}
                  className="mt-2 text-xs font-medium h-8"
                >
                  {isVi ? "Cấu hình hệ thống" : "System Settings"}
                </Button>
              )}
            </div>
          ) : null}

          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
              {isVi ? "Điều hướng" : "Navigation"}
            </div>
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block py-2.5 px-3 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-blue-600 font-medium text-sm transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <Divider className="my-3" />

          {/* Demo Button */}
          <Button
            block
            icon={<RocketOutlined className="text-blue-500" />}
            onClick={() => {
              onClose();
              onOpenDemo();
            }}
            className="h-10 text-slate-700 font-medium text-xs border-slate-200"
          >
            {isVi ? "Xem Danh Sách Tài Khoản Demo" : "View Demo Credentials"}
          </Button>

          {/* Language Switcher */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg">
            <span className="text-xs text-slate-500 font-medium">
              {isVi ? "Ngôn ngữ" : "Language"}
            </span>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Footer in Drawer: Logout if authenticated */}
        {mounted && isAuthenticated && (
          <div className="pt-4 border-t border-slate-100">
            <Button
              danger
              block
              icon={<LogoutOutlined />}
              onClick={() => {
                logout();
                onClose();
                message.success(isVi ? "Đã đăng xuất" : "Signed out");
              }}
              className="h-10 text-xs font-semibold"
            >
              {isVi ? "Đăng Xuất" : "Sign Out"}
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  );
}

