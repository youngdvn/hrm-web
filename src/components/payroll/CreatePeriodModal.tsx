"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Form, Input, DatePicker, Row, Col } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { CreatePeriodInput } from "@/types/payroll.types";
import { periodFormSchema, PeriodFormValues } from "@/schemas";
import { useI18nStore } from "@/stores/i18n.store";

const { RangePicker } = DatePicker;

export type { PeriodFormValues };

interface CreatePeriodModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreatePeriodInput) => Promise<void>;
  isCreating: boolean;
}

export default function CreatePeriodModal({
  open,
  onClose,
  onSubmit,
  isCreating,
}: CreatePeriodModalProps) {
  const { t } = useI18nStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PeriodFormValues>({
    resolver: zodResolver(periodFormSchema),
    defaultValues: {
      name: `${t.payroll.periodMonthPrefix} ${dayjs().format("M/YYYY")}`,
      month: dayjs().month() + 1,
      year: dayjs().year(),
      dateRange: [dayjs().startOf("month"), dayjs().endOf("month")],
    },
  });

  const handleFormSubmit = async (values: PeriodFormValues) => {
    const [start, end] = values.dateRange;
    await onSubmit({
      name: values.name,
      month: values.month,
      year: values.year,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    });
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      title={t.payroll.createPeriod}
      onCancel={onClose}
      onOk={handleSubmit(handleFormSubmit)}
      confirmLoading={isCreating}
      destroyOnClose
      okText={t.common.save}
      cancelText={t.common.cancel}
    >
      <Form layout="vertical" className="pt-3">
        <Form.Item
          label={t.payroll.periodName}
          required
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={`${t.payroll.periodMonthPrefix} ${dayjs().format("M/YYYY")}`} />
            )}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={t.payroll.month} required>
              <Controller
                name="month"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="number" min={1} max={12} />
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t.payroll.year} required>
              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="number" min={2020} max={2100} />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={t.payroll.periodDateRange}
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
      </Form>
    </Modal>
  );
}
