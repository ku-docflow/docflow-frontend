import React from "react";
import { useDispatch } from "react-redux";
import "../../../../styles/MainInterface/strips/PeerStrip/IndividualBlock.css";
import { Peer } from "../../../../types/user";
import { setSelectedPeerId, setSelectedChatRoomId } from "../../../../store/slices/uiSlice";

interface IndividualBlockProps {
  individual: Peer;
}

const IndividualBlock: React.FC<IndividualBlockProps> = ({ individual }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedPeerId(individual.id));
    dispatch(setSelectedChatRoomId(individual.id));
  };

  return (
    <div
      className={`IndividualBlock ${individual.online ? "online" : "offline"}`}
      onClick={handleClick}
    >
      <div
        className={`IndividualBlock__indicator ${individual.online ? "online" : "offline"}`}
      />
      <span className="IndividualBlock__name">{individual.first_name + individual.last_name}</span>
    </div>
  );
};

export default IndividualBlock;
