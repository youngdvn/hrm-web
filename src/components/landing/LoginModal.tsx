"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Modal, Form, Input, Button, Tag, Alert, Divider } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/hooks/useAuth";
import { useI18nStore } from "@/stores/i18n.store";
import { parseApiError } from "@/lib/api-client";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  isVi: boolean;
}

export function LoginModal({ open, onClose, isVi }: LoginModalProps) {
  const { login, isLoggingIn } = useAuth();
  const { t } = useI18nStore();
  const [form] = Form.useForm();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (values: any) => {
    try {
      setErrorMsg(null);
      // Passing null as redirectUrl so we stay right on the current page!
      await login(
        {
          email: values.email,
          password: values.password,
        },
        null
      );
      onClose();
      form.resetFields();
    } catch (err) {
      const msg = await parseApiError(err);
      setErrorMsg(msg);
    }
  };

  const handleQuickFill = (email: string, pass: string) => {
    form.setFieldsValue({
      email,
      password: pass,
    });
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm shadow-sm">
            <LoginOutlined />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-base leading-tight">
              {isVi ? "Đăng Nhập Tài Khoản" : "Sign In to Account"}
            </div>
            <div className="text-[11px] text-slate-500 font-normal">
              {isVi
                ? "Đăng nhập ngay trên trang chủ để truy cập các tính năng"
                : "Sign in and stay on this page to continue"}
            </div>
          </div>
        </div>
      }
      open={open}
      onCancel={() => {
        setErrorMsg(null);
        onClose();
      }}
      footer={null}
      width={440}
      centered
    >
      <div className="pt-2">
        {errorMsg && (
          <Alert
            title={errorMsg}
            type="error"
            showIcon
            closable
            onClose={() => setErrorMsg(null)}
            className="mb-4"
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            email: "admin@hrm.local",
            password: "Admin@123456",
          }}
        >
          <Form.Item
            label={<span className="text-xs font-semibold text-slate-700">{isVi ? "Email Tài Khoản" : "Email Address"}</span>}
            name="email"
            rules={[
              { required: true, message: isVi ? "Vui lòng nhập email" : "Email is required" },
              { type: "email", message: isVi ? "Email không hợp lệ" : "Invalid email" },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="text-slate-400" />}
              placeholder="admin@hrm.local"
              className="rounded-xl"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-xs font-semibold text-slate-700">{isVi ? "Mật Khẩu" : "Password"}</span>}
            name="password"
            rules={[{ required: true, message: isVi ? "Vui lòng nhập mật khẩu" : "Password is required" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="text-slate-400" />}
              placeholder="••••••••"
              className="rounded-xl"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isLoggingIn}
            className="bg-blue-600 hover:bg-blue-700 font-bold h-11 rounded-xl shadow-md shadow-blue-500/20 mt-2"
          >
            {isVi ? "Đăng Nhập Ngay" : "Sign In"}
          </Button>
        </Form>

        <Divider plain className="!my-4 !text-[11px] !text-slate-400">
          {isVi ? "Tài khoản thử nghiệm nhanh" : "Quick Demo Accounts"}
        </Divider>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => handleQuickFill("admin@hrm.local", "Admin@123456")}
            className="p-2 border border-slate-200 rounded-lg text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
          >
            <div className="font-semibold text-slate-700 flex items-center justify-between text-xs">
              Admin <Tag color="red" className="text-[10px] m-0">All</Tag>
            </div>
            <div className="text-[10px] text-slate-400 truncate">admin@hrm.local</div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickFill("hr@hrm.local", "Hr@123456")}
            className="p-2 border border-slate-200 rounded-lg text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
          >
            <div className="font-semibold text-slate-700 flex items-center justify-between text-xs">
              HR <Tag color="blue" className="text-[10px] m-0">HR</Tag>
            </div>
            <div className="text-[10px] text-slate-400 truncate">hr@hrm.local</div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickFill("manager@hrm.local", "Manager@123456")}
            className="p-2 border border-slate-200 rounded-lg text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
          >
            <div className="font-semibold text-slate-700 flex items-center justify-between text-xs">
              Manager <Tag color="green" className="text-[10px] m-0">Lead</Tag>
            </div>
            <div className="text-[10px] text-slate-400 truncate">manager@hrm.local</div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickFill("employee@hrm.local", "Employee@123456")}
            className="p-2 border border-slate-200 rounded-lg text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
          >
            <div className="font-semibold text-slate-700 flex items-center justify-between text-xs">
              Employee <Tag color="purple" className="text-[10px] m-0">Dev</Tag>
            </div>
            <div className="text-[10px] text-slate-400 truncate">employee@hrm.local</div>
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
          <Link
            href="/login?redirect=/"
            onClick={onClose}
            className="text-xs text-blue-600 hover:underline font-medium"
          >
            {isVi ? "Mở trang đăng nhập độc lập toàn màn hình →" : "Open full-screen login page →"}
          </Link>
        </div>
      </div>
    </Modal>
  );
}

