import React, { ReactElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { setSelectedOrg, resetSelection } from "../../../../store/slices/uiSlice";
import '../../../../styles/MainInterface/strips/OrganizationStrip/OrganizationStripButton.css';
import '../../../../styles/MainInterface/strips/OrganizationStrip/OrganizationStrip.css';
import Settings from '../../common/Settings';
import { FaCog, FaPlus } from "react-icons/fa";
import { useOrganizationStrip } from "../../../../hooks/ChatInterfaceHooks/OrganizationStripHooks/useOrganizationStrip";

const OrganizationStrip: React.FC = () => {
  const dispatch = useDispatch();
  const organizations = useSelector((state: RootState) => state.user.orgs || []);
  const selectedOrg = useSelector((state: RootState) => state.ui.selectedOrg);
  const {
    isSettingsOpen,
    isAdding,
    newOrgName,
    setIsSettingsOpen,
    setIsAdding,
    setNewOrgName,
    handleCreateOrg,
    handleKeyDown,
  } = useOrganizationStrip();

  const handleProfileClick = () => {
    dispatch(resetSelection());
  };

  return (
    <div className="organization-strip-container">
      <div className="organization-strip-top">
        <button
          className={`OrganizationStripButton ${!selectedOrg ? 'selected' : ''}`}
          onClick={handleProfileClick}
        >
          <span className="btnText">DM</span>
        </button>
      </div>

      <div className="organization-button-container">
        {organizations.map((org) => (
          <button
            key={org.id}
            className={`OrganizationStripButton ${selectedOrg?.id === org.id ? 'selected' : ''}`}
            onClick={() => dispatch(setSelectedOrg(org))}
          >
            <span className="btnText">{org.name.charAt(0)}</span>
          </button>
        ))}

        {!isAdding && (
          <button
            className="OrganizationStripButton"
            onClick={() => setIsAdding(true)}
          >
            {FaPlus({ size: 14, color: "#fff" }) as ReactElement}
          </button>
        )}

        {isAdding && (
          <li className="OrganizationStripButton">
            <input
              autoFocus
              type="text"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
              onBlur={handleCreateOrg}
              onKeyDown={handleKeyDown}
              className="OrganizationStripButton-input"
            />
          </li>
        )}
      </div>

      <div className="organization-strip-settings">
        <button
          className="OrganizationStripButton"
          onClick={() => setIsSettingsOpen(true)}
        >
          {FaCog({ size: 24, color: "#fff" }) as ReactElement}
        </button>
      </div>
      {isSettingsOpen && (
        <Settings
          onClose={() => setIsSettingsOpen(false)}
          onLogout={() => {
            console.log("Logging out...");
            setIsSettingsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default OrganizationStrip;