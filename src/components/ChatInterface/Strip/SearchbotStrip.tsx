import React from "react";
import ChatInterface from "../common/ChatInterface";
import "../../../styles/ChatInterface/SearchbotStrip.css";

const SearchbotStrip: React.FC = () => {
  return (
    <div className="searchbot-strip">
      <div className="searchbot-strip-header">
        <h1>Searchbot</h1>
      </div>
      <ChatInterface />
    </div>
  );
};

export default SearchbotStrip;