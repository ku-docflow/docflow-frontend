// src/components/ChatChannelStrip.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setSelectedChatRoomId } from "../../../store/slices/uiSlice";
import "../../../styles/MainInterface/ChatChannelStrip.css";

const ChatChannelStrip: React.FC = () => {
  const dispatch = useDispatch();
  const selectedOrgId = useSelector((state: RootState) => state.ui.selectedOrgId);
  const organizations = useSelector((state: RootState) => state.user.orgs);
  const currentUser = useSelector((state: RootState) => state.user.user);

  const org = organizations.find((o) => o.id === selectedOrgId);

  if (!org || !currentUser) return null;

  const authorityToCreateNewTeam = currentUser.email === org.email ? true : false;

  console.log("authorityToCreateNewTeam", authorityToCreateNewTeam);
  console.log("org email: ", org.email);
  console.log("currentUser email: ", currentUser.email);

  const DummyCreateTeamApi = async (orgId: string) => {
    console.log(`DummyCreateTeamApi called for organization ${orgId}`);
  };

  return (
    <div className="chat-channel-strip">
      <h2 className="chat-channel-title">{org.name}</h2>
      <ul className="chat-channel-list">
        {org.teams.map((team) => (
          <li
            key={team.id}
            className="chat-channel-item"
            onClick={() => dispatch(setSelectedChatRoomId(team.chatroom_id))}
          >
            # {team.name}
          </li>
        ))}
        {authorityToCreateNewTeam && (
          <li
            className="chat-channel-item"
            onClick={() => DummyCreateTeamApi(org.id)}
          >
            +
          </li>
        )}
      </ul>
    </div>
  );
};

export default ChatChannelStrip;