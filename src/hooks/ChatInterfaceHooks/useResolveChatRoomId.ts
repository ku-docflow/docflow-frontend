import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Team, Peer } from "../../types/user";
import { RootState } from "../../store";
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
  const userData = useSelector((state: RootState) => state.user.user);

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
        console.log("Direct chat history response:", response);
        setChatRoomId(response.chatroom_id);
        dispatch(
          loadBufferedMessages({
            chatroomId: Number(response.chatroom_id),
            messages: response.messages,
          })
        );
      } else {
        if (!userData?.search_bot_chatroom_id) return;
        setChatRoomId(userData.search_bot_chatroom_id);
        const response = await fetchChatroomHistory(
          Number(userData.search_bot_chatroom_id)
        );
        dispatch(
          loadBufferedMessages({
            chatroomId: Number(userData.search_bot_chatroom_id),
            messages: response.messages,
          })
        );
      }
    };
    resolveChatRoomId();
  }, [team, peer, dispatch, userData]);

  return chatRoomId;
};
