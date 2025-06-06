import { renderHook } from '@testing-library/react';
import { useRenderModeToggle } from '../useRenderModeToggle';
import { useDispatch } from 'react-redux';

// Mock useDispatch
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('useRenderModeToggle', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  it('should toggle render mode from wiki to chat', () => {
    const { result } = renderHook(() => useRenderModeToggle());
    result.current.toggleRenderMode('wiki');
    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ payload: 'chat' }));
  });

  it('should toggle render mode from chat to wiki', () => {
    const { result } = renderHook(() => useRenderModeToggle());
    result.current.toggleRenderMode('chat');
    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ payload: 'wiki' }));
  });
}); 