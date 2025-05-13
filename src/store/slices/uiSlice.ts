// store/slices/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Organization, Team, Peer } from "../../types/user";
import { Document } from "../../types/document";

interface UIState {
  selectedOrg: Organization | null;
  selectedTeam: Team | null;
  selectedPeer: Peer | null;
  selectedDocument: Document | null;
  selectedRenderMode: string;
}

const initialState: UIState = {
  selectedOrg: null,
  selectedTeam: null,
  selectedPeer: null,
  selectedDocument: null,
  selectedRenderMode: "chat",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedOrg: (state, action: PayloadAction<Organization | null>) => {
      console.log("old selected org", state.selectedOrg);
      console.log("new selected org", action.payload);
      state.selectedOrg = action.payload;
      state.selectedTeam = null;
      state.selectedDocument = null;
    },
    setSelectedPeer: (state, action: PayloadAction<Peer | null>) => {
      console.log("old selected peer", state.selectedPeer);
      console.log("new selected peer", action.payload);
      state.selectedPeer = action.payload;
      state.selectedOrg = null;
      //state.selectedTeam = action.payload;
    },
    setSelectedTeam: (state, action: PayloadAction<Team | null>) => {
      console.log("old selected team", state.selectedTeam);
      console.log("new selected team", action.payload);
      state.selectedTeam = action.payload;
    },
    setSelectedDocument: (state, action: PayloadAction<Document | null>) => {
      console.log("old selected document", state.selectedDocument);
      console.log("new selected document", action.payload);
      state.selectedDocument = action.payload;
    },
    setSelectedRenderMode: (state, action: PayloadAction<string>) => {
      console.log("old selected render mode", state.selectedRenderMode);
      console.log("new selected render mode", action.payload);
      state.selectedRenderMode = action.payload;
    },
    resetSelection: (state) => {
      state.selectedOrg = null;
      state.selectedTeam = null;
      state.selectedPeer = null;
      state.selectedDocument = null;
    },
  },
});

export const {
  setSelectedOrg,
  setSelectedPeer,
  setSelectedTeam,
  setSelectedDocument,
  setSelectedRenderMode,
  resetSelection,
} = uiSlice.actions;

export default uiSlice.reducer;
