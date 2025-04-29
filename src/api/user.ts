// src/api/user.ts

import { get } from "./apiClient";
import { InitUserResponse } from "../types/user";

export const fetchInitUserData = async (): Promise<InitUserResponse> => {
  return get<InitUserResponse>("/user/init");
};
