import React, { useEffect, useState } from "react";

interface InteractionGuardProps {
  duration: number; // in milliseconds
  trigger: any;     // a key that tells it to run again
  children: React.ReactNode;
}

const InteractionGuard: React.FC<InteractionGuardProps> = ({ duration, trigger, children }) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(true);
    const timer = setTimeout(() => setDisabled(false), duration);
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div style={{ pointerEvents: disabled ? "none" : "auto" }}>
      {children}
    </div>
  );
};

export default InteractionGuard;