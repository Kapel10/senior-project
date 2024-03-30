import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {EventCreationI} from "../../pages/EventCreatePage";
import {Category} from "../../components/Authorization/Category/CategoryCard";

const initialState: EventCreationI = {
    title: '',
    description: '',
    address: '',
    categories: [],
    date: '',
    end_at: '12:00:00',
    lg: 0,
    lt: 0,
    starts_at: '12:00:00',
    price: undefined,
    seats: undefined,
    max_age: undefined,
    min_age: undefined,
    img: undefined,
}

export const eventCreateSlice = createSlice({
    name: 'eventCreateSlice',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        setDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload;
        },
        setEndAt: (state, action: PayloadAction<string>) => {
            state.end_at = action.payload;
        },
        setLg: (state, action: PayloadAction<number>) => {
            state.lg = action.payload;
        },
        setLt: (state, action: PayloadAction<number>) => {
            state.lt = action.payload;
        },
        setStartsAt: (state, action: PayloadAction<string>) => {
            state.starts_at = action.payload;
        },
        setPrice: (state, action: PayloadAction<number | undefined>) => {
            state.price = action.payload;
        },
        setSeats: (state, action: PayloadAction<number | undefined>) => {
            state.seats = action.payload;
        },
        setMaxAge: (state, action: PayloadAction<number | undefined>) => {
            state.max_age = action.payload;
        },
        setMinAge: (state, action: PayloadAction<number | undefined>) => {
            state.min_age = action.payload;
        },
        setImg: (state, action: PayloadAction<File | undefined>) => {
            state.img = action.payload;
        }
    }
})

export default eventCreateSlice.reducer;

export const {
    setTitle,
    setDescription,
    setAddress,
    setCategories,
    setDate,
    setEndAt,
    setLg,
    setLt,
    setStartsAt,
    setPrice,
    setSeats,
    setMaxAge,
    setMinAge,
    setImg,
} = eventCreateSlice.actions;