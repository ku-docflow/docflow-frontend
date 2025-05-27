import { useState, useEffect } from "react";
import { EMAIL_REGEX } from "../../../constants/auth";

interface ValidationState {
  emailError: boolean;
  passwordError: boolean;
  confirmPasswordError: boolean;
}

export const useSignupValidation = (
  email: string,
  password: string,
  confirmPassword: string
) => {
  const [validationState, setValidationState] = useState<ValidationState>({
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
  });

  useEffect(() => {
    const newValidationState = {
      emailError: email.length > 0 && !EMAIL_REGEX.test(email),
      passwordError:
        password.length > 0 &&
        confirmPassword.length > 0 &&
        password !== confirmPassword,
      confirmPasswordError:
        password.length > 0 &&
        confirmPassword.length > 0 &&
        password !== confirmPassword,
    };

    setValidationState(newValidationState);
  }, [email, password, confirmPassword]);

  return validationState;
};
