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
  setQueryText: (v: string | null) => void
) => {
  const sendMessage = async (text: string, mentions: Mention[]) => {
    if (!text?.trim() || !currentUser) return;

    const newMessage: Message = {
      chatroom_id: chatRoomId,
      type: "default",
      text: text,
      sender: currentUser,
      mentions,
      shared_message_id: null,
      shared_message_sender: null,
    };

    if (mentions.some((m) => m.userId === "generationBot")) {
      setSummaryBotTriggered(true);
      setQueryText(text);
      console.log("gen bot triggered with text:", text);
      return;
    }

    const socket = getSocket();
    if (socket?.connected) {
      socket.emit("send_message", {
        chatroom_id: chatRoomId,
        is_searchbot: !team && !peer,
        message: newMessage,
      });
    } else {
      console.error("Socket is not connected");
    }
  };

  return sendMessage;
};
