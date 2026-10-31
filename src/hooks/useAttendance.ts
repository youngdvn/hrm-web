"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "@/lib/antd-app";
import { request, parseApiError } from "@/lib/api-client";
import { AttendanceRecord, AttendanceFilterParams } from "@/types/attendance.types";

const normalizeRecord = (r: AttendanceRecord): AttendanceRecord => ({
  ...r,
  checkIn: r.checkIn || r.checkInTime || null,
  checkOut: r.checkOut || r.checkOutTime || null,
  workHours: r.workHours ?? r.workingHours ?? null,
  checkInTime: r.checkInTime || r.checkIn || null,
  checkOutTime: r.checkOutTime || r.checkOut || null,
  workingHours: r.workingHours ?? r.workHours ?? null,
});

export function useAttendance(params?: AttendanceFilterParams) {
  const queryClient = useQueryClient();

  const myHistoryQuery = useQuery({
    queryKey: ["attendance-my-history"],
    queryFn: async () => {
      const res = await request.get<AttendanceRecord[]>("attendance/my-history", { limit: 50 });
      const items = res.data || [];
      return items.map(normalizeRecord);
    },
  });

  const companyAttendanceQuery = useQuery({
    queryKey: ["attendance-company", params],
    queryFn: async () => {
      const res = await request.get<AttendanceRecord[]>("attendance", params as Record<string, any>);
      const items = res.data || [];
      return {
        items: items.map(normalizeRecord),
        meta: res.meta || { page: 1, limit: 15, total: items.length, totalPages: 1 },
      };
    },
  });

  const checkInMutation = useMutation({
    mutationFn: async (notes?: string) => {
      const res = await request.post<AttendanceRecord>("attendance/check-in", { notes });
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: (data) => {
      message.success(
        data.status === "LATE"
          ? "Check-in thành công (Ghi nhận đi muộn)"
          : "Check-in thành công đúng giờ!"
      );
      queryClient.invalidateQueries({ queryKey: ["attendance-my-history"] });
      queryClient.invalidateQueries({ queryKey: ["attendance-company"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const checkOutMutation = useMutation({
    mutationFn: async (notes?: string) => {
      const res = await request.post<AttendanceRecord>("attendance/check-out", { notes });
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: (data) => {
      const totalHours = data.workingHours ?? data.workHours ?? 0;
      message.success(`Check-out thành công! Tổng giờ làm: ${totalHours}h`);
      queryClient.invalidateQueries({ queryKey: ["attendance-my-history"] });
      queryClient.invalidateQueries({ queryKey: ["attendance-company"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  return {
    myHistory: myHistoryQuery.data || [],
    isLoadingMyHistory: myHistoryQuery.isLoading,
    companyAttendance: companyAttendanceQuery.data?.items || [],
    meta: companyAttendanceQuery.data?.meta,
    isLoadingCompany: companyAttendanceQuery.isLoading,
    checkIn: checkInMutation.mutateAsync,
    isCheckingIn: checkInMutation.isPending,
    checkOut: checkOutMutation.mutateAsync,
    isCheckingOut: checkOutMutation.isPending,
  };
}

