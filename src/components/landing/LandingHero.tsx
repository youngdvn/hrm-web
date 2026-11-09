"use client";

import React from "react";
import { Button, Tag } from "antd";
import {
  RocketOutlined,
  ArrowRightOutlined,
  PhoneOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { WebPackage } from "./types";

interface LandingHeroProps {
  isVi: boolean;
  featuredPackage?: WebPackage;
  onOpenConsultation: (pkg?: WebPackage) => void;
}

export function LandingHero({ isVi, featuredPackage, onOpenConsultation }: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-200/40 via-indigo-200/30 to-sky-200/40 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-medium mb-6 shadow-xs animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
          <span>
            {isVi
              ? "✨ Dịch Vụ Thiết Kế & Lập Trình Website Doanh Nghiệp Chuyên Nghiệp"
              : "✨ Enterprise Web Design & Engineering Services"}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
          {isVi ? (
            <>
              Nâng Tầm Thương Hiệu Số. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Bứt Phá Nhận Diện & Doanh Thu.
              </span>
            </>
          ) : (
            <>
              Elevate Your Digital Brand. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Drive Sales & Online Conversions.
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {isVi
            ? "Đồng hành cùng hơn 150+ doanh nghiệp: từ Landing Page quảng cáo chuẩn SEO, Website doanh nghiệp nhận diện độc quyền đến Nền tảng Bán hàng E-Commerce và Web App Portal theo yêu cầu."
            : "Trusted by 150+ companies: from high-converting landing pages, custom brand corporate websites to automated e-commerce and full-stack web portals."}
        </p>

        {/* Dual CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/#pricing" className="w-full sm:w-auto">
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border-none font-bold text-base shadow-lg shadow-blue-500/30 hover:scale-[1.02] transition-transform"
            >
              {isVi ? "Xem Bảng Giá Các Gói Dịch Vụ" : "View Package Pricing"}
              <ArrowRightOutlined className="ml-1" />
            </Button>
          </a>
          <Button
            size="large"
            onClick={() => onOpenConsultation()}
            className="w-full sm:w-auto h-12 px-6 rounded-xl border-slate-300 font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-500 bg-white shadow-xs"
          >
            <PhoneOutlined className="mr-1 text-blue-500" />
            {isVi ? "Đăng Ký Tư Vấn & Báo Giá 1-1" : "Free Consultation Request"}
          </Button>
        </div>

        {/* Trust points */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-slate-500 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <CheckOutlined className="text-emerald-500 font-bold" />
            {isVi ? "Tặng Tên Miền & Hosting 1 Năm" : "Free Domain & Hosting (1 Yr)"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckOutlined className="text-emerald-500 font-bold" />
            {isVi ? "Bàn giao 100% Source Code" : "100% Source Code Ownership"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckOutlined className="text-emerald-500 font-bold" />
            {isVi ? "Tốc độ tải trang dưới 1.5s (Google 90+)" : "Sub-1.5s Load Speed (Google 90+)"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckOutlined className="text-emerald-500 font-bold" />
            {isVi ? "Bảo hành kỹ thuật 12 - 24 tháng" : "12-24 Mo Technical Warranty"}
          </span>
        </div>

        {/* Hero Visual Preview Container (Interactive Mockup) */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 shadow-2xl text-left relative">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                https://preview.webcraft.enterprise/demo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Tag color="green" className="text-[10px] m-0 font-medium">
                ● 99/100 PageSpeed
              </Tag>
              <Tag color="blue" className="text-[10px] m-0 font-medium hidden sm:inline">
                VietQR Active
              </Tag>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-slate-50/70 rounded-xl mt-3 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
              <div>
                <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                  {isVi ? "Dự Án Mẫu Khách Hàng B2B" : "Featured Client Project"}
                </div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  AlphaTech International Corporate Portal
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Giao diện UI/UX độc quyền • Tích hợp cổng thông tin khách hàng & Báo giá tự động
                </div>
              </div>
              <Button
                type="primary"
                size="small"
                onClick={() => onOpenConsultation(featuredPackage)}
                className="bg-blue-600 hover:bg-blue-700 font-medium rounded-lg shrink-0"
              >
                {isVi ? "Xem Báo Giá Gói Này →" : "View Package Quote →"}
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                <div className="text-xl font-bold text-emerald-600">99 / 100</div>
                <div className="text-[11px] text-slate-500">Google Lighthouse</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                <div className="text-xl font-bold text-blue-600">&lt; 1.1s</div>
                <div className="text-[11px] text-slate-500">Tốc độ tải trang</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                <div className="text-xl font-bold text-purple-600">100%</div>
                <div className="text-[11px] text-slate-500">Chuẩn Responsive</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                <div className="text-xl font-bold text-amber-600">SSL A+</div>
                <div className="text-[11px] text-slate-500">Bảo mật mã hóa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

