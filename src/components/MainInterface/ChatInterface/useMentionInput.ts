import { useState } from "react";
import { MentionData } from "./ChatInterface";

export const useMentionInput = (
  mentionData: MentionData[],
  onSelect: (input: string) => void
) => {
  const [input, setInput] = useState("");
  const [isMentioning, setIsMentioning] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionCandidates, setMentionCandidates] = useState<MentionData[]>([]);
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(0);

  const handleInputChange = (value: string) => {
    setInput(value);

    const lastAt = value.lastIndexOf("@");
    if (lastAt !== -1) {
      const query = value.slice(lastAt + 1);
      setMentionQuery(query);

      const candidates = mentionData.filter((item) =>
        item.display.startsWith(query)
      );
      setMentionCandidates(candidates);
      setIsMentioning(candidates.length > 0);
      setSelectedCandidateIndex(0);
    } else {
      setIsMentioning(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isMentioning) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedCandidateIndex(
          (prev) => (prev + 1) % mentionCandidates.length
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedCandidateIndex(
          (prev) =>
            (prev - 1 + mentionCandidates.length) % mentionCandidates.length
        );
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsMentioning(false);
        setMentionCandidates([]);
        setSelectedCandidateIndex(0);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const candidate = mentionCandidates[selectedCandidateIndex];
        if (candidate) selectCandidate(candidate);
      }
    } else {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const trimmed = input.trim();
        if (trimmed) {
          onSelect(trimmed);
          setInput("");
        }
      }
    }
  };

  const selectCandidate = (candidate: MentionData) => {
    const lastAt = input.lastIndexOf("@");
    const beforeAt = input.slice(0, lastAt);
    const afterQuery = input.slice(lastAt + mentionQuery.length + 1);
    const newInput = `${beforeAt}@${candidate.display} ${afterQuery}`;

    setInput(newInput);
    setIsMentioning(false);
  };

  return {
    input,
    setInput,
    isMentioning,
    mentionCandidates,
    selectedCandidateIndex,
    handleInputChange,
    handleKeyDown,
    selectCandidate,
  };
};
