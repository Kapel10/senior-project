import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IEventSearchInterface} from "../../interface/request/Event/IEventSearchInterface";

interface IYandexMapSlice {
    lat: number;
    lg: number;
    event: IEventSearchInterface | null
}

const initialState: IYandexMapSlice = {
    lat: -1,
    lg: -1,
    event: null,
}

export const YandexMapSlice = createSlice({
    name: 'YandexMapSlice',
    initialState,
    reducers: {
        setLatYandexMap: (state, action: PayloadAction<number>) => {
            state.lat = action.payload;
        },
        setLgYandexMap: (state, action: PayloadAction<number>) => {
            state.lg = action.payload;
        },
        setEventYandexMap: (state, action: PayloadAction<IEventSearchInterface>) => {
            state.event = action.payload;
        },
    }
})


export default YandexMapSlice.reducer;

export const {
    setLatYandexMap,
    setLgYandexMap,
    setEventYandexMap
} = YandexMapSlice.actions;