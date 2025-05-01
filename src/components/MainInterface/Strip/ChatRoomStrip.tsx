import React from "react";
import ChatInterface from "../ChatInterface/ChatInterface";

interface ChatRoomStripProps {
  chatRoomId: string | null;
  chatRoomName: string| null;
  dm: boolean;
}

const ChatRoomStrip: React.FC<ChatRoomStripProps> = ({ chatRoomId, chatRoomName, dm }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          padding: "1rem",
          borderBottom: "1px solid #6b7280" // Tailwind's gray-500
        }}
      >
        <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>  
        {chatRoomName}
        </h2>
      </div>
      <ChatInterface chatRoomId={chatRoomId || ""}></ChatInterface>
    </div>
  );
};

export default ChatRoomStrip;