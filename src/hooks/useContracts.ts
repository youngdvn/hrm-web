"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "@/lib/antd-app";
import { request, parseApiError } from "@/lib/api-client";
import {
  Contract,
  CreateContractInput,
  UpdateContractInput,
  ContractFilterParams,
} from "@/types/contract.types";

export function useContracts(params?: ContractFilterParams) {
  const queryClient = useQueryClient();

  const contractsQuery = useQuery({
    queryKey: ["contracts", params],
    queryFn: async () => {
      const res = await request.get<Contract[]>("contracts", params as Record<string, any>);
      return {
        items: res.data || [],
        meta: res.meta || { page: 1, limit: 10, total: res.data?.length || 0, totalPages: 1 },
      };
    },
  });

  const createContractMutation = useMutation({
    mutationFn: async (data: CreateContractInput) => {
      const res = await request.post<Contract, CreateContractInput>("contracts", data);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      message.success("Tạo hợp đồng lao động thành công");
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const updateContractMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateContractInput }) => {
      const res = await request.put<Contract, UpdateContractInput>(`contracts/${id}`, data);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      message.success("Cập nhật hợp đồng thành công");
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const deleteContractMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await request.delete(`contracts/${id}`);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      message.success("Xóa hợp đồng thành công");
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  const uploadContractFileMutation = useMutation({
    mutationFn: async ({ contractId, file }: { contractId: string; file: File }) => {
      const formData = new FormData();
      formData.append("document", file);
      const res = await request.upload<{ fileUrl: string }>(`upload/contract/${contractId}`, formData);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      message.success("Tải lên tệp tài liệu hợp đồng thành công");
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
    },
    onError: async (err) => {
      const msg = await parseApiError(err);
      message.error(msg);
    },
  });

  return {
    contracts: contractsQuery.data?.items || [],
    meta: contractsQuery.data?.meta,
    isLoading: contractsQuery.isLoading,
    createContract: createContractMutation.mutateAsync,
    isCreating: createContractMutation.isPending,
    updateContract: updateContractMutation.mutateAsync,
    isUpdating: updateContractMutation.isPending,
    deleteContract: deleteContractMutation.mutateAsync,
    isDeleting: deleteContractMutation.isPending,
    uploadContractFile: uploadContractFileMutation.mutateAsync,
    isUploadingFile: uploadContractFileMutation.isPending,
  };
}

