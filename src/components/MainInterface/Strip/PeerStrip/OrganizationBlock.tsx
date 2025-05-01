import React, { useState } from "react";
import TeamBlock from "./TeamBlock";
import "../../../../styles/MainInterface/strips/PeerStrip/OrganizationBlock.css";
import InteractionGuard from "../../../common/InteractionGuard";
import { Organization } from "../../../../types/user";

interface OrganizationBlockProps {
  organization: Organization;
}

const OrganizationBlock: React.FC<OrganizationBlockProps> = ({ organization }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isCollapsing, setIsCollapsing] = useState<boolean>(false);

  const toggleOrganization = () => {
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
    <div className={`OrganizationBlock ${expanded ? "expanded" : ""} ${isCollapsing ? "collapsing" : ""}`}>
      <div className="OrganizationBlock-header" onClick={toggleOrganization}>
        <span>{organization.name}</span>
      </div>
      <div className="OrganizationBlock-content">
        {organization.teams.map(team => (
          <TeamBlock
            key={team.id}
            team={team}
          />
        ))}
      </div>
    </div>
    </InteractionGuard>
  );
};

export default OrganizationBlock;