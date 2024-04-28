import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {EventCreationI} from "../../pages/EventCreatePage";
import {Category} from "../../components/Category/CategoryCard";

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
        setTitleEvent: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setDescriptionEvent: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setAddressEvent: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setCategoriesEvent: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        setDateEvent: (state, action: PayloadAction<string>) => {
            state.date = action.payload;
        },
        setEndAtEvent: (state, action: PayloadAction<string>) => {
            state.end_at = action.payload;
        },
        setLgEvent: (state, action: PayloadAction<number>) => {
            state.lg = action.payload;
        },
        setLtEvent: (state, action: PayloadAction<number>) => {
            state.lt = action.payload;
        },
        setStartsAtEvent: (state, action: PayloadAction<string>) => {
            state.starts_at = action.payload;
        },
        setPriceEvent: (state, action: PayloadAction<number | undefined>) => {
            state.price = action.payload;
        },
        setSeatsEvent: (state, action: PayloadAction<number | undefined>) => {
            state.seats = action.payload;
        },
        setMaxAgeEvent: (state, action: PayloadAction<number | undefined>) => {
            state.max_age = action.payload;
        },
        setMinAgeEvent: (state, action: PayloadAction<number | undefined>) => {
            state.min_age = action.payload;
        },
        setImgEvent: (state, action: PayloadAction<File | undefined>) => {
            state.img = action.payload;
        }
    }
})

export default eventCreateSlice.reducer;

export const {
    setTitleEvent,
    setDescriptionEvent,
    setAddressEvent,
    setCategoriesEvent,
    setDateEvent,
    setEndAtEvent,
    setLgEvent,
    setLtEvent,
    setStartsAtEvent,
    setPriceEvent,
    setSeatsEvent,
    setMaxAgeEvent,
    setMinAgeEvent,
    setImgEvent,
} = eventCreateSlice.actions;