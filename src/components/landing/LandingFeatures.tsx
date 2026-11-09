"use client";

import React from "react";
import { AdvantageItem } from "./types";

interface LandingFeaturesProps {
  isVi: boolean;
  advantages: AdvantageItem[];
}

export function LandingFeatures({ isVi, advantages }: LandingFeaturesProps) {
  return (
    <section id="features" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {isVi ? "Tiêu Chuẩn Đỉnh Cao" : "Technical Standards"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            {isVi ? "Lý Do Hơn 150+ Doanh Nghiệp Chọn Chúng Tôi" : "Why 150+ Forward-Looking Businesses Choose Us"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${adv.bg}`}>
                {adv.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{adv.title}</h3>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

