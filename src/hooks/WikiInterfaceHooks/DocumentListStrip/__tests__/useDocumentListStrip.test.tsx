import { renderHook, act } from '@testing-library/react';
import { useDocumentListStrip } from '../useDocumentListStrip';

// Mock useCreateTopic
jest.mock('../../useCreateTopic', () => ({
  useCreateTopic: (onSuccess: () => void) => ({
    handleCreateTopic: jest.fn((organizationId: string, title: string) => {
      onSuccess();
    }),
  }),
}));

describe('useDocumentListStrip', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useDocumentListStrip('1'));
    expect(result.current.isAdding).toBe(false);
    expect(result.current.newTopicName).toBe('');
  });

  it('should update newTopicName', () => {
    const { result } = renderHook(() => useDocumentListStrip('1'));
    act(() => {
      result.current.setNewTopicName('Test Topic');
    });
    expect(result.current.newTopicName).toBe('Test Topic');
  });

  it('should call handleCreateTopic and reset state on valid input', () => {
    const { result } = renderHook(() => useDocumentListStrip('1'));
    act(() => {
      result.current.setNewTopicName('Test Topic');
      result.current.setIsAdding(true);
      result.current.handleAddTopic();
    });
    expect(result.current.isAdding).toBe(false);
    expect(result.current.newTopicName).toBe('');
  });

  it('should not call handleCreateTopic and should reset state on empty input', () => {
    const { result } = renderHook(() => useDocumentListStrip('1'));
    act(() => {
      result.current.setNewTopicName('   ');
      result.current.setIsAdding(true);
      result.current.handleAddTopic();
    });
    expect(result.current.isAdding).toBe(false);
    expect(result.current.newTopicName).toBe('');
  });

  it('should not call handleCreateTopic and should reset state if organizationId is missing', () => {
    const { result } = renderHook(() => useDocumentListStrip(undefined));
    act(() => {
      result.current.setNewTopicName('Test Topic');
      result.current.setIsAdding(true);
      result.current.handleAddTopic();
    });
    expect(result.current.isAdding).toBe(false);
    expect(result.current.newTopicName).toBe('');
  });
}); 