import React, { useState } from "react";
import "../../../../styles/MainInterface/OrganizationStrip/AddOrganizationModal.css";
import { createOrganization } from "../../../../api/organization";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface AddOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddOrganizationModal: React.FC<AddOrganizationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [orgName, setOrgName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim()) return;

    try {
      if (!user?.email) throw new Error("User email not found");

      await createOrganization({
        name: orgName.trim(),
        email: user.email,
      });
      setOrgName("");
      onClose();
    } catch (err) {
      console.error("Failed to create organization:", err);
    }
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