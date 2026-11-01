"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Input, Button } from "antd";
import { KeyOutlined } from "@ant-design/icons";
import { message } from "@/lib/antd-app";
import { request, parseApiError } from "@/lib/api-client";
import { changePasswordSchema, ChangePasswordFormData } from "@/schemas";
import { useI18nStore } from "@/stores/i18n.store";

export function ChangePasswordCard() {
  const { t } = useI18nStore();
  const [isChangingPass, setIsChangingPass] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleChangePassword = async (data: ChangePasswordFormData) => {
    try {
      setIsChangingPass(true);
      const res = await request.post("auth/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      if (res.success) {
        message.success(t.profile.passwordSuccess);
        reset();
      } else {
        message.error(res.message || t.common.error);
      }
    } catch (err) {
      const msg = await parseApiError(err);
      message.error(msg);
    } finally {
      setIsChangingPass(false);
    }
  };

  return (
    <Card
      title={
        <span className="flex items-center gap-2 font-semibold">
          <KeyOutlined /> {t.profile.changePassword}
        </span>
      }
      className="shadow-xs border-slate-200"
    >
      <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            {t.profile.currentPassword} *
          </label>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder={t.profile.currentPassword}
                status={errors.currentPassword ? "error" : ""}
              />
            )}
          />
          {errors.currentPassword && (
            <p className="text-rose-500 text-xs mt-1">{errors.currentPassword.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            {t.profile.newPassword} *
          </label>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder={t.profile.newPassword}
                status={errors.newPassword ? "error" : ""}
              />
            )}
          />
          {errors.newPassword && (
            <p className="text-rose-500 text-xs mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            {t.profile.confirmPassword} *
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder={t.profile.confirmPassword}
                status={errors.confirmPassword ? "error" : ""}
              />
            )}
          />
          {errors.confirmPassword && (
            <p className="text-rose-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={isChangingPass}
          className="w-full !mt-2"
        >
          {t.profile.updatePasswordBtn}
        </Button>
      </form>
    </Card>
  );
}

