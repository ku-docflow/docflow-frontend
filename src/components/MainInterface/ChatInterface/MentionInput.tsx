import React from "react";
import { useMentionInput } from "./useMentionInput";
import { MentionData } from "./ChatInterface";

interface MentionInputProps {
  mentionData: MentionData[];
  onSubmit: (message: string) => void;
}

const MentionInput: React.FC<MentionInputProps> = ({ mentionData, onSubmit }) => {
  const {
    input,
    setInput,
    isMentioning,
    mentionCandidates,
    selectedCandidateIndex,
    handleInputChange,
    handleKeyDown,
    selectCandidate,
  } = useMentionInput(mentionData, (finalInput) => {
    if (finalInput.trim()) {
      onSubmit(finalInput);   // ✅ 여기서 바로 채팅창에 메시지 추가
    }
    setInput("");
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-form" style={{ position: "relative" }}>
      <textarea
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
              key={candidate.id}
              className={`mentions-candidate ${index === selectedCandidateIndex ? "focused" : ""}`}
              onMouseDown={() => selectCandidate(candidate)}
            >
              {candidate.display}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default MentionInput;