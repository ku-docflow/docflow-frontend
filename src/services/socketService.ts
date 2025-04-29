// src/services/socketService.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io(process.env.REACT_APP_BACKEND_ENDPOINT!, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });
  }

  if (!socket.connected) {
    socket.connect();
  }

  return socket;
};

export const closeSocket = (): void => {
  if (socket) {
    socket.disconnect();
    console.log("🛑 Socket manually disconnected");
    socket = null;
  }
};

export const getSocket = (): Socket | null => {
  return socket;
};
