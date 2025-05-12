import React, {useState, ReactElement} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { setSelectedOrg, resetSelection } from "../../../../store/slices/uiSlice";
import '../../../../styles/MainInterface/strips/OrganizationStrip/OrganizationStripButton.css';
import '../../../../styles/MainInterface/strips/OrganizationStrip/OrganizationStrip.css';
import Settings from '../../common/Settings';
import AddOrganizationModal from "./AddOrganizationModel";
import { FaCog } from "react-icons/fa";

const OrganizationStrip: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dispatch = useDispatch();
  const organizations = useSelector((state: RootState) => state.user.orgs || []);
  const handleProfileClick = () => {
    dispatch(resetSelection());
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

        <button
          className="OrganizationStripButton"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>

        <AddOrganizationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
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