import { Peer } from "../../types/user";
import { Mention } from "../../types/message";

export const createMentionData = (peers: Peer[]): Mention[] => {
  const mentionablePeers: Mention[] = peers.map((peer) => ({
    userId: peer.id,
    displayName: peer.first_name + peer.last_name,
    startIndex: 0,
    endIndex: 0,
  }));

  const bots: Mention[] = [
    { userId: "searchbot", displayName: "검색봇", startIndex: 0, endIndex: 0 },
    { userId: "summarybot", displayName: "정리봇", startIndex: 0, endIndex: 0 },
  ];

  return [...mentionablePeers, ...bots];
};
