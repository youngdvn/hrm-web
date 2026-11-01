"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Modal, Form, Input, DatePicker, Row, Col } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { CreatePeriodInput } from "@/types/payroll.types";

const { RangePicker } = DatePicker;

const periodFormSchema = z.object({
  name: z.string().min(2, "Tên kỳ lương tối thiểu 2 ký tự"),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020).max(2100),
  dateRange: z
    .custom<[Dayjs, Dayjs]>()
    .refine((val) => val && val[0] && val[1], "Vui lòng chọn thời gian chu kỳ tính lương"),
});

type PeriodFormValues = z.infer<typeof periodFormSchema>;

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
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PeriodFormValues>({
    resolver: zodResolver(periodFormSchema),
    defaultValues: {
      name: `Kỳ lương Tháng ${dayjs().format("M/YYYY")}`,
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
      title="Tạo kỳ tính lương mới"
      onCancel={onClose}
      onOk={handleSubmit(handleFormSubmit)}
      confirmLoading={isCreating}
      destroyOnHidden
    >
      <Form layout="vertical" className="pt-3">
        <Form.Item
          label="Tên kỳ lương"
          required
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Kỳ lương Tháng 10/2026" />
            )}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Tháng" required>
              <Controller
                name="month"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    min={1}
                    max={12}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Năm" required>
              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    min={2020}
                    max={2100}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Khoảng thời gian tính công"
          required
          validateStatus={errors.dateRange ? "error" : ""}
          help={errors.dateRange?.message}
        >
          <Controller
            name="dateRange"
            control={control}
            render={({ field }) => (
              <RangePicker {...field} className="w-full" format="YYYY-MM-DD" />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

