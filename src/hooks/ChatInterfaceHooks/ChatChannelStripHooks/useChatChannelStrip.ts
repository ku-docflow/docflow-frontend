import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useCreateTeam } from "../../../hooks/ChatInterfaceHooks/ChatChannelStripHooks/useCreateTeam";

export const useChatChannelStrip = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");

  const selectedOrg = useSelector((state: RootState) => state.ui.selectedOrg);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const organizations = useSelector((state: RootState) => state.user.orgs);

  const { handleCreateTeam } = useCreateTeam(() => {
    setIsAdding(false);
    setNewTeamName("");
  });

  const org = organizations.find((o) => o.id === selectedOrg?.id);

  if (!org || !currentUser) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter")
      handleCreateTeam(newTeamName, currentUser.email, org.id);
    if (e.key === "Escape") {
      setIsAdding(false);
      setNewTeamName("");
    }
  };

  const handleCreateTeamInput = () => {
    const trimmed = newTeamName.trim();
    if (!trimmed || !org || !currentUser?.email) {
      setIsAdding(false);
      setNewTeamName("");
      return;
    }
    handleCreateTeam(org.id, trimmed, currentUser.email);
  };

  const authorityToCreateNewTeam = org.admins.includes(currentUser?.id);

  return {
    org,
    currentUser,
    isAdding,
    newTeamName,
    setIsAdding,
    setNewTeamName,
    handleKeyDown,
    handleCreateTeam: handleCreateTeamInput,
    authorityToCreateNewTeam,
  };
};
