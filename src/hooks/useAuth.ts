"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { message } from "@/lib/antd-app";
import { useAuthStore } from "@/stores/auth.store";
import { useI18nStore } from "@/stores/i18n.store";
import { request } from "@/lib/api-client";
import { LoginCredentials, LoginResponse, User } from "@/types/auth.types";

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, accessToken, setAuth, setUser, logout: clearAuth, hasRole } = useAuthStore();
  const { t } = useI18nStore();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const res = await request.post<LoginResponse>("auth/login", credentials);
      if (!res.success) {
        throw new Error(res.message || "Login failed");
      }
      return res.data;
    },
    onSuccess: (data) => {
      setAuth(data);
      message.success(t.auth.loginSuccess);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      message.error(error.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản/mật khẩu.");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const refreshToken = useAuthStore.getState().refreshToken;
      try {
        await request.post("auth/logout", { refreshToken });
      } catch (e) {
        // continue logout on client
      }
    },
    onSettled: () => {
      clearAuth();
      message.info(t.auth.logoutSuccess);
      router.push("/login");
    },
  });

  const meQuery = useQuery({
    queryKey: ["auth-me", accessToken],
    queryFn: async () => {
      const res = await request.get<User>("auth/me");
      if (res.success && res.data) {
        setUser(res.data);
        return res.data;
      }
      return null;
    },
    enabled: !!accessToken && isAuthenticated,
  });

  return {
    user,
    isAuthenticated,
    hasRole,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    currentUser: meQuery.data || user,
    isLoadingUser: meQuery.isLoading,
  };
}

