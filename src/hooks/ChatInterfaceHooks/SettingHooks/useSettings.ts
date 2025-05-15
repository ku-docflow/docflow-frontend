import { useState, useCallback } from "react";
import { useHandleChangeName } from "./useHandleChangeName";
import { useHandleChangePassword } from "./useHandleChangePassword";

export const useSettings = () => {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangeName = useHandleChangeName(newFirstName, newLastName);
  const handleChangePassword = useHandleChangePassword(
    currentPassword,
    newPassword,
    setCurrentPassword,
    setNewPassword
  );

  const handleSubmitName = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await handleChangeName();
        setNewFirstName("");
        setNewLastName("");
      } catch (err: any) {
        alert(err.message || "이름 변경에 실패했습니다.");
      }
    },
    [handleChangeName]
  );

  const handleSubmitPassword = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await handleChangePassword();
      } catch (err: any) {
        alert(err.message || "비밀번호 변경에 실패했습니다.");
      }
    },
    [handleChangePassword]
  );

  return {
    newFirstName,
    setNewFirstName,
    newLastName,
    setNewLastName,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    handleSubmitName,
    handleSubmitPassword,
  };
};
