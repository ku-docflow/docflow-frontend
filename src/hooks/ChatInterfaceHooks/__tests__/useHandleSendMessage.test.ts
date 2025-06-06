import { renderHook } from "@testing-library/react";
import { useHandleSendMessage } from "../useHandleSendMessage";
import { getSocket } from "../../../services/socket";

jest.mock("../../../services/socket", () => ({
  getSocket: jest.fn(),
}));

describe("useHandleSendMessage", () => {
  const mockSocket = {
    connected: true,
    emit: jest.fn(),
  };
  const mockCurrentUser = {
    id: "1",
    first_name: "Test",
    last_name: "User",
    email: "test@example.com",
  };
  const mockTeam = null;
  const mockPeer = null;
  const mockSetSummaryBotTriggered = jest.fn();
  const mockSetQueryText = jest.fn();
  const mockSetSearchPending = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (getSocket as jest.Mock).mockReturnValue(mockSocket);
  });

  it("should not send message if text is empty or currentUser is null", async () => {
    const { result } = renderHook(() =>
      useHandleSendMessage(
        "123",
        null,
        mockTeam,
        mockPeer,
        mockSetSummaryBotTriggered,
        mockSetQueryText,
        mockSetSearchPending
      )
    );

    await result.current("", []);
    expect(mockSocket.emit).not.toHaveBeenCalled();
  });

  it("should trigger generation bot when mentioned", async () => {
    const { result } = renderHook(() =>
      useHandleSendMessage(
        "123",
        mockCurrentUser,
        mockTeam,
        mockPeer,
        mockSetSummaryBotTriggered,
        mockSetQueryText,
        mockSetSearchPending
      )
    );

    const mentions = [
      {
        userId: "generationBot",
        displayName: "Generation Bot",
        startIndex: 0,
        endIndex: 0,
      },
    ];

    await result.current("test message", mentions);
    expect(mockSetSummaryBotTriggered).toHaveBeenCalledWith(true);
    expect(mockSetQueryText).toHaveBeenCalledWith("test message");
    expect(mockSocket.emit).not.toHaveBeenCalled();
  });

  it("should send message through socket when connected", async () => {
    const { result } = renderHook(() =>
      useHandleSendMessage(
        "123",
        mockCurrentUser,
        mockTeam,
        mockPeer,
        mockSetSummaryBotTriggered,
        mockSetQueryText,
        mockSetSearchPending,
        true
      )
    );

    const mentions = [
      {
        userId: "user1",
        displayName: "User 1",
        startIndex: 0,
        endIndex: 0,
      },
    ];

    await result.current("test message", mentions);
    expect(mockSocket.emit).toHaveBeenCalledWith("send_message", {
      chatroom_id: "123",
      is_searchbot: true,
      message: {
        chatroom_id: "123",
        type: "default",
        text: "test message",
        sender: mockCurrentUser,
        mentions,
        shared_message_id: null,
        shared_message_sender: null,
      },
    });
    expect(mockSetSearchPending).toHaveBeenCalledWith(true);
  });

  it("should handle shared messages", async () => {
    const { result } = renderHook(() =>
      useHandleSendMessage(
        "123",
        mockCurrentUser,
        mockTeam,
        mockPeer,
        mockSetSummaryBotTriggered,
        mockSetQueryText,
        mockSetSearchPending
      )
    );

    const sharedMessage = {
      text: "shared text",
      sender: {
        id: "2",
        first_name: "Shared",
        last_name: "User",
      },
      id: "msg1",
    };

    await result.current("test message", [], sharedMessage);
    expect(mockSocket.emit).toHaveBeenCalledWith("send_message", {
      chatroom_id: "123",
      is_searchbot: true,
      message: {
        chatroom_id: "123",
        type: "shared",
        text: "test message",
        sender: mockCurrentUser,
        mentions: [],
        shared_message_id: "msg1",
        shared_message_sender: sharedMessage.sender,
      },
    });
  });

  it("should handle socket not connected", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    (getSocket as jest.Mock).mockReturnValue({ connected: false });

    const { result } = renderHook(() =>
      useHandleSendMessage(
        "123",
        mockCurrentUser,
        mockTeam,
        mockPeer,
        mockSetSummaryBotTriggered,
        mockSetQueryText,
        mockSetSearchPending
      )
    );

    await result.current("test message", []);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Socket is not connected");
    expect(mockSocket.emit).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
