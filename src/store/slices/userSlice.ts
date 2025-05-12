import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitUserResponse, Organization, User } from "../../types/user";

// interface UserInfo {
//   id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   search_bot_chatroom_id?: string;
// }

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
