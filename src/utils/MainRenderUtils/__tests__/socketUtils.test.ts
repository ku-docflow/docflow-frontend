import { joinChatRooms } from "../socketUtils";
import { Socket } from "socket.io-client";
import { InitUserResponse } from "../../../types/user";

describe("socketUtils", () => {
  let mockSocket: jest.Mocked<Socket>;
  const mockInitData: InitUserResponse = {
    user: {
      id: "1",
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      search_bot_chatroom_id: "1",
    },
    orgs: [
      {
        id: "1",
        name: "Org 1",
        admins: ["1"],
        teams: [
          {
            id: "1",
            name: "Team 1",
            chatroom_id: "1",
            peers: [
              {
                id: "2",
                first_name: "Jane",
                last_name: "Smith",
                chatroom_id: "2",
                online: true,
              },
            ],
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    mockSocket = {
      emit: jest.fn(),
    } as unknown as jest.Mocked<Socket>;
  });

  describe("joinChatRooms", () => {
    it("should join all chat rooms", () => {
      joinChatRooms(mockSocket, mockInitData);

      expect(mockSocket.emit).toHaveBeenCalledTimes(3); // Team chatroom + Peer chatroom + Search bot chatroom
      expect(mockSocket.emit).toHaveBeenCalledWith("join_room", {
        chatroom_id: 1,
      }); // Team chatroom
      expect(mockSocket.emit).toHaveBeenCalledWith("join_room", {
        chatroom_id: 2,
      }); // Peer chatroom
      expect(mockSocket.emit).toHaveBeenCalledWith("join_room", {
        chatroom_id: 1,
      }); // Search bot chatroom
    });

    it("should handle teams without chatroom_id", () => {
      const dataWithoutChatroom: InitUserResponse = {
        ...mockInitData,
        orgs: [
          {
            ...mockInitData.orgs[0],
            teams: [
              {
                ...mockInitData.orgs[0].teams[0],
                chatroom_id: "",
              },
            ],
          },
        ],
      };

      joinChatRooms(mockSocket, dataWithoutChatroom);

      expect(mockSocket.emit).toHaveBeenCalledTimes(2); // Peer chatroom + Search bot chatroom
      expect(mockSocket.emit).toHaveBeenCalledWith("join_room", {
        chatroom_id: 2,
      }); // Peer chatroom
      expect(mockSocket.emit).toHaveBeenCalledWith("join_room", {
        chatroom_id: 1,
      }); // Search bot chatroom
    });

    it("should handle peers without chatroom_id", () => {
      const dataWithoutPeerChatroom: InitUserResponse = {
        ...mockInitData,
        orgs: [
          {
            ...mockInitData.orgs[0],
            teams: [
              {
                ...mockInitData.orgs[0].teams[0],
                peers: [
                  {
                    ...mockInitData.orgs[0].teams[0].peers[0],
                    chatroom_id: null,
                  },
                ],
              },
            ],
          },
        ],
      };

      joinChatRooms(mockSocket, dataWithoutPeerChatroom);

      expect(mockSocket.emit).toHaveBeenCalledTimes(2); // Team chatroom + Search bot chatroom
      expect(mockSocket.emit).toHaveBeenCalledWith("join_room", {
        chatroom_id: 1,
      }); // Team chatroom
      expect(mockSocket.emit).toHaveBeenCalledWith("join_room", {
        chatroom_id: 1,
      }); // Search bot chatroom
    });
  });
});
