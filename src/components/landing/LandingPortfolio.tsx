"use client";

import React from "react";
import { Row, Col, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { PortfolioProject } from "./types";

interface LandingPortfolioProps {
  isVi: boolean;
  projects: PortfolioProject[];
  onInspectProject?: (project: PortfolioProject) => void;
}

export function LandingPortfolio({ isVi, projects, onInspectProject }: LandingPortfolioProps) {
  return (
    <section id="portfolio" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {isVi ? "Dự Án Tiêu Biểu" : "Featured Projects"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            {isVi ? "Các Website Đã Triển Khai Thành Công" : "Proven Track Record of Impactful Websites"}
          </h2>
        </div>

        <Row gutter={[24, 24]}>
          {projects.map((p, idx) => (
            <Col xs={24} md={12} key={idx}>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Tag color={p.color} className="font-semibold text-xs m-0">
                      {p.category}
                    </Tag>
                    <Tag className="text-[10px] m-0 bg-slate-100 border-none font-mono text-slate-500">
                      {p.badge}
                    </Tag>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span
                    onClick={() => onInspectProject?.(p)}
                    className="text-xs font-semibold text-blue-600 flex items-center gap-1 cursor-pointer hover:underline"
                  >
                    {isVi ? "Xem chi tiết dự án" : "Inspect Case Study"}{" "}
                    <ArrowRightOutlined className="text-[10px]" />
                  </span>
                  <span className="text-[11px] text-slate-400">PageSpeed: 98/100</span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

