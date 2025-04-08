import React, {useState} from "react";
import '../../../../styles/ChatInterface/OrganizationStrip/OrganizationStripButton.css';
import '../../../../styles/ChatInterface/OrganizationStrip/OrganizationStrip.css';
import Settings from '../../common/Settings';
import AddOrganizationModal from "./AddOrganizationModel";

interface OrganizationStripProps {
  onProfileClick: () => void;
  onOrganizationSelect: (orgId: string) => void;
}

const dummyOrganizations = [
  { id: "org1", name: "Organization 1" },
  { id: "org2", name: "Organization 2" },
  { id: "org3", name: "Organization 3" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
  { id: "org4", name: "Organization 4" },
];

const OrganizationStrip: React.FC<OrganizationStripProps> = ({
  onProfileClick,
  onOrganizationSelect,
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organizations, setOrganizations] = useState<string[]>(["Org A", "Org B"]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleCreate = (name: string) => {
    setOrganizations([...organizations, name]);
  };

  return (
    <div className="organization-strip-container">
      <div className="organization-strip-top">
        <button
          className="OrganizationStripButton"
          onClick={onProfileClick}
        >
          DM
        </button>
      </div>

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

        <button
          className="OrganizationStripButton"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>

        <AddOrganizationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreate}
        />
      </div>

      <div className="organization-strip-settings">
        <button
          className="OrganizationStripButton"
          onClick={() => setIsSettingsOpen(true)}
        >
          ⚙️
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