import React from "react";
import OrganizationBlock from "./OrganizationBlock";
import "../../../styles/PeerStrip/PeerStrip.css";

interface Peer {
  id: string;
  name: string;
  online: boolean;
}

interface Team {
  id: string;
  name: string;
  peers: Peer[];
}

interface Organization {
  id: string;
  name: string;
  teams: Team[];
}

interface PeerStripProps {
  peerId: string | null;
  onSelectChatRoom: (chatRoomId: string) => void;
}

// 더미 데이터: 조직, 팀, 유저 정보 포함
const dummyData: Organization[] = [
  {
    id: "orgA",
    name: "Organization A",
    teams: [
      {
        id: "teamA",
        name: "Team A",
        peers: [
          { id: "p1", name: "Bob", online: true },
          { id: "p2", name: "Cha", online: false },
        ],
      },
      {
        id: "teamB",
        name: "Team B",
        peers: [
          { id: "p3", name: "John", online: true },
          { id: "p4", name: "Nelson", online: false },
        ],
      },
    ],
  },
  {
    id: "orgB",
    name: "Organization B",
    teams: [
      {
        id: "teamC",
        name: "Team C",
        peers: [
          { id: "p5", name: "Alice", online: true },
          { id: "p6", name: "David", online: false },
        ],
      },
      {
        id: "teamD",
        name: "Team D",
        peers: [
          { id: "p7", name: "Eve", online: true },
          { id: "p8", name: "Frank", online: true },
        ],
      },
    ],
  },
  {
    id: "org3",
    name: "Organization C",
    teams: [
      {
        id: "teamC",
        name: "Team C",
        peers: [
          { id: "p5", name: "Alice", online: true },
          { id: "p6", name: "David", online: false },
        ],
      },
      {
        id: "teamD",
        name: "Team D",
        peers: [
          { id: "p7", name: "Eve", online: true },
          { id: "p8", name: "Frank", online: true },
        ],
      },
    ],
  },
  {
    id: "org4",
    name: "Organization D",
    teams: [
      {
        id: "teamC",
        name: "Team C",
        peers: [
          { id: "p5", name: "Alice", online: true },
          { id: "p6", name: "David", online: false },
        ],
      },
      {
        id: "teamD",
        name: "Team D",
        peers: [
          { id: "p7", name: "Eve", online: true },
          { id: "p8", name: "Frank", online: true },
        ],
      },
    ],
  },
];

const PeerStrip: React.FC<PeerStripProps> = ({ peerId, onSelectChatRoom }) => {
  return (
    <div className="peer-strip">
      <h2 className="peer-strip-title">Peers</h2>
      <div className="organization-list">
        {dummyData.map((org) => (
          <OrganizationBlock
            key={org.id}
            organization={org}
            onSelectChatRoom={onSelectChatRoom}
          />
        ))}
      </div>
    </div>
  );
};

export default PeerStrip;