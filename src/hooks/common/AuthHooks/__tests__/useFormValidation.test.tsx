import { renderHook } from '@testing-library/react';
import { useFormValidation } from '../useFormValidation';

describe('useFormValidation', () => {
  describe('Login Form Validation', () => {
    it('should initialize with login form as invalid', () => {
      const { result } = renderHook(() =>
        useFormValidation('', '', '', '', '', '', '')
      );

      expect(result.current.isLoginValid).toBe(false);
    });

    it('should validate login form with valid credentials', () => {
      const { result } = renderHook(() =>
        useFormValidation('valid@email.com', 'password123', '', '', '', '', '')
      );

      expect(result.current.isLoginValid).toBe(true);
    });

    it('should validate login form with any non-empty email and password (no email format check)', () => {
      const { result } = renderHook(() =>
        useFormValidation('not-an-email', 'password123', '', '', '', '', '')
      );

      expect(result.current.isLoginValid).toBe(true);
    });

    it('should invalidate login form with empty password', () => {
      const { result } = renderHook(() =>
        useFormValidation('valid@email.com', '', '', '', '', '', '')
      );

      expect(result.current.isLoginValid).toBe(false);
    });
  });

  describe('Signup Form Validation', () => {
    it('should initialize with signup form as invalid', () => {
      const { result } = renderHook(() =>
        useFormValidation('', '', '', '', '', '', '')
      );

      expect(result.current.isSignupValid).toBe(false);
    });

    it('should validate signup form with valid inputs', () => {
      const { result } = renderHook(() =>
        useFormValidation('', '', 'valid@email.com', 'password123', 'password123', 'John', 'Doe')
      );

      expect(result.current.isSignupValid).toBe(true);
    });

    it('should invalidate signup form with invalid email', () => {
      const { result } = renderHook(() =>
        useFormValidation('', '', 'invalid-email', 'password123', 'password123', 'John', 'Doe')
      );

      expect(result.current.isSignupValid).toBe(false);
    });

    it('should invalidate signup form with mismatched passwords', () => {
      const { result } = renderHook(() =>
        useFormValidation('', '', 'valid@email.com', 'password123', 'different123', 'John', 'Doe')
      );

      expect(result.current.isSignupValid).toBe(false);
    });

    it('should invalidate signup form with empty name', () => {
      const { result } = renderHook(() =>
        useFormValidation('', '', 'valid@email.com', 'password123', 'password123', '', '')
      );

      expect(result.current.isSignupValid).toBe(false);
    });

    it('should handle all validation states together', () => {
      const { result, rerender } = renderHook(
        ({ loginEmail, loginPassword, signupEmail, signupPassword, signupConfirmPassword, firstName, lastName }) =>
          useFormValidation(
            loginEmail,
            loginPassword,
            signupEmail,
            signupPassword,
            signupConfirmPassword,
            firstName,
            lastName
          ),
        {
          initialProps: {
            loginEmail: 'invalid-email',
            loginPassword: '',
            signupEmail: 'invalid-email',
            signupPassword: 'password123',
            signupConfirmPassword: 'different123',
            firstName: '',
            lastName: '',
          },
        }
      );

      expect(result.current.isLoginValid).toBe(false);
      expect(result.current.isSignupValid).toBe(false);

      rerender({
        loginEmail: 'valid@email.com',
        loginPassword: 'password123',
        signupEmail: 'valid@email.com',
        signupPassword: 'password123',
        signupConfirmPassword: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      });

      expect(result.current.isLoginValid).toBe(true);
      expect(result.current.isSignupValid).toBe(true);
    });
  });
}); 