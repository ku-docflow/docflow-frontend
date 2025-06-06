import { renderHook, act } from '@testing-library/react';
import { useSignUpForm } from '../useSignUpForm';
import { useNavigate } from 'react-router-dom';
import { submitSignUpForm } from '../../../../utils/SignUpUtils/submitSignUpForm';
import { useHandleChangeName } from '../../../../hooks/ChatInterfaceHooks/SettingHooks/useHandleChangeName';
import React from 'react';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../../../utils/SignUpUtils/submitSignUpForm', () => ({
  submitSignUpForm: jest.fn(),
}));

jest.mock('../../../../hooks/ChatInterfaceHooks/SettingHooks/useHandleChangeName', () => ({
  useHandleChangeName: jest.fn(),
}));

describe('useSignUpForm', () => {
  const mockNavigate = jest.fn();
  const mockChangeName = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useHandleChangeName as jest.Mock).mockReturnValue(mockChangeName);
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSignUpForm());

    expect(result.current.currentStep).toBe(0);
    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.confirmPass).toBe('');
    expect(result.current.firstName).toBe('');
    expect(result.current.lastName).toBe('');
    expect(result.current.error).toBeNull();
  });

  it('should update form fields', () => {
    const { result } = renderHook(() => useSignUpForm());

    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
      result.current.setConfirmPass('password123');
      result.current.setFirstName('John');
      result.current.setLastName('Doe');
    });

    expect(result.current.email).toBe('test@example.com');
    expect(result.current.password).toBe('password123');
    expect(result.current.confirmPass).toBe('password123');
    expect(result.current.firstName).toBe('John');
    expect(result.current.lastName).toBe('Doe');
  });

  it('should handle next step with valid input', () => {
    const { result } = renderHook(() => useSignUpForm());
    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
      result.current.setConfirmPass('password123');
    });
    act(() => {
      result.current.handleNext();
    });
    expect(result.current.currentStep).toBe(1);
    expect(result.current.error).toBeNull();
  });

  it('should handle next step with missing fields', () => {
    const { result } = renderHook(() => useSignUpForm());

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.currentStep).toBe(0);
    expect(result.current.error).toBe('모든 칸을 채워주세요.');
  });

  it('should handle next step with mismatched passwords', () => {
    const { result } = renderHook(() => useSignUpForm());
    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
      result.current.setConfirmPass('wrongpassword');
    });
    act(() => {
      result.current.handleNext();
    });
    expect(result.current.currentStep).toBe(0);
    expect(result.current.error).toBe('비밀번호가 일치하지 않습니다.');
  });

  it('should handle previous step', () => {
    const { result } = renderHook(() => useSignUpForm());

    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
      result.current.setConfirmPass('password123');
      result.current.handleNext();
      result.current.handlePrevious();
    });

    expect(result.current.currentStep).toBe(0);
  });

  it('should handle form submission', async () => {
    const { result } = renderHook(() => useSignUpForm());

    (submitSignUpForm as jest.Mock).mockResolvedValueOnce(undefined);

    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
      result.current.setConfirmPass('password123');
      result.current.setFirstName('John');
      result.current.setLastName('Doe');
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
    });

    expect(submitSignUpForm).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      changeName: mockChangeName,
    });
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should handle form submission error', async () => {
    const { result } = renderHook(() => useSignUpForm());
    const errorMessage = 'Signup failed';

    (submitSignUpForm as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
      result.current.setConfirmPass('password123');
      result.current.setFirstName('John');
      result.current.setLastName('Doe');
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent);
    });

    expect(result.current.error).toBe(errorMessage);
  });
}); 