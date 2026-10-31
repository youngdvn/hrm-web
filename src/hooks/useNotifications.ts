"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { request, parseApiError } from "@/lib/api-client";
import { message } from "@/lib/antd-app";
import {
  AppNotification,
  NotificationMeta,
  SendNotificationPayload,
} from "@/types/notification.types";
import { useAuthStore } from "@/stores/auth.store";

export const notificationQueryKeys = {
  all: ["notifications"] as const,
};

export function useNotifications() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const notificationsQuery = useQuery({
    queryKey: notificationQueryKeys.all,
    queryFn: async () => {
      const res = await request.get<AppNotification[]>("notifications", { limit: 15 });
      return {
        items: res.data || [],
        meta: (res.meta as unknown as NotificationMeta) || {
          total: 0,
          unreadCount: 0,
          page: 1,
          limit: 15,
          totalPages: 1,
        },
      };
    },
    enabled: isAuthenticated,
    refetchInterval: 30000,
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      await request.patch(`notifications/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      await request.patch("notifications/read-all");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all });
    },
  });

  const sendNotificationMutation = useMutation({
    mutationFn: async (payload: SendNotificationPayload) => {
      const res = await request.post<{ count: number; message: string }>(
        "notifications/send",
        payload
      );
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: (data) => {
      message.success(data?.message || "Gửi thông báo thành công!");
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all });
    },
    onError: async (err) => {
      const errMsg = await parseApiError(err);
      message.error(errMsg);
    },
  });

  return {
    notifications: notificationsQuery.data?.items || [],
    unreadCount: notificationsQuery.data?.meta?.unreadCount || 0,
    isLoading: notificationsQuery.isLoading,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
    isMarkingAll: markAllAsReadMutation.isPending,
    sendNotification: sendNotificationMutation.mutateAsync,
    isSending: sendNotificationMutation.isPending,
  };
}
