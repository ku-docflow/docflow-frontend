import React from "react";
import ChatInterface from "../ChatInterface/ChatInterface";
import { Team, Peer } from "../../../types/user";
import "../../../styles/MainInterface/strips/ChatRoomStrip.css";

interface ChatRoomStripProps {
  team: Team | null;
  peer: Peer | null;
  dm: boolean;
}

const ChatRoomStrip: React.FC<ChatRoomStripProps> = ({ team, peer, dm }) => {
  return (
    <div className="chatroom-strip-container">
      <div className="chatroom-strip-header">
        <h1 className="chatroom-strip-title">  
          {team ? team.name :
            peer ? "DM: " + peer.first_name + " " + peer.last_name :
              "검색봇"}
        </h1>
      </div>
      <ChatInterface team={team} peer={peer}></ChatInterface>
    </div>
  );
};

export default ChatRoomStrip;