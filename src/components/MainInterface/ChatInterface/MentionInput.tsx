import React, { useRef } from "react";
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

const MentionInput: React.FC<MentionInputProps> = ({ mentionData, onSubmit, disabled, sharedMessage, onClearSharedMessage }) => {
  const [mentions, setMentions] = React.useState<Mention[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    input,
    setInput,
    isMentioning,
    mentionCandidates,
    selectedCandidateIndex,
    handleInputChange,
    handleKeyDown,
    selectCandidate,
  } = useMentionInput(mentionData, (finalInput, mentions) => {
    if (finalInput.trim()) {
      onSubmit(finalInput, mentions);
    }
    setInput("");
  }, mentions, setMentions, textareaRef);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input, [], sharedMessage);
    setInput("");
    if (onClearSharedMessage) onClearSharedMessage();
  };

  const placeholder = mentionData? "@를 통해 생성봇을 호출해보세요!" : "";

  return (
    <form onSubmit={handleSubmit} className="chat-input-form" style={{ position: "relative" }}>
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
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mentions-input"
        placeholder={placeholder}
        disabled={disabled}
      />
      <button type="submit" className="chat-send-button" disabled={disabled}>{disabled? "···" : "↑"}</button>

      {isMentioning && (
        <div className="mentions-box">
          {mentionCandidates.map((candidate, index) => (
            <div
              key={candidate.userId}
              className={`mentions-candidate ${index === selectedCandidateIndex ? "focused" : ""}`}
              onMouseDown={() => selectCandidate(candidate)}
            >
              {candidate.displayName}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default MentionInput;