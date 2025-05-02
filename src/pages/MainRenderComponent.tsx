import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { fetchInitUserData } from "../api/user";
import { connectSocket } from "../services/socket";
import { setUserInitData } from "../store/slices/userSlice";
import MainPage from "./MainPage";
import WikiPage from "./WikiPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchTopicsByOrg } from "../api/topic";
import { fetchDocumentsByTopic } from "../api/document";
import { setDocumentHierarchy } from "../store/slices/documentSlice";
import { Navigate } from "react-router-dom";

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

        const fetchAllDocuments = async (data: typeof initData) => {
          const orgWithTopicsList = await Promise.all(
            data.orgs.map(async (org) => {
              const topics = await fetchTopicsByOrg(Number(org.id));
              const topicsWithDocs = await Promise.all(
                topics.map(async (topic) => {
                  const documents = await fetchDocumentsByTopic(topic.id);
                  return {
                    topic,
                    documents,
                  };
                })
              );
              return {
                organization: org,
                topics: topicsWithDocs,
              };
            })
          );
          dispatch(setDocumentHierarchy(orgWithTopicsList));
        }

        fetchAllDocuments(initData);

        socket.on("refresh_required", async () => {
          console.log("🔄 refresh_required received from server");

          try {
            const refreshedData = await fetchInitUserData();
            dispatch(setUserInitData(refreshedData));
            joinRooms(refreshedData);
            fetchAllDocuments(refreshedData);
          } catch (err) {
            console.error("❌ Failed to refresh init data:", err);
          }
        });

        //listen to incoming messages
        socket.on("receive_message", (message) => {
          console.log("📩 Message received:", message)
          //store to redux
          const chatroom_id = message.chatroom_id;

        }
        );

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
    return <Navigate to="/login" replace />;
  }

    return selectedRenderMode === 'chat' ? <MainPage /> : <WikiPage />;
};

export default MainRenderComponent;