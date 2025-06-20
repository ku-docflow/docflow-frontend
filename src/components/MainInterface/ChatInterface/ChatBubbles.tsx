import React from "react";
import "../../../styles/MainInterface/common/ChatBubbles.css";
import { ChatBubbleProps } from "../../../types/message"
import { formatTimestamp } from "../../../utils/ChatInterfaceUtils/dateUtils";
import ReactMarkdown from "react-markdown";

const defaultProfileImage = "/maleprofile.png";

const getSenderName = (sender: ChatBubbleProps["message"]["sender"]) => {
  return [sender.first_name, sender.last_name].filter(Boolean).join(" ");
};

const ProfileImage: React.FC<{
  sender: ChatBubbleProps["message"]["sender"];
  onClick?: () => void;
}> = ({ sender, onClick }) => (
  <div className="chat-bubble-profile" onClick={onClick}>
    <img src={defaultProfileImage} alt={sender.first_name + sender.last_name} />
  </div>
);

const BubbleContent: React.FC<ChatBubbleProps & { name: string }> = ({
  message,
  isCurrentUser,
  showProfile,
  isSelectable,
  isSelected,
  onSelect,
  name,
}) => (
  <div className="chat-bubble-container">
    <div
      className={`chat-bubble ${isCurrentUser ? "right" : "left"} ${isSelectable ? "selectable" : ""}`}
      onClick={isSelectable ? onSelect : undefined}
    >
      {isSelectable && (
        <div className={`chat-bubble-selector ${isSelected ? "selected" : ""}`} />
      )}
      <div className="chat-bubble-content">
        {(!isCurrentUser && showProfile) && (
          <div className="chat-bubble-sender">{name}</div>
        )}
        {message.type === "shared" && message.shared_message_sender && message.shared_message_text && (
          <div className="chat-bubble-shared-info">
            <div className="shared-sender-name">
              👤 {message.shared_message_sender.first_name} {message.shared_message_sender.last_name} 님이 공유한 메시지:
            </div>
            <blockquote className="shared-message-text">
              <ReactMarkdown>{message.shared_message_text}</ReactMarkdown>
            </blockquote>
          </div>
        )}
          <div className="chat-bubble-message">
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        {message.timestamp && (
          <div className="chat-bubble-timestamp">{formatTimestamp(message.timestamp)}</div>
        )}
      </div>
    </div>
  </div>
);

const defaultProfileImage = "/maleprofile.png";

const getSenderName = (sender: ChatBubbleProps["message"]["sender"]) => {
  return [sender.first_name, sender.last_name].filter(Boolean).join(" ");
};

const ProfileImage: React.FC<{
  sender: ChatBubbleProps["message"]["sender"];
  onClick?: () => void;
}> = ({ sender, onClick }) => (
  <div className="chat-bubble-profile" onClick={onClick}>
    <img src={defaultProfileImage} alt={sender.first_name + sender.last_name} />
  </div>
);

const BubbleContent: React.FC<ChatBubbleProps & { name: string }> = ({
  message,
  isCurrentUser,
  showProfile,
  isSelectable,
  isSelected,
  onSelect,
  name,
}) => (
  <div className="chat-bubble-container">
    <div
      className={`chat-bubble ${isCurrentUser ? "right" : "left"} ${isSelectable ? "selectable" : ""}`}
      onClick={isSelectable ? onSelect : undefined}
    >
      {isSelectable && (
        <div className={`chat-bubble-selector ${isSelected ? "selected" : ""}`} />
      )}
      <div className="chat-bubble-content">
        {(!isCurrentUser && showProfile) && (
          <div className="chat-bubble-sender">{name}</div>
        )}
        {message.type === "shared" && message.shared_message_sender ? (
          <div className="chat-bubble-shared-info">
            <div className="shared-sender-name">
              👤 {message.shared_message_sender.first_name} {message.shared_message_sender.last_name} 님이 공유한 메시지:
            </div>
            <blockquote className="shared-message-text">"{message.text}"</blockquote>
          </div>
        ) : (
          <div className="chat-bubble-message">{message.text}</div>
        )}
        {message.timestamp && (
          <div className="chat-bubble-timestamp">{formatTimestamp(message.timestamp)}</div>
        )}
      </div>
    </div>
  </div>
);

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isCurrentUser,
  showProfile,
  onProfileClick,
  isSelectable,
  isSelected,
  onSelect,
}) => {
  const name = getSenderName(message.sender);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const data = {
      type: "shared_message",
      message: message.text,
      sender: message.sender,
      timestamp: message.timestamp,
      shared_message_id: message.id ?? null,
    };
    e.dataTransfer.setData("application/json", JSON.stringify(data));
  };

  const handleProfileClick = () => {
    if (onProfileClick) onProfileClick(message.sender);
  };

  return (
    <div
      className={`chat-bubble-wrapper ${isCurrentUser ? "align-right" : "align-left"}`}
      draggable={message.sender.id === "search-bot"}
      onDragStart={handleDragStart}
    >
      {showProfile && !isCurrentUser && (
        <ProfileImage sender={message.sender} onClick={handleProfileClick} />
      )}
      <BubbleContent
        {...{
          message,
          isCurrentUser,
          showProfile,
          isSelectable,
          isSelected,
          onSelect,
          name,
        }}
      />
    </div>
  );
};

export default ChatBubble;