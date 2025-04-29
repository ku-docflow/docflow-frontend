import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import ChatBubble, { Sender } from "./ChatBubbles";
import MentionInput from "./MentionInput";
import { extractMentions } from "./mentionUtils";
import "../../../styles/MainInterface/common/ChatInterface.css";
import { fetchChatroomHistory } from "../../../api/chatroom";
import { retrieveChatroomHistoryResponse } from "../../../types/chatroom";

export interface MentionData {
  id: string;
  display: string;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: Sender;
  mentions?: MentionData[];
}

interface ChatInterfaceProps {
  chatRoomId: string;
}

const currentUser: Sender = {
  id: "user1",
  name: "You",
  profileImage: "https://via.placeholder.com/32?text=You",
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatRoomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showNewMsgAlert, setShowNewMsgAlert] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const orgs = useSelector((state: RootState) => state.user.orgs);

  const peers = orgs.flatMap((org) =>
    org.teams.flatMap((team) =>
      team.chatroom_id === chatRoomId ? team.peers : []
    )
  );

  const mentionablePeers = peers.map((peer) => ({
    id: peer.id,
    display: peer.name,
  }));

  const bots: MentionData[] = [
    { id: "summarybot", display: "정리봇" },
    { id: "createbot", display: "생성봇" },
  ];

  const mentionData: MentionData[] = [...mentionablePeers, ...bots];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response: retrieveChatroomHistoryResponse = await fetchChatroomHistory(chatRoomId);
        setMessages(response.messages);
        scrollToBottom();
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      }
    };
    fetchMessages();
  }, [chatRoomId]);

  useEffect(() => {
    if (chatMessagesRef.current && messages.length > 0) {
      const container = chatMessagesRef.current;
      const lastMsg = messages[messages.length - 1];
      const isAtBottom =
        container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
      const hasMentionedMe = lastMsg.mentions?.some((mention) => mention.id === currentUser.id);

      if (isAtBottom || hasMentionedMe) {
        scrollToBottom();
        setShowNewMsgAlert(false);
      } else {
        setShowNewMsgAlert(true);
      }
    }
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newMentions = extractMentions(text, mentionData);

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date().toISOString(),
      sender: currentUser,
      mentions: newMentions,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setTimeout(() => scrollToBottom(), 0);

    const mentionedIds = newMentions.map((m) => m.id);
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
              isCurrentUser={msg.sender.id === currentUser.id}
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