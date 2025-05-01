import React, { useState } from "react";
import "../../../../styles/MainInterface/strips/ChatChannelStrip/AddNewTeamForm.css";

interface AddNewTeamFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teamName: string) => void;
}

const AddNewTeamForm: React.FC<AddNewTeamFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [teamName, setTeamName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = teamName.trim();
    if (!trimmed) return;

    onSubmit(trimmed);
    setTeamName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fade-in-up">
      <div className="modal">
        <h2>새 팀 만들기</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="팀 이름"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="submit">만들기</button>
            <button type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTeamForm;
