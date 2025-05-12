import { Peer } from "../../types/user";
import { Mention } from "../../types/message";

export const createMentionData = (
  peers: Peer[],
  user_id: string | undefined
): Mention[] => {
  const mentionablePeers: Mention[] = peers
    .filter((peer) => peer.id !== user_id)
    .map((peer) => ({
      userId: peer.id,
      displayName: peer.first_name + peer.last_name,
      startIndex: 0,
      endIndex: 0,
    }));

  const bots: Mention[] = [
    {
      userId: "generationBot",
      displayName: "생성봇",
      startIndex: 0,
      endIndex: 0,
    },
  ];

  return [...mentionablePeers, ...bots];
};
