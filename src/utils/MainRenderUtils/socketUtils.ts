import { Socket } from "socket.io-client";
import { InitUserResponse } from "../../types/user";

export const joinChatRooms = (socket: Socket, initData: InitUserResponse) => {
  initData.orgs.forEach((org) => {
    org.teams.forEach((team) => {
      if (team.chatroom_id) {
        socket.emit("join_room", { chatroom_id: Number(team.chatroom_id) });
      }
      team.peers.forEach((peer) => {
        if (peer.chatroom_id) {
          socket.emit("join_room", { chatroom_id: Number(peer.chatroom_id) });
        }
      });
    });
  });
  socket.emit("join_room", {
    chatroom_id: Number(initData.user.search_bot_chatroom_id),
  });
};
