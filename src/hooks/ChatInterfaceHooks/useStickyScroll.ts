import { useEffect, useRef, useState, useCallback } from "react";
import { Message } from "../../types/message";
import { User } from "../../types/user";
import { useIsAtBottom } from "./useIsAtBottom";

export const useStickyScroll = (
  messages: Message[],
  currentUser: User | null,
  chatMessagesRef: React.RefObject<HTMLElement | null>,
  messagesEndRef: React.RefObject<HTMLElement | null>
) => {
  const [showNewMsgAlert, setShowNewMsgAlert] = useState(false);
  const isAtBottom = useIsAtBottom(chatMessagesRef, messagesEndRef);
  const isAtBottomRef = useRef(isAtBottom);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    setShowNewMsgAlert(false);
  }, [messagesEndRef]);

  useEffect(() => {
    isAtBottomRef.current = isAtBottom;
  }, [isAtBottom]);

  useEffect(() => {
    if (!chatMessagesRef.current || messages.length === 0 || !currentUser)
      return;

    const lastMsg = messages[messages.length - 1];
    const mentionedMe = lastMsg.mentions?.some(
      (mention) => mention.userId === currentUser.id
    );

    if (isAtBottomRef.current || mentionedMe) {
      scrollToBottom();
    } else {
      setShowNewMsgAlert(true);
    }
  }, [messages, currentUser, chatMessagesRef, scrollToBottom]);

  return { scrollToBottom, showNewMsgAlert };
};
