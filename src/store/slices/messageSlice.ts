// src/store/messageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../types/message";

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
      const chatroomId = Number(msg.chatroom_id);
      if (!state[chatroomId]) {
        state[chatroomId] = [];
      }
      const alreadyExists = state[chatroomId].some((m) => m.id === msg.id);
      if (!alreadyExists) {
        state[chatroomId].push(msg);
      }
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
