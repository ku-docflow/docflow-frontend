import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { setSelectedOrg } from "../../../../store/slices/uiSlice";
import '../../../../styles/WikiInterface/OrganizationStrip/OrganizationStrip.css';

const OrganizationStrip: React.FC = () => {
  const dispatch = useDispatch();
  const organizations = useSelector((state: RootState) => state.user.orgs || []);
  const selectedOrg = useSelector((state: RootState) => state.ui.selectedOrg);

  return (
    <div className="organization-strip-container wiki-mode">
      <div className="organization-button-container">
        {organizations.map((org) => (
          <button
            key={org.id}
            onClick={() => dispatch(setSelectedOrg(org))}
            className={`OrganizationStripButton ${selectedOrg?.id === org.id ? 'selected' : ''}`}
          >
            <span className="btnText">{org.name.charAt(0)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrganizationStrip;