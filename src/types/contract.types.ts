export type ContractType =
  | "PROBATION"
  | "DEFINITE_TERM"
  | "INDEFINITE_TERM"
  | "SEASONAL"
  | "INTERNSHIP";

export type ContractStatus = "DRAFT" | "ACTIVE" | "EXPIRED" | "TERMINATED";

export interface Contract {
  id: string;
  contractNumber: string;
  employeeId: string;
  contractType: ContractType;
  startDate: string;
  endDate?: string | null;
  baseSalary: number;
  allowance: number;
  status: ContractStatus;
  fileUrl?: string | null;
  documentUrl?: string | null;
  notes?: string | null;
  employee?: {
    id: string;
    employeeCode: string;
    firstName: string;
    lastName: string;
    email: string;
    department?: { name: string } | null;
    position?: { title: string } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContractInput {
  contractNumber: string;
  employeeId: string;
  contractType: ContractType;
  startDate: string;
  endDate?: string;
  baseSalary: number;
  allowance?: number;
  status?: ContractStatus;
  notes?: string;
}

export interface UpdateContractInput extends Partial<Omit<CreateContractInput, "contractNumber">> { }

export interface ContractFilterParams {
  page?: number;
  limit?: number;
  employeeId?: string;
  contractType?: ContractType;
  status?: ContractStatus;
}

