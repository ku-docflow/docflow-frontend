import React from "react";
import "../../../styles/MainInterface/common/Settings.css";
import { useSettings } from "../../../hooks/ChatInterfaceHooks/SettingHooks/useSettings";

interface SettingsProps {
  onClose: () => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose, onLogout }) => {
  const {
    newFirstName,
    setNewFirstName,
    newLastName,
    setNewLastName,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    handleSubmitName,
    handleSubmitPassword,
  } = useSettings();

  return (
    <div className="modal-overlay">
      <div className="modal fade-in-up">
        <h2>설정</h2>
        <div className="modal-buttons">
          <button type="button" onClick={onLogout}>
            로그아웃
          </button>
        </div>

        <form onSubmit={handleSubmitName}>
          <label>
            이름 변경:
            <input
              type="text"
              placeholder="성"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="이름"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
          </label>
          <div className="modal-buttons">
            <button type="submit" disabled={!newFirstName && !newLastName}>이름 변경</button>
          </div>
        </form>

        <form onSubmit={handleSubmitPassword}>
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
            <button type="submit" disabled={!currentPassword || !newPassword}>비밀번호 변경</button>
          </div>
        </form>

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