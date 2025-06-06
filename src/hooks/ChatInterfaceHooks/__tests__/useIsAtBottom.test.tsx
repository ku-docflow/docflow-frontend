import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useIsAtBottom } from '../useIsAtBottom';

describe('useIsAtBottom', () => {
  const mockIntersectionObserver = jest.fn();
  const mockObserve = jest.fn();
  const mockUnobserve = jest.fn();
  const mockDisconnect = jest.fn();

  beforeEach(() => {
    mockIntersectionObserver.mockImplementation((callback) => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    }));
    window.IntersectionObserver = mockIntersectionObserver;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with isAtBottom as true', () => {
    const containerRef = { current: document.createElement('div') };
    const sentinelRef = { current: document.createElement('div') };

    const { result } = renderHook(() =>
      useIsAtBottom(containerRef, sentinelRef)
    );

    expect(result.current).toBe(true);
    expect(mockObserve).toHaveBeenCalledWith(sentinelRef.current);
  });

  it('should update isAtBottom when intersection changes', () => {
    const containerRef = { current: document.createElement('div') };
    const sentinelRef = { current: document.createElement('div') };
    let intersectionCallback: (entries: IntersectionObserverEntry[]) => void;

    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
      };
    });

    const { result } = renderHook(() =>
      useIsAtBottom(containerRef, sentinelRef)
    );

    act(() => {
      intersectionCallback([
        {
          isIntersecting: false,
          target: sentinelRef.current,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRatio: 0,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: 0,
        } as IntersectionObserverEntry,
      ]);
    });

    expect(result.current).toBe(false);
  });

  it('should cleanup observer on unmount', () => {
    const containerRef = { current: document.createElement('div') };
    const sentinelRef = { current: document.createElement('div') };

    const { unmount } = renderHook(() =>
      useIsAtBottom(containerRef, sentinelRef)
    );

    unmount();

    expect(mockUnobserve).toHaveBeenCalledWith(sentinelRef.current);
  });
}); 