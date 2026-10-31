export interface ChatUserInfo {
  id: string;
  fullName: string | null;
  email: string;
  avatarUrl: string | null;
  positionTitle: string | null;
  departmentName: string | null;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  sender?: {
    id: string;
    fullName: string | null;
    email: string;
    employee?: {
      avatarUrl?: string | null;
    };
  };
  receiver?: {
    id: string;
    fullName: string | null;
    email: string;
  };
}

export interface ConversationItem {
  partner: ChatUserInfo;
  lastMessage: {
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
    isRead: boolean;
  } | null;
  unreadCount: number;
}

export interface SendMessagePayload {
  receiverId: string;
  content: string;
}

