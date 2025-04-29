import React, { useState } from 'react';
import { auth } from '../../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { login } from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import '../../../styles/MainInterface/SignUpForm.css';

const SignUpForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep === 0) {
      if (!email || !password || !confirmPass) {
        setError('모든 칸을 채워주세요.');
        return;
      }
      if (password !== confirmPass) {
        setError('비밀번호가 일치하지 않습니다.');
        return;
      }
      setError(null);
    }
    if (currentStep < 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const name = firebaseUser.displayName || firebaseUser.email || "unknown";

      const token = await firebaseUser.getIdToken();
      await login({ name }, token);
      navigate('/');

    } catch (err: any) {
      console.error("Error creating user:", err);
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card fade-in-up">
        <form onSubmit={handleSubmit}>
          {/* Progress Bar */}
          <ul className="progressbar">
            <li className={currentStep >= 0 ? 'active' : ''}>계정 정보</li>
            <li className={currentStep >= 1 ? 'active' : ''}>이름</li>
          </ul>

          {error && <p className="error">{error}</p>}
          
          {/* Step 1: Account Setup */}
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
          {/* Step 2: Personal Details */}
          {currentStep === 1 && (
            <fieldset>
              <h2 className="fs-title">상세 정보</h2>
              <input type="text" name="lname" placeholder="성" />
              <input type="text" name="fname" placeholder="이름" />
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