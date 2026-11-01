"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Form, Input } from "antd";
import { Position } from "@/types/employee.types";
import { positionSchema, PositionFormValues } from "@/schemas";
import { useI18nStore } from "@/stores/i18n.store";

export type { PositionFormValues };

interface PositionModalProps {
  open: boolean;
  position: Position | null;
  onClose: () => void;
  onSubmit: (values: PositionFormValues) => Promise<void>;
  isLoading: boolean;
}

export default function PositionModal({
  open,
  position,
  onClose,
  onSubmit,
  isLoading,
}: PositionModalProps) {
  const { t } = useI18nStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PositionFormValues>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      code: "",
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (position) {
      reset({
        code: position.code,
        title: position.title,
        description: position.description || "",
      });
    } else {
      reset({
        code: "",
        title: "",
        description: "",
      });
    }
  }, [position, reset, open]);

  return (
    <Modal
      open={open}
      title={position ? t.position.edit : t.position.addNew}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={isLoading}
      destroyOnClose
      okText={t.common.save}
      cancelText={t.common.cancel}
    >
      <Form layout="vertical" className="pt-3">
        <Form.Item
          label={t.position.code}
          required
          validateStatus={errors.code ? "error" : ""}
          help={errors.code?.message}
        >
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="DEV_SR, HR_MGR..." disabled={!!position} />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t.position.positionTitle}
          required
          validateStatus={errors.title ? "error" : ""}
          help={errors.title?.message}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={t.position.positionTitle} />
            )}
          />
        </Form.Item>

        <Form.Item label={t.position.description}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} placeholder={t.position.description} rows={3} />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
