

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setSelectedOrgId } from "../store/slices/uiSlice";
import { fetchInitUserData } from "../api/user";
import { initSocket } from "../services/socketService";
import { setUserInitData } from "../store/slices/userSlice";
import MainPage from "./MainPage";
import WikiPage from "./WikiPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const MainRenderComponent: React.FC = () => {
  const dispatch = useDispatch();
  const selectedRenderMode = useSelector((state: RootState) => state.ui.selectedRenderMode);
  const [loading, setLoading] = useState(true);
  const [userReady, setUserReady] = useState(false);

useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const initData = await fetchInitUserData();

        dispatch(setUserInitData(initData));

        if (initData.orgs.length > 0) {
          const firstOrg = initData.orgs[0];
          dispatch(setSelectedOrgId(firstOrg.id));

          const firstTeam = firstOrg.teams?.[0];
          // if (firstTeam?.chatroom_id) {
          //   initSocket(firstTeam.chatroom_id);
          // }
        }
      } catch (err) {
        console.error("Failed to fetch user init data:", err);
      }
      setUserReady(true);
    } else {
      setUserReady(false);
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userReady) {
    return <div>Please log in to access the application.</div>;
  }

    return selectedRenderMode === 'chat' ? <MainPage /> : <WikiPage />;
};

export default MainRenderComponent;