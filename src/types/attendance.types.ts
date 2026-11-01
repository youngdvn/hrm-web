export type AttendanceStatus =
  | "PRESENT"
  | "LATE"
  | "EARLY_LEAVE"
  | "ABSENT"
  | "HALF_DAY";

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  workingHours?: number | null;
  overtimeHours?: number | null;
  checkIn?: string | null;
  checkOut?: string | null;
  workHours?: number | null;
  otHours?: number | null;
  status: AttendanceStatus;
  notes?: string | null;
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

export interface AttendanceFilterParams {
  page?: number;
  limit?: number;
  employeeId?: string;
  startDate?: string;
  endDate?: string;
  status?: AttendanceStatus;
}

