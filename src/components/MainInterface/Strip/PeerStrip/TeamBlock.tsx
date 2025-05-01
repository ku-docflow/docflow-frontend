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

  return (
    <InteractionGuard duration={500} trigger={expanded}>
      <div className={`TeamBlock ${expanded ? "expanded" : ""} ${isCollapsing ? "collapsing" : ""}`}>
        <div className="TeamBlock-header" onClick={toggleTeam}>
          <span>{team.name}</span>
        </div>
        <div className="TeamBlock-content">
          {team.peers.map((peer) => (
            <IndividualBlock
              key={peer.id}
              individual={peer}
            />
          ))}
        </div>
      </div>
    </InteractionGuard>
  );
};

export default TeamBlock;