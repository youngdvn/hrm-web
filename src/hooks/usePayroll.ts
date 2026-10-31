"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "@/lib/antd-app";
import { request, parseApiError } from "@/lib/api-client";
import {
  PayrollPeriod,
  Payslip,
  CreatePeriodInput,
  CalculatePayrollInput,
} from "@/types/payroll.types";

export function usePayroll() {
  const queryClient = useQueryClient();

  const periodsQuery = useQuery({
    queryKey: ["payroll-periods"],
    queryFn: async () => {
      const res = await request.get<PayrollPeriod[]>("payroll/periods");
      return res.data || [];
    },
  });

  const myPayslipsQuery = useQuery({
    queryKey: ["my-payslips"],
    queryFn: async () => {
      const res = await request.get<Payslip[]>("payroll/my-payslips");
      return res.data || [];
    },
  });

  const createPeriodMutation = useMutation({
    mutationFn: async (data: CreatePeriodInput) => {
      const res = await request.post<PayrollPeriod, CreatePeriodInput>("payroll/periods", data);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      message.success("Tạo kỳ tính lương thành công");
      queryClient.invalidateQueries({ queryKey: ["payroll-periods"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const calculatePeriodMutation = useMutation({
    mutationFn: async ({ periodId, data }: { periodId: string; data?: CalculatePayrollInput }) => {
      const res = await request.post<{ message: string }>(
        `payroll/periods/${periodId}/calculate`,
        data ?? { standardWorkDays: 22 }
      );
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      message.success("Tính toán bảng lương tự động hoàn tất!");
      queryClient.invalidateQueries({ queryKey: ["payroll-periods"] });
      queryClient.invalidateQueries({ queryKey: ["payroll-period-payslips"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const closePeriodMutation = useMutation({
    mutationFn: async (periodId: string) => {
      const res = await request.patch<PayrollPeriod>(`payroll/periods/${periodId}/close`);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      message.success("Đã chốt và đóng kỳ lương thành công (Chuyển trạng thái PAID)");
      queryClient.invalidateQueries({ queryKey: ["payroll-periods"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  return {
    periods: periodsQuery.data || [],
    isLoadingPeriods: periodsQuery.isLoading,
    myPayslips: myPayslipsQuery.data || [],
    isLoadingMyPayslips: myPayslipsQuery.isLoading,
    createPeriod: createPeriodMutation.mutateAsync,
    isCreatingPeriod: createPeriodMutation.isPending,
    calculatePeriod: calculatePeriodMutation.mutateAsync,
    isCalculating: calculatePeriodMutation.isPending,
    closePeriod: closePeriodMutation.mutateAsync,
    isClosingPeriod: closePeriodMutation.isPending,
  };
}

