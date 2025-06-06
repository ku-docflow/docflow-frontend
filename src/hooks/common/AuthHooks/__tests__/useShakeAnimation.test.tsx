import { renderHook, act } from '@testing-library/react';
import { useShakeAnimation } from '../useShakeAnimation';

describe('useShakeAnimation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with isShaking as false', () => {
    const { result } = renderHook(() => useShakeAnimation(false));
    expect(result.current).toBe(false);
  });

  it('should trigger shake animation when trigger is true', () => {
    const { result, rerender } = renderHook(({ trigger }) => useShakeAnimation(trigger), {
      initialProps: { trigger: false },
    });

    expect(result.current).toBe(false);

    rerender({ trigger: true });
    expect(result.current).toBe(true);
  });

  it('should stop shaking after 600ms', () => {
    const { result, rerender } = renderHook(({ trigger }) => useShakeAnimation(trigger), {
      initialProps: { trigger: false },
    });

    rerender({ trigger: true });
    expect(result.current).toBe(true);

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(result.current).toBe(false);
  });

  it('should not trigger shake animation when trigger is false', () => {
    const { result } = renderHook(() => useShakeAnimation(false));
    expect(result.current).toBe(false);
  });

  it('should handle multiple trigger changes', () => {
    const { result, rerender } = renderHook(({ trigger }) => useShakeAnimation(trigger), {
      initialProps: { trigger: false },
    });

    // First trigger
    rerender({ trigger: true });
    expect(result.current).toBe(true);

    act(() => {
      jest.advanceTimersByTime(600);
    });
    expect(result.current).toBe(false);

    // Reset trigger to false
    rerender({ trigger: false });

    // Second trigger (false -> true)
    rerender({ trigger: true });
    expect(result.current).toBe(true);

    act(() => {
      jest.advanceTimersByTime(600);
    });
    expect(result.current).toBe(false);
  });
}); 