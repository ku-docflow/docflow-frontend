import {
  retrieveChatroomHistoryResponse,
  CreateChatroomRequest,
  CreateChatroomResponse,
  DirectChatResponse,
} from "../types/chatroom";
import { get, post } from "./apiClient";

export const fetchChatroomHistory = async (
  chatroomId: Number
): Promise<retrieveChatroomHistoryResponse> => {
  return get<retrieveChatroomHistoryResponse>(
    `/chat/messages/chatroom_id:${chatroomId}`
  );
};

export const createChatroom = async (
  data: CreateChatroomRequest
): Promise<CreateChatroomResponse> => {
  return post<CreateChatroomResponse, CreateChatroomRequest>("/chatroom", data);
};

export const fetchDirectChatHistory = async (
  peer_id: string
): Promise<DirectChatResponse> => {
  return get<DirectChatResponse>(`/chatroom/direct?peer_id=${peer_id}`);
};
