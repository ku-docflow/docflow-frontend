import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import '../../../../styles/WikiInterface/OrganizationStrip/OrganizationStrip.css';
import { setSelectedOrg } from "../../../../store/slices/uiSlice";

const OrganizationStrip: React.FC = () => {
  const dispatch = useDispatch();
  const organizations = useSelector((state: RootState) => state.user.orgs);

  return (
    <div className="organization-strip-container wiki-mode">
      <div className="organization-button-container">
        {organizations.map((org) => (
          <button
            key={org.id}
            onClick = {() => dispatch(setSelectedOrg(org))}
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