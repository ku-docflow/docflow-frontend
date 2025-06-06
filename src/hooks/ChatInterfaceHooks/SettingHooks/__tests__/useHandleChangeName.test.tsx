import { renderHook, act } from "@testing-library/react";
import { useHandleChangeName } from "../useHandleChangeName";
import { patchUserName } from "../../../../api/user";

// Mock the patchUserName API
jest.mock("../../../../api/user", () => ({
  patchUserName: jest.fn(),
}));

describe("useHandleChangeName", () => {
  const mockSetNewFirstName = jest.fn();
  const mockSetNewLastName = jest.fn();
  const consoleSpy = jest.spyOn(console, "log");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error when first name is empty", async () => {
    const { result } = renderHook(() =>
      useHandleChangeName("", "Doe", mockSetNewFirstName, mockSetNewLastName)
    );

    await expect(result.current()).rejects.toThrow("이름을 모두 입력해야 합니다.");
    expect(patchUserName).not.toHaveBeenCalled();
  });

  it("should throw error when last name is empty", async () => {
    const { result } = renderHook(() =>
      useHandleChangeName("John", "", mockSetNewFirstName, mockSetNewLastName)
    );

    await expect(result.current()).rejects.toThrow("이름을 모두 입력해야 합니다.");
    expect(patchUserName).not.toHaveBeenCalled();
  });

  it("should call patchUserName with correct data when both names are provided", async () => {
    const mockResponse = { id: 1, first_name: "John", last_name: "Doe" };
    (patchUserName as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() =>
      useHandleChangeName("John", "Doe", mockSetNewFirstName, mockSetNewLastName)
    );

    await act(async () => {
      await result.current();
    });

    expect(patchUserName).toHaveBeenCalledWith({
      first_name: "John",
      last_name: "Doe",
    });
    expect(consoleSpy).toHaveBeenCalledWith("변경된 유저 데이터: ", mockResponse);
    expect(mockSetNewFirstName).toHaveBeenCalledWith("");
    expect(mockSetNewLastName).toHaveBeenCalledWith("");
  });

  it("should handle API error", async () => {
    const mockError = new Error("API Error");
    (patchUserName as jest.Mock).mockRejectedValueOnce(mockError);
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    
    const { result } = renderHook(() => 
      useHandleChangeName("John", "Doe", mockSetNewFirstName, mockSetNewLastName)
    );
    
    await act(async () => {
      await expect(result.current()).rejects.toThrow("API Error");
    });
    
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error changing name:", mockError);
    expect(mockSetNewFirstName).not.toHaveBeenCalled();
    expect(mockSetNewLastName).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it("should work without setter functions", async () => {
    const mockResponse = { id: 1, first_name: "John", last_name: "Doe" };
    (patchUserName as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useHandleChangeName("John", "Doe"));

    await act(async () => {
      await result.current();
    });

    expect(patchUserName).toHaveBeenCalledWith({
      first_name: "John",
      last_name: "Doe",
    });
    expect(consoleSpy).toHaveBeenCalledWith("변경된 유저 데이터: ", mockResponse);
  });
}); 