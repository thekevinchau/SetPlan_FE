import {configureStore} from '@reduxjs/toolkit'
import currentUserReducer from './currentUserSlice'

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;