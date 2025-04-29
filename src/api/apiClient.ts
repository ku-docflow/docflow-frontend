// src/api/apiClient.ts
import axios, { AxiosRequestConfig } from "axios";
import { getAuth } from "firebase/auth";

const rawBaseURL =
  process.env.REACT_APP_BACKEND_ENDPOINT || "http://localhost:4000";
const baseURL = rawBaseURL.startsWith("http")
  ? rawBaseURL
  : `http://${rawBaseURL}`;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && config.headers) {
      const token = await user.getIdToken();
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.get<T>(url, config);
  return response.data;
};

export const post = async <T, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.post<T>(url, body, config);
  return response.data;
};

export const put = async <T, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.put<T>(url, body, config);
  return response.data;
};

export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.delete<T>(url, config);
  return response.data;
};

export const patch = async <T, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.patch<T>(url, body, config);
  return response.data;
};
