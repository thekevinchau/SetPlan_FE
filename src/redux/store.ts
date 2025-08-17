import {configureStore} from '@reduxjs/toolkit'
import currentUserReducer from './currentUserSlice'
import favoriteEventReducer from "./favoriteEventSlice"

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        favoriteEvents: favoriteEventReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;