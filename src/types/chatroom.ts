import { Message } from "./message";

export type ChatroomType = "dm" | "group";

export interface CreateChatroomRequest {
  type: ChatroomType;
  name: string;
  participant_ids: string[];
}

export interface CreateChatroomResponse {
  success: boolean;
  chat_room: {
    id: string;
    type: ChatroomType;
    name: string;
    participant_ids: string[];
  };
}

export interface DirectChatRequest {}
export interface DirectChatResponse {
  chatroom_id: string; //DM chat room id
  messages: Message[];
}

export interface retrieveChatroomHistoryRequest {}

export interface retrieveChatroomHistoryResponse {
  messages: Message[];
}
