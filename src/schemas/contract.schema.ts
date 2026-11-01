import { z } from "zod";
import type { Dayjs } from "dayjs";

export const contractFormSchema = z.object({
  contractNumber: z.string().min(3, "Số hợp đồng tối thiểu 3 ký tự"),
  employeeId: z.string().min(1, "Vui lòng chọn nhân viên"),
  contractType: z.enum([
    "PROBATION",
    "DEFINITE_TERM",
    "INDEFINITE_TERM",
    "SEASONAL",
    "INTERNSHIP",
  ]),
  startDate: z.custom<Dayjs>((val) => !!val, "Vui lòng chọn ngày bắt đầu"),
  endDate: z.custom<Dayjs | null>().optional(),
  baseSalary: z.number().positive("Lương cơ bản phải lớn hơn 0"),
  allowance: z.number().nonnegative("Phụ cấp phải >= 0"),
  status: z.enum(["DRAFT", "ACTIVE", "EXPIRED", "TERMINATED"]),
  notes: z.string().optional(),
});

export type ContractFormValues = z.infer<typeof contractFormSchema>;

