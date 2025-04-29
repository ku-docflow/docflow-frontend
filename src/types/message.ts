import { User } from "./user";

export interface Message {
  id: string;
  text: string;
  chatroom_id: string;
  timestamp: string;
  sender: {
    id: string;
    name: string;
    profile_image: string;
  };
}

export interface ChatroomMessagesResponse {
  chatroom_id: string;
  messages: Message[];
}
