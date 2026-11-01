"use client";

import { RefObject } from "react";
import { Avatar, Input, Button, Spin, Tooltip } from "antd";
import {
  SendOutlined,
  MessageOutlined,
  UserOutlined,
  CheckOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { getMediaUrl } from "@/lib/api-client";
import { useI18nStore } from "@/stores/i18n.store";
import type { ChatMessage, ConversationItem } from "@/types/chat.types";

interface ChatWindowProps {
  activePartner: ConversationItem["partner"] | null;
  isPartnerOnline: boolean;
  messages: ChatMessage[];
  isLoadingMessages: boolean;
  currentUserId?: string;
  isPartnerTyping: boolean;
  inputText: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  isSending: boolean;
  formatTime: (time?: string) => string;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export function ChatWindow({
  activePartner,
  isPartnerOnline,
  messages,
  isLoadingMessages,
  currentUserId,
  isPartnerTyping,
  inputText,
  onInputChange,
  onKeyDown,
  onSend,
  isSending,
  formatTime,
  messagesEndRef,
}: ChatWindowProps) {
  const { t } = useI18nStore();

  if (!activePartner) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/30">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-4 shadow-xs">
          <MessageOutlined />
        </div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">
          {t.chat.title}
        </h3>
        <p className="text-sm text-slate-500 max-w-sm">
          {t.chat.selectConversation}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header */}
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
                  Online
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Offline
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

      {/* Messages Timeline */}
      <div className="flex-1 p-5 overflow-y-auto space-y-3 bg-slate-50/60">
        {isLoadingMessages ? (
          <div className="flex items-center justify-center h-full">
            <Spin />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm">
            <MessageOutlined className="text-4xl text-slate-300 mb-2" />
            <p>{t.chat.noMessages}</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === currentUserId;
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
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words shadow-2xs ${isMe
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
                        <Tooltip title={t.chat.messageSeen}>
                          <CheckCircleFilled className="text-blue-500 text-[10px]" />
                        </Tooltip>
                      ) : (
                        <Tooltip title={t.chat.messageSent}>
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

        {/* Realtime Typing Indicator */}
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
                {activePartner.fullName || t.chat.colleague} {t.chat.typing}
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

      {/* Input Form */}
      <div className="p-3.5 border-t border-slate-200 bg-white">
        <div className="flex items-end gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <Input.TextArea
            value={inputText}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            placeholder={t.chat.inputPlaceholder}
            autoSize={{ minRows: 1, maxRows: 4 }}
            variant={"borderless"}
            className="!resize-none text-sm !bg-transparent p-1 focus:!shadow-none"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={onSend}
            loading={isSending}
            disabled={!inputText.trim()}
            className="rounded-lg h-9 px-4 shrink-0 !bg-blue-600"
          >
            {t.chat.send}
          </Button>
        </div>
      </div>
    </div>
  );
}

