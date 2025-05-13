import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitUserResponse, Organization, User } from "../../types/user";

interface UserState {
  user: User | null;
  orgs: Organization[];
}

const initialState: UserState = {
  user: null,
  orgs: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInitData: (state, action: PayloadAction<InitUserResponse>) => {
      state.user = action.payload.user;
      state.orgs = action.payload.orgs;
    },
    clearUserData: (state) => {
      state.user = null;
      state.orgs = [];
    },
  },
});

export const { setUserInitData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
