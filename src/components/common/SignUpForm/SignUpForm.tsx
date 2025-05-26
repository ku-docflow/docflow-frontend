import styled from "styled-components";
import React from 'react';
import { useSignUpForm } from '../../../hooks/common/SignUpHooks/useSignUpForm';
import '../../../styles/MainInterface/SignUpForm.css';

const Container = styled.div`
  font-family: 'Montserrat', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  width: 100%;
`;

const Card = styled.div`
  background: white;
  padding: 30px 40px;
  border-radius: 5px;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  background-color: #fde8e8;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
  font-size: 14px;
  border: 1px solid #fbd5d5;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid ${props => props.hasError ? '#e74c3c' : '#ccc'};
  border-radius: 3px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #2C3E50;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e74c3c' : '#27AE60'};
  }
`;

const Button = styled.input`
  width: 100px;
  background: #27AE60;
  font-weight: bold;
  color: white;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  padding: 10px;
  margin: 10px 5px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 0 2px white, 0 0 0 3px #27AE60;
  }
`;

const SignUpForm: React.FC = () => {
  const {
    currentStep,
    email,
    password,
    confirmPass,
    firstName,
    lastName,
    error,
    setEmail,
    setPassword,
    setConfirmPass,
    setFirstName,
    setLastName,
    handleNext,
    handlePrevious,
    handleSubmit,
  } = useSignUpForm();

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const hasEmailError = email && !isEmailValid(email);
  const hasPasswordError = password && confirmPass && password !== confirmPass;

  return (
    <Container>
      <Card className="fade-in-up">
        <form onSubmit={handleSubmit}>
          <ul className="progressbar">
            <li className={currentStep >= 0 ? 'active' : ''}>계정 정보</li>
            <li className={currentStep >= 1 ? 'active' : ''}>이름</li>
          </ul>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          {currentStep === 0 && (
            <fieldset>
              <h2 className="fs-title">계정을 생성하세요.</h2>
              <Input 
                type="text" 
                name="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                hasError={!!hasEmailError}
              />
              {hasEmailError && <ErrorMessage>유효한 이메일 주소를 입력해주세요.</ErrorMessage>}
              <Input 
                type="password" 
                name="pass" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                hasError={!!hasPasswordError}
              />
              <Input 
                type="password" 
                name="cpass" 
                placeholder="Confirm Password" 
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                hasError={!!hasPasswordError}
              />
              {hasPasswordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
              <Button 
                type="button" 
                name="next" 
                className="next" 
                value="Next" 
                onClick={handleNext} 
              />
            </fieldset>
          )}

          {currentStep === 1 && (
            <fieldset>
              <h2 className="fs-title">상세 정보</h2>
              <Input 
                type="text" 
                name="lname" 
                placeholder="성"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input 
                type="text" 
                name="fname" 
                placeholder="이름"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Button 
                type="button" 
                name="previous" 
                className="previous" 
                value="Previous" 
                onClick={handlePrevious} 
              />
              <Button 
                type="submit" 
                name="submit" 
                className="submit" 
                value="Submit" 
              />
            </fieldset>
          )}
        </form>
      </Card>
    </Container>
  );
};

export default SignUpForm;