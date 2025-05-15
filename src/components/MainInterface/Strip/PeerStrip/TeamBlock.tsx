import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import React from "react";
import "../../../../styles/MainInterface/strips/PeerStrip/TeamBlock.css";
import InteractionGuard from "../../../common/InteractionGuard";
import IndividualBlock from "./IndividualBlock";
import { Team } from "../../../../types/user";
import { useExpandable } from "../../../../hooks/common/useExpandable";

interface TeamBlockProps {
  team: Team;
}

const TeamBlock: React.FC<TeamBlockProps> = ({ team }) => {
  const { expanded, isCollapsing, toggle } = useExpandable();

  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);
  const visiblePeers = team.peers.filter(peer => peer.id !== currentUserId);

  return (
    <InteractionGuard duration={500} trigger={expanded}>
      <div className={`TeamBlock ${expanded ? "expanded" : ""} ${isCollapsing ? "collapsing" : ""}`}>
        <div className="TeamBlock-header" onClick={toggle}>
          <span>{team.name}</span>
        </div>
        <div className="TeamBlock-content">
          {visiblePeers.map((peer) => (
            <IndividualBlock key={peer.id} peer={peer} />
          ))}
        </div>
      </div>
    </InteractionGuard>
  );
};

export default TeamBlock;