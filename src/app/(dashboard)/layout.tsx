"use client";

import { useState } from "react";
import { Layout } from "antd";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { RoleGuard } from "@/components/common/RoleGuard";

const { Content } = Layout;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <RoleGuard>
      <Layout className="h-screen">
        <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
        <Layout className="flex flex-col min-h-screen bg-slate-50">
          <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
          <Content className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto">{children}</div>
          </Content>
        </Layout>
      </Layout>
    </RoleGuard>
  );
}

