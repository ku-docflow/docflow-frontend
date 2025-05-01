import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setSelectedOrgId } from "../store/slices/uiSlice";
import { fetchInitUserData } from "../api/user";
import { connectSocket, getSocket } from "../services/socket";
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

        const socket = connectSocket(user.uid);
        console.log("Socket connected:", socket);

        const joinRooms = (data: typeof initData) => {
          data.orgs.forEach(org => {
            org.teams.forEach(team => {
              if (team.chatroom_id) {
                socket.emit('join_room', { chatroom_id: parseInt(team.chatroom_id) });
              }
              team.peers.forEach(peer => {
                if (peer.chatroom_id) {
                  socket.emit('join_room', { chatroom_id: parseInt(peer.chatroom_id) });
                }
              });
            });
          });
        };

        joinRooms(initData);

        socket.on("refresh_required", async () => {
          console.log("🔄 refresh_required received from server");

          try {
            const refreshedData = await fetchInitUserData();
            dispatch(setUserInitData(refreshedData));
            joinRooms(refreshedData);
            console.log("✅ Init data refreshed and rooms rejoined.");
          } catch (err) {
            console.error("❌ Failed to refresh init data:", err);
          }
        });
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