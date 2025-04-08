// src/components/Dashboard.tsx
import React from "react";
import "../../../styles/ChatInterface/Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <p>메인 페이지에서 유저 정보나 대시보드 정보를 표시합니다.</p>
    </div>
  );
};

export default Dashboard;