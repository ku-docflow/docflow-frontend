import React from "react";
import "../../../styles/ChatInterface/common/ChatBubbles.css";

export interface Sender {
  id: string;
  name: string;
  profileImage?: string; // URL for the sender's profile image
}

export interface ChatBubbleProps {
  message: string;
  sender: Sender;
  timestamp?: string;
  isCurrentUser: boolean; // Determines if the bubble should be right- or left-aligned
  showProfile: boolean;   // Whether to display the profile image (e.g., hide for consecutive messages)
  onProfileClick?: (sender: Sender) => void; // Clicking the profile image will open DM
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  timestamp,
  isCurrentUser,
  showProfile,
  onProfileClick,
}) => {
  const defaultProfileImage = "/maleprofile.png"; // Default image from the public folder

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
          <img src={defaultProfileImage} alt={sender.name} />
        </div>
      )}

      {/* Chat bubble container */}
      <div className="chat-bubble-container">
        <div className={`chat-bubble ${isCurrentUser ? "right" : "left"}`}>
          <div className="chat-bubble-content">
            {(!isCurrentUser && showProfile) && (
              <div className="chat-bubble-sender">{sender.name}</div>
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