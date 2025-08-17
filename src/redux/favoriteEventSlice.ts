import type { Event } from "@/types/eventTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface favoriteEventState {
    favoriteEvents: Event[];
}

const initialState: favoriteEventState = {
    favoriteEvents: []
}

const favoriteEventSlice = createSlice({
    name: "favoriteEvents",
    initialState,
    reducers: {
        setFavoriteEvents: (state, action: PayloadAction<Event[]>) => {
            state.favoriteEvents = action.payload;
        },
        unfavoriteEventRedux: (state, action: PayloadAction<string>) => {
            state.favoriteEvents = state.favoriteEvents.filter((event: Event) => event.id !== action.payload);
        }
    }
})

export const { setFavoriteEvents, unfavoriteEventRedux } = favoriteEventSlice.actions;
export default favoriteEventSlice.reducer;