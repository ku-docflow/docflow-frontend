import React from 'react';
import { useSignUpForm } from '../../../hooks/common/SignUpHooks/useSignUpForm';
import '../../../styles/MainInterface/SignUpForm.css';

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

  return (
    <div className="signup-container">
      <div className="signup-card fade-in-up">
        <form onSubmit={handleSubmit}>
          <ul className="progressbar">
            <li className={currentStep >= 0 ? 'active' : ''}>계정 정보</li>
            <li className={currentStep >= 1 ? 'active' : ''}>이름</li>
          </ul>

          {error && <p className="error">{error}</p>}
          
          {currentStep === 0 && (
            <fieldset>
              <h2 className="fs-title">계정을 생성하세요.</h2>
              <input 
                type="text" 
                name="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                name="pass" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input 
                type="password" 
                name="cpass" 
                placeholder="Confirm Password" 
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <input 
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
              <input 
                type="text" 
                name="lname" 
                placeholder="성"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input 
                type="text" 
                name="fname" 
                placeholder="이름"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input 
                type="button" 
                name="previous" 
                className="previous" 
                value="Previous" 
                onClick={handlePrevious} 
              />
              <input 
                type="submit" 
                name="submit" 
                className="submit" 
                value="Submit" 
              />
            </fieldset>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;