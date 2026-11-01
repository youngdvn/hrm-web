import { z } from "zod";

export const departmentSchema = z.object({
  code: z
    .string()
    .min(2, "Mã phòng ban tối thiểu 2 ký tự")
    .max(10, "Mã phòng ban tối đa 10 ký tự"),
  name: z.string().min(2, "Tên phòng ban tối thiểu 2 ký tự"),
  description: z.string().optional(),
});

export type DepartmentFormValues = z.infer<typeof departmentSchema>;

