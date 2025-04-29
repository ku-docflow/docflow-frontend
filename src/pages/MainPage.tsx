import React from "react";
import Header from "../components/common/Header";
import MainLayout from "../layouts/MainLayout";
import "../styles/MainInterface/pages/MainPage.css";

interface MainPageProps {
  children?: React.ReactNode;
}

const MainPage: React.FC<MainPageProps> = () => {
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