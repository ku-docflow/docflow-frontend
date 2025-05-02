import { useState } from "react";
import { Mention } from "../../types/message";

export const useMentionInput = (
  mentionData: Mention[],
  onSelect: (input: string, mentions: Mention[]) => void,
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
) => {
  const [input, setInput] = useState("");
  const [isMentioning, setIsMentioning] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionCandidates, setMentionCandidates] = useState<Mention[]>([]);
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(0);
  const [mentions, setMentions] = useState<Mention[]>([]);

  const handleInputChange = (value: string) => {
    setInput(value);

    const lastAt = value.lastIndexOf("@");
    if (lastAt !== -1) {
      const query = value.slice(lastAt + 1);
      setMentionQuery(query);

      const candidates = mentionData.filter((item) =>
        item.displayName?.startsWith(query)
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
      if (e.key === "Backspace") {
        const caret = textareaRef.current?.selectionStart ?? 0;
        const mentionToRemove = mentions.find((m) => caret === m.endIndex);
        if (mentionToRemove) {
          e.preventDefault();
          const before = input.slice(0, mentionToRemove.startIndex);
          const after = input.slice(mentionToRemove.endIndex);
          setInput(before + after);
          setMentions(mentions.filter((m) => m !== mentionToRemove));
          requestAnimationFrame(() => {
            textareaRef.current?.setSelectionRange(
              mentionToRemove.startIndex,
              mentionToRemove.startIndex
            );
          });
          return;
        }
      }
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const trimmed = input.trim();
        if (trimmed) {
          onSelect(trimmed, mentions);
          setInput("");
          setMentions([]);
        }
      }
    }
  };

  const selectCandidate = (candidate: Mention) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const caret = textarea.selectionStart;
    const textBeforeCaret = input.slice(0, caret);
    const atIndex = textBeforeCaret.lastIndexOf("@");
    const textAfterCaret = input.slice(caret);

    const inserted = `@${candidate.displayName}`;
    const newInput =
      textBeforeCaret.slice(0, atIndex) + inserted + " " + textAfterCaret;

    const newMention: Mention = {
      userId: candidate.userId,
      displayName: candidate.displayName,
      startIndex: atIndex,
      endIndex: atIndex + inserted.length,
    };
    setInput(newInput);
    setMentions([...mentions, newMention]);
    setIsMentioning(false);

    requestAnimationFrame(() => {
      const newCaret = newMention.endIndex + 1;
      textarea.setSelectionRange(newCaret, newCaret);
    });
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
