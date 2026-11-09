"use client";

import React from "react";
import Link from "next/link";
import { Row, Col, Tag, Button } from "antd";
import { ClockCircleOutlined, CheckOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { WebPackage } from "./types";

interface LandingPricingProps {
  isVi: boolean;
  packages: WebPackage[];
  onSelectPackage: (pkg: WebPackage) => void;
}

export function LandingPricing({ isVi, packages, onSelectPackage }: LandingPricingProps) {
  return (
    <section id="pricing" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {isVi ? "Bảng Giá Minh Bạch" : "Transparent Pricing"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            {isVi ? "Chọn Gói Dịch Vụ Phù Hợp Cho Doanh Nghiệp" : "Choose The Ideal Package For Your Business"}
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            {isVi
              ? "Chi phí trọn gói rõ ràng, không phát sinh chi phí ẩn. Hỗ trợ hợp đồng kinh tế và xuất hóa đơn VAT tài chính."
              : "All-inclusive turnkey packages. Zero hidden costs. Formal contracts and corporate tax invoices provided."}
          </p>
        </div>

        <Row gutter={[20, 20]} align="stretch">
          {packages.map((pkg) => (
            <Col xs={24} md={12} lg={6} key={pkg.id}>
              <div
                className={`bg-white rounded-2xl p-6 border ${pkg.border} flex flex-col justify-between h-full relative hover:shadow-2xl hover:-translate-y-1 transition-all duration-200`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                      {isVi ? "Phổ Biến Nhất" : "Most Popular"}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      {pkg.icon}
                    </div>
                    <Tag color={pkg.badgeColor} className="text-[10px] m-0 font-medium">
                      {pkg.badge}
                    </Tag>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[36px] line-clamp-2">
                    {pkg.target}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="text-2xl font-black text-slate-900 tracking-tight">
                      {pkg.priceStr}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <ClockCircleOutlined />
                      <span>{isVi ? "Thời gian:" : "Timeline:"} {pkg.timeline}</span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckOutlined className="text-emerald-500 mt-0.5 shrink-0 font-bold" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
                  <Link href={`/packages/${pkg.id}`} className="block">
                    <Button
                      block
                      className="rounded-xl font-bold border-blue-500 text-blue-600 hover:bg-blue-50 h-10"
                    >
                      {isVi ? "Xem Chi Tiết Gói →" : "Package Details →"}
                    </Button>
                  </Link>
                  <Button
                    type={pkg.popular ? "primary" : "default"}
                    block
                    size="large"
                    onClick={() => onSelectPackage(pkg)}
                    className={
                      pkg.popular
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white font-bold h-10 shadow-md shadow-blue-500/20"
                        : "font-semibold h-10"
                    }
                  >
                    {isVi ? "Đăng Ký Gói Này" : "Select This Plan"}
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

