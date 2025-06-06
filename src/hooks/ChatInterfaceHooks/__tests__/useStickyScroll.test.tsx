import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useStickyScroll } from '../useStickyScroll';
import { Message } from '../../../types/message';

const mockScrollIntoView = jest.fn();

const baseUser = { id: '1', first_name: 'A', last_name: 'B', email: 'a@b.com' };
const baseMessage: Partial<Message> = {
  chatroom_id: 'room1',
  type: 'default',
  text: 'hi',
  mentions: [],
};

describe('useStickyScroll', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockScrollIntoView.mockClear();
  });

  function createMessagesEndRef() {
    const el = document.createElement('div');
    (el as any).scrollIntoView = mockScrollIntoView;
    return { current: el } as React.RefObject<HTMLElement>;
  }

  it('should scroll to bottom if at bottom', () => {
    const chatMessagesRef = { current: document.createElement('div') };
    const messagesEndRef = createMessagesEndRef();
    const messages: Message[] = [
      { ...baseMessage, sender: { ...baseUser, id: '1' } } as Message,
      { ...baseMessage, sender: { ...baseUser, id: '2' }, text: 'hello' } as Message,
    ];
    const { result } = renderHook(() =>
      useStickyScroll(messages, { ...baseUser, id: '2' }, chatMessagesRef, messagesEndRef)
    );
    act(() => {
      result.current.scrollToBottom();
    });
    expect(mockScrollIntoView).toHaveBeenCalled();
  });

  it('should show alert if not at bottom and not mentioned or own message', () => {
    const chatMessagesRef = { current: document.createElement('div') };
    const messagesEndRef = createMessagesEndRef();
    const messages: Message[] = [
      { ...baseMessage, sender: { ...baseUser, id: '1' } } as Message,
      { ...baseMessage, sender: { ...baseUser, id: '3' }, text: 'hello' } as Message,
    ];
    jest.spyOn(require('../useIsAtBottom'), 'useIsAtBottom').mockReturnValue(false);
    const { result } = renderHook(() =>
      useStickyScroll(messages, { ...baseUser, id: '2' }, chatMessagesRef, messagesEndRef)
    );
    expect(result.current.showNewMsgAlert).toBe(true);
  });

  it('should scroll if mentioned or own message', () => {
    const chatMessagesRef = { current: document.createElement('div') };
    const messagesEndRef = createMessagesEndRef();
    // Mentioned
    const messagesMentioned: Message[] = [
      { ...baseMessage, sender: { ...baseUser, id: '1' }, mentions: [{ userId: '2' }], text: 'hi' } as Message,
    ];
    jest.spyOn(require('../useIsAtBottom'), 'useIsAtBottom').mockReturnValue(false);
    renderHook(() =>
      useStickyScroll(messagesMentioned, { ...baseUser, id: '2' }, chatMessagesRef, messagesEndRef)
    );
    expect(mockScrollIntoView).toHaveBeenCalled();
    // Own message
    const messagesOwn: Message[] = [
      { ...baseMessage, sender: { ...baseUser, id: '2' }, text: 'hi' } as Message,
    ];
    renderHook(() =>
      useStickyScroll(messagesOwn, { ...baseUser, id: '2' }, chatMessagesRef, messagesEndRef)
    );
    expect(mockScrollIntoView).toHaveBeenCalled();
  });
}); 