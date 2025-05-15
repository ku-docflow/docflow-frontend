import { useState, useCallback } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../services/firebase";

export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: any) {
      setLoginError("로그인 실패: 이메일 또는 비밀번호를 확인해주세요.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [email, password, navigate]);

  const handleGoogleLogin = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setLoginError("Google 로그인 실패");
    }
  }, [navigate]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return {
    email,
    password,
    loginError,
    shake,
    setEmail,
    setPassword,
    handleLogin,
    handleGoogleLogin,
    handleKeyDown,
  };
};
