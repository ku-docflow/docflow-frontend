import React from "react";
import ChatInterface from "../ChatInterface/ChatInterface";
import "../../../styles/MainInterface/strips/SearchbotStrip.css";

const SearchbotStrip: React.FC = () => {
  return (
    <div className="chatroom-strip-container">
      <ChatInterface team={null} peer={null} />
    </div>
  );
};

export default SearchbotStrip;