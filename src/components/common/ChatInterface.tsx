import React, { useState, useRef, useEffect, FormEvent } from "react";
import ChatBubble, { Sender } from "./ChatBubbles";
import "../../styles/common/ChatInterface.css"; // Optional: add styles for the chat interface container

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: Sender;
}

// Define the current user
const currentUser: Sender = {
  id: "user1",
  name: "You",
  profileImage: "https://via.placeholder.com/32?text=You",
};

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello, how can I help you today?",
      timestamp: "10:00 AM",
      sender: { id: "bot", name: "Bot", profileImage: "https://via.placeholder.com/32?text=Bot" },
    },
    {
      id: "2",
      text: "I have a question about your service.",
      timestamp: "10:01 AM",
      sender: currentUser,
    },
    {
      id: "3",
      text: "Sure, feel free to ask!",
      timestamp: "10:02 AM",
      sender: { id: "bot", name: "Bot", profileImage: "https://via.placeholder.com/32?text=Bot" },
    },
  ]);

  const [input, setInput] = useState("");
  const [showNewMsgAlert, setShowNewMsgAlert] = useState(false);

  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    if (chatMessagesRef.current && messages.length > 0) {
      const container = chatMessagesRef.current;
      const lastMsg = messages[messages.length - 1];
      // Only show alert if the last message is from someone else
      if (lastMsg.sender.id !== currentUser.id) {
        const isAtBottom =
          container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
        if (isAtBottom) {
          scrollToBottom();
          setShowNewMsgAlert(false);
        } else {
          setShowNewMsgAlert(true);
        }
      } else {
        // If the last message is from the current user, do not show the alert
        setShowNewMsgAlert(false);
      }
    }
  }, [messages]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: currentUser,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    setTimeout(() => {
      scrollToBottom();
    }, 0);
  };

  return (
    <div
      className="chat-interface"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("application/json");
        if (data) {
          const droppedMessage = JSON.parse(data);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: Date.now().toString(),
              text: droppedMessage.message,
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              sender: droppedMessage.sender,
            },
          ]);
        }
      }}
    >
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((msg, index) => {
          const prevMessage = messages[index - 1];
          const showProfile = !prevMessage || prevMessage.sender.id !== msg.sender.id;
          return (
            <ChatBubble
              key={msg.id}
              message={msg.text}
              sender={msg.sender}
              timestamp={msg.timestamp}
              isCurrentUser={msg.sender.id === currentUser.id}
              showProfile={showProfile}
            />
          );
        })}
        {/* Anchor element for scrolling */}
        <div ref={messagesEndRef} />
      </div>
      
      {showNewMsgAlert && (
        <div className="new-message-alert" onClick={scrollToBottom}>
          새로운 메시지가 도착했습니다. 클릭하여 아래로 스크롤.
        </div>
      )}

      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="chat-send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;