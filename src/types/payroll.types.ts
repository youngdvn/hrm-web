export type PayrollPeriodStatus = "DRAFT" | "CALCULATED" | "PAID" | "OPEN" | "PROCESSING" | "CLOSED";
export type PayslipStatus = "DRAFT" | "CALCULATED" | "PAID";

export interface PayrollPeriod {
  id: string;
  name: string;
  month: number;
  year: number;
  startDate: string;
  endDate: string;
  status: PayrollPeriodStatus;
  totalAmount?: number | null;
  _count?: {
    payslips: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Payslip {
  id: string;
  payrollPeriodId: string;
  employeeId: string;
  baseSalary: number;
  allowance: number;
  standardWorkDays: number;
  actualWorkDays: number;
  grossSalary: number;
  insuranceDeduction: number;
  taxDeduction: number;
  netSalary: number;
  status: PayslipStatus;
  employee?: {
    id: string;
    employeeCode: string;
    firstName: string;
    lastName: string;
    department?: { name: string } | null;
    position?: { title: string } | null;
  } | null;
  payrollPeriod?: PayrollPeriod | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePeriodInput {
  name: string;
  month: number;
  year: number;
  startDate: string;
  endDate: string;
}

export interface CalculatePayrollInput {
  standardWorkDays?: number;
}

