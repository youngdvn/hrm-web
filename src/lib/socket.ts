import { io, Socket } from "socket.io-client";
import { useAuthStore } from "@/stores/auth.store";

const SOCKET_SERVER_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
  "http://localhost:8000";

let socketInstance: Socket | null = null;

export function getSocket(): Socket | null {
  return socketInstance;
}

export function connectSocket(): Socket {
  const token = useAuthStore.getState().accessToken;

  if (socketInstance && socketInstance.connected) {
    return socketInstance;
  }

  if (socketInstance) {
    socketInstance.disconnect();
  }

  socketInstance = io(SOCKET_SERVER_URL, {
    auth: {
      token,
    },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  });

  socketInstance.on("connect", () => {
    console.log("[Socket.io] Connected to realtime server with ID:", socketInstance?.id);
  });

  socketInstance.on("connect_error", (error) => {
    console.warn("[Socket.io] Connection error:", error.message);
  });

  socketInstance.on("disconnect", (reason) => {
    console.log("[Socket.io] Disconnected:", reason);
  });

  return socketInstance;
}

export function disconnectSocket() {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
}

