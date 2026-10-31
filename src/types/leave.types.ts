export type LeaveType =
  | "ANNUAL"
  | "SICK"
  | "UNPAID"
  | "MATERNITY"
  | "BEREAVEMENT"
  | "OTHER";

export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: LeaveStatus;
  rejectionReason?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  employee?: {
    id: string;
    employeeCode: string;
    firstName: string;
    lastName: string;
    department?: { name: string } | null;
    position?: { title: string } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveBalance {
  id: string;
  employeeId: string;
  year: number;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
  employee?: {
    employeeCode: string;
    firstName: string;
    lastName: string;
  } | null;
}

export interface CreateLeaveInput {
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface ReviewLeaveInput {
  status: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}

export interface LeaveFilterParams {
  page?: number;
  limit?: number;
  status?: LeaveStatus;
  leaveType?: LeaveType;
  employeeId?: string;
}

