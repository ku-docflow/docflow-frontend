import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoginForm } from "../../../hooks/common/LoginHooks/useLoginForm";
import "../../../styles/MainInterface/LoginForm.css";

const LoginForm: React.FC = () => {
  const {
    email,
    password,
    loginError,
    shake,
    setEmail,
    setPassword,
    handleLogin,
    handleGoogleLogin,
    handleKeyDown,
  } = useLoginForm();

  const navigate = useNavigate();

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
        <button className="btn-login" onClick={handleLogin}>
          로그인
        </button>
        <button className="btn-signup" onClick={() => navigate("/signup")}>
          회원가입
        </button>
        <button className="btn-google" onClick={handleGoogleLogin}>
          Google로 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
