"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "@/lib/antd-app";
import { request, parseApiError } from "@/lib/api-client";
import {
  Employee,
  Department,
  Position,
  EmployeeFilterParams,
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from "@/types/employee.types";
import { useI18nStore } from "@/stores/i18n.store";

export const employeeQueryKeys = {
  all: ["employees"] as const,
  list: (params?: EmployeeFilterParams) => ["employees", "list", params] as const,
  departments: ["departments"] as const,
  positions: ["positions"] as const,
  dashboardStats: ["dashboard-stats"] as const,
};

export function useEmployees(params?: EmployeeFilterParams) {
  const queryClient = useQueryClient();
  const { t } = useI18nStore();

  const employeesQuery = useQuery({
    queryKey: employeeQueryKeys.list(params),
    queryFn: async () => {
      const res = await request.get<Employee[]>("employees", params as Record<string, any>);
      return {
        items: res.data || [],
        meta: res.meta || { page: 1, limit: 10, total: res.data?.length || 0, totalPages: 1 },
      };
    },
  });

  const departmentsQuery = useQuery({
    queryKey: employeeQueryKeys.departments,
    queryFn: async () => {
      const res = await request.get<Department[]>("departments");
      return res.data || [];
    },
  });

  const positionsQuery = useQuery({
    queryKey: employeeQueryKeys.positions,
    queryFn: async () => {
      const res = await request.get<Position[]>("positions");
      return res.data || [];
    },
  });

  const createEmployeeMutation = useMutation({
    mutationFn: async (input: CreateEmployeeInput) => {
      const res = await request.post<Employee, CreateEmployeeInput>("employees", input);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      message.success(t.employee.createSuccess);
      queryClient.invalidateQueries({ queryKey: employeeQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: employeeQueryKeys.dashboardStats });
    },
    onError: async (err) => {
      const errMsg = await parseApiError(err);
      message.error(errMsg);
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateEmployeeInput }) => {
      const res = await request.put<Employee, UpdateEmployeeInput>(`employees/${id}`, data);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      message.success(t.employee.updateSuccess);
      queryClient.invalidateQueries({ queryKey: employeeQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: employeeQueryKeys.dashboardStats });
    },
    onError: async (err) => {
      const errMsg = await parseApiError(err);
      message.error(errMsg);
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await request.delete<boolean>(`employees/${id}`);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      message.success(t.employee.deleteSuccess);
      queryClient.invalidateQueries({ queryKey: employeeQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: employeeQueryKeys.dashboardStats });
    },
    onError: async (err) => {
      const errMsg = await parseApiError(err);
      message.error(errMsg);
    },
  });

  return {
    employees: employeesQuery.data?.items || [],
    meta: employeesQuery.data?.meta,
    isLoading: employeesQuery.isLoading,
    isFetching: employeesQuery.isFetching,
    departments: departmentsQuery.data || [],
    positions: positionsQuery.data || [],
    createEmployee: createEmployeeMutation.mutateAsync,
    isCreating: createEmployeeMutation.isPending,
    updateEmployee: updateEmployeeMutation.mutateAsync,
    isUpdating: updateEmployeeMutation.isPending,
    deleteEmployee: deleteEmployeeMutation.mutateAsync,
    isDeleting: deleteEmployeeMutation.isPending,
    refetch: employeesQuery.refetch,
  };
}
