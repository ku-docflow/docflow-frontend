import { renderHook, waitFor } from '@testing-library/react';
import { useResolveChatRoomId } from '../useResolveChatRoomId';
import * as chatroomApi from '../../../api/chatroom';
import * as redux from 'react-redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => jest.fn()),
  useSelector: jest.fn(),
}));

describe('useResolveChatRoomId', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (redux.useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
  });

  it('should resolve chatRoomId for team', async () => {
    (redux.useSelector as unknown as jest.Mock).mockReturnValue({ user: { search_bot_chatroom_id: '999' } });
    jest.spyOn(chatroomApi, 'fetchChatroomHistory').mockResolvedValue({ messages: [] });
    const team = { chatroom_id: '123' } as any;
    const { result } = renderHook(() => useResolveChatRoomId(team, null));
    await waitFor(() => {
      expect(result.current).toBe('123');
    });
    expect(chatroomApi.fetchChatroomHistory).toHaveBeenCalledWith(123);
  });

  it('should resolve chatRoomId for peer', async () => {
    (redux.useSelector as unknown as jest.Mock).mockReturnValue({ user: { search_bot_chatroom_id: '999' } });
    jest.spyOn(chatroomApi, 'fetchDirectChatHistory').mockResolvedValue({ chatroom_id: '456', messages: [] });
    const peer = { id: '789' } as any;
    const { result } = renderHook(() => useResolveChatRoomId(null, peer));
    await waitFor(() => {
      expect(result.current).toBe('456');
    });
    expect(chatroomApi.fetchDirectChatHistory).toHaveBeenCalledWith('789');
  });

  it('should resolve chatRoomId for search bot', async () => {
    (redux.useSelector as unknown as jest.Mock).mockReturnValue({ search_bot_chatroom_id: '999' });
    jest.spyOn(chatroomApi, 'fetchChatroomHistory').mockResolvedValue({ messages: [] });
    const { result } = renderHook(() => useResolveChatRoomId(null, null));
    console.log('Before waitFor:', result.current);
    await waitFor(() => {
      console.log('Inside waitFor:', result.current);
      expect(result.current).toBe('999');
    });
    expect(chatroomApi.fetchChatroomHistory).toHaveBeenCalledWith(999);
  });
}); 