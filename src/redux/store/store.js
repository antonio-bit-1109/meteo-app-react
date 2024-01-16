import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "../reducers/storeReducer";

export const store = configureStore({
    reducer: {
        queryState: storeReducer,
    },
});

export default store;
