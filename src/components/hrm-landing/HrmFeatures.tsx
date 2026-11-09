"use client";

import React from "react";
import { RightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { HrmFeatureItem } from "./types";

interface HrmFeaturesProps {
  isVi: boolean;
  features: HrmFeatureItem[];
  onFeatureClick?: (title: string) => void;
}

export function HrmFeatures({ isVi, features, onFeatureClick }: HrmFeaturesProps) {
  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {isVi ? "Tính Năng Cốt Lõi" : "Core Capabilities"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
            {isVi
              ? "Bộ Công Cụ Toàn Diện Cho Quản Trị Nhân Sự Hiện Đại"
              : "A Complete Suite For Next-Generation People Operations"}
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            {isVi
              ? "Tích hợp mọi khâu quản lý nhân sự trong một cổng thông tin duy nhất, bảo mật và thân thiện."
              : "Unifying recruitment, attendance, approvals, payroll, and compliance in one unified portal."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFeatureClick && onFeatureClick(feat.title)}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feat.bg}`}
                >
                  {feat.icon}
                </motion.div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  {feat.subtitle}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {feat.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1.5 transition-transform">
                <span>{isVi ? "Khám phá quy trình" : "Explore feature"}</span>
                <RightOutlined className="ml-1 text-[10px]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

