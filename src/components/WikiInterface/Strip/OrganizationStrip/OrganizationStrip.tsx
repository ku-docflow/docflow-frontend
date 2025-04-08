import React from "react";
import '../../../../styles/WikiInterface/OrganizationStrip/OrganizationStrip.css';

interface OrganizationStripProps {
  onOrganizationSelect: (orgId: string) => void;
}

const dummyOrganizations = [
  { id: "org1", name: "Organization 1" },
  { id: "org2", name: "Organization 2" },
  { id: "org3", name: "Organization 3" }
];

const OrganizationStrip: React.FC<OrganizationStripProps> = ({ onOrganizationSelect }) => {
  return (
    <div className="organization-strip-container wiki-mode">
      <div className="organization-button-container">
        {dummyOrganizations.map((org) => (
          <button
            key={org.id}
            className="OrganizationStripButton"
            onClick={() => onOrganizationSelect(org.id)}
          >
            {org.name.charAt(0)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrganizationStrip;