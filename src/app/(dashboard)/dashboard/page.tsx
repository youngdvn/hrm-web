"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Typography, Spin, Skeleton } from "antd";
import { request } from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import { DashboardStats } from "@/types/dashboard.types";
import { StatCards } from "@/components/dashboard/StatCards";
import { TodayAttendanceWidget } from "@/components/dashboard/TodayAttendanceWidget";
import { QuickApprovalWidget } from "@/components/dashboard/QuickApprovalWidget";

// Lazy loading biểu đồ Recharts, danh sách hợp đồng & dashboard nhân viên
const DepartmentChart = dynamic(
  () => import("@/components/dashboard/DepartmentChart").then((mod) => mod.DepartmentChart),
  {
    ssr: false,
    loading: () => <Skeleton active paragraph={{ rows: 7 }} className="p-4" />,
  }
);

const StatusPieChart = dynamic(
  () => import("@/components/dashboard/StatusPieChart").then((mod) => mod.StatusPieChart),
  {
    ssr: false,
    loading: () => <Skeleton active paragraph={{ rows: 7 }} className="p-4" />,
  }
);

const WeeklyAttendanceChart = dynamic(
  () => import("@/components/dashboard/WeeklyAttendanceChart").then((mod) => mod.WeeklyAttendanceChart),
  {
    ssr: false,
    loading: () => <Skeleton active paragraph={{ rows: 7 }} className="p-4" />,
  }
);

const GenderDistributionChart = dynamic(
  () => import("@/components/dashboard/GenderDistributionChart").then((mod) => mod.GenderDistributionChart),
  {
    ssr: false,
    loading: () => <Skeleton active paragraph={{ rows: 7 }} className="p-4" />,
  }
);

const MonthlyHiringChart = dynamic(
  () => import("@/components/dashboard/MonthlyHiringChart").then((mod) => mod.MonthlyHiringChart),
  {
    ssr: false,
    loading: () => <Skeleton active paragraph={{ rows: 7 }} className="p-4" />,
  }
);

const ContractTypeChart = dynamic(
  () => import("@/components/dashboard/ContractTypeChart").then((mod) => mod.ContractTypeChart),
  {
    ssr: false,
    loading: () => <Skeleton active paragraph={{ rows: 7 }} className="p-4" />,
  }
);

const DepartmentSalaryChart = dynamic(
  () => import("@/components/dashboard/DepartmentSalaryChart").then((mod) => mod.DepartmentSalaryChart),
  {
    ssr: false,
    loading: () => <Skeleton active paragraph={{ rows: 7 }} className="p-4" />,
  }
);

const ExpiringContractsList = dynamic(
  () => import("@/components/dashboard/ExpiringContractsList").then((mod) => mod.ExpiringContractsList),
  {
    ssr: false,
    loading: () => <Skeleton active paragraph={{ rows: 5 }} className="p-4" />,
  }
);

const EmployeeDashboard = dynamic(
  () => import("@/components/dashboard/EmployeeDashboard").then((mod) => mod.EmployeeDashboard),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 flex items-center justify-center">
        <Spin size="large" />
      </div>
    ),
  }
);

const { Title, Text } = Typography;

export default function DashboardPage() {
  const { user, hasRole } = useAuthStore();
  const { t } = useI18nStore();
  const isManagerOrAbove = hasRole(["ADMIN", "HR", "MANAGER"]);

  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await request.get<DashboardStats>("dashboard/stats");
      return res.data;
    },
    enabled: isManagerOrAbove,
  });

  // If role is EMPLOYEE, show employee-specific workspace dashboard
  if (!isManagerOrAbove) {
    return <EmployeeDashboard />;
  }

  if (isLoading || !stats) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Spin size="large" description={t.common.loading} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Welcome */}
      <div>
        <Title level={3} className="!mb-1">
          {t.dashboard.title}
        </Title>
        <Text type="secondary">
          {t.dashboard.welcome}, <span className="font-semibold text-slate-800">{user?.fullName}</span>!
        </Text>
      </div>

      {/* 1. KPI Overview Cards */}
      <StatCards overview={stats.overview} />

      {/* 2. Trung tâm vận hành hôm nay: Tình hình Chấm công Real-time & Phê duyệt Nhanh */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={13}>
          <TodayAttendanceWidget stats={stats.attendanceToday} />
        </Col>

        <Col xs={24} lg={11}>
          <QuickApprovalWidget />
        </Col>
      </Row>

      {/* 3. Xu hướng Chuyên cần 7 ngày & Cơ cấu Giới tính / Đa dạng */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <WeeklyAttendanceChart data={stats.weeklyAttendanceTrend || []} />
        </Col>

        <Col xs={24} lg={10}>
          <GenderDistributionChart genderCounts={stats.genderDistribution || []} />
        </Col>
      </Row>

      {/* 4. Biểu đồ phân tích phòng ban và cơ cấu trạng thái làm việc */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <DepartmentChart departments={stats.departments || []} />
        </Col>

        <Col xs={24} lg={10}>
          <StatusPieChart statusCounts={stats.employeeStatus || []} />
        </Col>
      </Row>

      {/* 5. Xu hướng Tuyển dụng & Cơ cấu Loại hợp đồng lao động */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <MonthlyHiringChart data={stats.monthlyHiringTrend || []} />
        </Col>

        <Col xs={24} lg={10}>
          <ContractTypeChart data={stats.contractTypes || []} />
        </Col>
      </Row>

      {/* 6. Phân bổ Quỹ lương cơ bản theo Phòng ban */}
      <DepartmentSalaryChart data={stats.departmentSalaries || []} />

      {/* 7. Cảnh báo hợp đồng sắp hết hạn */}
      <ExpiringContractsList contracts={stats.expiringContracts || []} />
    </div>
  );
}
