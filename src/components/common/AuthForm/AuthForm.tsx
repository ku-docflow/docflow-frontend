import React, { useState } from 'react';
import styled from 'styled-components';
import { useLoginForm } from '../../../hooks/common/LoginHooks/useLoginForm';
import { useSignUpForm } from '../../../hooks/common/SignUpHooks/useSignUpForm';
import { useFormValidation } from '../../../hooks/common/AuthHooks/useFormValidation';
import { useShakeAnimation } from '../../../hooks/common/AuthHooks/useShakeAnimation';
import '../../../styles/MainInterface/AuthForm.css';

const Container = styled.div<{ isActive: boolean }>`
  position: relative;
  width: 850px;
  height: 550px;
  background: #fff;
  margin: 20px;
  border-radius: 30px;
  box-shadow: 0 0 30px rgba(0, 0, 0, .2);
  overflow: hidden;

  @media screen and (max-width: 650px) {
    height: calc(100vh - 40px);
  }
`;

const FormBox = styled.div<{ isActive: boolean; isLogin?: boolean }>`
  position: absolute;
  width: 50%;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  color: #333;
  text-align: center;
  padding: 40px;
  z-index: 1;
  transition: .6s ease-in-out;
  visibility: ${props => props.isActive ? 'visible' : 'hidden'};
  
  h1 {
    font-size: 36px;
    margin: -10px 0;
  }
  
  p {
    font-size: 14.5px;
    margin: 15px 0;
  }
  
  ${props => props.isLogin ? `
    right: 0;
    transform: ${props.isActive ? 'translateX(0)' : 'translateX(100%)'};
  ` : `
    left: 0;
    transform: ${props.isActive ? 'translateX(0)' : 'translateX(-100%)'};
  `}

  @media screen and (max-width: 650px) {
    bottom: 0;
    width: 100%;
    height: 70%;
    ${props => props.isLogin ? `
      transform: ${props.isActive ? 'translateY(0)' : 'translateY(100%)'};
    ` : `
      transform: ${props.isActive ? 'translateY(0)' : 'translateY(-100%)'};
    `}
  }
`;

const ToggleBox = styled.div<{ isActive: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    left: ${props => props.isActive ? '50%' : '-250%'};
    width: 300%;
    height: 100%;
    background: #7494ec;
    border-radius: 150px;
    z-index: 2;
    transition: 1.8s ease-in-out;
  }

  @media screen and (max-width: 650px) {
    &::before {
      left: 0;
      top: ${props => props.isActive ? '70%' : '-270%'};
      width: 100%;
      height: 300%;
      border-radius: 20vw;
    }
  }
`;

const TogglePanel = styled.div<{ position: 'left' | 'right'; isActive: boolean }>`
  position: absolute;
  width: 50%;
  height: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transition: .6s ease-in-out;
  
  h1 {
    font-size: 36px;
    font-weight: bold;
    margin: -10px 0;
  }
  
  p {
    font-size: 14.5px;
    margin: 15px 0;
  }

  .btn {
    width: 160px;
    height: 46px;
    background: transparent;
    border: 2px solid #fff;
    box-shadow: none;
  }
  
  ${props => props.position === 'left' ? `
    left: ${props.isActive ? '-50%' : '0'};
    transition-delay: ${props.isActive ? '0.6s' : '1.2s'};
  ` : `
    right: ${props.isActive ? '0' : '-50%'};
    transition-delay: ${props.isActive ? '1.2s' : '0.6s'};
  `}

  @media screen and (max-width: 650px) {
    width: 100%;
    height: 30%;
    ${props => props.position === 'left' ? `
      top: ${props.isActive ? '-30%' : '0'};
    ` : `
      bottom: ${props.isActive ? '0' : '-30%'};
    `}
  }
`;

const AuthForm: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  // Login form hooks
  const {
    email: loginEmail,
    password: loginPassword,
    loginError,
    setEmail: setLoginEmail,
    setPassword: setLoginPassword,
    handleLogin,
    handleGoogleLogin,
    handleKeyDown: handleLoginKeyDown,
  } = useLoginForm();

  // Signup form hooks
  const {
    email: signupEmail,
    password: signupPassword,
    confirmPass,
    firstName,
    lastName,
    error: signupError,
    setEmail: setSignupEmail,
    setPassword: setSignupPassword,
    setConfirmPass,
    setFirstName,
    setLastName,
    handleSubmit: handleSignup,
  } = useSignUpForm();

  // Form validation
  const { isLoginValid, isSignupValid } = useFormValidation(
    loginEmail,
    loginPassword,
    signupEmail,
    signupPassword,
    confirmPass,
    firstName,
    lastName
  );

  // Shake animation
  const isShaking = useShakeAnimation(!!loginError);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoginValid) return;
    await handleLogin();
  };

  return (
    <div className="auth-form-container">
      <Container isActive={isActive}>
        <FormBox isActive={!isActive} isLogin={true}>
          <form onSubmit={handleLoginSubmit}>
            <h1>로그인</h1>
            {loginError && <div className="login-error">{loginError}</div>}
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="이메일"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                onKeyDown={handleLoginKeyDown}
              />
              <i className='bx bxs-envelope'></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                onKeyDown={handleLoginKeyDown}
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="forgot-link">
              <a href="#">비밀번호를 잊으셨나요?</a>
            </div>
            <button 
              type="submit" 
              className={`btn ${isShaking ? 'shake' : ''}`}
              disabled={!isLoginValid}
            >
              로그인
            </button>
            <p>간편 로그인</p>
            <div className="social-icons">
              <a href="#" onClick={handleGoogleLogin}><i className='bx bxl-google'></i></a>
            </div>
          </form>
        </FormBox>

        <FormBox isActive={isActive} isLogin={false}>
          <form onSubmit={handleSignup}>
            <h1>회원가입</h1>
            {signupError && <div className="login-error">{signupError}</div>}
            <div className="input-box">
              <div className="name-box">
                <input
                  type="text"
                  name="lastname"
                  placeholder="성"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="text"
                  name="firstname"
                  placeholder="이름"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="이메일"
                required
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              <i className='bx bxs-envelope'></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                required
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="confirmPassword"
                placeholder="비밀번호 확인"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <button 
              type="submit" 
              className="btn"
              disabled={!isSignupValid}
            >
              회원가입
            </button>
            <p>간편 회원가입</p>
            <div className="social-icons">
              <a href="#" onClick={handleGoogleLogin}><i className='bx bxl-google'></i></a>
            </div>
          </form>
        </FormBox>

        <ToggleBox isActive={isActive}>
          <TogglePanel position="left" isActive={isActive}>
            <h1>반갑습니다!</h1>
            <p>계정이 없으신가요?</p>
            <button className="btn register-btn" onClick={() => setIsActive(true)}>회원가입</button>
          </TogglePanel>

          <TogglePanel position="right" isActive={isActive}>
            <h1>환영합니다!</h1>
            <p>이미 계정이 있으신가요?</p>
            <button className="btn login-btn" onClick={() => setIsActive(false)}>로그인</button>
          </TogglePanel>
        </ToggleBox>
      </Container>
    </div>
  );
};

export default AuthForm; 