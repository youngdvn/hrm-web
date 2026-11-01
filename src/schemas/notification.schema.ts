import { z } from "zod";

export const sendNotificationSchema = z.object({
  targetType: z.enum(["ALL", "SPECIFIC"]),
  userId: z.string().optional(),
  title: z.string().min(1, "Vui lòng nhập tiêu đề thông báo"),
  message: z.string().min(1, "Vui lòng nhập nội dung thông báo"),
  type: z.enum(["GENERAL", "LEAVE_STATUS", "PAYROLL_PUBLISHED", "CONTRACT_EXPIRING"]),
  link: z.string().optional(),
});

export type SendNotificationFormValues = z.infer<typeof sendNotificationSchema>;

