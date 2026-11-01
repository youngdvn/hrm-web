"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input, Button, Card, Typography, Space, Divider, Alert, Tag } from "antd";
import { UserOutlined, LockOutlined, TeamOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { useAuth } from "@/hooks/useAuth";
import { useI18nStore } from "@/stores/i18n.store";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { parseApiError } from "@/lib/api-client";
import { loginSchema, LoginFormData } from "@/schemas";

const { Title, Text } = Typography;

export default function LoginPage() {
  const { login, isLoggingIn } = useAuth();
  const { t } = useI18nStore();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@hrm.local",
      password: "Admin@123456",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setErrorMsg(null);
      await login(data);
    } catch (err) {
      const msg = await parseApiError(err);
      setErrorMsg(msg);
    }
  };

  const handleQuickFill = (email: string, pass: string) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", pass, { shouldValidate: true });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 p-4">
      <div className="absolute top-6 right-6">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 mb-3">
            <TeamOutlined className="text-2xl" />
          </div>
          <Title level={2} className="!mb-1 !text-slate-800">
            {t.auth.loginTitle}
          </Title>
          <Text type="secondary" className="text-sm">
            {t.auth.loginSubTitle}
          </Text>
        </div>

        <Card className="shadow-xl border-slate-200/80 rounded-2xl backdrop-blur-sm bg-white/95">
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                {t.auth.email}
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    prefix={<UserOutlined className="text-slate-400" />}
                    placeholder="admin@hrm.local"
                    status={errors.email ? "error" : ""}
                  />
                )}
              />
              {errors.email && (
                <span className="text-xs text-rose-500 mt-1 block">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                {t.auth.password}
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    size="large"
                    prefix={<LockOutlined className="text-slate-400" />}
                    placeholder="••••••••"
                    status={errors.password ? "error" : ""}
                  />
                )}
              />
              {errors.password && (
                <span className="text-xs text-rose-500 mt-1 block">{errors.password.message}</span>
              )}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoggingIn}
              block
              className="!mt-6 !h-11 !font-medium !shadow-md !shadow-blue-500/20"
            >
              {t.auth.loginBtn}
            </Button>
          </form>

          <Divider plain className="!my-5 !text-xs !text-slate-400">
            {t.auth.quickLogin}
          </Divider>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickFill("admin@hrm.local", "Admin@123456")}
              className="p-2 border border-slate-200 rounded-lg text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
            >
              <div className="font-semibold text-slate-700 flex items-center justify-between">
                Admin <Tag color="red">CEO</Tag>
              </div>
              <div className="text-[11px] text-slate-400 truncate">admin@hrm.local</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill("hr@hrm.local", "Hr@123456")}
              className="p-2 border border-slate-200 rounded-lg text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
            >
              <div className="font-semibold text-slate-700 flex items-center justify-between">
                HR Manager <Tag color="blue">HR</Tag>
              </div>
              <div className="text-[11px] text-slate-400 truncate">hr@hrm.local</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill("manager@hrm.local", "Manager@123456")}
              className="p-2 border border-slate-200 rounded-lg text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
            >
              <div className="font-semibold text-slate-700 flex items-center justify-between">
                Manager <Tag color="green">Lead</Tag>
              </div>
              <div className="text-[11px] text-slate-400 truncate">manager@hrm.local</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill("employee@hrm.local", "Employee@123456")}
              className="p-2 border border-slate-200 rounded-lg text-left hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
            >
              <div className="font-semibold text-slate-700 flex items-center justify-between">
                Employee <Tag color="purple">Dev</Tag>
              </div>
              <div className="text-[11px] text-slate-400 truncate">employee@hrm.local</div>
            </button>
          </div>
        </Card>

        <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1">
          <SafetyCertificateOutlined /> HRM Enterprise System © 2026
        </p>
      </div>
    </div>
  );
}

