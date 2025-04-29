import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import '../styles/MainInterface/Layout/MainLayout.css';
import OrganizationStrip from "../components/MainInterface/Strip/OrganizationStrip/OrganizationStrip";
import PeerStrip from "../components/MainInterface/Strip/PeerStrip/PeerStrip";
import ChatChannelStrip from "../components/MainInterface/Strip/ChatChannelStrip";
import Dashboard from "../components/MainInterface/common/Dashboard";
import ChatRoomStrip from "../components/MainInterface/Strip/ChatRoomStrip";
import SearchbotStrip from "../components/MainInterface/Strip/SearchbotStrip";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const focusedOrg = useSelector((state: RootState) => state.ui.selectedOrgId);
  const focusedChatRoom = useSelector((state: RootState) => state.ui.selectedChatRoomId);
  const focusedPeer = useSelector((state: RootState) => state.ui.selectedPeerId);

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
            <ChatRoomStrip chatRoomId={focusedChatRoom} dm={true} />
          )
        ) : focusedChatRoom === null ? (
          <div className="chat-area-placeholder">
            <p className="text-gray-300">채팅방이 선택되지 않았습니다.</p>
          </div>
        ) : (
              <ChatRoomStrip chatRoomId={focusedChatRoom} dm={false} />
        )}
      </div>

      <div className="searchbot-strip">
        <SearchbotStrip />
      </div>
    </div>
  );
};

export default MainLayout;