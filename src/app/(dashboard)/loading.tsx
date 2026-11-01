"use client";

import { Card, Skeleton, Row, Col } from "antd";

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-48 bg-slate-200 rounded-md" />
        <div className="h-4 w-72 bg-slate-100 rounded-md" />
      </div>

      {/* KPI Cards Skeleton */}
      <Row gutter={[16, 16]}>
        {[1, 2, 3, 4].map((i) => (
          <Col xs={24} sm={12} lg={6} key={i}>
            <Card className="border-slate-200 shadow-xs">
              <Skeleton active paragraph={{ rows: 2 }} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Content Area Skeleton */}
      <Card className="border-slate-200 shadow-xs">
        <Skeleton active paragraph={{ rows: 8 }} />
      </Card>
    </div>
  );
}

