"use client";

import React from "react";

interface LandingMetricsProps {
  isVi: boolean;
}

export function LandingMetrics({ isVi }: LandingMetricsProps) {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl sm:text-5xl font-black text-blue-600">150+</div>
            <div className="mt-1.5 text-sm font-semibold text-slate-800">
              {isVi ? "Dự Án Đã Bàn Giao" : "Websites Launched"}
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-emerald-600">99.4%</div>
            <div className="mt-1.5 text-sm font-semibold text-slate-800">
              {isVi ? "Khách Hàng Hài Lòng" : "5-Star Client Rating"}
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-amber-500">&lt; 1.2s</div>
            <div className="mt-1.5 text-sm font-semibold text-slate-800">
              {isVi ? "Tốc Độ Tải Trang TB" : "Average Load Speed"}
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-purple-600">24/7</div>
            <div className="mt-1.5 text-sm font-semibold text-slate-800">
              {isVi ? "Hỗ Trợ Kỹ Thuật" : "Ongoing Technical Care"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

