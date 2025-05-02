import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import ChatBubble from "./ChatBubbles";
import MentionInput from "./MentionInput";
import { extractMentions } from "./mentionUtils";
import "../../../styles/MainInterface/common/ChatInterface.css";
import { fetchChatroomHistory, fetchDirectChatHistory } from "../../../api/chatroom";
import { retrieveChatroomHistoryResponse } from "../../../types/chatroom";
import { Message, Mention } from "../../../types/message"
import { getSocket } from "../../../services/socket";
import { Team, Peer } from "../../../types/user";

export interface MentionData {
  id: string;
  display: string;
}

interface ChatInterfaceProps {
  team: Team | null;
  peer: Peer | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ team, peer }) => {
  
  const [chatRoomId, setChatRoomId] = useState<string>("0");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showNewMsgAlert, setShowNewMsgAlert] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const orgs = useSelector((state: RootState) => state.user.orgs);
  const currentUser = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
    const resolveChatRoomId = async () => {
      if (team && !peer) {
        setChatRoomId(team.chatroom_id);
        try {
          const response: retrieveChatroomHistoryResponse = await fetchChatroomHistory(Number(chatRoomId));
          setMessages(response.messages);
          scrollToBottom();
        } catch (error) {
          console.error("Failed to fetch chat history:", error);
        }
      } else if (peer && !team) {
        try {
          const response = await fetchDirectChatHistory(peer.id);
          setChatRoomId(response.chatroom_id);
          setMessages(response.messages);
          scrollToBottom();
        } catch (error) {
          console.error("Failed to fetch DM:", error);
        }
      } else if (peer && team) {
        setChatRoomId("0");
        //검색봇 기록을 가져올지 말지 정해야될듯, 가져오는게 좋아보인다
      }
    };

    resolveChatRoomId();
  }, [team, peer, chatRoomId]);

  const peers = orgs.flatMap((org) =>
    org.teams.flatMap((team) =>
      team.chatroom_id === chatRoomId ? team.peers : []
    )
  );

  const mentionablePeers = peers.map((peer) => ({
    id: peer.id,
    display: peer.first_name + peer.last_name,
  }));

  const bots: MentionData[] = [
    { id: "searchbot", display: "검색봇" },
    { id: "summarybot", display: "정리봇" },
  ];

  const mentionData: MentionData[] = [...mentionablePeers, ...bots];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    if (chatMessagesRef.current && messages.length > 0) {
      const container = chatMessagesRef.current;
      const lastMsg = messages[messages.length - 1];
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
      if (!currentUser) return;
      const hasMentionedMe = lastMsg.mentions?.some((mention) => mention.userId === currentUser.id);

      if (isAtBottom || hasMentionedMe) {
        scrollToBottom();
        setShowNewMsgAlert(false);
      } else {
        setShowNewMsgAlert(true);
      }
    }
  }, [messages, currentUser]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !currentUser) return;

    const rawMentions = extractMentions(text, mentionData);
    const newMentions: Mention[] = rawMentions.map(({ id, display }) => {
      const startIndex = text.indexOf(`@${display}`);
      return {
        userId: id,
        displayName: display,
        startIndex,
        endIndex: startIndex + display.length + 1,
      };
    });

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "default",
      text,
      timestamp: new Date().toISOString(),
      sender: currentUser,
      mentions: newMentions,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setTimeout(() => scrollToBottom(), 0);

    const socket = getSocket();
    if (socket?.connected) {
      socket.emit("send_message", {
        chatroom_id: chatRoomId,
        message: newMessage,
      });
    } else {
      console.error("Socket is not connected");
    }

    const mentionedIds = newMentions.map((m) => m.userId);
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