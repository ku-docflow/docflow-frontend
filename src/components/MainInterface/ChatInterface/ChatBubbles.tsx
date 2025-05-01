import React from "react";
import "../../../styles/MainInterface/common/ChatBubbles.css";
import { ChatBubbleProps } from "../../../types/message"

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  timestamp,
  isCurrentUser,
  showProfile,
  onProfileClick,
}) => {
  const defaultProfileImage = "/maleprofile.png"; 

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const data = {
      message,
      sender,
      timestamp,
    };
    e.dataTransfer.setData("application/json", JSON.stringify(data));
  };

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick(sender);
    }
  };

  return (
    <div 
      className={`chat-bubble-wrapper ${isCurrentUser ? "align-right" : "align-left"}`}
      draggable={!isCurrentUser}
      onDragStart={handleDragStart}
    >
      {/* Render profile image on the left if not current user */}
      {showProfile && !isCurrentUser && (
        <div className="chat-bubble-profile" onClick={handleProfileClick}>
          <img src={defaultProfileImage} alt={sender.first_name + sender.last_name} />
        </div>
      )}

      {/* Chat bubble container */}
      <div className="chat-bubble-container">
        <div className={`chat-bubble ${isCurrentUser ? "right" : "left"}`}>
          <div className="chat-bubble-content">
            {(!isCurrentUser && showProfile) && (
              <div className="chat-bubble-sender">{sender.first_name + sender.last_name}</div>
            )}
            <div className="chat-bubble-message">{message}</div>
            {timestamp && (
              <div className="chat-bubble-timestamp">{timestamp}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;