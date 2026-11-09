"use client";

import React from "react";
import { motion } from "framer-motion";

interface HrmMetricsProps {
  isVi: boolean;
}

export function HrmMetrics({ isVi }: HrmMetricsProps) {
  const metrics = [
    {
      stat: "36+",
      label: isVi ? "Nhân Sự Chính Thức" : "Active Personnel",
      desc: isVi ? "Mở rộng không giới hạn quy mô doanh nghiệp" : "Scalable to unlimited enterprise scale",
      gradient: "from-blue-400 to-indigo-300",
    },
    {
      stat: "7",
      label: isVi ? "Khối Phòng Ban Liên Kết" : "Interconnected Departments",
      desc: isVi ? "Kỹ thuật, Kinh doanh, Nhân sự, Tài chính..." : "Engineering, Sales, HR, Finance...",
      gradient: "from-emerald-400 to-teal-300",
    },
    {
      stat: "99.8%",
      label: isVi ? "Chính Xác Chấm Công GPS" : "GPS Punch Accuracy",
      desc: isVi ? "Giảm 100% tình trạng chấm công hộ gian lận" : "Zero buddy-punching via real geofence",
      gradient: "from-sky-400 to-cyan-300",
    },
    {
      stat: "75%",
      label: isVi ? "Tiết Kiệm Thời Gian Hành Chính" : "Admin Time Saved",
      desc: isVi ? "Tự động chốt bảng lương & phê duyệt đơn từ" : "Automated payroll & paperless workflows",
      gradient: "from-amber-400 to-orange-300",
    },
  ];

  return (
    <section id="metrics" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {isVi
              ? "Nền Tảng Được Thiết Kế Cho Năng Suất & Độ Chính Xác Tuyệt Đối"
              : "Engineered for Enterprise Reliability & Operational Precision"}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {isVi
              ? "Dữ liệu được chuẩn hóa, loại bỏ hoàn toàn sai sót thủ công và giảm tải 75% thời gian quản lý cho ban nhân sự."
              : "Eliminate manual errors and slash operational latency by up to 75% with automated business rules."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{
                y: -6,
                scale: 1.02,
                borderColor: "rgba(96, 165, 250, 0.6)",
                transition: { duration: 0.2 },
              }}
              className="bg-slate-800/80 border border-slate-700/80 p-6 rounded-2xl backdrop-blur-xs text-center transition-colors shadow-lg cursor-default"
            >
              <div
                className={`text-4xl sm:text-5xl font-black text-transparent bg-gradient-to-r ${m.gradient} bg-clip-text`}
              >
                {m.stat}
              </div>
              <div className="mt-2 text-base font-semibold text-slate-200">{m.label}</div>
              <div className="mt-1 text-xs text-slate-400">{m.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

