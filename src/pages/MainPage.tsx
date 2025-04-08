import React from "react";
import Header from "../components/common/Header";
import MainLayout from "../layouts/MainLayout";
import "../styles/ChatInterface/pages/MainPage.css";

const MainPage: React.FC = () => {
  return (
    <div className="main-page-container">
      <Header />
      <div className="main-page-content">
        <MainLayout />
      </div>
    </div>
  );
};

export default MainPage;