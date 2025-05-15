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
  const [generationBotTriggered, setGenerationBotTriggered] = useState(false);
  const [selectedMessageIds, setSelectedMessageIds] = useState<number[]>([]); //선택된 메세지 id 저장할 구조체
  const [querytext, setQueryText] = useState<string | null>(null); // 요약 요청 시 쿼리 텍스트 저장할 구조체
  const [searchPending, setSearchPending] = useState(false); // 검색 요청 대기 상태 저장할 구조체
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const isSearchBot = !team && !peer; // 검색봇인지 여부 확인

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

  const mentionData = (team || peer)? createMentionData(peers, currentUser?.id) : null; // 검색봇 채팅의 경우, mention 기능을 차단

  const { scrollToBottom, showNewMsgAlert } = useStickyScroll(messages, currentUser, chatMessagesRef, messagesEndRef);

  const resetSelection = () => {
    setSelectedMessageIds([]);
  };

  const topics = useExtractTopicsOfOrgs();
  // console.log("ChatInterface document topics: ", topics);

  const sendMessage = useHandleSendMessage(
    chatRoomId,
    currentUser,
    team,
    peer,
    setGenerationBotTriggered,
    setQueryText,
    setSearchPending,
    isSearchBot
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
  
  const disabled = (isSearchBot && searchPending) || generationBotTriggered;

  useEffect(() => {
    if (!isSearchBot || !searchPending) return;
    const latest = messages[messages.length - 1];
    if (latest && latest.sender.id !== currentUser?.id) {
      setSearchPending(false);
    }
  }, [messages, searchPending, isSearchBot, currentUser]);

  return (
    <div className={`chat-interface ${generationBotTriggered ? "selecting-mode" : ""}`} onDragOver={(e) => e.preventDefault()} onDrop={(e) => e.preventDefault()}>
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((msg, index) => {
          const prevMessage = messages[index - 1];
          const showProfile = !prevMessage || prevMessage.sender.id !== msg.sender.id || !msg.sender;
          return (
            <ChatBubble
              key={msg.id}
              message={msg.text}
              sender={msg.sender}
              timestamp={msg.timestamp}
              isCurrentUser={msg.sender.id === currentUser!.id}
              showProfile={showProfile}
              mentions={msg.mentions}
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

      {showNewMsgAlert && (
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
          <button className="generate-button" onClick={() => { setGenerationBotTriggered(false); setSelectedMessageIds([]); setSelectedTopicId(null); }}>
            취소
          </button>
        </div>
      ): null}

      <MentionInput mentionData={mentionData} onSubmit={sendMessage} disabled={disabled} />
    </div>
  );
};

export default ChatInterface;