import { useState, useCallback, useEffect } from "react";

interface UseResizableProps {
  minWidth?: number;
  maxWidth?: number;
  initialWidth?: number | null;
}

interface UseResizableReturn {
  width: number | null;
  isResizing: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
}

export const useResizable = ({
  minWidth = 300,
  maxWidth = window.innerWidth - 400,
  initialWidth = null,
}: UseResizableProps = {}): UseResizableReturn => {
  const [width, setWidth] = useState<number | null>(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsResizing(true);
      setStartX(e.clientX);
      setStartWidth(width || 0);
    },
    [width]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startX;
      const newWidth = Math.max(
        minWidth,
        Math.min(maxWidth, startWidth + deltaX)
      );
      setWidth(newWidth);
    },
    [isResizing, startX, startWidth, minWidth, maxWidth]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return {
    width,
    isResizing,
    handleMouseDown,
  };
};
