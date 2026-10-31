import ky, { BeforeRequestHook, AfterResponseHook, HTTPError } from "ky";
import { useAuthStore } from "@/stores/auth.store";
import { ApiResponse } from "@/types/api.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const beforeRequestHook: BeforeRequestHook = ({ request }) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
};

const afterResponseHook: AfterResponseHook = async ({ request, response }) => {
  if (
    response.status === 401 &&
    !request.url.includes("/auth/login") &&
    !request.url.includes("/auth/refresh")
  ) {
    const { refreshToken, setTokens, logout } = useAuthStore.getState();

    if (!refreshToken) {
      logout();
      return response;
    }

    try {
      const refreshRes = await ky
        .post(`${API_BASE_URL}/auth/refresh`, {
          json: { refreshToken },
        })
        .json<ApiResponse<{ accessToken: string }>>();

      if (refreshRes.success && refreshRes.data?.accessToken) {
        const newAccessToken = refreshRes.data.accessToken;
        setTokens(newAccessToken);
        request.headers.set("Authorization", `Bearer ${newAccessToken}`);
        return ky(request);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  }

  return response;
};

export const apiClient = ky.create({
  prefix: API_BASE_URL,
  timeout: 30000,
  hooks: {
    beforeRequest: [beforeRequestHook],
    afterResponse: [afterResponseHook],
  },
});

export async function parseApiError(error: unknown): Promise<string> {
  if (error instanceof HTTPError) {
    try {
      const errorJson = (await error.response.json()) as ApiResponse<unknown>;
      if (errorJson.message) {
        if (errorJson.error?.details && Array.isArray(errorJson.error.details)) {
          const detailMsgs = errorJson.error.details
            .map((d: { field?: string; message?: string }) => d.message || d.field)
            .filter(Boolean)
            .join(", ");
          return `${errorJson.message}: ${detailMsgs}`;
        }
        return errorJson.message;
      }
    } catch {
      return `Lỗi HTTP ${error.response.status}: ${error.response.statusText}`;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Đã xảy ra lỗi không xác định. Vui lòng thử lại.";
}

export const request = {
  get: async <T>(url: string, searchParams?: Record<string, string | number | boolean | undefined>): Promise<ApiResponse<T>> => {
    const cleanParams: Record<string, string | number | boolean> = {};
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, val]) => {
        if (val !== undefined && val !== "") {
          cleanParams[key] = val;
        }
      });
    }
    return apiClient.get(url, { searchParams: cleanParams }).json<ApiResponse<T>>();
  },
  post: async <T, B = unknown>(url: string, json?: B): Promise<ApiResponse<T>> => {
    return apiClient.post(url, { json }).json<ApiResponse<T>>();
  },
  put: async <T, B = unknown>(url: string, json?: B): Promise<ApiResponse<T>> => {
    return apiClient.put(url, { json }).json<ApiResponse<T>>();
  },
  patch: async <T, B = unknown>(url: string, json?: B): Promise<ApiResponse<T>> => {
    return apiClient.patch(url, { json }).json<ApiResponse<T>>();
  },
  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    return apiClient.delete(url).json<ApiResponse<T>>();
  },
  upload: async <T>(url: string, formData: FormData): Promise<ApiResponse<T>> => {
    return apiClient.post(url, { body: formData }).json<ApiResponse<T>>();
  },
};

export function getMediaUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1").replace("/api/v1", "");
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}
