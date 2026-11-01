import { z } from "zod";

export const positionSchema = z.object({
  code: z
    .string()
    .min(2, "Mã chức vụ tối thiểu 2 ký tự")
    .max(20, "Mã chức vụ tối đa 20 ký tự"),
  title: z
    .string()
    .min(2, "Tên chức vụ tối thiểu 2 ký tự")
    .max(100, "Tên chức vụ tối đa 100 ký tự"),
  description: z.string().max(500).optional(),
});

export type PositionFormValues = z.infer<typeof positionSchema>;

