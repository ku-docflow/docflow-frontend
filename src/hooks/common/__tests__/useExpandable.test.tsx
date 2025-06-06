import { renderHook, act } from '@testing-library/react';
import { useExpandable } from '../useExpandable';

describe('useExpandable', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useExpandable());
    expect(result.current.expanded).toBe(false);
    expect(result.current.isCollapsing).toBe(false);
  });

  it('should toggle expanded state and set isCollapsing when collapsing', () => {
    const { result } = renderHook(() => useExpandable());
    act(() => {
      result.current.toggle();
    });
    expect(result.current.expanded).toBe(true);
    expect(result.current.isCollapsing).toBe(false);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.expanded).toBe(false);
    expect(result.current.isCollapsing).toBe(true);

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current.isCollapsing).toBe(false);
  });

  it('should allow manual control of expanded state', () => {
    const { result } = renderHook(() => useExpandable());
    act(() => {
      result.current.setExpanded(true);
    });
    expect(result.current.expanded).toBe(true);
  });
}); 