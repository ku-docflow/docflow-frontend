export interface LoginRequest {
  name: string;
}

export interface LoginResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    created_at: string;
  };
}

export interface LogoutRequest {}

export interface LogoutResponse {
  success: boolean;
  message: string;
}
