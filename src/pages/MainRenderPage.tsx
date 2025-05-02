import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MainPage from "./MainPage";
import WikiPage from "./WikiPage";
import { Navigate } from "react-router-dom";
import { useInitializeApp } from "../hooks/MainRenderHooks/useInitializeApp";

const MainRenderPage: React.FC = () => {
  const selectedRenderMode = useSelector((state: RootState) => state.ui.selectedRenderMode);
  const { loading, userReady } = useInitializeApp();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userReady) {
    return <Navigate to="/login" replace />;
  }

  return selectedRenderMode === 'chat' ? <MainPage /> : <WikiPage />;
};

export default MainRenderPage;