import { User } from "./user";

export interface Sender extends User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at?: string;
  profile_image?: string;
  online?: boolean;
}
export interface Message {
  id: string;
  type: "default" | "shared";
  text: string;
  mentions?: Mention[];
  timestamp: string;
  sender: Sender;
  sharedMessage?: {
    originalId: string;
    originalSender: Sender;
  };
}

export interface Mention {
  userId: string;
  displayName: string;
  startIndex: number;
  endIndex: number;
}

export interface ChatroomMessagesResponse {
  chatroom_id: string;
  messages: Message[];
}

interface MentionData {
  id: string;
  display: string;
}

export interface ChatBubbleProps {
  message: string;
  sender: Sender;
  timestamp?: string;
  isCurrentUser: boolean;
  showProfile: boolean;
  mentions?: Mention[];
  onProfileClick?: (sender: Sender) => void;
}
