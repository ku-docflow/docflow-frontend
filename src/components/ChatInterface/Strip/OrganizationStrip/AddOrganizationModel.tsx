import React, { useState } from "react";
import "../../../../styles/ChatInterface/OrganizationStrip/AddOrganizationModal.css";

interface AddOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const AddOrganizationModal: React.FC<AddOrganizationModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [orgName, setOrgName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim()) return;
    onCreate(orgName.trim());
    setOrgName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fade-in-up">
      <div className="modal">
        <h2>새 Organization 만들기</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Organization 이름"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
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

export default AddOrganizationModal;