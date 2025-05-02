import React, { useRef } from "react";
import { useMentionInput } from "../../../hooks/ChatInterfaceHooks/useMentionInput";
import { Mention } from "../../../types/message";

interface MentionInputProps {
  mentionData: Mention[];
  onSubmit: (message: string, mentions: Mention[]) => void;
}

const MentionInput: React.FC<MentionInputProps> = ({ mentionData, onSubmit }) => {
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
  }, textareaRef);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input, []);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-form" style={{ position: "relative" }}>
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mentions-input"
        placeholder="@를 통해 검색봇과 정리봇을 호출해보세요!"
      />
      <button type="submit" className="chat-send-button">Send</button>

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