"use client";

import React from "react";
import { Row, Col } from "antd";
import { WorkflowStep } from "./types";

interface LandingWorkflowProps {
  isVi: boolean;
  steps: WorkflowStep[];
}

export function LandingWorkflow({ isVi, steps }: LandingWorkflowProps) {
  return (
    <section id="workflow" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
            {isVi ? "Quy Trình Chuẩn Quốc Tế" : "Structured Methodology"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            {isVi ? "5 Bước Hoàn Thiện Website Từ A Đến Z" : "5 Steps From Vision To Launch"}
          </h2>
        </div>

        <Row gutter={[16, 16]}>
          {steps.map((item, i) => (
            <Col xs={24} sm={12} lg={4} key={i} className="flex-1">
              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl h-full flex flex-col justify-between backdrop-blur-xs">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm mb-4 shadow-md shadow-blue-500/30">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-base text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

