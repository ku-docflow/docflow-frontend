import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import '../styles/MainInterface/Layout/MainLayout.css';
import OrganizationStrip from "../components/MainInterface/Strip/OrganizationStrip/OrganizationStrip";
import PeerStrip from "../components/MainInterface/Strip/PeerStrip/PeerStrip";
import ChatChannelStrip from "../components/MainInterface/Strip/ChatChannelStrip/ChatChannelStrip";
import Dashboard from "../components/MainInterface/common/Dashboard";
import ChatRoomStrip from "../components/MainInterface/Strip/ChatRoomStrip";
import SearchbotStrip from "../components/MainInterface/Strip/SearchbotStrip";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const focusedOrg = useSelector((state: RootState) => state.ui.selectedOrg);
  const focusedTeam = useSelector((state: RootState) => state.ui.selectedTeam);
  const focusedPeer = useSelector((state: RootState) => state.ui.selectedPeer);

  return (
    <div className="main-layout">
      <div className="org-strip">
        <OrganizationStrip />
      </div>

      <div className="channel-strip">
        {focusedOrg === null ? (
          <PeerStrip />
        ) : (
          <ChatChannelStrip />
        )}
      </div>

      <div className="chat-area">
        {focusedOrg === null ? (
          focusedPeer === null ? (
            <Dashboard />
          ) : (
              <ChatRoomStrip team={null} peer={focusedPeer} dm={true} />
          )
        ) : focusedTeam === null ? (
          <div className="chat-area-placeholder">
            <p className="text-gray-300">채팅방이 선택되지 않았습니다.</p>
          </div>
        ) : (
              <ChatRoomStrip team={focusedTeam} peer={null} dm={false} />
        )}
      </div>

      <div className="searchbot-strip">
        <SearchbotStrip />
      </div>
    </div>
  );
};

export default MainLayout;