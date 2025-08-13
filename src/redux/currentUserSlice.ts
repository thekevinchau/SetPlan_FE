import type { UserProfile } from "@/types/userTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  isLoggedIn: false,
  userProfile: null,
};

interface UserState {
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
}

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.isLoggedIn = false;
      state.userProfile = null;
    },
  },
});

export const { setUser, clearUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
