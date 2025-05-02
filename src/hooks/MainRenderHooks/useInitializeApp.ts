import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchInitUserData } from "../../api/user";
import { connectSocket } from "../../services/socket";
import { setUserInitData } from "../../store/slices/userSlice";
import { appendBufferedMessage } from "../../store/slices/messageSlice";
import { joinChatRooms } from "../../utils/MainRenderUtils/socketUtils";
import { fetchAndStoreDocumentHierarchy } from "../../utils/MainRenderUtils/fetchUtils";

export const useInitializeApp = () => {
  const dispatch = useDispatch();
  const [userReady, setUserReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const initData = await fetchInitUserData();
          dispatch(setUserInitData(initData));

          const socket = connectSocket(user.uid);
          joinChatRooms(socket, initData);
          await fetchAndStoreDocumentHierarchy(initData, dispatch);

          socket.on("refresh_required", async () => {
            const refreshed = await fetchInitUserData();
            joinChatRooms(socket, refreshed);
            await fetchAndStoreDocumentHierarchy(refreshed, dispatch);
          });

          socket.on("receive_message", (message) => {
            dispatch(appendBufferedMessage(message));
          });

          setUserReady(true);
        } catch (err) {
          console.error("Failed to initialize app:", err);
        }
      } else {
        setUserReady(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { userReady, loading };
};
