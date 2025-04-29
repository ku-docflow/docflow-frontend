import React from "react";
import ChatInterface from "../ChatInterface/ChatInterface";
import "../../../styles/MainInterface/SearchbotStrip.css";

const SearchbotStrip: React.FC = () => {
  return (
    <div className="searchbot-strip">
      <div className="searchbot-strip-header">
        <h1>Searchbot</h1>
      </div>
      <ChatInterface chatRoomId="searchbot" />
    </div>
  );
};

export default SearchbotStrip;