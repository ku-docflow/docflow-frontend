import { useCallback } from "react";
import { generateDocument } from "../../api/gen-bot";
import { Message } from "../../types/message";
import { getSocket } from "../../services/socket";
import { Peer, Team, User } from "../../types/user";

export const useHandleGenerationBotRequest = (
  selectedMessageIds: number[],
  chatRoomId: string,
  currentUser: User | null,
  team: Team | null,
  peer: Peer | null,
  query: string | null,
  topic_id: string | null, //생성될 문서의 topic_id
  resetSelection: () => void,
  setGenerationBotTriggered: (v: boolean) => void,
  setQueryText: (v: string | null) => void,
  setSelectedMessageIds: (v: number[]) => void
) => {
  const handleGenerationBotRequest = useCallback(async () => {
    if (!query || selectedMessageIds.length !== 2) return;

    const [id1, id2] = selectedMessageIds;
    const first_msg_id = Math.min(id1, id2);
    const last_msg_id = Math.max(id1, id2);

    const result = await generateDocument({
      chatroom_id: Number(chatRoomId),
      first_msg_id,
      last_msg_id,
      user_query: query,
      topic_id,
    });

    console.log("Document generation result:", result);

    setSelectedMessageIds([]);

    if (!currentUser) return;

    const newMessage: Message = {
      chatroom_id: chatRoomId,
      type: "default",
      text: query,
      sender: currentUser,
      mentions: [
        {
          userId: "summarybot",
          displayName: "생성봇",
          startIndex: 0, // 제대로된 index 반영하도록 설정
          endIndex: 0,
        },
      ],
      shared_message_id: null,
      shared_message_sender: null,
    };

    const socket = getSocket();
    if (socket?.connected) {
      socket.emit("send_message", {
        chatroom_id: chatRoomId,
        is_searchbot: !team && !peer,
        message: newMessage,
      });
    }

    resetSelection();
    setGenerationBotTriggered(false);
    setQueryText(null);
  }, [selectedMessageIds, chatRoomId, currentUser, query, team, peer]);

  return handleGenerationBotRequest;
};
