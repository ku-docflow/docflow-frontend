import { Peer, Team, User } from "../../types/user";
import { Mention } from "../../types/message";
import { getSocket } from "../../services/socket";
import { Message } from "../../types/message";

export const useHandleSendMessage = (
  chatRoomId: string,
  currentUser: User | null,
  team: Team | null,
  peer: Peer | null,
  setSummaryBotTriggered: (v: boolean) => void,
  setQueryText: (v: string | null) => void,
  setSearchPending: (v: boolean) => void,
  isSearchBot?: boolean
) => {
  const sendMessage = async (
    text: string,
    mentions: Mention[],
    sharedMessage?: {
      text: string;
      sender: {
        id: string;
        first_name: string;
        last_name: string;
        profile_image?: string;
      };
      id?: string;
    } | null
  ) => {
    if (!text?.trim() || !currentUser) return;

    const newMessage: Message = {
      chatroom_id: chatRoomId,
      type: sharedMessage ? "shared" : "default",
      text: text,
      sender: currentUser,
      mentions,
      shared_message_id: sharedMessage?.id ?? null,
      shared_message_sender: sharedMessage?.sender ?? null,
    };

    if (mentions.some((m) => m.userId === "generationBot")) {
      setSummaryBotTriggered(true);
      setQueryText(text);
      return;
    }

    const socket = getSocket();
    if (socket?.connected) {
      socket.emit("send_message", {
        chatroom_id: chatRoomId,
        is_searchbot: !team && !peer,
        message: newMessage,
      });

      if (isSearchBot) {
        setSearchPending(true);
      }
    } else {
      console.error("Socket is not connected");
    }
  };

  return sendMessage;
};
