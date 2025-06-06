import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from '../useLoginForm';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../services/firebase';

// Mock firebase/auth
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  GoogleAuthProvider: jest.fn(),
  signInWithPopup: jest.fn(),
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mock firebase service
jest.mock('../../../../services/firebase', () => ({
  auth: {},
}));

describe('useLoginForm', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useLoginForm());
    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.loginError).toBeNull();
    expect(result.current.shake).toBe(false);
  });

  it('should update email and password', () => {
    const { result } = renderHook(() => useLoginForm());
    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
    });
    expect(result.current.email).toBe('test@example.com');
    expect(result.current.password).toBe('password123');
  });

  it('should handle successful login', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({});
    const { result } = renderHook(() => useLoginForm());
    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
    });
    await act(async () => {
      await result.current.handleLogin();
    });
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should handle login failure', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Invalid credentials'));
    const { result } = renderHook(() => useLoginForm());
    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('wrongpassword');
    });
    await act(async () => {
      await result.current.handleLogin();
    });
    expect(result.current.loginError).toBe('로그인 실패: 이메일 또는 비밀번호를 확인해주세요.');
    expect(result.current.shake).toBe(true);
  });

  it('should handle Google login success', async () => {
    (signInWithPopup as jest.Mock).mockResolvedValueOnce({});
    const { result } = renderHook(() => useLoginForm());
    await act(async () => {
      await result.current.handleGoogleLogin();
    });
    expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(Object));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should handle Google login failure', async () => {
    (signInWithPopup as jest.Mock).mockRejectedValueOnce(new Error('Google login failed'));
    const { result } = renderHook(() => useLoginForm());
    await act(async () => {
      await result.current.handleGoogleLogin();
    });
    expect(result.current.loginError).toBe('Google 로그인 실패');
  });

  it('should trigger login on Enter key press', () => {
    const { result } = renderHook(() => useLoginForm());
    act(() => {
      result.current.handleKeyDown({ key: 'Enter' } as React.KeyboardEvent<HTMLInputElement>);
    });
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });
}); 