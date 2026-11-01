"use client";

import { useState, useEffect, useRef } from "react";
import {
  Input,
  Avatar,
  Badge,
  Tag,
  Button,
  Spin,
  Empty,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  SendOutlined,
  MessageOutlined,
  UserOutlined,
  CheckOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { useChat } from "@/hooks/useChat";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import { getMediaUrl } from "@/lib/api-client";
import type { ConversationItem } from "@/types/chat.types";

export default function ChatPage() {
  const { user } = useAuthStore();
  const { t, locale } = useI18nStore();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [activePartner, setActivePartner] = useState<ConversationItem["partner"] | null>(null);
  const [inputText, setInputText] = useState("");
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    conversations,
    isLoadingConversations,
    messages,
    isLoadingMessages,
    sendMessage,
    isSending,
    markAsRead,
    onlineUsers,
    isPartnerOnline,
    isPartnerTyping,
    sendTypingStatus,
  } = useChat(activePartner?.id, debouncedSearch);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cuộn xuống tin nhắn mới nhất khi messages hoặc typing status cập nhật
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPartnerTyping]);

  // Tự động đánh dấu đã đọc khi mở hội thoại có tin chưa đọc
  useEffect(() => {
    if (activePartner?.id) {
      markAsRead(activePartner.id);
    }
  }, [activePartner?.id, messages.length, markAsRead]);

  // Format thời gian hiển thị thân thiện
  const formatTime = (isoString?: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) {
      return date.toLocaleTimeString(locale === "vi" ? "vi-VN" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);

    if (val.trim()) {
      sendTypingStatus(true);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => {
        sendTypingStatus(false);
      }, 1500);
    } else {
      sendTypingStatus(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || !activePartner || isSending) return;
    const content = inputText.trim();
    setInputText("");

    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    sendTypingStatus(false);

    await sendMessage({
      receiverId: activePartner.id,
      content,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-125px)] min-h-[550px] bg-white rounded-2xl border border-slate-200/80 shadow-xs flex overflow-hidden">
      {/* CỘT TRÁI: DANH SÁCH ĐỒNG NGHIỆP & HỘI THOẠI */}
      <div className="w-80 md:w-96 border-r border-slate-200 flex flex-col bg-slate-50/40 shrink-0">
        {/* Header tìm kiếm */}
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2 m-0">
              <MessageOutlined className="text-blue-600" />
              {t.common.chat}
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                {onlineUsers.length} đang online
              </span>
            </div>
          </div>
          <Input
            placeholder="Tìm theo tên, email, phòng ban..."
            prefix={<SearchOutlined className="text-slate-400 mr-1" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
            className="rounded-lg"
          />
        </div>

        {/* Danh sách người dùng */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {isLoadingConversations ? (
            <div className="flex items-center justify-center h-48">
              <Spin />
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              Không tìm thấy đồng nghiệp nào
            </div>
          ) : (
            conversations.map((item) => {
              const isSelected = activePartner?.id === item.partner.id;
              const hasUnread = item.unreadCount > 0;
              const isOnline = onlineUsers.includes(item.partner.id);

              return (
                <div
                  key={item.partner.id}
                  onClick={() => setActivePartner(item.partner)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors relative ${
                    isSelected
                      ? "bg-blue-50/70 border-l-4 border-blue-600"
                      : "hover:bg-slate-100/60"
                  }`}
                >
                  <div className="relative">
                    <Avatar
                      src={getMediaUrl(item.partner.avatarUrl)}
                      icon={!item.partner.avatarUrl && <UserOutlined />}
                      size={44}
                      className="!bg-blue-600 font-semibold shrink-0"
                    >
                      {item.partner.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </Avatar>
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-500/20" />
                    )}
                    {hasUnread && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
                        {item.unreadCount > 9 ? "9+" : item.unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-sm truncate ${
                          hasUnread ? "font-bold text-slate-900" : "font-medium text-slate-800"
                        }`}
                      >
                        {item.partner.fullName || item.partner.email}
                      </span>
                      {item.lastMessage && (
                        <span className="text-[11px] text-slate-400 shrink-0 ml-1">
                          {formatTime(item.lastMessage.createdAt)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 mb-1">
                      {item.partner.positionTitle && (
                        <span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-200/60 text-slate-600 truncate max-w-[120px]">
                          {item.partner.positionTitle}
                        </span>
                      )}
                      {item.partner.departmentName && (
                        <span className="text-[11px] text-slate-400 truncate">
                          • {item.partner.departmentName}
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-xs truncate m-0 ${
                        hasUnread
                          ? "font-semibold text-slate-800"
                          : "text-slate-500"
                      }`}
                    >
                      {item.lastMessage ? (
                        <>
                          {item.lastMessage.senderId === user?.id && (
                            <span className="text-slate-400">Bạn: </span>
                          )}
                          {item.lastMessage.content}
                        </>
                      ) : (
                        <span className="italic text-slate-400">Chưa có tin nhắn</span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* CỘT PHẢI: KHUNG CHAT CHI TIẾT */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {activePartner ? (
          <>
            {/* Header người đang chat */}
            <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-white shadow-xs">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar
                    src={getMediaUrl(activePartner.avatarUrl)}
                    icon={!activePartner.avatarUrl && <UserOutlined />}
                    size={42}
                    className="!bg-blue-600 font-semibold"
                  >
                    {activePartner.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </Avatar>
                  {isPartnerOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-500/20" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800 text-base">
                      {activePartner.fullName || activePartner.email}
                    </span>
                    {isPartnerOnline ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Đang trực tuyến
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        Ngoại tuyến
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{activePartner.email}</span>
                    {activePartner.positionTitle && <span>• {activePartner.positionTitle}</span>}
                    {activePartner.departmentName && <span>({activePartner.departmentName})</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Thân danh sách tin nhắn */}
            <div className="flex-1 p-5 overflow-y-auto space-y-3 bg-slate-50/60">
              {isLoadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <Spin />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm">
                  <MessageOutlined className="text-4xl text-slate-300 mb-2" />
                  <p>Chưa có tin nhắn nào giữa hai người.</p>
                  <p className="text-xs text-slate-400">Hãy gửi lời chào đầu tiên!</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.senderId === user?.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-end gap-2 max-w-[75%]">
                        {!isMe && (
                          <Avatar
                            src={getMediaUrl(activePartner.avatarUrl)}
                            icon={!activePartner.avatarUrl && <UserOutlined />}
                            size={28}
                            className="!bg-blue-600 shrink-0 mb-1"
                          >
                            {activePartner.fullName?.charAt(0)?.toUpperCase() || "U"}
                          </Avatar>
                        )}
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words shadow-2xs ${
                            isMe
                              ? "bg-blue-600 text-white rounded-br-xs"
                              : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mt-1 px-1 text-[11px] text-slate-400">
                        <span>{formatTime(msg.createdAt)}</span>
                        {isMe && (
                          <span className="flex items-center ml-0.5">
                            {msg.isRead ? (
                              <Tooltip title="Đã xem">
                                <CheckCircleFilled className="text-blue-500 text-[10px]" />
                              </Tooltip>
                            ) : (
                              <Tooltip title="Đã gửi">
                                <CheckOutlined className="text-slate-400 text-[10px]" />
                              </Tooltip>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}

              {/* Chỉ báo đang soạn tin nhắn (Realtime Typing Indicator) */}
              {isPartnerTyping && (
                <div className="flex items-end gap-2 text-slate-500 animate-fade-in">
                  <Avatar
                    src={getMediaUrl(activePartner.avatarUrl)}
                    icon={!activePartner.avatarUrl && <UserOutlined />}
                    size={28}
                    className="!bg-blue-600 shrink-0 mb-1"
                  >
                    {activePartner.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </Avatar>
                  <div className="bg-white border border-slate-200 px-3 py-2 rounded-2xl rounded-bl-xs flex items-center gap-2 shadow-2xs">
                    <span className="text-xs text-slate-500">
                      {activePartner.fullName || "Đồng nghiệp"} đang soạn tin
                    </span>
                    <span className="inline-flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Khung nhập tin nhắn */}
            <div className="p-3.5 border-t border-slate-200 bg-white">
              <div className="flex items-end gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <Input.TextArea
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập tin nhắn... (Nhấn Enter để gửi, Shift+Enter xuống dòng)"
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  bordered={false}
                  className="!resize-none text-sm !bg-transparent p-1 focus:!shadow-none"
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSend}
                  loading={isSending}
                  disabled={!inputText.trim()}
                  className="rounded-lg h-9 px-4 shrink-0 !bg-blue-600"
                >
                  Gửi
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/30">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-4 shadow-xs">
              <MessageOutlined />
            </div>
            <h3 className="text-base font-semibold text-slate-800 mb-1">
              {t.common.chat}
            </h3>
            <p className="text-sm text-slate-500 max-w-sm">
              Chọn một đồng nghiệp từ danh sách bên trái để bắt đầu cuộc trò chuyện trực tuyến tức thì.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
