import { post } from "./apiClient";
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
} from "../types/auth";

export const login = async (
  data: LoginRequest,
  token: string
): Promise<LoginResponse> => {
  return post<LoginResponse, LoginRequest>("/auth/login", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logout = async (data: LogoutRequest): Promise<LogoutResponse> => {
  return post<LogoutResponse, LogoutRequest>("/auth/logout", data);
};
