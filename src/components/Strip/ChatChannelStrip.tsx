// src/components/ChatChannelStrip.tsx
import React from "react";
import "../../styles/ChatChannelStrip.css";

interface ChatChannelStripProps {
  orgId: string;
  onSelectChatRoom: (chatRoomId: string) => void;
}

const dummyChannels = [
  { id: "c1", name: "general" },
  { id: "c2", name: "random" },
];

const ChatChannelStrip: React.FC<ChatChannelStripProps> = ({
  orgId,
  onSelectChatRoom,
}) => {
  return (
    <div className="chat-channel-strip">
      <h2 className="chat-channel-title">Organization: {orgId}</h2>
      <ul className="chat-channel-list">
        {dummyChannels.map((channel) => (
          <li
            key={channel.id}
            className="chat-channel-item"
            onClick={() => onSelectChatRoom(channel.id)}
          >
            # {channel.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatChannelStrip;