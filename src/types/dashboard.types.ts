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

export interface WeeklyAttendanceItem {
  date: string;
  displayDate: string;
  dayOfWeek: string;
  present: number;
  late: number;
  halfDay: number;
  absent: number;
  total: number;
}

export interface MonthlyHiringItem {
  monthKey: string;
  displayMonth: string;
  newHires: number;
}

export interface ContractTypeStat {
  contractType: string;
  count: number;
}

export interface DepartmentSalaryStat {
  departmentId: string;
  departmentName: string;
  totalSalary: number;
  avgSalary: number;
  contractCount: number;
}

export interface DashboardStats {
  overview: DashboardOverview;
  attendanceToday: AttendanceTodayStats;
  departments: DepartmentHeadcountStat[];
  employeeStatus: EmployeeStatusCount[];
  genderDistribution: GenderDistributionCount[];
  expiringContracts: ExpiringContractItem[];
  weeklyAttendanceTrend?: WeeklyAttendanceItem[];
  monthlyHiringTrend?: MonthlyHiringItem[];
  contractTypes?: ContractTypeStat[];
  departmentSalaries?: DepartmentSalaryStat[];
}
