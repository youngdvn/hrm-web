"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Form, Input } from "antd";
import { Department } from "@/types/employee.types";
import { departmentSchema, DepartmentFormValues } from "@/schemas";
import { useI18nStore } from "@/stores/i18n.store";

export type { DepartmentFormValues };

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
  const { t } = useI18nStore();

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
      title={department ? t.department.edit : t.department.addNew}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={isLoading}
      destroyOnClose
      okText={t.common.save}
      cancelText={t.common.cancel}
    >
      <Form layout="vertical" className="pt-3">
        <Form.Item
          label={t.department.code}
          required
          validateStatus={errors.code ? "error" : ""}
          help={errors.code?.message}
        >
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="IT, HR, FIN..." disabled={!!department} />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t.department.name}
          required
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={t.department.name} />
            )}
          />
        </Form.Item>

        <Form.Item label={t.department.description}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} placeholder={t.department.description} rows={3} />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
