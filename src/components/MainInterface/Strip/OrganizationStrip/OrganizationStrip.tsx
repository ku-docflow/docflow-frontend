import React, {useState, ReactElement} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { setSelectedOrg, resetSelection } from "../../../../store/slices/uiSlice";
import '../../../../styles/MainInterface/strips/OrganizationStrip/OrganizationStripButton.css';
import '../../../../styles/MainInterface/strips/OrganizationStrip/OrganizationStrip.css';
import Settings from '../../common/Settings';
import { FaCog } from "react-icons/fa";
import { createOrganization } from "../../../../api/organization";

const OrganizationStrip: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dispatch = useDispatch();
  const organizations = useSelector((state: RootState) => state.user.orgs || []);
  const handleProfileClick = () => {
    dispatch(resetSelection());
  };
  const user = useSelector((state: RootState) => state.auth.user);

  const [isAdding, setIsAdding] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");

  const handleCreateOrg = async () => {
    const trimmed = newOrgName.trim();
    if (!trimmed) {
      setIsAdding(false);
      setNewOrgName("");
      return;
    }

    try {
      if (!user?.email) throw new Error("User email not found");

      await createOrganization({
        name: newOrgName.trim(),
        email: user.email,
      });
    } catch (err) {
      console.error("Failed to create organization:", err);
    } finally {
      setIsAdding(false);
      setNewOrgName("");
    }
  };

  return (
    <div className="organization-strip-container">
      <div className="organization-strip-top">
        <button
          className="OrganizationStripButton"
          onClick={handleProfileClick}
        >
          DM
        </button>
      </div>

      <div className="organization-button-container">
        {organizations.map((org) => (
          <button
            key={org.id}
            className="OrganizationStripButton"
            onClick={() => dispatch(setSelectedOrg(org))}
          >
            {org.name.charAt(0)}
          </button>
        ))}

        {!isAdding && (
          <button
            className="OrganizationStripButton"
            onClick={() => setIsAdding(true)}
          >
            +
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
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateOrg();
                if (e.key === "Escape") {
                  setIsAdding(false);
                  setNewOrgName("");
                }
              }}
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
          {FaCog({ size: 24, color: "#444" }) as ReactElement}
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