"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Result, Button, Spin } from "antd";
import { useAuthStore } from "@/stores/auth.store";
import { UserRole } from "@/types/auth.types";
import { useI18nStore } from "@/stores/i18n.store";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const router = useRouter();
  const { isAuthenticated, user, hasRole } = useAuthStore();
  const { t } = useI18nStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isMounted, isAuthenticated, router]);

  if (!isMounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spin size="large" description={t.common.loading} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    return (
      <div className="p-8">
        <Result
          status="403"
          title="403"
          subTitle={t.auth.unauthorized}
          extra={
            <Button type="primary" onClick={() => router.push("/dashboard")}>
              {t.common.dashboard}
            </Button>
          }
        />
      </div>
    );
  }

  return <>{children}</>;
}

