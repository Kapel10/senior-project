import {configureStore} from "@reduxjs/toolkit";
import functionReducer from "./slices/functionSlice"
import eventCreateReducer from "./slices/EventCreationSlice"
import authorizationSignInSliceReducer from "./slices/AuthorizationSignInSlice";
import authorizationSignUpSliceReducer from "./slices/AuthorizationSignUpSlice";


export const store = configureStore({
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        functionStore: functionReducer,
        eventCreateStore: eventCreateReducer,
        AuthorizationSignInSlice: authorizationSignInSliceReducer,
        AuthorizationSignUpSlice: authorizationSignUpSliceReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;