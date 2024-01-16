import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
    name: "myState",

    initialState: {
        cityname: "",
    },

    reducers: {
        setCityname: (state, action) => {
            state.cityname = action.payload;
        },
    },
});

export const { setCityname } = storeSlice.actions;
export default storeSlice.reducer;
