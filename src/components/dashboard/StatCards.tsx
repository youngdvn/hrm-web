"use client";

import { Row, Col, Card, Statistic } from "antd";
import {
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileExclamationOutlined,
} from "@ant-design/icons";
import { DashboardOverview } from "@/types/dashboard.types";
import { useI18nStore } from "@/stores/i18n.store";

interface StatCardsProps {
  overview: DashboardOverview;
}

export function StatCards({ overview }: StatCardsProps) {
  const { t } = useI18nStore();

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <Card className="shadow-xs border-slate-200 hover:shadow-sm transition-shadow">
          <Statistic
            title={
              <span className="text-xs font-medium text-slate-500 uppercase">
                {t.dashboard.totalEmployees}
              </span>
            }
            value={overview.totalEmployees}
            prefix={<TeamOutlined className="text-blue-500 mr-2 text-xl" />}
            styles={{ content: { fontWeight: 700, color: "#1e293b" } }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card className="shadow-xs border-slate-200 hover:shadow-sm transition-shadow">
          <Statistic
            title={<span className="text-xs font-medium text-slate-500 uppercase">{t.attendance.todayStatus}</span>}
            value={overview.checkedInToday}
            suffix={`/ ${overview.totalEmployees}`}
            prefix={<CheckCircleOutlined className="text-emerald-500 mr-2 text-xl" />}
            styles={{ content: { fontWeight: 700, color: "#1e293b" } }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card className="shadow-xs border-slate-200 hover:shadow-sm transition-shadow">
          <Statistic
            title={<span className="text-xs font-medium text-slate-500 uppercase">{t.leave.statusPending}</span>}
            value={overview.pendingLeaves}
            prefix={<ClockCircleOutlined className="text-amber-500 mr-2 text-xl" />}
            styles={{ content: { fontWeight: 700, color: "#d97706" } }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card className="shadow-xs border-slate-200 hover:shadow-sm transition-shadow">
          <Statistic
            title={<span className="text-xs font-medium text-slate-500 uppercase">{t.contract.statusExpired}</span>}
            value={overview.expiringContractsCount}
            prefix={<FileExclamationOutlined className="text-rose-500 mr-2 text-xl" />}
            styles={{ content: { fontWeight: 700, color: "#e11d48" } }}
          />
        </Card>
      </Col>
    </Row>
  );
}

