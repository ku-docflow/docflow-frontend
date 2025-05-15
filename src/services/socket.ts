import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (userId: string): Socket => {
  if (!socket || !socket.connected) {
    socket = io(process.env.REACT_APP_BACKEND_ENDPOINT, {
      query: { user_id: userId },
      transports: ["websocket"],
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};

export const getSocket = (): Socket | null => socket;
