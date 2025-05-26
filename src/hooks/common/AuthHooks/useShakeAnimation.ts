import { useState, useEffect, useCallback } from "react";

export const useShakeAnimation = (trigger: boolean) => {
  const [isShaking, setIsShaking] = useState(false);

  const triggerShake = useCallback(() => {
    setIsShaking(true);
    const timer = setTimeout(() => setIsShaking(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (trigger) {
      triggerShake();
    }
  }, [trigger, triggerShake]);

  return isShaking;
};
