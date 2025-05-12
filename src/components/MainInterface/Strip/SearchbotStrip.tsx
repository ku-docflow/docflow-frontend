import React from "react";
import ChatInterface from "../ChatInterface/ChatInterface";
import "../../../styles/MainInterface/strips/SearchbotStrip.css";

const SearchbotStrip: React.FC = () => {
  return (
    <div className="searchbot-strip">
      <div className="searchbot-strip-header">
          <h1 className="searchbot-strip-title">
            검색봇
          </h1>
      </div>
      <ChatInterface team={null} peer={null} />
    </div>
  );
};

export default SearchbotStrip;