import { renderHook, act } from "@testing-library/react";
import { useHandleChangePassword } from "../useHandleChangePassword";

describe("useHandleChangePassword", () => {
  const mockSetCurrentPassword = jest.fn();
  const mockSetNewPassword = jest.fn();
  const alertSpy = jest.spyOn(window, "alert").mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error when current password is empty", async () => {
    const { result } = renderHook(() =>
      useHandleChangePassword("", "newPass123", mockSetCurrentPassword, mockSetNewPassword)
    );

    await expect(result.current()).rejects.toThrow("현재 비밀번호와 새 비밀번호를 모두 입력해야 합니다.");
  });

  it("should throw error when new password is empty", async () => {
    const { result } = renderHook(() =>
      useHandleChangePassword("currentPass123", "", mockSetCurrentPassword, mockSetNewPassword)
    );

    await expect(result.current()).rejects.toThrow("현재 비밀번호와 새 비밀번호를 모두 입력해야 합니다.");
  });

  it("should show success alert when both passwords are provided", async () => {
    const { result } = renderHook(() =>
      useHandleChangePassword("currentPass123", "newPass123", mockSetCurrentPassword, mockSetNewPassword)
    );

    await act(async () => {
      await result.current();
    });

    expect(alertSpy).toHaveBeenCalledWith("비밀번호가 성공적으로 변경되었습니다.");
  });
}); 