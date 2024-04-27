import {configureStore} from "@reduxjs/toolkit";
import functionReducer from "./slices/functionSlice"
import eventCreateReducer from "./slices/EventCreationSlice"
import authorizationSignInSliceReducer from "./slices/AuthorizationSignInSlice";
import authorizationSignUpSliceReducer from "./slices/AuthorizationSignUpSlice";
import yandexMapSliceReducer from "./slices/YandexMapSlice";
import mainPageSliceReducer from "./slices/MainPageSlice";
import userSliceReducer from  "./slices/UserSlice"


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
        YandexMapSlice: yandexMapSliceReducer,
        MainPageSlice: mainPageSliceReducer,
        userSlice: userSliceReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;