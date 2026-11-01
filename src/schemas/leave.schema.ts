import { z } from "zod";
import type { Dayjs } from "dayjs";

export const leaveFormSchema = z.object({
  leaveType: z.enum(["ANNUAL", "SICK", "UNPAID", "MATERNITY", "BEREAVEMENT", "OTHER"]),
  dateRange: z
    .custom<[Dayjs, Dayjs]>()
    .refine((val) => val && val[0] && val[1], "Vui lòng chọn khoảng thời gian nghỉ"),
  reason: z.string().min(5, "Lý do nghỉ phép phải có ít nhất 5 ký tự"),
});

export type LeaveFormValues = z.infer<typeof leaveFormSchema>;

export const rejectLeaveSchema = z.object({
  rejectionReason: z.string().optional(),
});

export type RejectLeaveFormValues = z.infer<typeof rejectLeaveSchema>;

