import React, { useEffect, useState } from "react";

interface InteractionGuardProps {
  duration: number; 
  trigger: any;
  children: React.ReactNode;
}

const InteractionGuard: React.FC<InteractionGuardProps> = ({ duration, trigger, children }) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(true);
    const timer = setTimeout(() => setDisabled(false), duration);
    return () => clearTimeout(timer);
  }, [trigger, duration]);

  return (
    <div style={{ pointerEvents: disabled ? "none" : "auto" }}>
      {children}
    </div>
  );
};

export default InteractionGuard;