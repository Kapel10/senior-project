import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PageId {
    id: number;
    modal: boolean;
}

const initialState: PageId = {
    id: 0,
    modal: false,
}

export const MainPageSlice = createSlice({
    name: 'MainPageSlice',
    initialState,
    reducers: {
        setPageId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        setCloseModal: (state, action: PayloadAction<boolean>) => {
            state.modal = action.payload;
        },
    }
})

export default MainPageSlice.reducer;

export const {
    setPageId,
    setCloseModal
} =  MainPageSlice.actions;