import {createSlice} from "@reduxjs/toolkit";

interface functionState {
    function: any
}

const initialState: functionState = {
    function: null,
}

const functionSlice = createSlice({
    name: 'functionSlice',
    initialState,
    reducers: {
        storeFunction: (state, action) => {
            state.function = action.payload;
        }
    }
})

export default functionSlice.reducer;
export const {storeFunction} = functionSlice.actions;