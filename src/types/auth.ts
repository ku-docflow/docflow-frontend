export interface LoginRequest {
  first_name: string;
  last_name: string;
}

export interface LoginResponse {
  success: boolean;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
  };
}

export interface LogoutRequest {}

export interface LogoutResponse {
  success: boolean;
  message: string;
}
