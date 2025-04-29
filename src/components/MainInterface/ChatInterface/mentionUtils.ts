import { MentionData } from "./ChatInterface";

export const extractMentions = (
  text: string,
  mentionData: MentionData[]
): MentionData[] => {
  const mentionMatches = text.match(/@(\S+)/g);
  if (!mentionMatches) return [];
  return mentionMatches.map((mention) => {
    const name = mention.substring(1);
    const found = mentionData.find((u) => u.display === name);
    return found || { id: "unknown", display: name };
  });
};
