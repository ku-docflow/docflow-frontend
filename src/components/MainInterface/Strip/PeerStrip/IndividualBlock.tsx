import React from "react";
import { useDispatch } from "react-redux";
import "../../../../styles/MainInterface/strips/PeerStrip/IndividualBlock.css";
import { Peer } from "../../../../types/user";
import { setSelectedPeer } from "../../../../store/slices/uiSlice";

interface IndividualBlockProps {
  peer: Peer;
}

const IndividualBlock: React.FC<IndividualBlockProps> = ({ peer }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedPeer(peer));
  };

  return (
    <div
      className={`IndividualBlock ${peer.online ? "online" : "offline"}`}
      onClick={handleClick}
    >
      <div
        className={`IndividualBlock__indicator ${peer.online ? "online" : "offline"}`}
      />
      <span className="IndividualBlock__name">{peer.first_name + peer.last_name}</span>
    </div>
  );
};

export default IndividualBlock;
