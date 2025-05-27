import { useState, useEffect } from "react";

interface ValidationState {
  isLoginValid: boolean;
  isSignupValid: boolean;
}

export const useFormValidation = (
  loginEmail: string,
  loginPassword: string,
  signupEmail: string,
  signupPassword: string,
  confirmPass: string,
  firstName: string,
  lastName: string
) => {
  const [validationState, setValidationState] = useState<ValidationState>({
    isLoginValid: false,
    isSignupValid: false,
  });

  useEffect(() => {
    // Login form validation
    const isLoginValid =
      loginEmail.trim() !== "" && loginPassword.trim() !== "";

    // Signup form validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(signupEmail);
    const isPasswordMatch = signupPassword === confirmPass;
    const isAllFieldsFilled =
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      signupEmail.trim() !== "" &&
      signupPassword.trim() !== "" &&
      confirmPass.trim() !== "";

    setValidationState({
      isLoginValid,
      isSignupValid: isEmailValid && isPasswordMatch && isAllFieldsFilled,
    });
  }, [
    loginEmail,
    loginPassword,
    signupEmail,
    signupPassword,
    confirmPass,
    firstName,
    lastName,
  ]);

  return validationState;
};
