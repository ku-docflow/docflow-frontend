import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTeam } from "../../../../store/slices/uiSlice";
import "../../../../styles/MainInterface/strips/ChatChannelStrip/ChatChannelStrip.css";
import { useChatChannelStrip } from "../../../../hooks/ChatInterfaceHooks/ChatChannelStripHooks/useChatChannelStrip";
import { RootState } from "../../../../store";

const ChatChannelStrip: React.FC = () => {
  const dispatch = useDispatch();
  const context = useChatChannelStrip();
  const selectedTeam = useSelector((state: RootState) => state.ui.selectedTeam)
  if (!context) return null;

  const {
    org,
    currentUser,
    isAdding,
    newTeamName,
    setIsAdding,
    setNewTeamName,
    handleCreateTeam,
    handleKeyDown,
    authorityToCreateNewTeam,
  } = context;

  if (!org || !currentUser) return null;

  return (
    <div className="chat-channel-strip">
      <h2 className="chat-channel-title">{org.name}</h2>
      <ul className="chat-channel-list">
        {org.teams.map((team) => (
          <li
            key={team.id}
            className={`chat-channel-item${selectedTeam && selectedTeam.id === team.id ? " selected" : ""}`}
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
              onKeyDown={handleKeyDown}
              className="chat-channel-input"
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default ChatChannelStrip;