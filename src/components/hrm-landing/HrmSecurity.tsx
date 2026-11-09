"use client";

import React from "react";
import { Button } from "antd";
import {
  SecurityScanOutlined,
  CheckOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

interface HrmSecurityProps {
  isVi: boolean;
  onOpenLogin: () => void;
  onOpenDemo: () => void;
}

export function HrmSecurity({ isVi, onOpenLogin, onOpenDemo }: HrmSecurityProps) {
  return (
    <section id="security" className="py-16 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-4">
              <SecurityScanOutlined />
              <span>
                {isVi ? "An Toàn & Bảo Mật Chuẩn Doanh Nghiệp" : "Enterprise-Grade Security Standards"}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {isVi
                ? "Bảo Vệ Dữ Liệu Nhân Sự & Nhật Ký Kiểm Toán Toàn Vẹn"
                : "Immutable Audit Trails & Strict Data Protection"}
            </h3>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              {isVi
                ? "Mọi hành động nhạy cảm (cập nhật bảng lương, sửa đổi hợp đồng, cấp quyền tài khoản) đều được hệ thống ghi nhận vết (Audit Logs) kèm địa chỉ IP và dấu thời gian, ngăn ngừa rủi ro thất thoát dữ liệu."
                : "Every critical modification is permanently timestamped in the Audit Log alongside client IP addresses, before-and-after snapshots, ensuring zero undetected tampering."}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <CheckOutlined className="text-emerald-400" /> JWT Authentication & Refresh Tokens
              </span>
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <CheckOutlined className="text-emerald-400" /> PostgreSQL Neon Cloud Isolation
              </span>
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <CheckOutlined className="text-emerald-400" /> Password Hashing (Argon2 / BCrypt)
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="primary"
                size="large"
                onClick={onOpenLogin}
                icon={<ArrowRightOutlined />}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 font-semibold h-12 px-8 rounded-xl shadow-lg shadow-blue-500/40"
              >
                {isVi ? "Khám Phá Hệ Thống" : "Explore Platform"}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="large"
                onClick={onOpenDemo}
                className="w-full sm:w-auto border-slate-700 bg-slate-800/80 text-slate-200 hover:text-white hover:border-slate-500 font-medium h-12 px-6 rounded-xl"
              >
                {isVi ? "Danh Sách Tài Khoản Thử" : "Demo Accounts"}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

