import React, { useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import ChatBubble from "./ChatBubbles";
import MentionInput from "./MentionInput";
import { createMentionData } from "../../../utils/ChatInterfaceUtils/mentionUtils";
import "../../../styles/MainInterface/common/ChatInterface.css";
import { Message, Mention } from "../../../types/message"
import { getSocket } from "../../../services/socket";
import { Team, Peer } from "../../../types/user";
import { useResolveChatRoomId } from "../../../hooks/ChatInterfaceHooks/useResolveChatRoomId";
import { useStickyScroll } from "../../../hooks/ChatInterfaceHooks/useStickyScroll";

export interface MentionData {
  id: string;
  display: string;
}

interface ChatInterfaceProps {
  team: Team | null;
  peer: Peer | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ team, peer }) => {
  const chatRoomId = useResolveChatRoomId(team, peer); //retrieves chat room id for communication
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const allMessagesByRoom = useSelector((state: RootState) => state.messages);
  const messages = useMemo(() => {
    return allMessagesByRoom[Number(chatRoomId)] || [];
  }, [allMessagesByRoom, chatRoomId]);
  const orgs = useSelector((state: RootState) => state.user.orgs);
  const currentUser = useSelector((state: RootState) => state.user.user);

  const peers = orgs.flatMap((org) =>
    org.teams.flatMap((team) =>
      team.chatroom_id === chatRoomId ? team.peers : []
    )
  );

  const mentionData = createMentionData(peers); //mentionable peers를 담고있는 구조체

  const { scrollToBottom, showNewMsgAlert } = useStickyScroll(messages, currentUser, chatMessagesRef, messagesEndRef);

  const handleSendMessage = async (text: string, mentions: Mention[]) => {
    if (!text.trim() || !currentUser) return;

    const newMessage: Message = {
      chatroom_id: chatRoomId,
      type: "default",
      text: text,
      sender: currentUser,
      mentions,
      shared_message_id: null,
      shared_message_sender: null,
    };

    const socket = getSocket();
    if (socket?.connected) {
      socket.emit("send_message", {
        chatroom_id: chatRoomId,
        message: newMessage,
      });
    } else {
      console.error("Socket is not connected");
    }

    const mentionedIds = mentions.map((m) => m.userId);
    if (mentionedIds.includes("summarybot")) {
      console.log(`[summaryBotDummyApi] called with chatroomId=${chatRoomId}, message=${text}`);
    }
    if (mentionedIds.includes("createbot")) {
      console.log(`[createBotDummyApi] called with chatroomId=${chatRoomId}, message=${text}`);
    }
  };

  return (
    <div className="chat-interface" onDragOver={(e) => e.preventDefault()} onDrop={(e) => e.preventDefault()}>
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((msg, index) => {
          const prevMessage = messages[index - 1];
          const showProfile = !prevMessage || prevMessage.sender.id !== msg.sender.id;
          return (
            <ChatBubble
              key={msg.id}
              message={msg.text}
              sender={msg.sender}
              timestamp={msg.timestamp}
              isCurrentUser={msg.sender.id === currentUser!.id}
              showProfile={showProfile}
              mentions={msg.mentions}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {showNewMsgAlert && (
        <div className="new-message-alert" onClick={scrollToBottom}>
          새로운 메시지가 도착했습니다. 클릭하여 아래로 스크롤하세요.
        </div>
      )}

      <MentionInput mentionData={mentionData} onSubmit={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;