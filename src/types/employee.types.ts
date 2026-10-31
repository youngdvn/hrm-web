export type Gender = "MALE" | "FEMALE" | "OTHER";
export type EmployeeStatus = "PROBATION" | "ACTIVE" | "ON_LEAVE" | "TERMINATED";

export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  _count?: {
    employees: number;
  };
}

export interface Position {
  id: string;
  title: string;
  code: string;
  description?: string | null;
  baseSalaryMin?: number;
  baseSalaryMax?: number;
}

export interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
  dateOfBirth?: string | null;
  gender: Gender;
  address?: string | null;
  hireDate: string;
  status: EmployeeStatus;
  departmentId?: string | null;
  positionId?: string | null;
  managerId?: string | null;
  userId?: string | null;
  department?: Department | null;
  position?: Position | null;
  manager?: {
    id: string;
    employeeCode: string;
    firstName: string;
    lastName: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  departmentId?: string;
  positionId?: string;
  status?: EmployeeStatus;
}

export interface CreateEmployeeInput {
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  dateOfBirth?: string;
  gender: Gender;
  address?: string;
  hireDate: string;
  status: EmployeeStatus;
  departmentId?: string;
  positionId?: string;
  managerId?: string;
}

export interface UpdateEmployeeInput extends Partial<Omit<CreateEmployeeInput, "employeeCode">> { }

