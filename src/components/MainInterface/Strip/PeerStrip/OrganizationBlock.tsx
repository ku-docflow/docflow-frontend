import React from "react";
import TeamBlock from "./TeamBlock";
import "../../../../styles/MainInterface/strips/PeerStrip/OrganizationBlock.css";
import InteractionGuard from "../../../common/InteractionGuard";
import { Organization } from "../../../../types/user";
import { useExpandable } from "../../../../hooks/common/useExpandable";

interface OrganizationBlockProps {
  organization: Organization;
}

const OrganizationBlock: React.FC<OrganizationBlockProps> = ({ organization }) => {
  const { expanded, isCollapsing, toggle } = useExpandable();

  return (
    <InteractionGuard duration={500} trigger={expanded}>
      <div className={`OrganizationBlock ${expanded ? "expanded" : ""} ${isCollapsing ? "collapsing" : ""}`}>
        <div className="OrganizationBlock-header" onClick={toggle}>
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