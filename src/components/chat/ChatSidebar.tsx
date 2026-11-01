"use client";

import { Input, Avatar, Spin } from "antd";
import { SearchOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import { getMediaUrl } from "@/lib/api-client";
import { useI18nStore } from "@/stores/i18n.store";
import type { ConversationItem } from "@/types/chat.types";

interface ChatSidebarProps {
  search: string;
  onSearchChange: (val: string) => void;
  onlineUsers: string[];
  conversations: ConversationItem[];
  isLoading: boolean;
  activePartner: ConversationItem["partner"] | null;
  onSelectPartner: (partner: ConversationItem["partner"]) => void;
  currentUserId?: string;
  formatTime: (time?: string) => string;
}

export function ChatSidebar({
  search,
  onSearchChange,
  onlineUsers,
  conversations,
  isLoading,
  activePartner,
  onSelectPartner,
  currentUserId,
  formatTime,
}: ChatSidebarProps) {
  const { t } = useI18nStore();

  return (
    <div className="w-80 md:w-96 border-r border-slate-200 flex flex-col bg-slate-50/40 shrink-0">
      {/* Search Header */}
      <div className="p-4 border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2 m-0">
            <MessageOutlined className="text-blue-600" />
            {t.chat.title}
          </h1>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
              {onlineUsers.length} {t.chat.onlineUsers}
            </span>
          </div>
        </div>
        <Input
          placeholder={t.chat.searchPlaceholder}
          prefix={<SearchOutlined className="text-slate-400 mr-1" />}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          allowClear
          className="rounded-lg"
        />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <Spin />
          </div>
        ) : conversations.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            {t.chat.noColleagues}
          </div>
        ) : (
          conversations.map((item) => {
            const isSelected = activePartner?.id === item.partner.id;
            const hasUnread = item.unreadCount > 0;
            const isOnline = onlineUsers.includes(item.partner.id);

            return (
              <div
                key={item.partner.id}
                onClick={() => onSelectPartner(item.partner)}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors relative ${isSelected
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
                      className={`text-sm truncate ${hasUnread ? "font-bold text-slate-900" : "font-medium text-slate-800"
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
                    className={`text-xs truncate m-0 ${hasUnread
                        ? "font-semibold text-slate-800"
                        : "text-slate-500"
                      }`}
                  >
                    {item.lastMessage ? (
                      <>
                        {item.lastMessage.senderId === currentUserId && (
                          <span className="text-slate-400">{t.chat.you}: </span>
                        )}
                        {item.lastMessage.content}
                      </>
                    ) : (
                      <span className="italic text-slate-400">{t.chat.noMessages}</span>
                    )}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

