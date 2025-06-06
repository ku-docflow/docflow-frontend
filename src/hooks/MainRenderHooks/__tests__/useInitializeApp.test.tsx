import { renderHook, act } from '@testing-library/react';
import { useInitializeApp } from '../useInitializeApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { fetchInitUserData } from '../../../api/user';
import { connectSocket } from '../../../services/socket';
import { joinChatRooms } from '../../../utils/MainRenderUtils/socketUtils';
import { fetchAndStoreDocumentHierarchy } from '../../../utils/MainRenderUtils/fetchUtils';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../../store/slices/userSlice';
import messageReducer from '../../../store/slices/messageSlice';
import React from 'react';

// Mock dependencies
jest.mock('firebase/auth');
jest.mock('../../../api/user');
jest.mock('../../../services/socket');
jest.mock('../../../utils/MainRenderUtils/socketUtils');
jest.mock('../../../utils/MainRenderUtils/fetchUtils');

describe('useInitializeApp', () => {
  let mockDispatch: jest.Mock;
  let mockSocket: { on: jest.Mock };
  let mockUnsubscribe: jest.Mock;
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Setup mock socket
    mockSocket = {
      on: jest.fn(),
    };
    (connectSocket as jest.Mock).mockReturnValue(mockSocket);

    // Setup mock unsubscribe function
    mockUnsubscribe = jest.fn();
    (onAuthStateChanged as jest.Mock).mockReturnValue(mockUnsubscribe);

    // Setup mock dispatch
    mockDispatch = jest.fn();
    store = configureStore({
      reducer: {
        user: userReducer,
        message: messageReducer,
      },
    });
    store.dispatch = mockDispatch;
  });

  const createWrapper = () => {
    return ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );
  };

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useInitializeApp(), {
      wrapper: createWrapper(),
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.userReady).toBe(false);
  });

  it('should handle successful user authentication and initialization', async () => {
    const mockUser = { uid: 'test-uid' };
    const mockInitData = { id: 'test-id', name: 'Test User' };

    (fetchInitUserData as jest.Mock).mockResolvedValue(mockInitData);

    const { result } = renderHook(() => useInitializeApp(), {
      wrapper: createWrapper(),
    });

    // Simulate auth state change
    await act(async () => {
      const authCallback = (onAuthStateChanged as jest.Mock).mock.calls[0][1];
      await authCallback(mockUser);
    });

    expect(connectSocket).toHaveBeenCalledWith(mockUser.uid);
    expect(fetchInitUserData).toHaveBeenCalled();
    expect(joinChatRooms).toHaveBeenCalledWith(mockSocket, mockInitData);
    expect(fetchAndStoreDocumentHierarchy).toHaveBeenCalledWith(mockInitData, expect.any(Function));
    expect(result.current.loading).toBe(false);
    expect(result.current.userReady).toBe(true);
  });

  it('should handle authentication failure', async () => {
    const { result } = renderHook(() => useInitializeApp(), {
      wrapper: createWrapper(),
    });

    // Simulate auth state change with null user
    await act(async () => {
      const authCallback = (onAuthStateChanged as jest.Mock).mock.calls[0][1];
      await authCallback(null);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.userReady).toBe(false);
  });

  it('should handle initialization error', async () => {
    const mockUser = { uid: 'test-uid' };
    const mockError = new Error('Initialization failed');

    (fetchInitUserData as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useInitializeApp(), {
      wrapper: createWrapper(),
    });

    // Simulate auth state change
    await act(async () => {
      const authCallback = (onAuthStateChanged as jest.Mock).mock.calls[0][1];
      await authCallback(mockUser);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.userReady).toBe(false);
  });

  it('should handle refresh_required event', async () => {
    const mockUser = { uid: 'test-uid' };
    const mockInitData = { id: 'test-id', name: 'Test User' };
    const mockRefreshedData = { id: 'test-id', name: 'Updated User' };

    (fetchInitUserData as jest.Mock)
      .mockResolvedValueOnce(mockInitData)
      .mockResolvedValueOnce(mockRefreshedData);

    const { result } = renderHook(() => useInitializeApp(), {
      wrapper: createWrapper(),
    });

    // Simulate auth state change
    await act(async () => {
      const authCallback = (onAuthStateChanged as jest.Mock).mock.calls[0][1];
      await authCallback(mockUser);
    });

    // Simulate refresh_required event
    await act(async () => {
      const refreshCallback = mockSocket.on.mock.calls.find(
        (call: any[]) => call[0] === 'refresh_required'
      )[1];
      await refreshCallback();
    });

    expect(fetchInitUserData).toHaveBeenCalledTimes(2);
    expect(joinChatRooms).toHaveBeenCalledTimes(2);
    expect(fetchAndStoreDocumentHierarchy).toHaveBeenCalledTimes(2);
  });

  it('should handle receive_message event', async () => {
    const mockUser = { uid: 'test-uid' };
    const mockInitData = { id: 'test-id', name: 'Test User' };
    const mockMessage = { id: 'msg-1', content: 'Test message' };

    (fetchInitUserData as jest.Mock).mockResolvedValue(mockInitData);

    const { result } = renderHook(() => useInitializeApp(), {
      wrapper: createWrapper(),
    });

    // Simulate auth state change
    await act(async () => {
      const authCallback = (onAuthStateChanged as jest.Mock).mock.calls[0][1];
      await authCallback(mockUser);
    });

    // Simulate receive_message event
    await act(async () => {
      const messageCallback = mockSocket.on.mock.calls.find(
        (call: any[]) => call[0] === 'receive_message'
      )[1];
      await messageCallback(mockMessage);
    });

    // Verify that the message was dispatched
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should cleanup on unmount', () => {
    const { unmount } = renderHook(() => useInitializeApp(), {
      wrapper: createWrapper(),
    });

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });
}); 