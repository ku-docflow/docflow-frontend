import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Team, Peer } from "../../types/user";
import { loadBufferedMessages } from "../../store/slices/messageSlice";
import {
  fetchChatroomHistory,
  fetchDirectChatHistory,
} from "../../api/chatroom";

export const useResolveChatRoomId = (
  team: Team | null,
  peer: Peer | null
): string => {
  const [chatRoomId, setChatRoomId] = useState("0");
  const dispatch = useDispatch();

  useEffect(() => {
    const resolveChatRoomId = async () => {
      if (team && !peer) {
        setChatRoomId(team.chatroom_id);
        const response = await fetchChatroomHistory(Number(team.chatroom_id));
        dispatch(
          loadBufferedMessages({
            chatroomId: Number(team.chatroom_id),
            messages: response.messages,
          })
        );
      } else if (peer && !team) {
        const response = await fetchDirectChatHistory(peer.id);
        setChatRoomId(response.chatroom_id);
        dispatch(
          loadBufferedMessages({
            chatroomId: Number(response.chatroom_id),
            messages: response.messages,
          })
        );
      } else if (peer && team) {
        setChatRoomId("0");
      }
    };
    resolveChatRoomId();
  }, [team, peer, dispatch]);

  return chatRoomId;
};
