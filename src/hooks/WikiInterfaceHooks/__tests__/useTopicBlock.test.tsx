import { renderHook, act } from '@testing-library/react';
import { useTopicBlock } from '../useTopicBlock';

// Mock the createDocument API call
jest.mock('../../../api/document', () => ({
  createDocument: jest.fn(),
}));

// Mock the Redux dispatch
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

describe('useTopicBlock', () => {
  it('should toggle topic expansion', () => {
    const { result } = renderHook(() => useTopicBlock(1));
    const { expanded, toggleTopic } = result.current;

    expect(expanded).toBe(false);

    act(() => {
      toggleTopic();
    });

    expect(result.current.expanded).toBe(true);
  });

  it('should create a document successfully', async () => {
    const { result } = renderHook(() => useTopicBlock(1));
    const { handleCreateDocument } = result.current;

    // Mock successful API response
    const mockDocument = { id: 1, topic_id: 1, text: '새 문서', created_at: '2023-01-01' };
    (require('../../../api/document').createDocument as jest.Mock).mockResolvedValue(mockDocument);

    await act(async () => {
      await handleCreateDocument();
    });

    expect(require('../../../api/document').createDocument).toHaveBeenCalledWith({ topic_id: 1, text: '새 문서' });
  });

  it('should handle errors when creating a document', async () => {
    const { result } = renderHook(() => useTopicBlock(1));
    const { handleCreateDocument } = result.current;

    // Mock API error
    const mockError = new Error('Failed to create document');
    (require('../../../api/document').createDocument as jest.Mock).mockRejectedValue(mockError);

    await act(async () => {
      await handleCreateDocument();
    });

    expect(require('../../../api/document').createDocument).toHaveBeenCalledWith({ topic_id: 1, text: '새 문서' });
  });
}); 