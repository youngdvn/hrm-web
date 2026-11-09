"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

interface HrmCtaProps {
  isVi: boolean;
  mounted: boolean;
  isAuthenticated: boolean;
  onOpenDemo: () => void;
  onOpenLogin: () => void;
}

export function HrmCta({
  isVi,
  mounted,
  isAuthenticated,
  onOpenDemo,
  onOpenLogin,
}: HrmCtaProps) {
  const router = useRouter();

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white text-2xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/25 mb-6"
        >
          <ThunderboltOutlined />
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          {isVi
            ? "Sẵn Sàng Chuyển Đổi Số Nhân Sự Cho Doanh Nghiệp?"
            : "Ready To Transform Your People Operations Today?"}
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          {isVi
            ? "Bắt đầu trải nghiệm ngay hệ thống quản trị nhân lực thông minh, chính xác và trực quan nhất."
            : "Experience the ultimate combination of speed, clarity, and automation for your workforce."}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                if (mounted && isAuthenticated) {
                  router.push("/dashboard");
                } else {
                  onOpenLogin();
                }
              }}
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border-none font-bold text-base shadow-lg shadow-blue-500/30"
            >
              {mounted && isAuthenticated
                ? isVi
                  ? "Vào Dashboard Ngay →"
                  : "Enter Dashboard Now →"
                : isVi
                ? "Bắt Đầu Trải Nghiệm Miễn Phí"
                : "Start Free Trial"}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="large"
              onClick={onOpenDemo}
              className="w-full sm:w-auto h-12 px-6 rounded-xl border-slate-300 font-semibold text-slate-700 hover:text-blue-600 bg-white"
            >
              {isVi ? "Xem Tài Khoản Demo" : "View Demo Accounts"}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

