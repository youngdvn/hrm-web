"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Modal, Form, Select, DatePicker, Input } from "antd";
import { Dayjs } from "dayjs";
import { CreateLeaveInput } from "@/types/leave.types";

const { Option } = Select;
const { RangePicker } = DatePicker;

const leaveFormSchema = z.object({
  leaveType: z.enum(["ANNUAL", "SICK", "UNPAID", "MATERNITY", "BEREAVEMENT", "OTHER"]),
  dateRange: z
    .custom<[Dayjs, Dayjs]>()
    .refine((val) => val && val[0] && val[1], "Vui lòng chọn khoảng thời gian nghỉ"),
  reason: z.string().min(5, "Lý do nghỉ phép phải có ít nhất 5 ký tự"),
});

type LeaveFormValues = z.infer<typeof leaveFormSchema>;

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
      title="Nộp đơn xin nghỉ phép"
      onCancel={onClose}
      onOk={handleSubmit(handleFormSubmit)}
      confirmLoading={isCreating}
      destroyOnClose
    >
      <Form layout="vertical" className="pt-3">
        <Form.Item label="Loại nghỉ phép" required>
          <Controller
            name="leaveType"
            control={control}
            render={({ field }) => (
              <Select {...field} className="w-full">
                <Option value="ANNUAL">Phép năm (Trừ quỹ ngày phép)</Option>
                <Option value="SICK">Nghỉ ốm đau</Option>
                <Option value="UNPAID">Nghỉ không hưởng lương</Option>
                <Option value="MATERNITY">Nghỉ chế độ thai sản</Option>
                <Option value="BEREAVEMENT">Nghỉ hiếu / hỉ</Option>
                <Option value="OTHER">Lý do khác</Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item
          label="Khoảng thời gian nghỉ"
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

        <Form.Item
          label="Lý do xin nghỉ"
          required
          validateStatus={errors.reason ? "error" : ""}
          help={errors.reason?.message}
        >
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} rows={3} placeholder="Mô tả lý do nghỉ phép..." />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

