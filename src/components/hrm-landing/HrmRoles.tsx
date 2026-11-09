"use client";

import React, { useState } from "react";
import { Button, Tag } from "antd";
import {
  CrownOutlined,
  ApartmentOutlined,
  TeamOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { RoleExperience, RoleKey } from "./types";

interface HrmRolesProps {
  isVi: boolean;
  roleExperiences: Record<RoleKey, RoleExperience>;
  onSelectRole: (role: RoleKey) => void;
}

export function HrmRoles({ isVi, roleExperiences, onSelectRole }: HrmRolesProps) {
  const [activeRoleTab, setActiveRoleTab] = useState<RoleKey>("admin");

  const currentExp = roleExperiences[activeRoleTab];

  return (
    <section id="roles" className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            {isVi ? "Trải Nghiệm Đa Phân Vai" : "Role-Based Experiences"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
            {isVi
              ? "Thiết Kế Chuyên Biệt Cho Mọi Vị Trí Trong Tổ Chức"
              : "Tailored Workspaces For Every Role Across Your Organization"}
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            {isVi
              ? "Mỗi người dùng chỉ thấy chính xác những công cụ và dữ liệu phù hợp với thẩm quyền của mình."
              : "Clear separation of duties ensuring maximum security and a clutter-free user experience."}
          </p>
        </motion.div>

        {/* Role selector tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-xl border border-slate-200">
            {(["admin", "manager", "hr", "employee"] as const).map((roleKey) => (
              <button
                key={roleKey}
                onClick={() => setActiveRoleTab(roleKey)}
                className={`relative px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-150 capitalize flex items-center gap-2 z-10 ${
                  activeRoleTab === roleKey
                    ? "text-blue-600 font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {activeRoleTab === roleKey && (
                  <motion.div
                    layoutId="activeRoleIndicator"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                {roleKey === "admin" && <CrownOutlined />}
                {roleKey === "manager" && <ApartmentOutlined />}
                {roleKey === "hr" && <TeamOutlined />}
                {roleKey === "employee" && <UserOutlined />}
                <span>{roleKey.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Role Card Presentation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRoleTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50/40 p-6 sm:p-10 rounded-3xl border border-blue-100 shadow-md"
          >
            <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-xl"
                >
                  {currentExp.icon}
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{currentExp.title}</h3>
                  <Tag color="blue" className="mt-0.5 text-xs font-semibold">
                    {currentExp.tag}
                  </Tag>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="primary"
                  onClick={() => onSelectRole(activeRoleTab)}
                  className="bg-blue-600 hover:bg-blue-700 font-medium rounded-lg h-9"
                >
                  {isVi ? "Thử nghiệm vai trò này →" : "Try this role →"}
                </Button>
              </motion.div>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              {currentExp.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-slate-200/80">
              {currentExp.points.map((pt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs"
                >
                  <CheckCircleOutlined className="text-emerald-500 mt-0.5 shrink-0" />
                  <span>{pt}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

