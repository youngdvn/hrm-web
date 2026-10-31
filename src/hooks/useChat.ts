"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { request, parseApiError } from "@/lib/api-client";
import { message } from "@/lib/antd-app";
import { useAuthStore } from "@/stores/auth.store";
import { connectSocket, getSocket } from "@/lib/socket";
import type {
  ChatMessage,
  ConversationItem,
  SendMessagePayload,
} from "@/types/chat.types";

export const chatQueryKeys = {
  all: ["chat"] as const,
  conversations: (search?: string) => ["chat", "conversations", search] as const,
  messages: (partnerId: string) => ["chat", "messages", partnerId] as const,
  unreadCount: ["chat", "unreadCount"] as const,
};

export function useChat(activePartnerId?: string, search?: string) {
  const queryClient = useQueryClient();
  const { user, isAuthenticated, accessToken } = useAuthStore();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isPartnerTyping, setIsPartnerTyping] = useState<boolean>(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Khởi tạo kết nối Socket.io và lắng nghe các sự kiện Realtime
  useEffect(() => {
    if (!isAuthenticated || !accessToken) return;

    const socket = connectSocket();

    // 1. Nhận danh sách user đang trực tuyến
    const handleOnlineUsers = (users: string[]) => {
      setOnlineUsers(users);
    };

    // 2. Nhận tin nhắn mới tức thì
    const handleNewMessage = (newMsg: ChatMessage) => {
      // Nếu tin nhắn thuộc về cuộc hội thoại đang mở
      if (
        (activePartnerId && newMsg.senderId === activePartnerId) ||
        (activePartnerId && newMsg.receiverId === activePartnerId && newMsg.senderId === user?.id)
      ) {
        queryClient.setQueryData<ChatMessage[]>(
          chatQueryKeys.messages(activePartnerId),
          (prev = []) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          }
        );

        // Nếu đối tác gửi tin đến màn hình đang mở, phát lại sự kiện đã xem
        if (newMsg.senderId === activePartnerId) {
          socket.emit("message_read", { partnerId: activePartnerId });
        }
      }

      // Cập nhật danh sách cuộc hội thoại bên trái
      queryClient.setQueryData<ConversationItem[]>(
        chatQueryKeys.conversations(search),
        (prev = []) => {
          const partnerId = newMsg.senderId === user?.id ? newMsg.receiverId : newMsg.senderId;
          const exists = prev.find((c) => c.partner.id === partnerId);

          if (!exists) {
            queryClient.invalidateQueries({ queryKey: ["chat", "conversations"] });
            return prev;
          }

          const updated = prev.map((item) => {
            if (item.partner.id === partnerId) {
              const isCurrentChat = activePartnerId === partnerId;
              const newUnread =
                newMsg.senderId !== user?.id && !isCurrentChat
                  ? item.unreadCount + 1
                  : item.unreadCount;

              return {
                ...item,
                lastMessage: {
                  id: newMsg.id,
                  content: newMsg.content,
                  senderId: newMsg.senderId,
                  createdAt: newMsg.createdAt,
                  isRead: newMsg.isRead,
                },
                unreadCount: newUnread,
              };
            }
            return item;
          });

          // Đưa người vừa có tin nhắn mới lên đầu danh sách
          return updated.sort((a, b) => {
            if (a.partner.id === partnerId) return -1;
            if (b.partner.id === partnerId) return 1;
            return 0;
          });
        }
      );

      // Cập nhật badge tổng số tin chưa đọc
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.unreadCount });
    };

    // 3. Nhận sự kiện đối tác đã đọc tin nhắn
    const handleMessagesRead = ({ readByUserId }: { readByUserId: string }) => {
      if (activePartnerId && readByUserId === activePartnerId) {
        queryClient.setQueryData<ChatMessage[]>(
          chatQueryKeys.messages(activePartnerId),
          (prev = []) => {
            return prev.map((m) =>
              m.senderId === user?.id ? { ...m, isRead: true } : m
            );
          }
        );
      }
    };

    // 4. Nhận sự kiện đang soạn tin nhắn (typing)
    const handleUserTyping = ({
      fromUserId,
      isTyping,
    }: {
      fromUserId: string;
      isTyping: boolean;
    }) => {
      if (fromUserId === activePartnerId) {
        setIsPartnerTyping(isTyping);

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        if (isTyping) {
          // Tự động tắt typing sau 3s nếu không nhận thêm tín hiệu
          typingTimeoutRef.current = setTimeout(() => {
            setIsPartnerTyping(false);
          }, 3000);
        }
      }
    };

    socket.on("online_users", handleOnlineUsers);
    socket.on("new_message", handleNewMessage);
    socket.on("messages_read", handleMessagesRead);
    socket.on("user_typing", handleUserTyping);

    return () => {
      socket.off("online_users", handleOnlineUsers);
      socket.off("new_message", handleNewMessage);
      socket.off("messages_read", handleMessagesRead);
      socket.off("user_typing", handleUserTyping);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [activePartnerId, isAuthenticated, accessToken, user?.id, search, queryClient]);

  // Query: Danh sách hội thoại
  const conversationsQuery = useQuery({
    queryKey: chatQueryKeys.conversations(search),
    queryFn: async () => {
      const res = await request.get<ConversationItem[]>("chat/conversations", {
        search: search || undefined,
      });
      return res.data || [];
    },
    enabled: isAuthenticated,
    refetchInterval: 30000, // Có socket realtime nên giảm tần suất polling
  });

  // Query: Danh sách tin nhắn đối tác đang chọn
  const messagesQuery = useQuery({
    queryKey: chatQueryKeys.messages(activePartnerId || ""),
    queryFn: async () => {
      if (!activePartnerId) return [];
      const res = await request.get<ChatMessage[]>(`chat/messages/${activePartnerId}`, {
        limit: 100,
      });
      return res.data || [];
    },
    enabled: isAuthenticated && !!activePartnerId,
    refetchInterval: 30000,
  });

  // Query: Tổng số tin nhắn chưa đọc
  const unreadCountQuery = useQuery({
    queryKey: chatQueryKeys.unreadCount,
    queryFn: async () => {
      const res = await request.get<{ unreadCount: number }>("chat/unread-count");
      return res.data?.unreadCount || 0;
    },
    enabled: isAuthenticated,
    refetchInterval: 30000,
  });

  // Gửi tin nhắn qua REST API (và được socket broadcast ngay lập tức)
  const sendMessageMutation = useMutation({
    mutationFn: async (payload: SendMessagePayload) => {
      const res = await request.post<ChatMessage>("chat/messages", payload);
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: chatQueryKeys.messages(variables.receiverId),
      });
      queryClient.invalidateQueries({
        queryKey: ["chat", "conversations"],
      });
      queryClient.invalidateQueries({
        queryKey: chatQueryKeys.unreadCount,
      });
    },
    onError: async (err) => {
      const errMsg = await parseApiError(err);
      message.error(errMsg);
    },
  });

  // Đánh dấu đã đọc
  const markAsReadMutation = useMutation({
    mutationFn: async (partnerId: string) => {
      await request.patch(`chat/read/${partnerId}`);
      const socket = getSocket();
      socket?.emit("message_read", { partnerId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat", "conversations"],
      });
      queryClient.invalidateQueries({
        queryKey: chatQueryKeys.unreadCount,
      });
    },
  });

  // Phát sự kiện đang gõ phím
  const sendTypingStatus = useCallback(
    (isTyping: boolean) => {
      if (!activePartnerId) return;
      const socket = getSocket();
      if (!socket || !socket.connected) return;

      if (isTyping) {
        socket.emit("typing_start", { toUserId: activePartnerId });
      } else {
        socket.emit("typing_stop", { toUserId: activePartnerId });
      }
    },
    [activePartnerId]
  );

  return {
    conversations: conversationsQuery.data || [],
    isLoadingConversations: conversationsQuery.isLoading,
    messages: messagesQuery.data || [],
    isLoadingMessages: messagesQuery.isLoading,
    unreadCount: unreadCountQuery.data || 0,
    sendMessage: sendMessageMutation.mutateAsync,
    isSending: sendMessageMutation.isPending,
    markAsRead: markAsReadMutation.mutate,
    onlineUsers,
    isPartnerOnline: activePartnerId ? onlineUsers.includes(activePartnerId) : false,
    isPartnerTyping,
    sendTypingStatus,
  };
}
