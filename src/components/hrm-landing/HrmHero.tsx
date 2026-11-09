"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Tag } from "antd";
import {
  RocketOutlined,
  DashboardOutlined,
  LockOutlined,
  CheckOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { message } from "@/lib/antd-app";

interface HrmHeroProps {
  isVi: boolean;
  mounted: boolean;
  isAuthenticated: boolean;
  onOpenDemo: () => void;
  onOpenLogin: () => void;
}

export function HrmHero({
  isVi,
  mounted,
  isAuthenticated,
  onOpenDemo,
  onOpenLogin,
}: HrmHeroProps) {
  const router = useRouter();
  const [approvedRequests, setApprovedRequests] = useState<Record<string, "approved" | "rejected">>({});

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setApprovedRequests((prev) => ({ ...prev, [id]: action }));
    if (action === "approved") {
      message.success(isVi ? "Đã phê duyệt thành công đơn yêu cầu!" : "Request successfully approved!");
    } else {
      message.info(isVi ? "Đã từ chối đơn yêu cầu." : "Request rejected.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* Animated glow backdrop decorative elements */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-200/40 via-indigo-200/30 to-sky-200/40 blur-3xl -z-10 pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
        }}
        className="absolute -top-10 right-10 w-72 h-72 bg-blue-300/20 rounded-full blur-2xl -z-10 pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Announcement Tag */}
        <motion.div variants={itemVariants} className="inline-block">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-medium mb-6 shadow-xs hover:border-blue-400 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>
              {isVi
                ? "✨ HRM Enterprise v2.5 • Chuẩn hóa số hóa nhân sự theo tiêu chuẩn 4.0"
                : "✨ HRM Enterprise v2.5 • Next-Gen Digital Workforce Architecture"}
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight sm:leading-tight"
        >
          {isVi ? (
            <>
              Tối Ưu Hóa Nhân Lực. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Nâng Tầm Năng Suất Doanh Nghiệp.
              </span>
            </>
          ) : (
            <>
              Optimize Your Workforce. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Elevate Enterprise Productivity.
              </span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
        >
          {isVi
            ? "Hệ sinh thái chuyển đổi số quản trị nhân sự toàn diện: từ chấm công GPS thời gian thực, phê duyệt nghỉ phép 1-chạm, tự động hóa tính lương đa quy chế đến 7 mô hình phân tích số liệu nhân sự chuyên sâu."
            : "An all-in-one cloud platform empowering modern enterprises with real-time GPS attendance, 1-click approvals, automated multi-tier payroll, and deep workforce intelligence."}
        </motion.p>

        {/* Hero CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          {mounted && isAuthenticated ? (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="primary"
                size="large"
                onClick={() => router.push("/dashboard")}
                icon={<DashboardOutlined />}
                className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border-none font-semibold text-base shadow-lg shadow-blue-500/30"
              >
                {isVi ? "Truy Cập Bảng Điều Khiển" : "Access Your Dashboard"}
                <ArrowRightOutlined className="ml-2" />
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="primary"
                  size="large"
                  onClick={onOpenLogin}
                  icon={<RocketOutlined />}
                  className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border-none font-semibold text-base shadow-lg shadow-blue-500/30"
                >
                  {isVi ? "Trải Nghiệm Hệ Thống Ngay" : "Launch System Demo"}
                  <ArrowRightOutlined className="ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="large"
                  onClick={onOpenDemo}
                  className="w-full sm:w-auto h-12 px-6 rounded-xl border-slate-300 font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-500 bg-white shadow-xs"
                >
                  <LockOutlined className="mr-1 text-slate-400" />
                  {isVi ? "Xem Danh Sách Tài Khoản Demo" : "View Demo Credentials"}
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Trust points */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-slate-500 font-medium"
        >
          <span className="inline-flex items-center gap-1.5">
            <CheckOutlined className="text-emerald-500 font-bold" />
            {isVi ? "Chấm công GPS chuẩn xác 100%" : "100% Precise GPS Geofence"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckOutlined className="text-emerald-500 font-bold" />
            {isVi ? "Tự động tính lương & xuất Excel UTF-8" : "Automated Payroll & UTF-8 Excel"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckOutlined className="text-emerald-500 font-bold" />
            {isVi ? "Phân quyền RBAC 4 vai trò an toàn" : "4-Tier RBAC & Audit Trail"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckOutlined className="text-emerald-500 font-bold" />
            {isVi ? "Cảnh báo hạn hợp đồng tự động" : "Smart Contract Renewal Alerts"}
          </span>
        </motion.div>

        {/* Interactive Mockup Container */}
        <motion.div
          id="preview"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          className="mt-14 max-w-5xl mx-auto rounded-2xl border border-slate-200/80 bg-white p-2 sm:p-3 shadow-2xl shadow-slate-300/40 text-left"
        >
          {/* Window title bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 bg-slate-50/70 rounded-t-xl mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                https://hrm-portal.enterprise/dashboard
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Tag color="green" className="text-[10px] m-0 font-medium">
                ● Live Data Connected
              </Tag>
            </div>
          </div>

          {/* Mock Dashboard Body */}
          <div className="p-3 sm:p-5 bg-slate-50/60 rounded-b-xl space-y-4">
            {/* Stat Cards row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs cursor-default"
              >
                <div className="text-xs text-slate-500 font-medium">
                  {isVi ? "Tổng nhân viên" : "Total Employees"}
                </div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">36</div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1">
                  ↑ +8% {isVi ? "tháng này" : "this month"}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs cursor-default"
              >
                <div className="text-xs text-slate-500 font-medium">
                  {isVi ? "Tỷ lệ đúng giờ" : "On-Time Rate"}
                </div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">98.2%</div>
                <div className="text-[11px] text-slate-500 font-medium mt-1">
                  {isVi ? "35/36 Đã check-in" : "35/36 Checked-in"}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs cursor-default"
              >
                <div className="text-xs text-slate-500 font-medium">
                  {isVi ? "Đơn chờ duyệt" : "Pending Requests"}
                </div>
                <div className="text-xl sm:text-2xl font-bold text-amber-600 mt-1">6</div>
                <div className="text-[11px] text-amber-600 font-medium mt-1">
                  ⚡ {isVi ? "Cần xử lý gấp" : "Needs review"}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs cursor-default"
              >
                <div className="text-xs text-slate-500 font-medium">
                  {isVi ? "Kỳ lương hiện tại" : "Current Payroll"}
                </div>
                <div className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">485.5M ₫</div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1">
                  ✓ {isVi ? "100% Đã quyết toán" : "100% Settled"}
                </div>
              </motion.div>
            </div>

            {/* Main Preview Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {/* Visual Chart Mock */}
              <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                    <BarChartOutlined className="text-blue-500" />
                    {isVi ? "Xu Hướng Chuyên Cần 7 Ngày Qua" : "7-Day Attendance Trend"}
                  </span>
                  <Tag color="blue" className="text-[10px] m-0">
                    Real-time
                  </Tag>
                </div>
                {/* CSS Simulated Bar Chart with Framer Motion growth */}
                <div className="h-36 sm:h-44 flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-100">
                  {[
                    { day: "T2", onTime: 95, late: 5 },
                    { day: "T3", onTime: 98, late: 2 },
                    { day: "T4", onTime: 92, late: 8 },
                    { day: "T5", onTime: 100, late: 0 },
                    { day: "T6", onTime: 97, late: 3 },
                    { day: "T7", onTime: 85, late: 15 },
                    { day: "CN", onTime: 40, late: 5 },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full max-w-[28px] flex flex-col gap-0.5 justify-end h-full">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${bar.late * 1.5}%` }}
                          transition={{ duration: 0.7, delay: 0.5 + i * 0.05, ease: "easeOut" }}
                          className="w-full bg-amber-400 rounded-t-xs"
                        />
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${bar.onTime * 0.8}%` }}
                          transition={{ duration: 0.7, delay: 0.55 + i * 0.05, ease: "easeOut" }}
                          className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-xs"
                        />
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 mt-1">{bar.day}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                    {isVi ? "Đúng giờ (On-time)" : "On-time"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    {isVi ? "Đi trễ (Late)" : "Late / Tardiness"}
                  </span>
                </div>
              </div>

              {/* Quick Approval Widget Mock */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                      <CheckCircleOutlined className="text-emerald-500" />
                      {isVi ? "Phê Duyệt Nhanh" : "Quick Approvals"}
                    </span>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      6 chờ
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Item 1 */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                    >
                      <div className="flex justify-between font-semibold text-slate-800">
                        <span>Lê Thị Mai (Kế toán)</span>
                        <span className="text-amber-600 font-normal">Nghỉ phép</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">2 ngày • Lý do cá nhân</div>
                      <div className="flex gap-1.5 mt-2">
                        <AnimatePresence mode="wait">
                          {approvedRequests["req-1"] ? (
                            <motion.div
                              key="status-1"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="w-full text-center py-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 rounded"
                            >
                              {approvedRequests["req-1"] === "approved"
                                ? isVi
                                  ? "✓ Đã duyệt"
                                  : "✓ Approved"
                                : isVi
                                ? "✕ Đã từ chối"
                                : "✕ Rejected"}
                            </motion.div>
                          ) : (
                            <motion.div
                              key="buttons-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex gap-1.5 w-full"
                            >
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAction("req-1", "approved")}
                                className="flex-1 py-1 rounded bg-emerald-600 text-white text-[10px] font-medium hover:bg-emerald-700 transition-colors"
                              >
                                ✓ {isVi ? "Duyệt" : "Approve"}
                              </motion.button>
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAction("req-1", "rejected")}
                                className="flex-1 py-1 rounded bg-slate-200 text-slate-700 text-[10px] font-medium hover:bg-slate-300 transition-colors"
                              >
                                ✕ {isVi ? "Từ chối" : "Reject"}
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* Item 2 */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                    >
                      <div className="flex justify-between font-semibold text-slate-800">
                        <span>Trần Văn Hùng (Kỹ thuật)</span>
                        <span className="text-blue-600 font-normal">Làm ngoài giờ</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">3.5 giờ OT • Triển khai server</div>
                      <div className="flex gap-1.5 mt-2">
                        <AnimatePresence mode="wait">
                          {approvedRequests["req-2"] ? (
                            <motion.div
                              key="status-2"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="w-full text-center py-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 rounded"
                            >
                              {approvedRequests["req-2"] === "approved"
                                ? isVi
                                  ? "✓ Đã duyệt"
                                  : "✓ Approved"
                                : isVi
                                ? "✕ Đã từ chối"
                                : "✕ Rejected"}
                            </motion.div>
                          ) : (
                            <motion.div
                              key="buttons-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex gap-1.5 w-full"
                            >
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAction("req-2", "approved")}
                                className="flex-1 py-1 rounded bg-emerald-600 text-white text-[10px] font-medium hover:bg-emerald-700 transition-colors"
                              >
                                ✓ {isVi ? "Duyệt" : "Approve"}
                              </motion.button>
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAction("req-2", "rejected")}
                                className="flex-1 py-1 rounded bg-slate-200 text-slate-700 text-[10px] font-medium hover:bg-slate-300 transition-colors"
                              >
                                ✕ {isVi ? "Từ chối" : "Reject"}
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span
                    onClick={() => {
                      if (isAuthenticated) {
                        router.push("/leaves");
                      } else {
                        onOpenLogin();
                      }
                    }}
                    className="text-[11px] text-blue-600 font-medium cursor-pointer hover:underline"
                  >
                    {isVi ? "Xem tất cả 6 đơn chờ xử lý →" : "View all 6 pending requests →"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

