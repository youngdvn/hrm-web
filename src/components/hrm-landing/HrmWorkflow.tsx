"use client";

import React from "react";
import { motion } from "framer-motion";

interface HrmWorkflowProps {
  isVi: boolean;
}

export function HrmWorkflow({ isVi }: HrmWorkflowProps) {
  const steps = [
    {
      num: 1,
      color: "bg-blue-600 shadow-blue-500/20",
      title: isVi ? "Khai Báo & Thiết Lập" : "Structure Setup",
      desc: isVi
        ? "Khai báo sơ đồ phòng ban, chức vụ, mức lương cơ bản và tạo tài khoản nhân sự với phân quyền tương ứng."
        : "Establish company departments, job positions, base compensation, and issue user credentials with designated roles.",
    },
    {
      num: 2,
      color: "bg-indigo-600 shadow-indigo-500/20",
      title: isVi ? "Vận Hành Hàng Ngày" : "Daily Operations",
      desc: isVi
        ? "Nhân viên chấm công GPS và gửi đơn phép trực tuyến. Quản lý nhận thông báo và phê duyệt tức thì trên widget trung tâm."
        : "Employees clock in with GPS validation and file leave requests. Managers approve or decline instantly from their dashboard.",
    },
    {
      num: 3,
      color: "bg-emerald-600 shadow-emerald-500/20",
      title: isVi ? "Chốt Lương & Phân Tích" : "Payroll & Insights",
      desc: isVi
        ? "Hệ thống tự động tổng hợp bảng công, áp dụng quy chế tính lương, xuất file Excel tiếng Việt và hiển thị báo cáo phân tích số liệu."
        : "Automated timesheet consolidation, instant gross-to-net payroll computation, UTF-8 Excel export, and executive analytics.",
    },
  ];

  return (
    <section id="workflow" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {isVi ? "Đơn Giản & Hiệu Quả" : "Simple 3-Step Setup"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
            {isVi ? "Vận Hành Dễ Dàng Chỉ Với 3 Bước" : "Get Up And Running In 3 Simple Steps"}
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            {isVi
              ? "Không cần cài đặt phức tạp, sẵn sàng đưa vào áp dụng ngay trong toàn doanh nghiệp."
              : "Zero complex setup required. Intuitive onboarding for admins, managers, and staff."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((st) => (
            <motion.div
              key={st.num}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: (st.num - 1) * 0.15, ease: "easeOut" }}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 },
              }}
              className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm relative transition-shadow cursor-default"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 6 }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                className={`w-12 h-12 rounded-xl text-white font-black text-xl flex items-center justify-center mb-6 shadow-md ${st.color}`}
              >
                {st.num}
              </motion.div>
              <h3 className="text-lg font-bold text-slate-900">{st.title}</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">{st.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

