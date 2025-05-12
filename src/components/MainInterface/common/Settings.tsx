import React, { useState } from "react";
import "../../../styles/MainInterface/common/Settings.css"; // Optional: add styles for the settings modal
import { patchUserName } from "../../../api/user";

interface SettingsProps {
  onClose: () => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose, onLogout }) => {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleNameChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newFirstName.trim() === "") {
      alert("이름을 입력해주세요.");
      return;
    }
    try {
      const response = await patchUserName({ first_name: newFirstName, last_name: newLastName });
      console.log("이름이 변경되었습니다", response);
      alert("이름이 성공적으로 변경되었습니다."); //좀 더 이쁜 모습으로 다듬자
      setNewFirstName("");
      setNewLastName("");
    } catch (error) {
      console.error("Error changing name:", error);
      alert("이름 변경에 실패했습니다.");
    }
  }

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