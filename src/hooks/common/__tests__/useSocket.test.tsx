import { renderHook } from '@testing-library/react';
import { useSocket } from '../useSocket';
import { connectSocket, disconnectSocket } from '../../../services/socket';
import { useDispatch } from 'react-redux';

// Mock socket and fetch
jest.mock('../../../services/socket', () => ({
  connectSocket: jest.fn(),
  disconnectSocket: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

global.fetch = jest.fn();

describe('useSocket', () => {
  const mockDispatch = jest.fn();
  const mockSocket = {
    on: jest.fn(),
    off: jest.fn(),
  };

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (connectSocket as jest.Mock).mockReturnValue(mockSocket);
    (global.fetch as jest.Mock).mockResolvedValue({ json: () => Promise.resolve({}) });
    jest.clearAllMocks();
  });

  it('should connect socket and set up event listeners', () => {
    renderHook(() => useSocket('user1', 'token1'));
    expect(connectSocket).toHaveBeenCalledWith('user1');
    expect(mockSocket.on).toHaveBeenCalledWith('connect', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('refresh_required', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('receive_message', expect.any(Function));
  });

  it('should disconnect socket on cleanup', () => {
    const { unmount } = renderHook(() => useSocket('user1', 'token1'));
    unmount();
    expect(disconnectSocket).toHaveBeenCalled();
  });
}); 