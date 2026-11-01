"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Form, Select, DatePicker, Input } from "antd";
import { CreateLeaveInput } from "@/types/leave.types";
import { leaveFormSchema, LeaveFormValues } from "@/schemas";
import { useI18nStore } from "@/stores/i18n.store";

const { Option } = Select;
const { RangePicker } = DatePicker;

export type { LeaveFormValues };

interface CreateLeaveModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateLeaveInput) => Promise<void>;
  isCreating: boolean;
}

export default function CreateLeaveModal({
  open,
  onClose,
  onSubmit,
  isCreating,
}: CreateLeaveModalProps) {
  const { t } = useI18nStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveFormSchema),
    defaultValues: {
      leaveType: "ANNUAL",
      dateRange: undefined,
      reason: "",
    },
  });

  const handleFormSubmit = async (values: LeaveFormValues) => {
    const [start, end] = values.dateRange;
    await onSubmit({
      leaveType: values.leaveType,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      reason: values.reason,
    });
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      title={t.leave.createRequest}
      onCancel={onClose}
      onOk={handleSubmit(handleFormSubmit)}
      confirmLoading={isCreating}
      destroyOnClose
      okText={t.common.save}
      cancelText={t.common.cancel}
    >
      <Form layout="vertical" className="pt-3">
        <Form.Item label={t.leave.leaveType} required>
          <Controller
            name="leaveType"
            control={control}
            render={({ field }) => (
              <Select {...field} className="w-full">
                <Option value="ANNUAL">{t.leave.typeAnnual}</Option>
                <Option value="SICK">{t.leave.typeSick}</Option>
                <Option value="UNPAID">{t.leave.typeUnpaid}</Option>
                <Option value="MATERNITY">{t.leave.typeMaternity}</Option>
                <Option value="BEREAVEMENT">{t.leave.typeBereavement}</Option>
                <Option value="OTHER">{t.leave.typeOther}</Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label={t.leave.dateRange}
          required
          validateStatus={errors.dateRange ? "error" : ""}
          help={errors.dateRange?.message}
        >
          <Controller
            name="dateRange"
            control={control}
            render={({ field }) => (
              <RangePicker
                {...field}
                className="w-full"
                format="YYYY-MM-DD"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t.leave.reason}
          required
          validateStatus={errors.reason ? "error" : ""}
          help={errors.reason?.message}
        >
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                rows={3}
                placeholder={t.leave.reason}
              />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
