import React from "react";
import { useSelector } from "react-redux";
import OrganizationBlock from "./OrganizationBlock";
import "../../../../styles/MainInterface/PeerStrip/PeerStrip.css";
import { RootState } from "../../../../store";

const PeerStrip: React.FC = () => {
  const organizations = useSelector((state: RootState) => state.user.orgs);

  return (
    <div className="peer-strip">
      <h2 className="peer-strip-title">Peers</h2>
      <div className="organization-list">
        {organizations.map((org) => (
          <OrganizationBlock
            key={org.id}
            organization={org}
          />
        ))}
      </div>
    </div>
  );
};

export default PeerStrip;