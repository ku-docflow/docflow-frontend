// src/store/messageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: string;
  chatroom_id: number;
  sender_id: string;
  text: string;
  timestamp: string;
}

interface MessageState {
  [chatroomId: number]: Message[];
}

const initialState: MessageState = {};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    appendBufferedMessage: (state, action: PayloadAction<Message>) => {
      const msg = action.payload;
      if (!state[msg.chatroom_id]) {
        state[msg.chatroom_id] = [];
      }
      state[msg.chatroom_id].push(msg);
    },
    loadBufferedMessages: (
      state,
      action: PayloadAction<{ chatroomId: number; messages: Message[] }>
    ) => {
      const { chatroomId, messages } = action.payload;
      state[chatroomId] = messages;
    },
    clearChatroomMessages: (state, action: PayloadAction<number>) => {
      delete state[action.payload];
    },
  },
});

export const {
  appendBufferedMessage,
  loadBufferedMessages,
  clearChatroomMessages,
} = messageSlice.actions;
export default messageSlice.reducer;
