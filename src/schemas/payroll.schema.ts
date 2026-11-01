import { z } from "zod";
import type { Dayjs } from "dayjs";

export const periodFormSchema = z.object({
  name: z.string().min(2, "Tên kỳ lương tối thiểu 2 ký tự"),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020).max(2100),
  dateRange: z
    .custom<[Dayjs, Dayjs]>()
    .refine((val) => val && val[0] && val[1], "Vui lòng chọn thời gian chu kỳ tính lương"),
});

export type PeriodFormValues = z.infer<typeof periodFormSchema>;

