import { useDispatch } from "react-redux";
import { setSelectedRenderMode } from "../../store/slices/uiSlice";
import { useCallback } from "react";

export const useRenderModeToggle = () => {
  const dispatch = useDispatch();

  const toggleRenderMode = useCallback(
    (currentMode: "wiki" | "chat") => {
      const nextMode = currentMode === "wiki" ? "chat" : "wiki";
      dispatch(setSelectedRenderMode(nextMode));
    },
    [dispatch]
  );

  return { toggleRenderMode };
};
