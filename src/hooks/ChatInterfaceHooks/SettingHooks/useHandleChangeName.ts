import { useCallback } from "react";
import { patchUserName } from "../../../api/user";

export const useHandleChangeName = (
  newFirstName: string,
  newLastName: string,
  setNewFirstName?: React.Dispatch<React.SetStateAction<string>>,
  setNewLastName?: React.Dispatch<React.SetStateAction<string>>
) => {
  const handleChangeName = useCallback(async () => {
    if (!newFirstName || !newLastName) {
      throw new Error("이름을 모두 입력해야 합니다.");
    }

    try {
      const response = await patchUserName({
        first_name: newFirstName,
        last_name: newLastName,
      });
      console.log("변경된 유저 데이터: ", response);
      if (setNewFirstName) setNewFirstName("");
      if (setNewLastName) setNewLastName("");
    } catch (error) {
      console.error("Error changing name:", error);
    }
  }, [newFirstName, newLastName, setNewFirstName, setNewLastName]);
  return handleChangeName;
};
