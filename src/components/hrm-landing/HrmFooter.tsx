"use client";

import React from "react";
import { TeamOutlined } from "@ant-design/icons";

interface HrmFooterProps {
  isVi: boolean;
  onOpenLogin?: () => void;
}

export function HrmFooter({ isVi }: HrmFooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <TeamOutlined />
            </div>
            <span className="font-bold text-base text-white tracking-tight">
              HRM Portal Enterprise
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">
              {isVi ? "Tính năng" : "Features"}
            </a>
            <a href="#preview" className="hover:text-white transition-colors">
              {isVi ? "Trực quan hóa" : "Interface"}
            </a>
            <a href="#roles" className="hover:text-white transition-colors">
              {isVi ? "Phân quyền" : "Permissions"}
            </a>
            <a href="#security" className="hover:text-white transition-colors">
              {isVi ? "Bảo mật" : "Security"}
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} HRM Enterprise Portal.{" "}
            {isVi ? "Bản quyền thuộc về doanh nghiệp." : "All rights reserved."}
          </div>
          <div className="flex items-center gap-4">
            <span>Next.js 16 • Tailwind CSS v4 • Ant Design 6 • Neon PostgreSQL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

