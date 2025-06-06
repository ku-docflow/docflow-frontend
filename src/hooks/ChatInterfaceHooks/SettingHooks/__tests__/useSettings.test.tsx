import { renderHook, act } from "@testing-library/react";
import { useSettings } from "../useSettings";
import { patchUserName } from "../../../../api/user";

// Mock the patchUserName API
jest.mock("../../../../api/user", () => ({
  patchUserName: jest.fn(),
}));

describe("useSettings", () => {
  const alertSpy = jest.spyOn(window, "alert").mockImplementation();
  const consoleSpy = jest.spyOn(console, "log");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with empty values", () => {
    const { result } = renderHook(() => useSettings());

    expect(result.current.newFirstName).toBe("");
    expect(result.current.newLastName).toBe("");
    expect(result.current.currentPassword).toBe("");
    expect(result.current.newPassword).toBe("");
  });

  it("should update name fields", () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.setNewFirstName("John");
      result.current.setNewLastName("Doe");
    });

    expect(result.current.newFirstName).toBe("John");
    expect(result.current.newLastName).toBe("Doe");
  });

  it("should update password fields", () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.setCurrentPassword("oldPass123");
      result.current.setNewPassword("newPass123");
    });

    expect(result.current.currentPassword).toBe("oldPass123");
    expect(result.current.newPassword).toBe("newPass123");
  });

  it("should handle name change submission successfully", async () => {
    const mockResponse = { id: 1, first_name: "John", last_name: "Doe" };
    (patchUserName as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.setNewFirstName("John");
      result.current.setNewLastName("Doe");
    });

    await act(async () => {
      await result.current.handleSubmitName({ preventDefault: jest.fn() } as any);
    });

    expect(patchUserName).toHaveBeenCalledWith({
      first_name: "John",
      last_name: "Doe",
    });
    expect(result.current.newFirstName).toBe("");
    expect(result.current.newLastName).toBe("");
  });

  it("should handle name change submission error", async () => {
    const mockError = new Error("API Error");
    (patchUserName as jest.Mock).mockRejectedValueOnce(mockError);
    
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.setNewFirstName("John");
      result.current.setNewLastName("Doe");
    });

    await act(async () => {
      try {
        await result.current.handleSubmitName({ preventDefault: jest.fn() } as any);
      } catch (e) {
        // ignore
      }
    });

    // The alert should be called with the error message
    expect(alertSpy).toHaveBeenCalledWith("API Error");
  });

  it("should handle password change submission", async () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.setCurrentPassword("oldPass123");
      result.current.setNewPassword("newPass123");
    });

    await act(async () => {
      await result.current.handleSubmitPassword({ preventDefault: jest.fn() } as any);
    });

    expect(alertSpy).toHaveBeenCalledWith("비밀번호가 성공적으로 변경되었습니다.");
  });

  it("should handle password change submission error", async () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.setCurrentPassword("oldPass123");
      result.current.setNewPassword("");
    });

    await act(async () => {
      await result.current.handleSubmitPassword({ preventDefault: jest.fn() } as any);
    });

    expect(alertSpy).toHaveBeenCalledWith("현재 비밀번호와 새 비밀번호를 모두 입력해야 합니다.");
  });
}); 