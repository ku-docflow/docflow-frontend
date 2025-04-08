import React from "react";
import Header from "../components/common/Header";
import WikiLayout from "../layouts/WikiLayout";
import "../styles/WikiInterface/pages/WikiPage.css";

const WikiPage: React.FC = () => {
  return (
    <div className="wiki-page-container">
      <Header />
      <div className="wiki-page-content">
        <WikiLayout />
      </div>
    </div>
  );
};

export default WikiPage;