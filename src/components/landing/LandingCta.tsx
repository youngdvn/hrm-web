"use client";

import React from "react";
import { Button } from "antd";

interface LandingCtaProps {
  isVi: boolean;
  onOpenConsultation: () => void;
}

export function LandingCta({ isVi, onOpenConsultation }: LandingCtaProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          {isVi
            ? "Sẵn Sàng Bắt Đầu Dự Án Website Của Bạn?"
            : "Ready To Launch Your Next High-Impact Website?"}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          {isVi
            ? "Đăng ký tư vấn ngay hôm nay để nhận ưu đãi miễn phí Tên miền .com/.vn cao cấp và 1 năm Hosting NVMe tốc độ cao."
            : "Book a consultation today to claim free premium domain registration and 1 year of high-speed NVMe hosting."}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            type="primary"
            size="large"
            onClick={onOpenConsultation}
            className="w-full sm:w-auto h-12 px-8 rounded-xl bg-white text-blue-700 hover:bg-slate-100 border-none font-bold text-base shadow-xl hover:scale-[1.02] transition-transform"
          >
            {isVi ? "Đăng Ký Tư Vấn & Nhận Báo Giá Miễn Phí" : "Request Free Consultation"}
          </Button>
          <a href="/#pricing" className="w-full sm:w-auto">
            <Button
              size="large"
              className="w-full sm:w-auto h-12 px-6 rounded-xl border-white/60 bg-transparent text-white hover:bg-white/10 font-semibold"
            >
              {isVi ? "Xem Lại Bảng Giá" : "Review Pricing Plans"}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

