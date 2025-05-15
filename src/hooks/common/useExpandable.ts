// src/hooks/common/useExpandable.ts
import { useState } from "react";

export const useExpandable = (collapseDuration: number = 300) => {
  const [expanded, setExpanded] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);

  const toggle = () => {
    if (expanded) {
      setIsCollapsing(true);
      setExpanded(false);
      setTimeout(() => setIsCollapsing(false), collapseDuration);
    } else {
      setExpanded(true);
    }
  };

  return {
    expanded,
    isCollapsing,
    toggle,
    setExpanded, // 필요시 수동 제어
  };
};
