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
  id?: string;
  text: string;
  chatroom_id: string;
  timestamp?: string;
  type: "default" | "shared";
  sender: Sender;
  mentions?: Mention[];
  shared_message_id?: string | null;
  shared_message_sender?: {
    id: string;
    first_name: string;
    last_name: string;
    profile_image?: string;
  } | null;
  shared_message_text?: string | null;
}

export interface Mention {
  userId: string;
  displayName?: string;
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
  message: Message;
  isCurrentUser: boolean;
  showProfile: boolean;
  onProfileClick?: (sender: Sender) => void;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}
