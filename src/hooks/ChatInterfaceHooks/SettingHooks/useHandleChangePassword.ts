import { useCallback } from "react";

export const useHandleChangePassword = (
  currentPassword: string,
  newPassword: string,
  setCurrentPassword: React.Dispatch<React.SetStateAction<string>>,
  setNewPassword: React.Dispatch<React.SetStateAction<string>>
) => {
  const handleChangePassword = useCallback(async () => {
    if (!currentPassword || !newPassword) {
      throw new Error("현재 비밀번호와 새 비밀번호를 모두 입력해야 합니다.");
    }

    // const response = await fetch("/api/change_password", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     current_password: currentPassword,
    //     new_password: newPassword,
    //   }),
    // });

    // if (!response.ok) {
    //   throw new Error("비밀번호 변경에 실패했습니다.");
    // }

    alert("비밀번호가 성공적으로 변경되었습니다.");
  }, [currentPassword, newPassword]);

  return handleChangePassword;
};
