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
      <ChatInterface team={team} peer={peer} />
    </div>
  );
};

export default ChatRoomStrip;