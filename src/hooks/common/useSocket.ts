// src/hooks/useSocket.ts
import { useEffect } from "react";
import {
  connectSocket,
  disconnectSocket,
  getSocket,
} from "../../services/socket";
import { useDispatch } from "react-redux";
import { setUserInitData } from "../../store/slices/userSlice";
import { appendBufferedMessage } from "../../store/slices/messageSlice";

export const useSocket = (userId: string, idToken: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = connectSocket(userId);

    socket.on("connect", () => {
      console.log("✅ Socket connected");
    });

    socket.on("refresh_required", async () => {
      console.log("🔄 Received refresh_required");
      try {
        const res = await fetch("http://localhost:4000/user/init", {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        const data = await res.json();
        dispatch(setUserInitData(data));
      } catch (err) {
        console.error("Failed to fetch user init data:", err);
      }
    });

    socket.on("receive_message", (msg) => {
      console.log("💬 Incoming message:", msg);

      const currentChatroomId =
        window.sessionStorage.getItem("active_chatroom");
      if (parseInt(currentChatroomId || "-1") !== msg.chatroom_id) {
        const existing = JSON.parse(
          localStorage.getItem(`chatroom-${msg.chatroom_id}`) || "[]"
        );
        existing.push(msg);
        localStorage.setItem(
          `chatroom-${msg.chatroom_id}`,
          JSON.stringify(existing)
        );
      } else {
        dispatch(appendBufferedMessage(msg));
      }
    });

    return () => {
      socket.off("refresh_required");
      socket.off("receive_message");
      disconnectSocket();
    };
  }, [userId, idToken, dispatch]);
};
