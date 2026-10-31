export interface DashboardOverview {
  totalEmployees: number;
  checkedInToday: number;
  pendingLeaves: number;
  expiringContractsCount: number;
}

export interface AttendanceTodayStats {
  total: number;
  checkedIn: number;
  onTime: number;
  late: number;
  halfDay: number;
  absent: number;
}

export interface DepartmentHeadcountStat {
  id: string;
  code: string;
  name: string;
  employeeCount: number;
}

export interface EmployeeStatusCount {
  status: "ACTIVE" | "PROBATION" | "ON_LEAVE" | "TERMINATED";
  count: number;
}

export interface GenderDistributionCount {
  gender: "MALE" | "FEMALE" | "OTHER";
  count: number;
}

export interface ExpiringContractItem {
  id: string;
  contractNumber: string;
  contractType: string;
  endDate: string;
  employee?: {
    id: string;
    employeeCode: string;
    firstName: string;
    lastName: string;
    department?: {
      name: string;
    } | null;
  } | null;
}

export interface DashboardStats {
  overview: DashboardOverview;
  attendanceToday: AttendanceTodayStats;
  departments: DepartmentHeadcountStat[];
  employeeStatus: EmployeeStatusCount[];
  genderDistribution: GenderDistributionCount[];
  expiringContracts: ExpiringContractItem[];
}

