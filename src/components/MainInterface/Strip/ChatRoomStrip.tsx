import React from "react";
import ChatInterface from "../ChatInterface/ChatInterface";
import { Team, Peer } from "../../../types/user";

interface ChatRoomStripProps {
  team: Team | null;
  peer: Peer | null;
  dm: boolean;
}

const ChatRoomStrip: React.FC<ChatRoomStripProps> = ({ team, peer, dm }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          padding: "1rem",
          borderBottom: "1px solid #6b7280" // Tailwind's gray-500
        }}
      >
        <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>  
          {team ? team.name :
            peer ? "DM: " + peer.first_name + " " + peer.last_name :
              "검색봇"}
        </h2>
      </div>
      <ChatInterface team={team} peer={null}></ChatInterface>
    </div>
  );
};

export default ChatRoomStrip;