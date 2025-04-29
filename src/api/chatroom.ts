import {
  retrieveChatroomHistoryResponse,
  CreateChatroomRequest,
  CreateChatroomResponse,
  DirectChatQuery,
  DirectChatResponse,
} from "../types/chatroom";
import { get, post } from "./apiClient";

export const fetchChatroomHistory = async (
  chatroomId: string
): Promise<retrieveChatroomHistoryResponse> => {
  return get<retrieveChatroomHistoryResponse>(`/chatroom/team/${chatroomId}`);
};

export const createChatroom = async (
  data: CreateChatroomRequest
): Promise<CreateChatroomResponse> => {
  return post<CreateChatroomResponse, CreateChatroomRequest>("/chatroom", data);
};

export const fetchDirectChat = async (
  data: DirectChatQuery
): Promise<DirectChatResponse> => {
  return post<DirectChatResponse, DirectChatQuery>("/chatroom/direct", data);
};
