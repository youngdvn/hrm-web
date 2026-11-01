"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Typography, Spin, Skeleton } from "antd";
import { request } from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import { DashboardStats } from "@/types/dashboard.types";
import { StatCards } from "@/components/dashboard/StatCards";

// Lazy loading biểu đồ nặng (Recharts), danh sách hợp đồng & dashboard nhân viên
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
      <div>
        <Title level={3} className="!mb-1">
          {t.dashboard.title}
        </Title>
        <Text type="secondary">
          {t.dashboard.welcome}, <span className="font-semibold text-slate-800">{user?.fullName}</span>!
        </Text>
      </div>

      <StatCards overview={stats.overview} />

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <DepartmentChart departments={stats.departments || []} />
        </Col>

        <Col xs={24} lg={10}>
          <StatusPieChart statusCounts={stats.employeeStatus || []} />
        </Col>
      </Row>

      <ExpiringContractsList contracts={stats.expiringContracts || []} />
    </div>
  );
}
