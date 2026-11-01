"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@/hooks/useChat";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import type { ConversationItem } from "@/types/chat.types";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";

export default function ChatPage() {
  const { user } = useAuthStore();
  const { locale } = useI18nStore();
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPartnerTyping]);

  useEffect(() => {
    if (activePartner?.id) {
      markAsRead(activePartner.id);
    }
  }, [activePartner?.id, messages.length, markAsRead]);

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
      <ChatSidebar
        search={search}
        onSearchChange={setSearch}
        onlineUsers={onlineUsers}
        conversations={conversations}
        isLoading={isLoadingConversations}
        activePartner={activePartner}
        onSelectPartner={setActivePartner}
        currentUserId={user?.id}
        formatTime={formatTime}
      />

      <ChatWindow
        activePartner={activePartner}
        isPartnerOnline={isPartnerOnline}
        messages={messages}
        isLoadingMessages={isLoadingMessages}
        currentUserId={user?.id}
        isPartnerTyping={isPartnerTyping}
        inputText={inputText}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onSend={handleSend}
        isSending={isSending}
        formatTime={formatTime}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
}
