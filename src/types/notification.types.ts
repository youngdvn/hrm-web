export type NotificationType =
  | "LEAVE_STATUS"
  | "PAYROLL_PUBLISHED"
  | "CONTRACT_EXPIRING"
  | "GENERAL";

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  link?: string | null;
  createdAt: string;
}

export interface NotificationMeta {
  total: number;
  unreadCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SendNotificationPayload {
  userId?: string;
  targetAll: boolean;
  title: string;
  message: string;
  type?: NotificationType;
  link?: string;
}
