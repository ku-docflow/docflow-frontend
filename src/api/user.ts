// src/api/user.ts

import { get, patch } from "./apiClient";
import {
  InitUserResponse,
  PatchUserNameRequest,
  PatchUserNameResponse,
} from "../types/user";

export const fetchInitUserData = async (): Promise<InitUserResponse> => {
  return get<InitUserResponse>("/user/init");
};

export const patchUserName = async (
  data: PatchUserNameRequest
): Promise<PatchUserNameResponse> => {
  return patch<PatchUserNameResponse>("/user/name", data);
};
