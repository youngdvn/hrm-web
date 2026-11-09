"use client";

import React from "react";
import { Collapse } from "antd";

interface LandingFaqProps {
  isVi: boolean;
  items: any[];
}

export function LandingFaq({ isVi, items }: LandingFaqProps) {
  return (
    <section id="faq" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {isVi ? "Giải Đáp Thắc Mắc" : "FAQ"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            {isVi ? "Câu Hỏi Thường Gặp Của Khách Hàng" : "Frequently Asked Questions"}
          </h2>
        </div>

        <Collapse
          items={items}
          defaultActiveKey={["1"]}
          bordered={false}
          className="bg-transparent"
        />
      </div>
    </section>
  );
}

