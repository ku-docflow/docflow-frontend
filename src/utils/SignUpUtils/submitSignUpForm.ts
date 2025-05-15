import { auth } from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { login } from "../../api/auth";

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  changeName: () => Promise<void>;
}

export const submitSignUpForm = async ({
  email,
  password,
  firstName,
  lastName,
  changeName,
}: SignUpData) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const firebaseUser = userCredential.user;
  const token = await firebaseUser.getIdToken();

  try {
    await changeName();
  } catch (err) {
    console.error("Error changing name:", err);
    alert("이름 변경에 실패했습니다. 바로 로그인으로 넘어갑니다.");
  }

  await login({ first_name: firstName, last_name: lastName }, token);
};
