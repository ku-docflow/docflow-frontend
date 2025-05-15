import { getSocket } from "./socket";
import { Message } from "../types/message";

export const sendMessage = (msg: Message) => {
  const socket = getSocket();
  if (!socket || !socket.connected) {
    console.warn("❌ Cannot send message: socket not connected");
    return;
  }

  socket.emit("send_message", msg);
  console.log(`📤 Sent message to chatroom ${msg.id}`);
};
