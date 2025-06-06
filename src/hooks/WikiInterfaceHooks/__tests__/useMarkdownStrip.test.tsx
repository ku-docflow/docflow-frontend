import { renderHook, act } from '@testing-library/react';
import { useMarkdownEditor } from '../useMarkdownStrip';

// Mock the updateDocument API call
jest.mock('../../../api/document', () => ({
  updateDocument: jest.fn(),
}));

describe('useMarkdownEditor', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should update markdown content successfully', async () => {
    const focusedDocument = { id: 1, topic_id: 1, text: 'Initial Markdown', created_at: '2023-01-01' };
    const mockGetMarkdown = jest.fn().mockReturnValue('Updated Markdown');
    const mockEditor = { getMarkdown: mockGetMarkdown };
    
    const { result } = renderHook(() => useMarkdownEditor(focusedDocument));
    const { editorRef, handleChange } = result.current;

    // Set the mock editor
    Object.defineProperty(editorRef, 'current', {
      value: mockEditor,
      writable: true
    });

    // Mock successful API response
    (require('../../../api/document').updateDocument as jest.Mock).mockResolvedValue({});

    await act(async () => {
      handleChange();
      jest.advanceTimersByTime(5000); // Fast-forward 5 seconds
      await Promise.resolve(); // flush microtasks
    });

    expect(require('../../../api/document').updateDocument).toHaveBeenCalledWith(1, { text: 'Updated Markdown' });
  });

  it('should handle errors when updating markdown content', async () => {
    const focusedDocument = { id: 1, topic_id: 1, text: 'Initial Markdown', created_at: '2023-01-01' };
    const mockGetMarkdown = jest.fn().mockReturnValue('Updated Markdown');
    const mockEditor = { getMarkdown: mockGetMarkdown };
    
    const { result } = renderHook(() => useMarkdownEditor(focusedDocument));
    const { editorRef, handleChange } = result.current;

    // Set the mock editor
    Object.defineProperty(editorRef, 'current', {
      value: mockEditor,
      writable: true
    });

    // Mock API error
    const mockError = new Error('Failed to update document');
    (require('../../../api/document').updateDocument as jest.Mock).mockRejectedValue(mockError);

    // Spy on console.error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await act(async () => {
      handleChange();
      jest.advanceTimersByTime(5000); // Fast-forward 5 seconds
      await Promise.resolve(); // flush microtasks
    });

    expect(require('../../../api/document').updateDocument).toHaveBeenCalledWith(1, { text: 'Updated Markdown' });
    expect(consoleSpy).toHaveBeenCalled();

    // Clean up
    consoleSpy.mockRestore();
  });
}); 