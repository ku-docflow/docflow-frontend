import { renderHook, act } from '@testing-library/react';
import { useCreateTopic } from '../useCreateTopic';

// Mock the createTopic API call
jest.mock('../../../api/topic', () => ({
  createTopic: jest.fn(),
}));

describe('useCreateTopic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a topic successfully', async () => {
    const onSuccess = jest.fn();
    const { result } = renderHook(() => useCreateTopic(onSuccess));
    const { handleCreateTopic } = result.current;

    // Mock successful API response
    (require('../../../api/topic').createTopic as jest.Mock).mockResolvedValue({});

    await act(async () => {
      await handleCreateTopic('1', 'Test Topic');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(onSuccess).toHaveBeenCalled();
  });

  it('should handle errors when creating a topic', async () => {
    const onSuccess = jest.fn();
    const { result } = renderHook(() => useCreateTopic(onSuccess));
    const { handleCreateTopic } = result.current;

    // Mock API error
    const mockError = new Error('Failed to create topic');
    (require('../../../api/topic').createTopic as jest.Mock).mockRejectedValue(mockError);

    await act(async () => {
      await handleCreateTopic('1', 'Test Topic');
    });

    // Get the latest state after the async operation
    const { loading, error } = result.current;

    expect(loading).toBe(false);
    expect(error).toBe('Failed to create topic.');
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('should not create a topic with empty title', async () => {
    const onSuccess = jest.fn();
    const { result } = renderHook(() => useCreateTopic(onSuccess));
    const { handleCreateTopic } = result.current;

    await act(async () => {
      await handleCreateTopic('1', '   ');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(require('../../../api/topic').createTopic).not.toHaveBeenCalled();
  });
}); 