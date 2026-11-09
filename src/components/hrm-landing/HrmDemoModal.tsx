"use client";

import React, { useState } from "react";
import { Modal, Button, Tag } from "antd";
import { RocketOutlined, CopyOutlined, LoginOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { DemoAccount } from "./types";
import { message } from "@/lib/antd-app";

interface HrmDemoModalProps {
  open: boolean;
  onClose: () => void;
  isVi: boolean;
  demoAccounts: DemoAccount[];
  onSelectAccount?: (email: string, pass: string) => void;
  onOpenLogin: () => void;
}

export function HrmDemoModal({
  open,
  onClose,
  isVi,
  demoAccounts,
  onSelectAccount,
  onOpenLogin,
}: HrmDemoModalProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    message.success(isVi ? "Đã sao chép thông tin tài khoản!" : "Copied credentials!");
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <RocketOutlined className="text-blue-600" />
          <span className="font-bold text-slate-900">
            {isVi ? "Tài Khoản Dùng Thử Hệ Thống (Demo Accounts)" : "Pre-Configured Demo Accounts"}
          </span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          {isVi ? "Đóng" : "Close"}
        </Button>,
        <Button
          key="login"
          type="primary"
          icon={<LoginOutlined />}
          onClick={() => {
            onClose();
            onOpenLogin();
          }}
          className="bg-blue-600"
        >
          {isVi ? "Đến Form Đăng Nhập →" : "Proceed to Login →"}
        </Button>,
      ]}
      width={680}
    >
      <p className="text-xs text-slate-600 mb-4">
        {isVi
          ? "Bạn có thể sử dụng các tài khoản mẫu dưới đây để kiểm tra các quyền và giao diện khác nhau:"
          : "Use any of the seed accounts below to inspect role-specific views and features:"}
      </p>

      <div className="space-y-3">
        {demoAccounts.map((acc, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.01, borderColor: "#93c5fd" }}
            transition={{ duration: 0.15 }}
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800 text-sm">{acc.role}</span>
                <Tag color={acc.color} className="text-[10px] m-0">
                  {acc.badge}
                </Tag>
              </div>
              <div className="text-xs text-slate-500 mt-1">{acc.desc}</div>
              <div className="mt-2 flex items-center gap-3 text-xs font-mono flex-wrap">
                <span className="text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded">
                  Email: <strong>{acc.email}</strong>
                </span>
                <span className="text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded">
                  Pass: <strong>{acc.pass}</strong>
                </span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <Button
                size="small"
                icon={<CopyOutlined />}
                onClick={() => handleCopy(`${acc.email}\n${acc.pass}`, acc.email)}
                className="text-xs"
              >
                {copiedAccount === acc.email
                  ? isVi
                    ? "Đã chép!"
                    : "Copied!"
                  : isVi
                  ? "Sao chép"
                  : "Copy"}
              </Button>
              {onSelectAccount && (
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    onClose();
                    onSelectAccount(acc.email, acc.pass);
                  }}
                  className="text-xs bg-blue-600"
                >
                  {isVi ? "Đăng nhập ngay" : "Sign In"}
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Modal>
  );
}

