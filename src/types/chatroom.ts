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

export interface DirectChatQuery {
  user_id: string;
  peer_id: string;
}

export interface DirectChatResponse {
  chatroom_id: string;
  messages: Message[];
}

export interface retrieveChatroomHistoryRequest {}

export interface retrieveChatroomHistoryResponse {
  chatroom_id: string;
  messages: Message[];
}
