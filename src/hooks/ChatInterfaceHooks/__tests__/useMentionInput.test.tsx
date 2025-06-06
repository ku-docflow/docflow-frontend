import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useMentionInput } from '../useMentionInput';
import { Mention } from '../../../types/message';

describe('useMentionInput', () => {
  const mentionData: Mention[] = [
    { userId: '1', displayName: 'Alice', startIndex: 0, endIndex: 5 },
    { userId: '2', displayName: 'Bob', startIndex: 0, endIndex: 3 },
    { userId: 'generationBot', displayName: 'Generation Bot', startIndex: 0, endIndex: 13 },
  ];

  const createTextareaRef = () => {
    const textarea = document.createElement('textarea');
    return { current: textarea };
  };

  it('should update input and show mention candidates', () => {
    const mentions: Mention[] = [];
    const setMentions = jest.fn();
    const onSelect = jest.fn();
    const textareaRef = createTextareaRef();

    const { result } = renderHook(() =>
      useMentionInput(mentionData, onSelect, mentions, setMentions, textareaRef)
    );

    act(() => {
      result.current.handleInputChange('Hello @A');
    });

    expect(result.current.isMentioning).toBe(true);
    expect(result.current.mentionCandidates.length).toBeGreaterThan(0);
  });

  it('should select a candidate and update mentions', () => {
    const mentions: Mention[] = [];
    const setMentions = jest.fn();
    const onSelect = jest.fn();
    const textareaRef = createTextareaRef();
    textareaRef.current.value = 'Hello @A';
    textareaRef.current.selectionStart = 7;
    textareaRef.current.selectionEnd = 7;

    const { result } = renderHook(() =>
      useMentionInput(mentionData, onSelect, mentions, setMentions, textareaRef)
    );

    act(() => {
      result.current.setInput('Hello @A');
      result.current.selectCandidate(mentionData[0]);
    });

    expect(setMentions).toHaveBeenCalled();
    expect(result.current.isMentioning).toBe(false);
  });

  it('should call onSelect on Enter key when not mentioning', () => {
    const mentions: Mention[] = [];
    const setMentions = jest.fn();
    const onSelect = jest.fn();
    const textareaRef = createTextareaRef();

    const { result } = renderHook(() =>
      useMentionInput(mentionData, onSelect, mentions, setMentions, textareaRef)
    );

    act(() => {
      result.current.setInput('Hello world');
    });

    act(() => {
      const event = {
        key: 'Enter',
        shiftKey: false,
        preventDefault: jest.fn(),
        currentTarget: textareaRef.current,
      } as unknown as React.KeyboardEvent<HTMLTextAreaElement>;
      result.current.handleKeyDown(event);
    });

    expect(onSelect).toHaveBeenCalledWith('Hello world', []);
  });
}); 