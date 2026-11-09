"use client";

import React from "react";
import { Card, Table } from "antd";

interface LandingComparisonProps {
  isVi: boolean;
  columns: any[];
  dataSource: any[];
}

export function LandingComparison({ isVi, columns, dataSource }: LandingComparisonProps) {
  return (
    <section id="comparison" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            {isVi ? "So Sánh Chi Tiết" : "Feature Comparison"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            {isVi ? "Bảng So Sánh Quyền Lợi & Tính Năng Giữa Các Gói" : "Detailed Feature & Deliverable Comparison"}
          </h2>
        </div>

        <Card className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2 sm:p-4">
          <Table
            rowKey="feature"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{ x: 750 }}
            className="border border-slate-100 rounded-lg text-xs"
          />
        </Card>
      </div>
    </section>
  );
}

