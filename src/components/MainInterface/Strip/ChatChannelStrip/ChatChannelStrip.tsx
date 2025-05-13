import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { setSelectedTeam } from "../../../../store/slices/uiSlice";
import "../../../../styles/MainInterface/strips/ChatChannelStrip/ChatChannelStrip.css";
import { createTeam } from "../../../../api/team";

const ChatChannelStrip: React.FC = () => {
  const dispatch = useDispatch();
  const selectedOrg = useSelector((state: RootState) => state.ui.selectedOrg);
  const organizations = useSelector((state: RootState) => state.user.orgs);
  const currentUser = useSelector((state: RootState) => state.user.user);
  

  const [isAdding, setIsAdding] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");

  const org = organizations.find((o) => o.id === selectedOrg?.id);

  if (!org || !currentUser) return null;

  const authorityToCreateNewTeam = org.admins.includes(currentUser.id);



  const handleCreateTeam = async () => {
    const trimmed = newTeamName.trim();
    if (!trimmed) {
      setIsAdding(false);
      setNewTeamName("");
      return;
    }

    try {
      await createTeam({
        name: trimmed,
        email: currentUser.email,
        organization_id: Number(org.id),
      });
    } catch (err) {
      console.error("Failed to create team:", err);
    } finally {
      setIsAdding(false);
      setNewTeamName("");
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

        {authorityToCreateNewTeam && !isAdding && (
          <li className="chat-channel-item" onClick={() => setIsAdding(true)}>
            + 새 팀 생성
          </li>
        )}

        {isAdding && (
          <li className="chat-channel-item">
            <input
              autoFocus
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              onBlur={handleCreateTeam}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateTeam();
                if (e.key === "Escape") {
                  setIsAdding(false);
                  setNewTeamName("");
                }
              }}
              className="chat-channel-input"
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default ChatChannelStrip;