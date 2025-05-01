import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { login } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import '../../../styles/MainInterface/LoginForm.css';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const [shake, setShake] = useState(false);

  const handleLogin = async () => {
    setShake(false);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const name = firebaseUser.displayName || firebaseUser.email || "unknown";

      const first_name = firebaseUser.displayName?.split(" ")[0] || "unknown";
      const last_name = firebaseUser.displayName?.split(" ")[1] || "unknown";

      const token = await firebaseUser.getIdToken();
      await login({ first_name, last_name }, token);

      navigate("/");
    } catch (error) {
      setLoginError("이메일 또는 비밀번호가 잘못되었습니다.");
      setTimeout(() => setShake(true), 0); // Trigger shake
    }
  };

  const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider(); 
    const result = await signInWithPopup(auth, provider); 

    const firebaseUser = result.user;

    const name = firebaseUser.displayName || firebaseUser.email || "unknown"; 
    const first_name = firebaseUser.displayName?.split(" ")[0] || "unknown";
    const last_name = firebaseUser.displayName?.split(" ")[1] || "unknown";

    const token = await firebaseUser.getIdToken();

    await login({ first_name, last_name }, token); // 내 서버에 로그인 요청 (name + token)
    navigate("/"); // 메인페이지로 이동
  } catch (error) {
    console.error("구글 로그인 실패", error);
    setLoginError("구글 로그인에 실패했습니다.");
    setShake(false); // 흔들기 초기화
    setTimeout(() => setShake(true), 0); // 다시 흔들기
  }
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className={`login-card fade-in-up ${shake ? "shake" : ""}`}>
        <h2>로그인</h2>
        {loginError && <div className="login-error">{loginError}</div>}
        <input
          className=""
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          className=""
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="btn-login"
          onClick={handleLogin}
        >
          로그인
        </button>
        <button
          className="btn-signup"
          onClick={() => navigate("/signup")}
        >
          회원가입
        </button>
        <button
          className="btn-google"
          onClick={handleGoogleLogin}
        >
          Google로 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
