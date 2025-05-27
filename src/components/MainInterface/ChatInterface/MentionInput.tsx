import React, { useRef, useState } from "react";
import { useMentionInput } from "../../../hooks/ChatInterfaceHooks/useMentionInput";
import { Mention, SharedMessageInfo } from "../../../types/message";
import "../../../styles/MainInterface/common/MentionInput.css";

interface MentionInputProps {
  mentionData: Mention[] | null;
  onSubmit: (message: string, mentions: Mention[], sharedMessage?: SharedMessageInfo | null) => void;
  disabled: boolean;
  sharedMessage?: SharedMessageInfo | null;
  onClearSharedMessage?: () => void;
}

const MentionInput: React.FC<MentionInputProps> = ({
  mentionData,
  onSubmit,
  disabled,
  sharedMessage,
  onClearSharedMessage,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mentions, setMentions] = useState<Mention[]>([]);
  const {
    input,
    setInput,
    isMentioning,
    mentionCandidates,
    selectedCandidateIndex,
    handleInputChange,
    handleKeyDown,
    selectCandidate,
  } = useMentionInput(
    mentionData,
    (finalInput, mentions) => {
      if (finalInput.trim()) {
        onSubmit(finalInput, mentions, sharedMessage);
      }
      setInput("");
      setMentions([]);
      if (onClearSharedMessage) onClearSharedMessage();
    },
    mentions,
    setMentions,
    textareaRef
  );

  const handleSend = () => {
    if (!input.trim()) return;
    onSubmit(input, mentions, sharedMessage);
    setInput("");
    setMentions([]);
    if (onClearSharedMessage) onClearSharedMessage();
  };

  const placeholder = mentionData ? "@를 통해 생성봇을 호출해보세요!" : "검색봇에게 질문해보세요!";

  return (
    <div className="mention-input-container custom-layout">
      {sharedMessage && (
        <div className="shared-message-preview">
          <div className="shared-message-content">
            <div className="shared-message-sender">
              공유된 메시지 from {sharedMessage.sender.first_name} {sharedMessage.sender.last_name}
            </div>
            <blockquote className="shared-message-text">"{sharedMessage.text}"</blockquote>
          </div>
          <button type="button" className="shared-message-remove-button" onClick={onClearSharedMessage}>
            ✕
          </button>
        </div>
      )}
      <div className="mention-input-main-row">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="mention-input compact"
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
        />
        {isMentioning && mentionCandidates.length > 0 && (
          <div className="mentions-box">
            {mentionCandidates.map((candidate, idx) => (
              <div
                key={candidate.userId}
                className={`mentions-candidate${idx === selectedCandidateIndex ? " focused" : ""}`}
                onMouseDown={() => selectCandidate(candidate)}
              >
                {candidate.displayName}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mention-input-bottom-row">
        <div className="mention-input-icons">
          <button type="button" className="icon-btn attach-btn" tabIndex={-1} aria-label="Attach file">
            <span>＋</span>
          </button>
          <button type="button" className="icon-btn emoji-btn" tabIndex={-1} aria-label="Emoji picker" onClick={() => setShowEmojiPicker(v => !v)}>
            <span role="img" aria-label="emoji">☻</span>
          </button>
        </div>
        <button
          type="button"
          className={`send-btn${!disabled && input.trim() ? " active" : ""}`}
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          aria-label="Send message"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill={(!disabled && input.trim()) ? "#7494ec" : "#e9e9ef"} />
            <path d="M7 12L17 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M13 8L17 12L13 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      {showEmojiPicker && (
        <div className="custom-emoji-picker">
          <div className="emoji-list">
            {['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','🥰','😗','😙','😚','🙂','🤗','🤩','🤔','🤨','😐','😑','😶','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','🥱','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🙃','🤑','😲','☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😰','😱','🥵','🥶','😳','🤪','😵','😡','😠','🤬','😷','🤒','🤕','🤢','🤮','🥴','😇','🥳','🥺','🤠','🤡','🤥','🤫','🤭','🧐','🤓','😈','👿','👹','👺','💀','👻','👽','🤖','💩'].map(e => (
              <button key={e} className="emoji-btn-item" onClick={() => { setInput(input + e); setShowEmojiPicker(false); }}>{e}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MentionInput;