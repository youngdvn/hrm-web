export type UserRole = "ADMIN" | "HR" | "MANAGER" | "EMPLOYEE";

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string | null;
  isActive?: boolean;
  roles: UserRole[];
  employee?: {
    id: string;
    employeeCode: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
    gender: string;
    status: string;
    department?: {
      id: string;
      name: string;
      code: string;
    } | null;
    position?: {
      id: string;
      title: string;
      code: string;
    } | null;
  } | null;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

