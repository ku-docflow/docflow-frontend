import React, { useState } from 'react';
import { auth } from '../../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import '../../../styles/ChatInterface/SignUpForm.css';

const SignUpForm: React.FC = () => {
  // Track current step (0, 1, 2)
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Form state for account setup (step 1)
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  
  // Optionally, you can add more state for step 2 and 3 if needed.
  
  // For error handling
  const [error, setError] = useState<string | null>(null);

  // Handlers for navigation between steps
  const handleNext = () => {
    if (currentStep === 0) {
      // Basic validation for step 1
      if (!email || !password || !confirmPass) {
        setError('Please fill in all fields.');
        return;
      }
      if (password !== confirmPass) {
        setError('Passwords do not match.');
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

  // Final submission using Firebase Authentication
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user);
      // You might navigate to another page or update state after successful registration.
    } catch (err: any) {
      console.error('Error creating user:', err);
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card fade-in-up">
        <form onSubmit={handleSubmit}>
          {/* Progress Bar */}
          <ul className="progressbar">
            <li className={currentStep >= 0 ? 'active' : ''}>Account Setup</li>
            <li className={currentStep >= 1 ? 'active' : ''}>Personal Details</li>
          </ul>

          {error && <p className="error">{error}</p>}
          
          {/* Step 1: Account Setup */}
          {currentStep === 0 && (
            <fieldset>
              <h2 className="fs-title">Create your account</h2>
              <h3 className="fs-subtitle">This is step 1</h3>
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
              <h2 className="fs-title">Personal Details</h2>
              <h3 className="fs-subtitle">We will never sell your data</h3>
              <input type="text" name="fname" placeholder="First Name" />
              <input type="text" name="lname" placeholder="Last Name" />
              <input type="text" name="phone" placeholder="Phone" />
              <textarea name="address" placeholder="Address"></textarea>
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