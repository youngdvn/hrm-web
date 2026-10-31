"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "@/lib/antd-app";
import { request, parseApiError } from "@/lib/api-client";
import { Position } from "@/types/employee.types";

export interface CreatePositionInput {
  code: string;
  title: string;
  description?: string;
}

export function usePositions() {
  const queryClient = useQueryClient();

  const positionsQuery = useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      const res = await request.get<Position[]>("positions");
      return res.data || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreatePositionInput) => {
      const res = await request.post<Position, CreatePositionInput>("positions", data);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      message.success("Thêm chức vụ thành công");
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreatePositionInput> }) => {
      const res = await request.put<Position>(`positions/${id}`, data);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      message.success("Cập nhật chức vụ thành công");
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await request.delete(`positions/${id}`);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      message.success("Xóa chức vụ thành công");
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  return {
    positions: positionsQuery.data || [],
    isLoading: positionsQuery.isLoading,
    createPosition: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updatePosition: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deletePosition: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}

