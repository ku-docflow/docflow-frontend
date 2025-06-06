import { renderHook } from '@testing-library/react';
import { useTimeout } from '../useTimeout';

describe('useTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should execute callback after delay', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, 1000));
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });

  it('should clear timeout on unmount', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useTimeout(callback, 1000));
    unmount();
    jest.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });
});
