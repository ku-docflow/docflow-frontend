// src/components/Dashboard.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import "../../../styles/MainInterface/Dashboard.css";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      {user ? (
        <div className="dashboard-user-info">
          <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>유저 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default Dashboard;