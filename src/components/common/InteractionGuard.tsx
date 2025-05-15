import React, { useEffect, useState } from "react";
import { useTimeout } from "../../hooks/common/useTimeout";

interface InteractionGuardProps {
  duration: number;
  trigger: any;
  children: React.ReactNode;
}

const InteractionGuard: React.FC<InteractionGuardProps> = ({ duration, trigger, children }) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(true);
  }, [trigger]);

  useTimeout(() => setDisabled(false), duration);

  return (
    <div style={{ pointerEvents: disabled ? "none" : "auto" }}>
      {children}
    </div>
  );
};

export default InteractionGuard;