import React, { useState } from "react";
import '../styles/Layout/MainLayout.css';
import OrganizationStrip from "../components/Strip/OrganizationStrip/OrganizationStrip";
import PeerStrip from "../components/Strip/PeerStrip/PeerStrip";
import ChatChannelStrip from "../components/Strip/ChatChannelStrip";
import Dashboard from "../components/common/Dashboard";
import ChatRoomStrip from "../components/Strip/ChatRoomStrip";
import SearchbotStrip from "../components/Strip/SearchbotStrip";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [focusedOrg, setFocusedOrg] = useState<string | null>(null);
  const [focusedChatRoom, setFocusedChatRoom] = useState<string | null>(null);
  const [focusedPeer, setFocusedPeer] = useState<string | null>(null);

  const handleProfileClick = () => {
    setFocusedOrg(null);
    setFocusedChatRoom(null);
    setFocusedPeer(null);
  };

  const handleOrganizationSelect = (orgId: string) => {
    setFocusedOrg(orgId);
    setFocusedChatRoom(null);
  };

  const handlePeerSelect = (peerId: string) => {
    setFocusedPeer(peerId);
    setFocusedOrg(null);
    setFocusedChatRoom(peerId);
  }

  const handleChatRoomSelect = (chatRoomId: string) => {
    setFocusedChatRoom(chatRoomId);
  };

  return (
    <div className="main-layout">
      <div className="org-strip">
        <OrganizationStrip
          onProfileClick={handleProfileClick}
          onOrganizationSelect={handleOrganizationSelect}
        />
      </div>

      <div className="channel-strip">
        {focusedOrg === null ? (
          <PeerStrip
            peerId={focusedPeer}
            onSelectChatRoom={handlePeerSelect}
          />
        ) : (
          <ChatChannelStrip
            orgId={focusedOrg}
            onSelectChatRoom={handleChatRoomSelect}
          />
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