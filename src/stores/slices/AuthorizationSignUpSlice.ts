import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthorizationSignInSlice} from "./AuthorizationSignInSlice";
import {Category} from "../../components/Authorization/Category/CategoryCard";

interface ISignUpSlice {
    id: number,
    phone: string,
    password: string,
    confirmPassword: string,
    birthDate: string,
    username: string,
    photo: File | null,
    category: Category[],
    token: string,
    code: string,
    firstName: string,
    lastName: string
}
const initialState: ISignUpSlice = {
    id: 0,
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    username: '',
    photo: null,
    category: [],
    token: '',
    code: '',
    firstName: '',
    lastName: ''
}

export const AuthorizationSignUpSlice = createSlice({
    name: 'AuthorizationSignUpSlice',
    initialState,
    reducers: {
        setIdSignUp: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        setPhoneSignUp: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setPasswordSignUp: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setConfirmPasswordSignUp: (state, action: PayloadAction<string>) => {
            state.confirmPassword = action.payload;
        },
        setBirthDateSignUp: (state, action: PayloadAction<string>) => {
            state.birthDate = action.payload;
        },
        setUsernameSignUp: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPhotoSignUp: (state, action: PayloadAction<File>) => {
            state.photo = action.payload;
        },
        setCategoriesSignUp: (state, action: PayloadAction<Category[]>) => {
            state.category = action.payload;
        },
        setCodeSignUp: (state, action: PayloadAction<string>) => {
            state.code = action.payload;
        },
        setTokenSignUp: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setFirstNameSignUp: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        setLastNameSignUp: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload;
        },
    }
})

export default AuthorizationSignUpSlice.reducer;

export const {
    setIdSignUp,
    setPhoneSignUp,
    setPasswordSignUp,
    setConfirmPasswordSignUp,
    setBirthDateSignUp,
    setUsernameSignUp,
    setPhotoSignUp,
    setCategoriesSignUp,
    setCodeSignUp,
    setTokenSignUp,
    setFirstNameSignUp,
    setLastNameSignUp

} = AuthorizationSignUpSlice.actions;