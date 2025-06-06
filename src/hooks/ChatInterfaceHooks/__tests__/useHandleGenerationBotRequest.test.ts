import { renderHook } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useHandleGenerationBotRequest } from "../useHandleGenerationBotRequest";
import { generateDocument } from "../../../api/gen-bot";
import { getSocket } from "../../../services/socket";
import { fetchInitUserData } from "../../../api/user";
import { fetchAndStoreDocumentHierarchy } from "../../../utils/MainRenderUtils/fetchUtils";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("../../../api/gen-bot", () => ({
  generateDocument: jest.fn(),
}));

jest.mock("../../../services/socket", () => ({
  getSocket: jest.fn(),
}));

jest.mock("../../../api/user", () => ({
  fetchInitUserData: jest.fn(),
}));

jest.mock("../../../utils/MainRenderUtils/fetchUtils", () => ({
  fetchAndStoreDocumentHierarchy: jest.fn(),
}));

describe("useHandleGenerationBotRequest", () => {
  const mockDispatch = jest.fn();
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
  const mockResetSelection = jest.fn();
  const mockSetGenerationBotTriggered = jest.fn();
  const mockSetQueryText = jest.fn();
  const mockSetSelectedMessageIds = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (getSocket as jest.Mock).mockReturnValue(mockSocket);
  });

  it("should not proceed if query is missing or message count is not 2", async () => {
    const { result } = renderHook(() =>
      useHandleGenerationBotRequest(
        [1],
        "123",
        mockCurrentUser,
        mockTeam,
        mockPeer,
        "test query",
        "topic1",
        mockResetSelection,
        mockSetGenerationBotTriggered,
        mockSetQueryText,
        mockSetSelectedMessageIds
      )
    );

    await result.current();
    expect(generateDocument).not.toHaveBeenCalled();
  });

  it("should handle document generation successfully", async () => {
    const mockRefreshedData = { id: "1", name: "Test User" };
    (generateDocument as jest.Mock).mockResolvedValueOnce({ success: true });
    (fetchInitUserData as jest.Mock).mockResolvedValueOnce(mockRefreshedData);

    const { result } = renderHook(() =>
      useHandleGenerationBotRequest(
        [1, 2],
        "123",
        mockCurrentUser,
        mockTeam,
        mockPeer,
        "test query",
        "topic1",
        mockResetSelection,
        mockSetGenerationBotTriggered,
        mockSetQueryText,
        mockSetSelectedMessageIds
      )
    );

    await result.current();

    expect(generateDocument).toHaveBeenCalledWith({
      chatroom_id: 123,
      first_msg_id: 1,
      last_msg_id: 2,
      user_query: "test query",
      topic_id: "topic1",
    });
    expect(fetchInitUserData).toHaveBeenCalled();
    expect(fetchAndStoreDocumentHierarchy).toHaveBeenCalledWith(
      mockRefreshedData,
      mockDispatch
    );
    expect(mockResetSelection).toHaveBeenCalled();
    expect(mockSetQueryText).toHaveBeenCalledWith(null);
    expect(mockSetSelectedMessageIds).toHaveBeenCalledWith([]);
  });

  it("should handle document generation error", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const alertSpy = jest.spyOn(window, "alert").mockImplementation();
    (generateDocument as jest.Mock).mockRejectedValueOnce(
      new Error("Generation failed")
    );

    const { result } = renderHook(() =>
      useHandleGenerationBotRequest(
        [1, 2],
        "123",
        mockCurrentUser,
        mockTeam,
        mockPeer,
        "test query",
        "topic1",
        mockResetSelection,
        mockSetGenerationBotTriggered,
        mockSetQueryText,
        mockSetSelectedMessageIds
      )
    );

    await result.current();

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith("문서 생성에 실패했습니다.");
    expect(mockResetSelection).toHaveBeenCalled();
    expect(mockSetQueryText).toHaveBeenCalledWith(null);

    consoleErrorSpy.mockRestore();
    alertSpy.mockRestore();
  });
});
