import React, { useRef, useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import ChatBubble from "./ChatBubbles";
import MentionInput from "./MentionInput";
import { createMentionData } from "../../../utils/ChatInterfaceUtils/mentionUtils";
import "../../../styles/MainInterface/common/ChatInterface.css";
import { Team, Peer } from "../../../types/user";
import { useResolveChatRoomId } from "../../../hooks/ChatInterfaceHooks/useResolveChatRoomId";
import { useStickyScroll } from "../../../hooks/ChatInterfaceHooks/useStickyScroll";
import { useHandleGenerationBotRequest } from "../../../hooks/ChatInterfaceHooks/useHandleGenerationBotRequest";
import { useHandleSendMessage } from "../../../hooks/ChatInterfaceHooks/useHandleSendMessage";
import { useExtractTopicsOfOrgs } from "../../../hooks/ChatInterfaceHooks/useExtractTopicsOfOrgs";
import { Message } from "../../../types/message";

export interface MentionData {
  id: string;
  display: string;
}

interface ChatInterfaceProps {
  team: Team | null;
  peer: Peer | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ team, peer }) => {
  const chatRoomId = useResolveChatRoomId(team, peer);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [generationBotTriggered, setGenerationBotTriggered] = useState(false);
  const [selectedMessageIds, setSelectedMessageIds] = useState<number[]>([]);
  const [querytext, setQueryText] = useState<string | null>(null);
  const [searchPending, setSearchPending] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [sharedMessage, setSharedMessage] = useState<Message | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const isSearchBot = !team && !peer;

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

  console.log("Messages for chatRoomId", chatRoomId, messages);

  const mentionData = (team || peer) ? createMentionData(peers, currentUser?.id) : null;

  const { scrollToBottom, showNewMsgAlert } = useStickyScroll(messages, currentUser, chatMessagesRef, messagesEndRef);

  const handleScroll = () => {
    if (!chatMessagesRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatMessagesRef.current;
    const isBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
    setIsAtBottom(isBottom);
  };

  useEffect(() => {
    const chatMessages = chatMessagesRef.current;
    if (chatMessages) {
      chatMessages.addEventListener('scroll', handleScroll);
      return () => chatMessages.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  const resetSelection = () => {
    setSelectedMessageIds([]);
  };

  const topics = useExtractTopicsOfOrgs();

  const sendMessage = useHandleSendMessage(
    chatRoomId,
    currentUser,
    team,
    peer,
    setGenerationBotTriggered,
    setQueryText,
    setSearchPending,
  );

  const handleGenerationBotRequest = useHandleGenerationBotRequest(
    selectedMessageIds,
    chatRoomId,
    currentUser,
    team,
    peer,
    querytext,
    selectedTopicId,
    resetSelection,
    setGenerationBotTriggered,
    setQueryText,
    setSelectedMessageIds
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    try {
      const parsed = JSON.parse(data);
      if (parsed.type === "shared_message") {
        const tempMessage: Message = {
          id: parsed.shared_message_id,
          chatroom_id: chatRoomId,
          type: "shared",
          text: parsed.message,
          sender: currentUser!,
          mentions: [],
          shared_message_id: parsed.shared_message_id,
          shared_message_sender: parsed.sender,
          shared_message_text: parsed.message,
          timestamp: parsed.timestamp,
        };
        setSharedMessage(tempMessage);
      }
    } catch (err) {
      console.error("Invalid dropped message format:", err);
    }
  };
  
  const disabled = (isSearchBot && searchPending) || generationBotTriggered;

  useEffect(() => {
    if (!isSearchBot || !searchPending) return;
    const latest = messages[messages.length - 1];
    if (latest && latest.sender.id !== currentUser?.id) {
      setSearchPending(false);
    }
  }, [messages, searchPending, isSearchBot, currentUser]);

  return (
    <div
      className={`chat-interface ${generationBotTriggered ? "selecting-mode" : ""}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="chat-header">
        <h1 className="chat-title">
          {team ? team.name :
            peer ? "DM: " + peer.first_name + " " + peer.last_name :
              "검색봇"}
        </h1>
      </div>
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((msg, index) => {
          const prevMessage = messages[index - 1];
          const showProfile = !prevMessage || prevMessage.sender.id !== msg.sender.id || !msg.sender;
          return (
            <ChatBubble
              key={msg.id}
              message={msg}
              isCurrentUser={msg.sender.id === currentUser!.id}
              showProfile={showProfile}
              isSelectable={generationBotTriggered}
              isSelected={selectedMessageIds.includes(Number(msg.id))}
              onSelect={() => {
                if (selectedMessageIds.includes(Number(msg.id))) {
                  setSelectedMessageIds(selectedMessageIds.filter(id => id !== Number(msg.id)));
                } else if (selectedMessageIds.length < 2) {
                  setSelectedMessageIds([...selectedMessageIds, Number(msg.id)]);
                }
              }}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {showNewMsgAlert && !isAtBottom && (
        <div className="new-message-alert" onClick={scrollToBottom}>
          새로운 메시지가 도착했습니다. 클릭하여 아래로 스크롤하세요.
        </div>
      )}

      {generationBotTriggered ? (
        <div className="generate-instructions">
          <p>문서 생성을 위해 문서 주제, 시작과 끝 메시지를 선택하세요.</p>
          <select
            value={selectedTopicId ?? ""}
            onChange={(e) => setSelectedTopicId(e.target.value)}
            className="topic-select"
          >
            <option value="" disabled>토픽을 선택하세요</option>
            {topics?.map((topic) => (
              <option key={topic.topic_id} value={topic.topic_id}>
                {topic.topic_title}
              </option>
            ))}
          </select>
          <button
            className="generate-button"
            disabled={selectedMessageIds.length !== 2 || selectedTopicId === null}
            onClick={() => selectedTopicId && handleGenerationBotRequest()}
          >
            문서 생성
          </button>
          <button 
            className="generate-button" 
            onClick={() => { 
              setGenerationBotTriggered(false); 
              setSelectedMessageIds([]); 
              setSelectedTopicId(null); 
            }}
          >
            취소
          </button>
        </div>
      ): null}

      <MentionInput
        mentionData={mentionData}
        onSubmit={(text, mentions, shared) => sendMessage(text, mentions, shared)}
        disabled={disabled}
        sharedMessage={sharedMessage ? {
          id: sharedMessage.id || '',
          sender: sharedMessage.shared_message_sender!,
          text: sharedMessage.shared_message_text || sharedMessage.text
        } : null}
        onClearSharedMessage={() => setSharedMessage(null)}
      />
    </div>
  );
};

export default ChatInterface;