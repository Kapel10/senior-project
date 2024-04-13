import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ISignInSlice {
    id: number,
    phone: string,
    password: string,
}

const initialState: ISignInSlice = {
    id: 0,
    phone: '',
    password: '',
}

export const AuthorizationSignInSlice = createSlice({
    name: 'AuthorizationSignInSlice',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        }
    }
})

export default AuthorizationSignInSlice.reducer;

export const {
    setId,
    setPhone,
    setPassword,
} = AuthorizationSignInSlice.actions;
