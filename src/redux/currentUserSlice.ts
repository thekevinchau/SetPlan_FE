import type { profileExternalLink, UserProfile } from "@/types/userTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
}

// Safely load user from localStorage
const savedUser = localStorage.getItem("currentUser");
const initialUser: UserProfile | null = savedUser
  ? JSON.parse(savedUser)
  : null;

const initialState: UserState = {
  isLoggedIn: initialUser !== null,
  userProfile: initialUser,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
      state.isLoggedIn = true;
    },
    updateSocialLink: (state, action: PayloadAction<profileExternalLink>) => {
      const link = state.userProfile?.externalLinks?.find((link: profileExternalLink) => 
        link.id === action.payload.id
      )
      if (link === undefined){
        return;
      }
      link.link = action.payload.link;
    },
    clearUser: (state) => {
      state.userProfile = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser, updateSocialLink } = currentUserSlice.actions;
export default currentUserSlice.reducer;
