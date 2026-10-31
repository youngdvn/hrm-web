"use client";

import { useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api-client";
import { AuditLog, AuditLogFilterParams } from "@/types/audit.types";

export function useAuditLogs(params?: AuditLogFilterParams) {
  const auditLogsQuery = useQuery({
    queryKey: ["audit-logs", params],
    queryFn: async () => {
      const res = await request.get<AuditLog[]>("audit-logs", params as Record<string, any>);
      return {
        items: res.data || [],
        meta: res.meta || { page: 1, limit: 20, total: res.data?.length || 0, totalPages: 1 },
      };
    },
  });

  return {
    logs: auditLogsQuery.data?.items || [],
    meta: auditLogsQuery.data?.meta,
    isLoading: auditLogsQuery.isLoading,
    isFetching: auditLogsQuery.isFetching,
    refetch: auditLogsQuery.refetch,
  };
}

