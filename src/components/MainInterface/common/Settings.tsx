import React, { useState } from "react";
import "../../../styles/MainInterface/common/Settings.css"; // Optional: add styles for the settings modal

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
    setNewName("");
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Password change requested:", currentPassword, newPassword);
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal fade-in-up">
        <h2>설정</h2>
        {/* 로그아웃 버튼 */}
        <div className="modal-buttons">
          <button type="button" onClick={onLogout}>
            로그아웃
          </button>
        </div>

        {/* 이름 변경 폼 */}
        <form onSubmit={handleNameChange}>
          <label>
            이름 변경:
            <input
              type="text"
              placeholder="새 이름"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">새 이름</button>
          </div>
        </form>

        {/* 비밀번호 변경 폼 */}
        <form onSubmit={handlePasswordChange}>
          <label>
            현재 비밀번호:
            <input
              type="password"
              placeholder="현재 비밀번호"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </label>
          <label>
            새 비밀번호:
            <input
              type="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">비밀번호 변경</button>
          </div>
        </form>

        {/* 닫기 버튼 */}
        <div className="modal-buttons">
          <button type="button" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;