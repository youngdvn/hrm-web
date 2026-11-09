"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Tag, Dropdown, Avatar } from "antd";
import type { MenuProps } from "antd";
import {
  GlobalOutlined,
  DownOutlined,
  PhoneOutlined,
  LoginOutlined,
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "@/stores/auth.store";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { message } from "@/lib/antd-app";
import { WebPackage } from "./types";
import { LoginModal } from "./LoginModal";

interface LandingHeaderProps {
  isVi: boolean;
  mounted: boolean;
  packages: WebPackage[];
  onOpenConsultation: (pkg?: WebPackage) => void;
  onOpenMobileDrawer: () => void;
  onOpenLogin?: () => void;
}

export function LandingHeader({
  isVi,
  mounted,
  packages,
  onOpenConsultation,
  onOpenMobileDrawer,
  onOpenLogin,
}: LandingHeaderProps) {
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

  // Dropdown menu items for Packages navigation
  const packageDropdownItems: MenuProps["items"] = [
    ...packages.map((pkg) => ({
      key: pkg.id,
      label: (
        <Link
          href={`/packages/${pkg.id}`}
          className="flex items-center justify-between gap-4 py-2 px-1 hover:text-blue-600"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
              {pkg.icon}
            </div>
            <div>
              <div className="font-semibold text-slate-900 text-xs">{pkg.name}</div>
              <div className="text-[11px] text-slate-500">{pkg.priceStr}</div>
            </div>
          </div>
          <Tag color={pkg.badgeColor} className="text-[10px] m-0">
            {pkg.badge}
          </Tag>
        </Link>
      ),
    })),
    { type: "divider" },
    {
      key: "all-packages-link",
      label: (
        <Link
          href="/packages"
          className="text-center block text-xs font-bold text-blue-600 py-1 hover:underline"
        >
          {isVi ? "Xem tất cả các gói & Bảng so sánh →" : "View All Packages & Comparison →"}
        </Link>
      ),
    },
  ];

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
      key: "profile",
      icon: <UserOutlined className="text-slate-600" />,
      label: (
        <span className="text-slate-700 py-0.5">
          {isVi ? "Hồ sơ cá nhân" : "Personal Profile"}
        </span>
      ),
      onClick: () => router.push("/profile"),
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined className="text-rose-500" />,
      danger: true,
      label: (
        <span className="font-medium py-0.5">
          {isVi ? "Đăng xuất" : "Sign Out"}
        </span>
      ),
      onClick: () => {
        logout();
        message.info(isVi ? "Đã đăng xuất tài khoản" : "Logged out successfully");
      },
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <GlobalOutlined className="text-xl" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-slate-900 font-sans">
                WebCraft
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                Agency
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
              {isVi ? "Thiết Kế & Lập Trình Website Doanh Nghiệp" : "Enterprise Web Development Solutions"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Dropdown menu={{ items: packageDropdownItems }} trigger={["hover"]}>
            <a
              href="#pricing"
              className="hover:text-blue-600 transition-colors flex items-center gap-1.5 py-2 px-1"
            >
              <span>{isVi ? "Gói Dịch Vụ" : "Packages"}</span>
              <DownOutlined className="text-[10px] text-slate-400 group-hover:text-blue-600" />
            </a>
          </Dropdown>

          {/* <a href="#comparison" className="hover:text-blue-600 transition-colors py-2 px-1">
            {isVi ? "Bảng So Sánh" : "Comparison"}
          </a> */}
          {/* <a href="#features" className="hover:text-blue-600 transition-colors py-2 px-1">
            {isVi ? "Ưu Điểm" : "Advantages"}
          </a> */}
          <a href="#workflow" className="hover:text-blue-600 transition-colors py-2 px-1">
            {isVi ? "Quy Trình 5 Bước" : "Workflow"}
          </a>
          <a href="#portfolio" className="hover:text-blue-600 transition-colors py-2 px-1">
            {isVi ? "Dự Án Mẫu" : "Portfolio"}
          </a>
          <a href="#faq" className="hover:text-blue-600 transition-colors py-2 px-1">
            {isVi ? "Hỏi Đáp" : "FAQ"}
          </a>
        </nav>

        {/* Action Area & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex">
            <LanguageSwitcher />
          </div>

          {/* <Button
            type="text"
            onClick={() => onOpenConsultation()}
            className="hidden md:inline-flex items-center text-slate-700 hover:text-blue-600 font-medium text-xs border border-slate-200 hover:border-blue-400 rounded-lg px-3 h-9"
          >
            <PhoneOutlined className="mr-1 text-blue-500" />
            {isVi ? "Tư Vấn Nhanh" : "Fast Quote"}
          </Button> */}

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
          )
            : (
              <Button
                type="primary"
                onClick={() => {
                  if (onOpenLogin) {
                    onOpenLogin();
                  } else {
                    setInternalLoginOpen(true);
                  }
                }}
                icon={<LoginOutlined />}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 border-none font-medium h-9 px-4 rounded-lg shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 text-xs sm:text-sm"
              >
                {isVi ? "Đăng Nhập" : "Sign In"}
              </Button>
            )
          }

          {/* Mobile Menu Hamburger Toggle */}
          <Button
            type="text"
            icon={<MenuOutlined className="text-lg" />}
            onClick={onOpenMobileDrawer}
            className="!flex md:!hidden items-center justify-center w-9 h-9 text-slate-700 hover:text-blue-600"
          />
        </div>

        {/* Internal Login Modal on Header */}
        <LoginModal
          open={internalLoginOpen}
          onClose={() => setInternalLoginOpen(false)}
          isVi={isVi}
        />
      </div>
    </header>
  );
}

