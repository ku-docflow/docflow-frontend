import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import React, { useState } from "react";
import "../../../../styles/MainInterface/strips/PeerStrip/TeamBlock.css";
import InteractionGuard from "../../../common/InteractionGuard";
import IndividualBlock from "./IndividualBlock";
import { Team } from "../../../../types/user";

interface TeamBlockProps {
  team: Team;
}

const TeamBlock: React.FC<TeamBlockProps> = ({ team }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isCollapsing, setIsCollapsing] = useState<boolean>(false);

  const toggleTeam = () => {
    if (expanded) {
      setIsCollapsing(true);
      setExpanded(false);
      setTimeout(() => {
        setIsCollapsing(false);
      }, 300);
    } else {
      setExpanded(true);
    }
  };

  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);
  const visiblePeers = team.peers.filter(peer => peer.id !== currentUserId);

  return (
    <InteractionGuard duration={500} trigger={expanded}>
      <div className={`TeamBlock ${expanded ? "expanded" : ""} ${isCollapsing ? "collapsing" : ""}`}>
        <div className="TeamBlock-header" onClick={toggleTeam}>
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