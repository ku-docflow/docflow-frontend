// store/slices/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  selectedOrgId: string | null;
  selectedChatRoomId: string | null;
  selectedPeerId: string | null;
  selectedRenderMode: string;
}

const initialState: UIState = {
  selectedOrgId: null,
  selectedChatRoomId: null,
  selectedPeerId: null,
  selectedRenderMode: "chat",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedOrgId: (state, action: PayloadAction<string | null>) => {
      state.selectedOrgId = action.payload;
      state.selectedChatRoomId = null;
    },
    setSelectedPeerId: (state, action: PayloadAction<string | null>) => {
      state.selectedPeerId = action.payload;
      state.selectedOrgId = null;
      state.selectedChatRoomId = action.payload;
    },
    setSelectedChatRoomId: (state, action: PayloadAction<string | null>) => {
      state.selectedChatRoomId = action.payload;
    },
    setSelectedRenderMode: (state, action: PayloadAction<string>) => {
      state.selectedRenderMode = action.payload;
    },
    resetSelection: (state) => {
      state.selectedOrgId = null;
      state.selectedChatRoomId = null;
      state.selectedPeerId = null;
    },
  },
});

export const {
  setSelectedOrgId,
  setSelectedPeerId,
  setSelectedChatRoomId,
  setSelectedRenderMode,
  resetSelection,
} = uiSlice.actions;

export default uiSlice.reducer;
