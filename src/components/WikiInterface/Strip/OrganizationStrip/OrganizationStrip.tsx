import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import '../../../../styles/WikiInterface/OrganizationStrip/OrganizationStrip.css';

const OrganizationStrip: React.FC = () => {
  const organizations = useSelector((state: RootState) => state.user.orgs);

  return (
    <div className="organization-strip-container wiki-mode">
      <div className="organization-button-container">
        {organizations.map((org) => (
          <button
            key={org.id}
            className="OrganizationStripButton"
          >
            {org.name.charAt(0)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrganizationStrip;