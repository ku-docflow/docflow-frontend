import React from "react";
import "../../../../styles/ChatInterface/PeerStrip/IndividualBlock.css";

export interface Individual {
  id: string;
  name: string;
  online: boolean;
}

interface IndividualBlockProps {
  individual: Individual;
  onSelect: (individual: Individual) => void;
}

const IndividualBlock: React.FC<IndividualBlockProps> = ({ individual, onSelect }) => {
  return (
    <div
      className={`IndividualBlock ${individual.online ? "online" : "offline"}`}
      onClick={() => onSelect(individual)}
    >
      <div
        className={`IndividualBlock__indicator ${individual.online ? "online" : "offline"}`}
      />
      <span className="IndividualBlock__name">{individual.name}</span>
    </div>
  );
};

export default IndividualBlock;
