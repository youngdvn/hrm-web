"use client";

import React from "react";
import Link from "next/link";
import { GlobalOutlined } from "@ant-design/icons";

interface LandingFooterProps {
  isVi: boolean;
}

export function LandingFooter({ isVi }: LandingFooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <GlobalOutlined />
            </div>
            <span className="font-bold text-base text-white tracking-tight">
              WebCraft Enterprise Solutions
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <Link href="/packages" className="hover:text-white transition-colors">
              {isVi ? "Bảng giá" : "Pricing"}
            </Link>
            <Link href="/#comparison" className="hover:text-white transition-colors">
              {isVi ? "So sánh" : "Comparison"}
            </Link>
            <Link href="/#features" className="hover:text-white transition-colors">
              {isVi ? "Tính năng" : "Features"}
            </Link>
            <Link href="/#workflow" className="hover:text-white transition-colors">
              {isVi ? "Quy trình" : "Workflow"}
            </Link>
            <Link href="/#faq" className="hover:text-white transition-colors">
              {isVi ? "Hỏi đáp" : "FAQ"}
            </Link>
            <Link
              href="/login?redirect=/"
              className="hover:text-white transition-colors text-slate-400 hover:text-blue-400 font-medium"
            >
              {isVi ? "Đăng nhập tài khoản" : "Account Login"}
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} WebCraft Enterprise Agency & Software Solutions.{" "}
            {isVi ? "Bảo lưu mọi quyền." : "All rights reserved."}
          </div>
          <div>
            <span>Next.js 16 • Tailwind CSS v4 • Ant Design 6 • Full-Stack Cloud Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

