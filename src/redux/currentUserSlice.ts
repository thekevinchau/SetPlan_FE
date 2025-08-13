import type { UserProfile } from "@/types/userTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: UserProfile = {
    id: null,
    displayName: null,
    gender: null,
    bio: null,
    personalDetails: null,
    favoriteEvents: null,
    externalLinks: null,
    createdAt: null,
    updatedAt:null

}

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProfile>) => {
            return action.payload;
        },
        clearUser: () => {
            return {...initialState};
        }
    }
})

export const { setUser, clearUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;