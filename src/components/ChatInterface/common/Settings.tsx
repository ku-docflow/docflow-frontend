import React, { useState } from "react";
import "../../../styles/ChatInterface/common/Settings.css"; // Optional: add styles for the settings modal

interface SettingsProps {
  onClose: () => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose, onLogout }) => {
  const [newName, setNewName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleNameChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Name changed to:", newName);
    // 여기에 API 호출 등 실제 이름 변경 로직을 추가
    setNewName("");
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Password change requested:", currentPassword, newPassword);
    // 여기에 API 호출 등 실제 비밀번호 변경 로직을 추가
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal fade-in-up">
        <h2>Settings</h2>
        {/* 로그아웃 버튼 */}
        <div className="modal-buttons">
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </div>

        {/* 이름 변경 폼 */}
        <form onSubmit={handleNameChange}>
          <label>
            Change Name:
            <input
              type="text"
              placeholder="Enter new name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">Update Name</button>
          </div>
        </form>

        {/* 비밀번호 변경 폼 */}
        <form onSubmit={handlePasswordChange}>
          <label>
            Current Password:
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">Update Password</button>
          </div>
        </form>

        {/* 닫기 버튼 */}
        <div className="modal-buttons">
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;