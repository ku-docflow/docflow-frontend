import React, { useState } from "react";
import "../../../styles/PeerStrip/TeamBlock.css"; // Import the CSS file
import InteractionGuard from "../../common/InteractionGuard";
import IndividualBlock from "./IndividualBlock";

interface Peer {
  id: string;
  name: string;
  online: boolean;
}

interface Team {
  id: string;
  name: string;
  peers: Peer[];
}

interface TeamBlockProps {
  team: Team;
  onSelectChatRoom: (chatRoomId: string) => void;
}

const TeamBlock: React.FC<TeamBlockProps> = ({ team, onSelectChatRoom }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isCollapsing, setIsCollapsing] = useState<boolean>(false);

  const toggleTeam = () => {
    if (expanded) {
      setIsCollapsing(true);
      setExpanded(false);
      setTimeout(() => {
        setIsCollapsing(false);
      }, 300); // This delay matches the CSS transition duration
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
              onSelect={(individual) => onSelectChatRoom(individual.id)}
            />
          ))}
        </div>
      </div>
    </InteractionGuard>
  );
};

export default TeamBlock;