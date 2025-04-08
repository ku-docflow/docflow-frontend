import React from "react";
import ChatInterface from "../common/ChatInterface";

interface ChatRoomStripProps {
  chatRoomId: string | null;
  dm: boolean;
}

const ChatRoomStrip: React.FC<ChatRoomStripProps> = ({ chatRoomId,dm }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          padding: "1rem",
          borderBottom: "1px solid #6b7280" // Tailwind's gray-500
        }}
      >
        <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>
          
          {dm ? "1:1 DM :" : ""}
          Chat Room: {chatRoomId}
        </h2>
      </div>
      <ChatInterface />
    </div>
  );
};

export default ChatRoomStrip;