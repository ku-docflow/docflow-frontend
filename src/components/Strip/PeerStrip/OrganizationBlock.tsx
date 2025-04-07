import React, { useState } from "react";
import TeamBlock from "./TeamBlock";
import "../../../styles/PeerStrip/OrganizationBlock.css";
import InteractionGuard from "../../common/InteractionGuard";


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

interface Organization {
  id: string;
  name: string;
  teams: Team[];
}

interface OrganizationBlockProps {
  organization: Organization;
  onSelectChatRoom: (chatRoomId: string) => void;
}

const OrganizationBlock: React.FC<OrganizationBlockProps> = ({ organization, onSelectChatRoom }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isCollapsing, setIsCollapsing] = useState<boolean>(false);

  const toggleOrganization = () => {
    if (expanded) {
      setIsCollapsing(true);
      setExpanded(false);
      setTimeout(() => {
        setIsCollapsing(false);
      }, 300); // This delay should match your CSS transition duration for the overlay
    } else {
      setExpanded(true);
    }
  };

  return (
    <InteractionGuard duration={500} trigger={expanded}>
    <div className={`OrganizationBlock ${expanded ? "expanded" : ""} ${isCollapsing ? "collapsing" : ""}`}>
      <div className="OrganizationBlock-header" onClick={toggleOrganization}>
        <span>{organization.name}</span>
      </div>
      <div className="OrganizationBlock-content">
        {organization.teams.map(team => (
          <TeamBlock
            key={team.id}
            team={team}
            onSelectChatRoom={onSelectChatRoom}
          />
        ))}
      </div>
    </div>
    </InteractionGuard>
  );
};

export default OrganizationBlock;