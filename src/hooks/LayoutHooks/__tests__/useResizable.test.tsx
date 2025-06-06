import { renderHook, act } from '@testing-library/react';
import { useResizable } from '../useResizable';
import React from 'react';

describe('useResizable', () => {
  beforeEach(() => {
    // Reset window size for each test
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1200 });
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useResizable());
    expect(result.current.width).toBeNull();
    expect(result.current.isResizing).toBe(false);
  });

  it('should initialize with a given initialWidth', () => {
    const { result } = renderHook(() => useResizable({ initialWidth: 500 }));
    expect(result.current.width).toBe(500);
  });

  it('should start resizing on mouse down', () => {
    const { result } = renderHook(() => useResizable({ initialWidth: 400 }));
    act(() => {
      result.current.handleMouseDown({ clientX: 100 } as React.MouseEvent);
    });
    expect(result.current.isResizing).toBe(true);
  });

  it('should update width on mouse move and stop on mouse up', () => {
    const { result } = renderHook(() => useResizable({ initialWidth: 400 }));
    // Start resizing
    act(() => {
      result.current.handleMouseDown({ clientX: 100 } as React.MouseEvent);
    });
    // Simulate mouse move
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 150 }));
    });
    expect(result.current.width).toBe(450);
    // Simulate mouse up
    act(() => {
      document.dispatchEvent(new MouseEvent('mouseup'));
    });
    expect(result.current.isResizing).toBe(false);
  });

  it('should not go below minWidth or above maxWidth', () => {
    const { result } = renderHook(() => useResizable({ initialWidth: 400, minWidth: 350, maxWidth: 420 }));
    // Start resizing
    act(() => {
      result.current.handleMouseDown({ clientX: 100 } as React.MouseEvent);
    });
    // Move left (try to go below minWidth)
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0 }));
    });
    expect(result.current.width).toBe(350);
    // Move right (try to go above maxWidth)
    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 1000 }));
    });
    expect(result.current.width).toBe(420);
  });
}); 