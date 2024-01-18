import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
    name: "myState",

    initialState: {
        cityname: "",
        lat: null,
        lon: null,
        datiMeteoCitta: null,
    },

    reducers: {
        setCityname: (state, action) => {
            state.cityname = action.payload;
        },

        setLat: (state, action) => {
            state.lat = action.payload;
        },

        setLon: (state, action) => {
            state.lon = action.payload;
        },

        setDatiMeteoCitta: (state, action) => {
            state.datiMeteoCitta = action.payload;
        },
    },
});

export const { setCityname, setLat, setLon, setDatiMeteoCitta } = storeSlice.actions;
export default storeSlice.reducer;
