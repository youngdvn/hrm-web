"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Drawer, Button, Tag, Avatar } from "antd";
import {
  GlobalOutlined,
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "@/stores/auth.store";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { message } from "@/lib/antd-app";

interface LandingMobileDrawerProps {
  open: boolean;
  onClose: () => void;
  isVi: boolean;
  mounted: boolean;
  onOpenConsultation: () => void;
  onOpenLogin?: () => void;
}

export function LandingMobileDrawer({
  open,
  onClose,
  isVi,
  mounted,
  onOpenConsultation,
  onOpenLogin,
}: LandingMobileDrawerProps) {
  const router = useRouter();
  const { isAuthenticated, user, logout, hasRole } = useAuthStore();

  const primaryRole = user?.roles?.[0] || "EMPLOYEE";
  const canAccessAdmin = hasRole(["ADMIN", "HR", "MANAGER", "ACCOUNTANT", "SALES"]);

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

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
            <GlobalOutlined />
          </div>
          <span className="font-bold text-slate-900">WebCraft Enterprise</span>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={300}
    >
      <div className="flex flex-col justify-between h-full space-y-6">
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            {isVi ? "ĐIỀU HƯỚNG NHANH" : "NAVIGATION"}
          </div>
          <nav className="flex flex-col space-y-2 text-sm font-medium">
            <Link
              href="/packages"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-800 hover:text-blue-600 flex items-center justify-between"
            >
              <span>{isVi ? "Tất Cả Gói Dịch Vụ" : "All Service Packages"}</span>
              <Tag color="blue" className="text-[10px] m-0">4 Gói</Tag>
            </Link>
            <a
              href="/#pricing"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-800 hover:text-blue-600"
            >
              {isVi ? "Bảng Giá Nhanh" : "Quick Pricing"}
            </a>
            <a
              href="/#comparison"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-800 hover:text-blue-600"
            >
              {isVi ? "Bảng So Sánh Quyền Lợi" : "Feature Comparison"}
            </a>
            <a
              href="/#features"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-800 hover:text-blue-600"
            >
              {isVi ? "Ưu Điểm & Tiêu Chuẩn" : "Technical Standards"}
            </a>
            <a
              href="/#workflow"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-800 hover:text-blue-600"
            >
              {isVi ? "Quy Trình 5 Bước" : "5-Step Workflow"}
            </a>
            <a
              href="/#portfolio"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-800 hover:text-blue-600"
            >
              {isVi ? "Dự Án Đã Làm Mẫu" : "Portfolio Showcase"}
            </a>
            <a
              href="/#faq"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-800 hover:text-blue-600"
            >
              {isVi ? "Hỏi Đáp Thường Gặp" : "FAQ & Guarantees"}
            </a>
          </nav>

          <div className="pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500 mb-2 font-medium">
              {isVi ? "Ngôn ngữ:" : "Language:"}
            </div>
            <LanguageSwitcher />
          </div>
        </div>

        {mounted && isAuthenticated && user ? (
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center gap-3">
                <Avatar
                  size={38}
                  className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold"
                >
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : <UserOutlined />}
                </Avatar>
                <div className="overflow-hidden">
                  <div className="font-semibold text-slate-900 text-sm truncate">{user.fullName}</div>
                  <div className="text-xs text-slate-500 truncate">{user.email}</div>
                  <div className="mt-1">
                    <Tag color={roleColorMap[primaryRole] || "default"} className="text-[10px] m-0">
                      {isVi ? roleLabelMapVi[primaryRole] || primaryRole : roleLabelMapEn[primaryRole] || primaryRole}
                    </Tag>
                  </div>
                </div>
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
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-10 rounded-xl font-semibold shadow-md shadow-blue-500/20"
              >
                {isVi ? "Vào Trang Quản Trị" : "Admin Dashboard"}
              </Button>
            )}

            <Button
              block
              icon={<UserOutlined />}
              onClick={() => {
                onClose();
                router.push("/profile");
              }}
              className="h-10 rounded-xl text-slate-700"
            >
              {isVi ? "Hồ Sơ Cá Nhân" : "Personal Profile"}
            </Button>

            <Button
              danger
              block
              icon={<LogoutOutlined />}
              onClick={() => {
                onClose();
                logout();
                message.info(isVi ? "Đã đăng xuất" : "Logged out");
              }}
              className="h-10 rounded-xl"
            >
              {isVi ? "Đăng Xuất" : "Sign Out"}
            </Button>
          </div>
        ) : (
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <Button
              type="primary"
              block
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="bg-blue-600 font-semibold h-10 rounded-xl"
            >
              {isVi ? "Đăng Ký Tư Vấn Ngay" : "Request Free Quote"}
            </Button>
            <Button
              block
              icon={<LoginOutlined />}
              onClick={() => {
                onClose();
                if (onOpenLogin) {
                  onOpenLogin();
                } else {
                  router.push("/login?redirect=/");
                }
              }}
              className="h-10 rounded-xl font-medium"
            >
              {isVi ? "Đăng Nhập Tài Khoản" : "Sign In"}
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  );
}

