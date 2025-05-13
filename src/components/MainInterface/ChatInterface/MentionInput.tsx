import React, { useRef } from "react";
import { useMentionInput } from "../../../hooks/ChatInterfaceHooks/useMentionInput";
import { Mention } from "../../../types/message";

interface MentionInputProps {
  mentionData: Mention[] | null;
  onSubmit: (message: string, mentions: Mention[]) => void;
  disabled: boolean;
}

const MentionInput: React.FC<MentionInputProps> = ({ mentionData, onSubmit, disabled }) => {
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
    onSubmit(input, []);
    setInput("");
  };

  const placeholder = mentionData? "@를 통해 생성봇을 호출해보세요!" : "";

  return (
    <form onSubmit={handleSubmit} className="chat-input-form" style={{ position: "relative" }}>
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