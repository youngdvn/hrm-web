"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Modal, Form, Input } from "antd";
import { Position } from "@/types/employee.types";

const positionSchema = z.object({
  code: z
    .string()
    .min(2, "Mã chức vụ tối thiểu 2 ký tự")
    .max(20, "Mã chức vụ tối đa 20 ký tự")
    .transform((val) => val.trim().toUpperCase()),
  title: z
    .string()
    .min(2, "Tên chức vụ tối thiểu 2 ký tự")
    .max(100, "Tên chức vụ tối đa 100 ký tự")
    .transform((val) => val.trim()),
  description: z.string().max(500).optional(),
});

export type PositionFormValues = z.infer<typeof positionSchema>;

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
      title={position ? "Chỉnh sửa chức vụ" : "Thêm chức vụ mới"}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={isLoading}
      destroyOnClose
    >
      <Form layout="vertical" className="pt-3">
        <Form.Item
          label="Mã chức vụ"
          required
          validateStatus={errors.code ? "error" : ""}
          help={errors.code?.message}
        >
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="DEV, HR_MGR, ACC..." disabled={!!position} />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Tên chức vụ"
          required
          validateStatus={errors.title ? "error" : ""}
          help={errors.title?.message}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Kỹ sư phần mềm, Trưởng phòng..." />
            )}
          />
        </Form.Item>

        <Form.Item label="Mô tả công việc">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} placeholder="Mô tả trách nhiệm vị trí..." rows={3} />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

