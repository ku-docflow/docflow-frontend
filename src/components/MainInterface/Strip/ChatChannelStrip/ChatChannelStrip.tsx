// src/components/ChatChannelStrip.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { setSelectedTeam } from "../../../../store/slices/uiSlice";
import "../../../../styles/MainInterface/strips/ChatChannelStrip/ChatChannelStrip.css";
import AddNewTeamForm from "./AddNewTeamForm";
import { createTeam } from "../../../../api/team";

const ChatChannelStrip: React.FC = () => {
  const dispatch = useDispatch();
  const selectedOrg = useSelector((state: RootState) => state.ui.selectedOrg);
  const organizations = useSelector((state: RootState) => state.user.orgs);
  const currentUser = useSelector((state: RootState) => state.user.user);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const org = organizations.find((o) => o === selectedOrg);

  if (!org || !currentUser) return null;

  const authorityToCreateNewTeam = org.admins.includes(currentUser.id);

  const handleCreateTeam = async (teamName: string) => {
    try {
      console.log("org id: ", org.id);
      await createTeam({
        name: teamName,
        email: currentUser.email,
        organization_id: Number(org.id),
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to create team:", err)
    }
  };

  return (
    <div className="chat-channel-strip">
      <h2 className="chat-channel-title">{org.name}</h2>
      <ul className="chat-channel-list">
        {org.teams.map((team) => (
          <li
            key={team.id}
            className="chat-channel-item"
            onClick={() => dispatch(setSelectedTeam(team))}
          >
            # {team.name}
          </li>
        ))}
        {authorityToCreateNewTeam && (
          <li
            className="chat-channel-item"
            onClick={() => setIsModalOpen(true)}
          >
            + 새 팀 생성
          </li>
        )}
      </ul>
      <AddNewTeamForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTeam}
      />
    </div>
  );
};

export default ChatChannelStrip;