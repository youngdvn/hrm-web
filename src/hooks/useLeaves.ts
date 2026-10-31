"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "@/lib/antd-app";
import { request, parseApiError } from "@/lib/api-client";
import {
  LeaveRequest,
  LeaveBalance,
  CreateLeaveInput,
  ReviewLeaveInput,
  LeaveFilterParams,
} from "@/types/leave.types";

export function useLeaves(params?: LeaveFilterParams) {
  const queryClient = useQueryClient();

  const myLeavesQuery = useQuery({
    queryKey: ["my-leaves"],
    queryFn: async () => {
      const res = await request.get<LeaveRequest[]>("leaves/my-leaves");
      return res.data || [];
    },
  });

  const myBalanceQuery = useQuery({
    queryKey: ["my-leave-balance"],
    queryFn: async () => {
      const res = await request.get<LeaveBalance>("leaves/balances/me");
      return res.data;
    },
  });

  const companyLeavesQuery = useQuery({
    queryKey: ["company-leaves", params],
    queryFn: async () => {
      const res = await request.get<LeaveRequest[]>("leaves", params as Record<string, any>);
      return {
        items: res.data || [],
        meta: res.meta || { page: 1, limit: 10, total: res.data?.length || 0, totalPages: 1 },
      };
    },
  });

  const createLeaveMutation = useMutation({
    mutationFn: async (data: CreateLeaveInput) => {
      const res = await request.post<LeaveRequest, CreateLeaveInput>("leaves", data);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      message.success("Gửi đơn xin nghỉ phép thành công!");
      queryClient.invalidateQueries({ queryKey: ["my-leaves"] });
      queryClient.invalidateQueries({ queryKey: ["my-leave-balance"] });
      queryClient.invalidateQueries({ queryKey: ["company-leaves"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const cancelLeaveMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await request.patch<LeaveRequest>(`leaves/${id}/cancel`);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      message.success("Hủy đơn nghỉ phép thành công");
      queryClient.invalidateQueries({ queryKey: ["my-leaves"] });
      queryClient.invalidateQueries({ queryKey: ["my-leave-balance"] });
      queryClient.invalidateQueries({ queryKey: ["company-leaves"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const reviewLeaveMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ReviewLeaveInput }) => {
      const res = await request.patch<LeaveRequest, ReviewLeaveInput>(`leaves/${id}/review`, data);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: (_, vars) => {
      message.success(
        vars.data.status === "APPROVED" ? "Phê duyệt đơn nghỉ phép thành công" : "Đã từ chối đơn nghỉ phép"
      );
      queryClient.invalidateQueries({ queryKey: ["company-leaves"] });
      queryClient.invalidateQueries({ queryKey: ["my-leaves"] });
      queryClient.invalidateQueries({ queryKey: ["my-leave-balance"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  return {
    myLeaves: myLeavesQuery.data || [],
    isLoadingMyLeaves: myLeavesQuery.isLoading,
    myBalance: myBalanceQuery.data,
    isLoadingMyBalance: myBalanceQuery.isLoading,
    companyLeaves: companyLeavesQuery.data?.items || [],
    meta: companyLeavesQuery.data?.meta,
    isLoadingCompanyLeaves: companyLeavesQuery.isLoading,
    createLeave: createLeaveMutation.mutateAsync,
    isCreating: createLeaveMutation.isPending,
    cancelLeave: cancelLeaveMutation.mutateAsync,
    isCancelling: cancelLeaveMutation.isPending,
    reviewLeave: reviewLeaveMutation.mutateAsync,
    isReviewing: reviewLeaveMutation.isPending,
  };
}

