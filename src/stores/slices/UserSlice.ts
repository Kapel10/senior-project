import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IUserSlice {
    userId: number;
    username: string;
    firstname: string;
    lastname: string;
    profileImage: string;
}

const initialState:IUserSlice = {
    userId: 0,
    username: "",
    firstname: "",
    lastname: "",
    profileImage: ""
}

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        setIdUser: (state, action: PayloadAction<number>) => {
            state.userId = action.payload;
        },
        setUserUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setUserFirstName: (state, action: PayloadAction<string>) => {
            state.firstname = action.payload;
        },
        setUserLastName: (state, action: PayloadAction<string>) => {
            state.lastname = action.payload;
        },
        setUserProfileImage: (state, action: PayloadAction<string>) => {
            state.profileImage = action.payload;
        },
    }
})

export default UserSlice.reducer;

export const {
    setIdUser,
    setUserUsername,
    setUserFirstName,
    setUserLastName,
    setUserProfileImage,
} = UserSlice.actions;