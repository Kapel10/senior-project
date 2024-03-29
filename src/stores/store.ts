import {configureStore} from "@reduxjs/toolkit";
import functionReducer from "./slices/functionSlice"
import eventCreateReducer from "./slices/EventCreationSlice"

export const store = configureStore({
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        functionStore: functionReducer,
        eventCreateStore: eventCreateReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;