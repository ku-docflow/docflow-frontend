import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { createOrganization } from "../../../api/organization";

export const useOrganizationStrip = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");

  const user = useSelector((state: RootState) => state.auth.user);

  const handleCreateOrg = async () => {
    const trimmed = newOrgName.trim();
    if (!trimmed) {
      setIsAdding(false);
      setNewOrgName("");
      return;
    }

    try {
      if (!user?.email) throw new Error("User email not found");
      await createOrganization({
        name: trimmed,
        email: user.email,
      });
    } catch (err) {
      console.error("Failed to create organization:", err);
    } finally {
      setIsAdding(false);
      setNewOrgName("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCreateOrg();
    if (e.key === "Escape") {
      setIsAdding(false);
      setNewOrgName("");
    }
  };

  return {
    isSettingsOpen,
    setIsSettingsOpen,
    isAdding,
    setIsAdding,
    newOrgName,
    setNewOrgName,
    handleCreateOrg,
    handleKeyDown,
  };
};
