import { renderHook } from '@testing-library/react';
import { useSignupValidation } from '../useSignupValidation';

describe('useSignupValidation', () => {
  it('should initialize with all errors as false', () => {
    const { result } = renderHook(() =>
      useSignupValidation('', '', '')
    );

    expect(result.current).toEqual({
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
    });
  });

  it('should validate email format correctly', () => {
    const { result, rerender } = renderHook(
      ({ email, password, confirmPassword }) =>
        useSignupValidation(email, password, confirmPassword),
      {
        initialProps: {
          email: 'invalid-email',
          password: '',
          confirmPassword: '',
        },
      }
    );

    expect(result.current.emailError).toBe(true);

    rerender({
      email: 'valid@email.com',
      password: '',
      confirmPassword: '',
    });

    expect(result.current.emailError).toBe(false);
  });

  it('should not show email error when email is empty', () => {
    const { result } = renderHook(() =>
      useSignupValidation('', '', '')
    );

    expect(result.current.emailError).toBe(false);
  });

  it('should validate password matching', () => {
    const { result, rerender } = renderHook(
      ({ email, password, confirmPassword }) =>
        useSignupValidation(email, password, confirmPassword),
      {
        initialProps: {
          email: '',
          password: 'password123',
          confirmPassword: 'password123',
        },
      }
    );

    expect(result.current.passwordError).toBe(false);
    expect(result.current.confirmPasswordError).toBe(false);

    rerender({
      email: '',
      password: 'password123',
      confirmPassword: 'different123',
    });

    expect(result.current.passwordError).toBe(true);
    expect(result.current.confirmPasswordError).toBe(true);
  });

  it('should not show password errors when passwords are empty', () => {
    const { result } = renderHook(() =>
      useSignupValidation('', '', '')
    );

    expect(result.current.passwordError).toBe(false);
    expect(result.current.confirmPasswordError).toBe(false);
  });

  it('should handle all validation states together', () => {
    const { result, rerender } = renderHook(
      ({ email, password, confirmPassword }) =>
        useSignupValidation(email, password, confirmPassword),
      {
        initialProps: {
          email: 'invalid-email',
          password: 'password123',
          confirmPassword: 'different123',
        },
      }
    );

    expect(result.current).toEqual({
      emailError: true,
      passwordError: true,
      confirmPasswordError: true,
    });

    rerender({
      email: 'valid@email.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    expect(result.current).toEqual({
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
    });
  });
}); 