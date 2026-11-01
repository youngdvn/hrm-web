"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Modal, Form, Input } from "antd";
import { Department } from "@/types/employee.types";

const departmentSchema = z.object({
  code: z
    .string()
    .min(2, "Mã phòng ban tối thiểu 2 ký tự")
    .max(10, "Mã phòng ban tối đa 10 ký tự")
    .transform((val) => val.trim().toUpperCase()),
  name: z.string().min(2, "Tên phòng ban tối thiểu 2 ký tự").transform((val) => val.trim()),
  description: z.string().optional(),
});

export type DepartmentFormValues = z.infer<typeof departmentSchema>;

interface DepartmentModalProps {
  open: boolean;
  department: Department | null;
  onClose: () => void;
  onSubmit: (values: DepartmentFormValues) => void;
  isLoading: boolean;
}

export default function DepartmentModal({
  open,
  department,
  onClose,
  onSubmit,
  isLoading,
}: DepartmentModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (department) {
      reset({
        code: department.code,
        name: department.name,
        description: department.description || "",
      });
    } else {
      reset({
        code: "",
        name: "",
        description: "",
      });
    }
  }, [department, reset, open]);

  return (
    <Modal
      open={open}
      title={department ? "Chỉnh sửa phòng ban" : "Thêm phòng ban mới"}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={isLoading}
      destroyOnClose
    >
      <Form layout="vertical" className="pt-3">
        <Form.Item
          label="Mã phòng ban"
          required
          validateStatus={errors.code ? "error" : ""}
          help={errors.code?.message}
        >
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="IT, HR, MKT..." disabled={!!department} />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Tên phòng ban"
          required
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Phòng Công nghệ Thông tin" />
            )}
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} placeholder="Chức năng, nhiệm vụ phòng ban..." rows={3} />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

