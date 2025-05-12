import React, { useRef, useMemo, useState } from "react";
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
  const [GenerationBotTriggered, setGenerationBotTriggered] = useState(false);
  const [selectedMessageIds, setSelectedMessageIds] = useState<number[]>([]); //선택된 메세지 id 저장할 구조체
  const [querytext, setQueryText] = useState<string | null>(null); // 요약 요청 시 쿼리 텍스트 저장할 구조체
  const [searchPending, setSearchPending] = useState(false); // 검색 요청 대기 상태 저장할 구조체
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

  const sendMessage = useHandleSendMessage(
    chatRoomId,
    currentUser,
    team,
    peer,
    setGenerationBotTriggered,
    setQueryText
  );

  const handleGenerationBotRequest = useHandleGenerationBotRequest(
    selectedMessageIds,
    chatRoomId,
    currentUser,
    team,
    peer,
    querytext,
    resetSelection,
    setGenerationBotTriggered,
    setQueryText
  );

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

      {GenerationBotTriggered ? (
        <div className="generate-instructions">
          <p>문서 생성을 위해 시작과 끝 메시지를 선택하세요.</p>
            <button
              className="generate-button"
              disabled={selectedMessageIds.length !== 2}
              onClick={handleGenerationBotRequest}
            >
              문서 생성
          </button>
          <button className="generate-button" onClick={() => setGenerationBotTriggered(false)}>
            취소
          </button>
        </div>
      ): null}

      <MentionInput mentionData={mentionData} onSubmit={sendMessage} />
    </div>
  );
};

export default ChatInterface;