import { z } from "zod";
import type { Dayjs } from "dayjs";

export const employeeFormSchema = z.object({
  employeeCode: z
    .string()
    .min(2, "Mã nhân viên tối thiểu 2 ký tự")
    .max(20, "Mã nhân viên tối đa 20 ký tự"),
  firstName: z.string().min(1, "Vui lòng nhập tên"),
  lastName: z.string().min(1, "Vui lòng nhập họ đệm"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
  avatarUrl: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  status: z.enum(["PROBATION", "ACTIVE", "ON_LEAVE", "TERMINATED"]),
  dateOfBirth: z.custom<Dayjs | null>().optional(),
  hireDate: z.custom<Dayjs | null>().optional(),
  departmentId: z.string().optional(),
  positionId: z.string().optional(),
  address: z.string().optional(),
  createAccount: z.boolean(),
  role: z.enum(["EMPLOYEE", "HR", "MANAGER", "ADMIN"]),
  initialPassword: z.string().optional(),
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

